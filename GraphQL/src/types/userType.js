const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

/*O UserType é muito similar ao model para o mongoose (eu entendi que era quase a mesma coisa), sendo que o
type se comunica exclusivamente com o GraphiQL fornecendo os filtros existentes.*/
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    nome: { type: GraphQLString },
    email: { type: GraphQLString },
    tipo: { type: GraphQLString },
  }),
});

module.exports = UserType;