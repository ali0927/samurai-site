import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
  type Query {
    test: String!
  }
  type Mutation {
    claim(address: String!, tokenIds: [Int]!): String!
  }
`