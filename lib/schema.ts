const typeDefs = /* GraphQL */ `
    type User {
        id: ID!
        name: String!
        email: String!
        image: String!
        role: String!
        emailVerified: Boolean!
        likedPlayers: [Player!]
    }
       

    type Player {
        id: ID!
        name: String!
        slug: String!
        rating: Float
        photo: String
        flag: String
        likedBy: [User!]
    }

    type Query {
        users : [User!]
        user(email: String!): User
        players: [Player!]
        player(slug: String!): Player
        likedPlayers(id : ID!): [Player!]
    }





`
export default typeDefs






