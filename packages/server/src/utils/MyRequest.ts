import { Request as ExpressReq } from 'express';
export type Request = ExpressReq & {
  userId: number;
};
