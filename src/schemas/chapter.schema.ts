import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({ timestamps: true })
export class Chapter {
    @Prop()
    id: string;

    @Prop()
    bookId: string;

    @Prop()
    chapterNumber: number;

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
