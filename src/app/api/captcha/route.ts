import { NextRequest, NextResponse } from 'next/server';
import { getUserSessionData } from '@/lib/session';
import * as svgCaptcha from './svg-captcha';

interface Params {
  params: {};
}

export async function GET(request: NextRequest, { params }: Params) {
  const searchParams = request.nextUrl.searchParams;

  const fontSize = Number(searchParams.get('fontSize')) || 50;
  const width = Number(searchParams.get('width')) || 100;
  const height = Number(searchParams.get('height')) || 34;

  const captcha = svgCaptcha.create({
    size: 4,
    fontSize,
    width,
    height,
    background: '#fff',
    noise: 2, // 噪声线数量
  });

  const session = await getUserSessionData();

  session.yzm = captcha.text;

  await session.save();

  return new Response(captcha.data, {
    // headers: { 'Content-Type': `${mime.getType(filename)}; charset=UTF-8` },
    headers: {
      'Content-Type': `image/svg+xml`,
    },
  });
}
