import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(dto: CreateBlogDto): Promise<Blog> {
    const blog = new this.blogModel(dto);
    return blog.save();
  }

  async findAll(): Promise<Blog[]> {
    const blog = await this.blogModel.find().exec();
    if (blog.length === 0) {
      throw new NotFoundException('Blog is Empty');
    }
    return blog;
    เ;
  }

  async findOne(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID '${id}' not found`);
    }
    return blog;
  }

  async update(id: string, dto: UpdateBlogDto): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<Blog | null> {
    const blog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID '${id}' not found`);
    }
    return blog;
  }
}
