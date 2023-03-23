import mongoose from "mongoose";

export function OID(id:string | number) {
    return new mongoose.Types.ObjectId(id)
}