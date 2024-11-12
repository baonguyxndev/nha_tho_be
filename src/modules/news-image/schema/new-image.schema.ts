import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewImageDocument = HydratedDocument<NewsImage>;

@Schema({ timestamps: true })
export class NewsImage {
    @Prop()
    id: string;

    @Prop()
    newsId: string;

    @Prop()
    imgPath: string;

}

export const NewImageSchema = SchemaFactory.createForClass(NewsImage);
