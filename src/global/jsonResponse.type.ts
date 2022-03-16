import { Response } from 'express';

export type JsonResponse = Response<any, Record<string, any>>;
