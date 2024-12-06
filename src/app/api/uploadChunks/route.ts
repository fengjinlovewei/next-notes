import { stat, mkdir, writeFile, access } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { saveNote } from '@/app/actions';
import { deleteFolder } from '@/util/server';

import crypto from 'crypto';

const WRITER: Record<
  string,
  {
    length: number;
    total: number;
    fileName: string;
    extName: string;
    fetchType?: 'md';
    md?: '';
  }
> = {};

export async function POST(request: NextRequest) {
  // 获取 formData
  const formData = await request.formData();

  const file = formData.get('file') as File;

  const fileInfo = JSON.parse(formData.get('fileInfo') as string) as FileInfo;

  const { md5, index, length, type, fetchType } = fileInfo;

  const newType = type || mime.getType(fileInfo.fileName);

  if (!newType) {
    return NextResponse.json({ error: 'type获取失败' }, { status: 400 });
  }

  // 获取扩展名
  const extName = mime.getExtension(newType);

  // 空值判断
  if (!extName) {
    return NextResponse.json({ error: 'extName获取失败' }, { status: 400 });
  }

  const fileName = path.parse(fileInfo.fileName).name;

  console.log(path.parse(fileInfo.fileName));

  const newFilename = `${fileName}@${md5}.${extName}`;

  console.log('fetchType', fetchType);

  if (!WRITER[md5]) {
    WRITER[md5] = {
      length,
      total: 0,
      extName,
      fileName,
      fetchType,
      md: '',
    };
  }

  // 空值判断
  if (!file) {
    return NextResponse.json({ error: 'File is required.' }, { status: 400 });
  }

  // 最终保存的文件名称和路径
  const publicStatic = process.env.STATIC_PATH!;
  const staticFileDir = path.join(process.cwd(), publicStatic);
  // const staticDir = path.join(`/public`, publicStatic);
  const staticDirFile = path.join(publicStatic, newFilename);
  const allFilePath = path.join(process.cwd(), staticDirFile);

  const fileUrl = new URL(
    path.join('/api', staticDirFile),
    process.env.STATIC_HOST,
  );

  // 这块没那么简单，提前返回但是流文件依然在传，时间没有减少，后面再研究
  // try {
  //   await access(staticDirFile);
  //   return NextResponse.json({ index, md5, fileUrl });
  // } catch (e) {}

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/public/file/thunk/${md5}`;
  const uploadDir = path.join(process.cwd(), relativeUploadDir);

  // 创建临时目录
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return NextResponse.json({ error: '临时目录创建错误' }, { status: 500 });
    }
  }

  try {
    await writeFile(`${uploadDir}/${index}`, buffer);

    WRITER[md5].total += 1;

    if (WRITER[md5].total === WRITER[md5].length) {
      // 创建临时目录
      try {
        await stat(staticFileDir);
      } catch (e: any) {
        if (e.code === 'ENOENT') {
          await mkdir(staticFileDir, { recursive: true });
        } else {
          console.error(e);
          return NextResponse.json(
            { error: '文件目录创建错误' },
            { status: 500 },
          );
        }
      }

      await thunkStreamMerge(uploadDir, allFilePath, md5);

      if (fetchType === 'md') {
        const content = await fs.promises.readFile(allFilePath);

        // 调用接口，写入数据库
        const res = await saveNote({
          title: fileName,
          content: content.toString(),
          pathName: staticDirFile,
        });

        if (res.errors) {
          return NextResponse.json({ error: res.errors }, { status: 403 });
        }

        console.log('WRITER[md5].md-save-res', res);

        // 清除缓存
        revalidatePath('/', 'layout');

        delete WRITER[md5];

        return NextResponse.json({ index, md5, fileUrl, data: res.data });
      }

      // 清空内存数据
      delete WRITER[md5];

      return NextResponse.json({ index, md5, fileUrl, data: null });
    }

    return NextResponse.json({ index, md5, fileUrl: '', data: null });

    // // 清除缓存
    // revalidatePath('/', 'layout');

    // return NextResponse.json({
    //   fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
    //   uid: res,
    // });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}

async function thunkStreamMerge(
  sourceFiles: string,
  targetFile: string,
  md5: string,
) {
  let resolve: any, reject: any;
  const Pro = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const fileList = Array(WRITER[md5].length)
    .fill(0)
    .map((item, index) => {
      const name = `${index}`;
      return {
        name,
        filePath: path.join(sourceFiles, name),
      };
    });

  const fileWriteStream = fs.createWriteStream(targetFile);

  // 这个也是读取流，在服务端得到md5值，和客户端的md5进行对比
  const cryptoHash = crypto.createHash('md5', { encoding: 'hex' });

  thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);

  function thunkStreamMergeProgress(
    fileList: {
      name: string;
      filePath: string;
    }[],
    fileWriteStream: fs.WriteStream,
    sourceFilesDir: string,
  ) {
    try {
      if (!fileList.length) {
        fileWriteStream.end();
        setTimeout(() => {
          // 删除临时目录
          deleteFolder(sourceFilesDir);
          console.log('合并完成');

          // 计算并获取哈希值的十六进制表示
          const MD5 = cryptoHash.digest('hex');

          if (md5 !== MD5) {
            console.log('md5', md5, MD5);
            reject('文件校验失败！');
          }
          resolve('合成完成');
        });

        return;
      }

      const { filePath: chunkFilePath } = fileList.shift()!;
      const currentReadStream = fs.createReadStream(chunkFilePath);

      // 把结果往最终的生成文件上进行拼接
      currentReadStream.pipe(fileWriteStream, { end: false });

      currentReadStream.on('data', (chunk) => {
        cryptoHash.update(chunk);
      });

      currentReadStream.on('end', () => {
        // 拼接完之后进入下一次循环
        thunkStreamMergeProgress(fileList, fileWriteStream, sourceFilesDir);
      });
    } catch (error) {
      console.error('报错了', error);
      reject(error);
    }
  }

  return Pro;
}
