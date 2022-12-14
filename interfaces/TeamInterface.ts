import { Schema } from "mongoose";

export interface TeamInterface {
    _id: Schema.Types.ObjectId;
    id: number;
    name: string;
    has_logo?: boolean;
    logo?: string;
    slug ?: string;
    name_short ?: string;
}