import { NextRequest, NextResponse } from 'next/server';
import mime from 'mime';

import fs from 'fs';
import { stat, access } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  {
    params,
  }: LayoutProps<{
    files: string[];
  }>,
) {
  const [file] = (await params).files || [];
  const filename = path.basename(file);

  if (!filename) {
    return NextResponse.json({ error: '文件名不能为空' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'static', filename);
  try {
    await access(filePath);
  } catch (e) {
    return NextResponse.json({ error: '文件不存在' }, { status: 400 });
  }

  const stream = fs.createReadStream(filePath) as unknown;

  // response.headers.set('Content-Type', 'application/octet-stream');
  // response.headers.set(
  //   'Content-Disposition',
  //   `attachment; filename="${filename}"`,
  // );

  // const stream2 = iteratorToStream();
  // const a = new ReadableStream();

  return new Response(stream as BodyInit, {
    // headers: { 'Content-Type': `${mime.getType(filename)}; charset=UTF-8` },
    headers: {
      'Content-Type': `${mime.getType(filename)}; charset=UTF-8`,
    },
  });
}
