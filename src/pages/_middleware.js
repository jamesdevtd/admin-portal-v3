/* eslint-disable no-return-assign, no-param-reassign */

import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;

//TODO: convert to typscript once once http only cookie token is ready
export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.TagxJWT;
  const url = req.url;

  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = '/login';

  //TODO: refactor to modularize route protection per page file
  if (url.includes('/dashboard')) {
    if (jwt === undefined) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

// TODO refactor this middle ware to avoid latest next.js warning eval not allowed in Middleware pages
/* eslint-enable no-return-assign, no-param-reassign */
