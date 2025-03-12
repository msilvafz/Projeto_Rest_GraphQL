const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/schema/schemaUser"); 
require("./src/config/database");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true, 
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});