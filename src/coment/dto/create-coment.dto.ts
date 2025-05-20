import { IsMongoId } from '@nestjs/class-validator';

export class CreateComentDto {
  @IsMongoId()
  blogId: string;

  content: string;

  user?: string;
}
