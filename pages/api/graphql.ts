// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useResponseCache } from '@graphql-yoga/plugin-response-cache';
import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
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
  plugins: [
    useResponseCache({
      //global cache for player queries
      session: (session) => {



        return session.headers.get('Authorization');
        
        

      } ,

      


      



      // cache for 1 minute
      ttl: 60 * 1000,
    })
  ]
})
