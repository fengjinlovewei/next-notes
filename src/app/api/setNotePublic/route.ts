import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateNote } from '@/lib/prisma';
import { getUserSessionData } from '@/lib/session';

export async function POST(request: NextRequest) {
  const session = await getUserSessionData();

  if (!session?.user) {
    // return Response.redirect(`${request.nextUrl.origin}/login`, 303);
    return NextResponse.json(
      {
        code: 700,
        url: '/login',
      },
      { status: 201 },
    );
  }

  const json = await request.json();

  const res = await updateNote(json.noteId, { public: json.public });

  return NextResponse.json(
    {
      data: res.public,
    },
    { status: 201 },
  );

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
  // not using redirect() yet: https://github.com/vercel/next.js/issues/51592#issuecomment-1810212676
  //   return Response.redirect(
  //     `${request.nextUrl.origin}/app-router-client-component-redirect-route-handler-fetch`,
  //     303,
  //   );
}
