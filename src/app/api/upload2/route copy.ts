import { stat, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import Busboy from 'busboy';

import { mkdirFolder } from '@/util/server';

import { headers } from 'next/headers';

export async function POST(req: NextRequest, res: NextResponse) {
  await handle(req);
}

async function handle(req: NextRequest) {
  return new Promise((resolve) => {
    try {
      const headers = Object.fromEntries(req.headers);

      const busboy = Busboy({ headers });

      const fileName = headers['x-upload-fileName'];
      const md5 = headers['x-upload-chunkName'];
      const index = headers['x-upload-index'];

      busboy.on('file', (name2, file, info) => {
        try {
          const dir = `/public/file/thunk/${md5 + '@' + index}`;
          mkdirFolder(dir);
          const saveTo = path.join(dir, fileName);
          file.pipe(fs.createWriteStream(saveTo));
        } catch (error) {
          console.log(error, 'err*---------');
          const resObj = {
            msg: '分片上传失败',
            code: -1,
            err: error,
            index, // 返回报错的是那个chunks
          };
          resolve(resObj);
        }
      });
      busboy.on('finish', function () {
        const resObj = {
          msg: '分片上传成功',
          code: 0,
          index,
        };
        resolve(resObj);
      });
      //@ts-ignore
      req.pipe(busboy);
    } catch (e) {
      console.log(e);
    }
  });
}
