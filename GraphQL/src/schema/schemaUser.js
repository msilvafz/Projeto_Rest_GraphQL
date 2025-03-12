const {   GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLID  } = require('graphql');
const UserType = require('../types/userType'); 
const userResolvers = require('../resolvers/userResolvers');  

/*Definimos 3 queries (busca de dados) baseadas no controller (agora resolvers) que a gente tinha, referenciando
o tipo e a importação específica do GraphQL para cada caso, string, Id e string usando o Type também importado
anteriormente.*/
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: userResolvers.getAllUsers,
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: userResolvers.getUserById,
    },
    usersByType: {
      type: new GraphQLList(UserType),
      args: { tipo: { type: GraphQLString } },
      resolve: userResolvers.getUsersByType,
    },
  },
});

/*Diferentemente das queries que são consultas, as mutations servem para modificar os dados (como o nome já
é bem sugestivo), nesse caso a gente utilizou para criar o usuário, atualizar pelo ID e excluir pelo ID.*/
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        nome: { type: GraphQLString },
        email: { type: GraphQLString },
        senha: { type: GraphQLString },
        tipo: { type: GraphQLString },
      },
      resolve: userResolvers.createUser,
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        nome: { type: GraphQLString },
        email: { type: GraphQLString },
        senha: { type: GraphQLString },
        tipo: { type: GraphQLString },
      },
      resolve: userResolvers.updateUser,
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: userResolvers.deleteUser,
    },
  },
});

/*Agrupando as mutations e queries acima em um único objeto que define a estrutura da API GraphQL.*/
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;