import { stat, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { saveNote } from '@/app/actions';
import { deleteFolder } from '@/util/server';

const WRITER: Record<
  string,
  { length: number; total: number; fileName: string; extName: string }
> = {};
// console.log(999999);

export async function POST(request: Request) {
  // 获取 formData
  const formData = await request.formData();

  const file = formData.get('file') as File;

  const fileInfo = JSON.parse(formData.get('fileInfo') as string) as FileInfo;

  const { md5, index, length, extName } = fileInfo;

  const fileName = path.parse(fileInfo.fileName).name;

  console.log(path.parse(fileInfo.fileName));

  if (!WRITER[md5]) {
    WRITER[md5] = {
      length,
      total: 0,
      extName,
      fileName,
    };
  }

  // 空值判断
  if (!file) {
    return NextResponse.json({ error: 'File is required.' }, { status: 400 });
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/public/file/thunk/${md5}`;
  const uploadDir = path.join(process.cwd(), relativeUploadDir);

  const newFilename = `${fileName}@${md5}.${extName}`;

  // 最终保存的文件名称和路径
  const publicStatic = `/staticfiles/`;
  const staticDir = path.join(`/public`, publicStatic);
  const staticDirFile = path.join(staticDir, newFilename);
  const fileDir = path.join(process.cwd(), staticDirFile);
  const staticFileDir = path.join(process.cwd(), staticDir);

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

      await thunkStreamMerge(uploadDir, fileDir, md5);

      return NextResponse.json({
        fileUrl: `${relativeUploadDir}/${index}`,
        filesUrl: new URL(path.join(publicStatic, newFilename), request.url),
      });
    }

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${index}`,
      filesUrl: '',
      // uid: res,
    });

    // 调用接口，写入数据库
    // const res = await saveNote({
    //   title: filename,
    //   content: buffer.toString('utf-8'),
    // });

    // // 清除缓存
    // revalidatePath('/', 'layout');

    // return NextResponse.json({
    //   fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
    //   uid: res,
    // });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '发生错误' }, { status: 500 });
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
          delete WRITER[md5];
          // 删除临时目录
          deleteFolder(sourceFilesDir);
          console.log('合并完成');
          resolve('合成完成');
        });

        return;
      }

      const { filePath: chunkFilePath } = fileList.shift()!;
      const currentReadStream = fs.createReadStream(chunkFilePath);

      // 把结果往最终的生成文件上进行拼接
      currentReadStream.pipe(fileWriteStream, { end: false });

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
