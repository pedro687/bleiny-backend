import Auth from '@config/Auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    throw new AppError('Error, Login Token is necessary', 400);
  }

  const [, token] = headerAuth.split(' ');

  const { secret } = Auth.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;
    const userInfo = JSON.parse(sub);

    req.user = {
      id: userInfo.id,
      isInfluencer: userInfo.isInfluencer,
      username: userInfo.username,
    };

    return next();
  } catch (err) {
    throw new AppError('Error, Login Token is necessary', 400);
  }
}
