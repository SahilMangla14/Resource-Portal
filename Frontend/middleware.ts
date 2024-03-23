import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {  
  const gStateCookie = request.cookies.get('g_state');
  if(!gStateCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const gStateValue = JSON.parse(gStateCookie?.value);
  const i_l = gStateValue?.i_l;
  if(i_l !== 0) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next();

}

export const config = {
  matcher:["/",
          "/academics/:path*",
          "/profile/:path*",
          "/team/:path*"
        ],
};