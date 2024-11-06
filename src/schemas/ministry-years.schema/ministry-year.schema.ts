import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MinistryYearDocument = HydratedDocument<MinistryYear>;

@Schema({ timestamps: true })
export class MinistryYear {
    @Prop()
    id: string;

    @Prop()
    nameYear: string;

    @Prop()
    desYear: string;

    @Prop()
    cateYearId: string;
}

export const MinistryYearSchema = SchemaFactory.createForClass(MinistryYear);
