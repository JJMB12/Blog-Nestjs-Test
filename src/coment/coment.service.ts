import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
// import { UpdateComentDto } from './dto/update-coment.dto';
import { Comment, ComentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogService } from '../blog/blog.service';

@Injectable()
export class ComentService {
  constructor(
    @InjectModel(Comment.name) private comentModel: Model<ComentDocument>,
    private blogService: BlogService,
  ) {}
  async create(createComentDto: CreateComentDto): Promise<Comment> {
    const blogId = await this.blogService.findOne(createComentDto.blogId);
    if (!blogId) {
      throw new NotFoundException('blog ont found');
    }
    const coment = new this.comentModel(createComentDto);
    return coment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.comentModel.find().populate('blogId').exec();
  }

  async findOne(id: string): Promise<Comment | null> {
    const coment = this.comentModel.findById(id).populate('blogId').exec();
    return coment;
  }

  // update(id: number, updateComentDto: UpdateComentDto) {
  //   return `This action updates a #${id} coment`;
  // }

  async delete(id: string): Promise<Comment | null> {
    return this.comentModel.findByIdAndDelete(id).exec();
  }
}
