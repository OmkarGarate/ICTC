import { PartialType } from '@nestjs/mapped-types';
import { CreateCancerDto } from './create-cancer.dto';

export class UpdateCancerDto extends PartialType(CreateCancerDto) {}
