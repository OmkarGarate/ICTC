import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    const start = Date.now();

    console.log('\n================ REQUEST ================');

    console.log('METHOD:', req.method);

    console.log('URL:', req.originalUrl);

    console.log('QUERY:', req.query);

    console.log('BODY:', req.body);

    console.log('PARAMS:', req.params);

    console.log('HEADERS:', {
      authorization: req.headers.authorization,
      contentType: req.headers['content-type'],
    });

    res.on('finish', () => {

      const time = Date.now() - start;

      console.log('\n================ RESPONSE ================');

      console.log('STATUS:', res.statusCode);

      console.log('TIME:', `${time}ms`);

      console.log('==========================================\n');
    });

    next();
  }
}