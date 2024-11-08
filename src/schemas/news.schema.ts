import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
    @Prop()
    id: string;

    @Prop()
    newsTitle: string;

    @Prop()
    newsDesc: string;

    @Prop()
    ministryYearId: string;

    @Prop()
    cateId: string;

    @Prop()
    mainImage: string;

}

export const NewsSchema = SchemaFactory.createForClass(News);
