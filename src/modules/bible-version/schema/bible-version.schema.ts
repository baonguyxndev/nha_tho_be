import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BibleVersionDocument = HydratedDocument<BibleVersion>;

@Schema({ timestamps: true })
export class BibleVersion {

    @Prop()
    id: string;

    @Prop()
    name: string;
}

export const BibleVersionSchema = SchemaFactory.createForClass(BibleVersion);
