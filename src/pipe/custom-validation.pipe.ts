import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import to from 'await-to-js';
import { CUSTOMVALIDATIONERROR } from './custom-validation.const';

@Injectable()
export class CustomValidationPipe
  extends ValidationPipe
  implements PipeTransform
{
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const types: Function[] = [String, Boolean, Number, Array, Object];

    if (!metatype || !!types.includes(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorDetails = await Promise.all(
        errors.map((error) => JSON.stringify(error.constraints)),
      );
      throw new BadRequestException(
        `${CUSTOMVALIDATIONERROR} Details: ${errorDetails}`,
      );
    }

    return value;
  }
}
