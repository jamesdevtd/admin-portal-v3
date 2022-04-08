/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;
  // Check in the database
  // if a user with this username
  // and password exists
  if (
    (username === 'affiliate@test.com' || username === 'affiliate') &&
    password === 'affiliate'
  ) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      secret
    );

    const serialised = serialize('TagxJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialised);

    res.status(200).json({ message: 'Success!' });
  } else {
    res.json({ message: 'Invalid credentials!' });
  }
}
