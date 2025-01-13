import { gql } from 'apollo-server-express';

const typeDefs = gql`

 type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
 }

 type Quote{
    quote: String!
    by: ID!
 }
 type QuoteWithName {
    quote: String!
    by: IdWithName!
 }

 type IdWithName {
   _id: ID!
   firstName: String!
 }

 type Query{
    users: [User]
    quotes: [QuoteWithName]
    user(_id: ID!): User
    iquote(by: ID!): [Quote]
    myprofile:User
 }

 type Token{
   token: String!
 }

 type Mutation{
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: SigninInput!): Token
    createQuote(quote: String!): String
 }

input SigninInput{
   email: String!
   password: String!
}

 input UserInput{
    firstName: String!
    lastName: String!
    email: String!
    password: String!
 }
`;

export default typeDefs;