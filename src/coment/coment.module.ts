import { Module } from '@nestjs/common';
import { ComentService } from './coment.service';
import { ComentController } from './coment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ComentModule,
    BlogModule,
  ],
  controllers: [ComentController],
  providers: [ComentService],
})
export class ComentModule {}
