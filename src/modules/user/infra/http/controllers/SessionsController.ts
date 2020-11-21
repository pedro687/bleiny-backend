import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      username,
      password
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Have Empty Fields, try again!' });
    }

    const verifyUser = container.resolve(AuthenticateUserService);

    const { user, token } = await verifyUser.execute({
      username,
      password,
    })

    if (!user) {
      return res.status(400).json({ message: 'Error, try again later!' });
    }

    return res.status(200).json({user, token});
  }}
