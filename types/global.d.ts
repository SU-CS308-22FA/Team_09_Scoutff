import type mongoose  from "mongoose"
import {ApolloClient, NormalizedCacheObject} from "@apollo/client"

declare global {
    var mongooseGlobal: {
        conn: (typeof mongoose) | null
        promise: Promise<typeof mongoose> | null
    },
    var realmGlobal : {
        graphqlClient ?: ApolloClient<NormalizedCacheObject> 
    }
}