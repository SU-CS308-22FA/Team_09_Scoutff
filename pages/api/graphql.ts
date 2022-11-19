// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFileSync } from 'node:fs'
import path from 'path';
import {resolvers} from "../../lib/graphql/resolvers"


export const config = {
 api: {
 // Disable body parsing (required for file uploads)
 bodyParser: false
 }
}


const schema = readFileSync(path.join(process.cwd(),  'lib', 'graphql', 'schema.graphql'), 'utf8')

 



export default createYoga<{
 req: NextApiRequest
 res: NextApiResponse
}>({
 // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
 graphqlEndpoint: '/api/graphql',
 schema: createSchema({
    typeDefs: schema,
    resolvers : {
        Query: resolvers.Query ?? {},
    }
  }),
})
