import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VerseDocument = HydratedDocument<Verse>;

@Schema({ timestamps: true })
export class Verse {
    @Prop()
    id: string;

    @Prop()
    chapterId: string;

    @Prop()
    number: number;

    @Prop()
    desc: string;
}

export const VerseSchema = SchemaFactory.createForClass(Verse);
