import { workerPromise } from '@/util/client';
import mime from 'mime';

type sliceChunkOption = {
  size?: number;
  number?: number;
};

/**
 *
 * @param fileList 文件集合
 * @param chunkOption 分片参数
 * @returns Promise<{fileName: string;success: boolean;}[]>
 */
export async function uploads(
  fileList: FileList | File[],
  chunkOption?: sliceChunkOption,
  progress?: (...arg: any[]) => void,
) {
  const files = [...fileList];

  const progressData = {
    progressFn: progress,
    total: 0,
    length: 0,
  };

  const list = await Promise.allSettled(
    files.map((item) => upload(item, chunkOption, progressData)),
  );

  console.log(list);
  // 添加重试逻辑

  const data = list.map((item, index) => {
    if (item.status === 'fulfilled') {
      return {
        fileName: files[index].name,
        ...item.value,
        success: true,
      };
    }
    return {
      fileName: files[index].name,
      success: false,
    };
  });

  return data;
}

export async function upload(
  file: File,
  chunkOption?: sliceChunkOption,
  progressData?: any,
) {
  const chunks = createChunks(file, chunkOption);
  const length = chunks.length;
  progressData.length += length;
  console.log('1111');

  console.log(chunks);

  const { postMessage } = workerPromise('/md5Worker.js');

  const md5 = await postMessage<string>(chunks);

  console.log('data', md5);

  // 获取扩展名
  const extName = mime.getExtension(file.type);

  if (!extName) {
    return Promise.reject('extName获取失败');
  }

  const list = await Promise.allSettled(
    chunks.map((item, index) => {
      return uploadLargeFile(
        item,
        {
          md5,
          fileName: file.name,
          extName,
          index,
          length,
        },
        progressData,
      );
    }),
  );

  console.log('list2', list);

  for (const item of list) {
    if (item.status === 'fulfilled' && item.value.filesUrl) {
      return item.value;
    }
  }

  return Promise.reject('上传错误！有没有上传的切片');
}

const uploadLargeFile = async (
  item: Blob,
  fileInfo: FileInfo,
  progressData?: any,
) => {
  const formData = new FormData();

  formData.append('file', item);
  formData.append('fileInfo', JSON.stringify(fileInfo));

  const res = await fetch(`/api/upload2`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());

  progressData.total += 1;
  progressData.progressFn({
    total: progressData.total,
    length: progressData.length,
  });

  return res as LargeFileRespone;
};

/**
 * 文件分片
 * @param file 文件对象
 * @param size 分片大小
 */
export function createChunks(file: File, chunkOption?: sliceChunkOption) {
  const { size, number } = chunkOption || {};
  // size 的优先级比 number 高

  const chunksize = (() => {
    if (size) return size;

    if (number) return Math.ceil(file.size / number);
    // 默认每5M分片
    return 1024 * 1024 * 5;
  })();

  const chunks = [];
  for (let i = 0; i < file.size; i += chunksize) {
    chunks.push(file.slice(i, i + chunksize));
  }
  return chunks;
}