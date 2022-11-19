// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import schema from '../../lib/schema'
import {resolvers} from '../../lib/resolvers'

export const config = {
 api: {
 // Disable body parsing (required for file uploads)
 bodyParser: false
 }
}

export default createYoga<{
 req: NextApiRequest
 res: NextApiResponse
}>({
 // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
 graphqlEndpoint: '/api/graphql',
 schema: createSchema({
    typeDefs: /* GraphQL */ 
    schema,
    resolvers
  }),
})
