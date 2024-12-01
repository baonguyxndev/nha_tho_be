import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {

    @Prop()
    id: string;

    @Prop()
    bibleVersionId: string

    @Prop()
    name: string
}

export const BookSchema = SchemaFactory.createForClass(Book);
