import type mongoose  from "mongoose"

declare global {
    var mongooseGlobal: {
        conn: (typeof mongoose) | null
        promise: Promise<typeof mongoose> | null
    }
}