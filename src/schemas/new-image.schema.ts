import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewImageDocument = HydratedDocument<NewImage>;

@Schema({ timestamps: true })
export class NewImage {
    @Prop()
    id: string;

    @Prop()
    newsId: string;

    @Prop()
    imgPath: string;

}

export const NewImageSchema = SchemaFactory.createForClass(NewImage);
