import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    desc: string;

    @Prop()
    ministryYearId: string;

    @Prop()
    cateId: string;

    @Prop()
    mainImg: string;

}

export const NewsSchema = SchemaFactory.createForClass(News);
