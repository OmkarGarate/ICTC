import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {
        // Use the actual HTTP status code instead of hardcoding 200
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode ?? 200;

        return {
          statusCode,
          message: 'Success',
          data: data ?? [],
        };
      }),
    );

  }

}