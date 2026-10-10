import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  credentialsAreValid,
  isAuthConfigured,
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
} from '@/app/blogs/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Login request origin is not allowed.' }, { status: 403 });
  }

  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: 'Dashboard login is not configured on this server.' },
      { status: 503 },
    );
  }

  let credentials: { username?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid login request.' }, { status: 400 });
  }

  if (
    typeof credentials.username !== 'string' ||
    typeof credentials.password !== 'string' ||
    credentials.username.length > 256 ||
    credentials.password.length > 1024 ||
    !credentialsAreValid(credentials.username, credentials.password)
  ) {
    return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
