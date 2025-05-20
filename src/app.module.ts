import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { ComentModule } from './coment/coment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blog-post'),
    BlogModule,
    ComentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
