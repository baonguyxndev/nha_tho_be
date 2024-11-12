import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({ timestamps: true })
export class Chapter {
    @Prop()
    id: string;

    @Prop()
    number: number;

    @Prop()
    bookId: string;

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
