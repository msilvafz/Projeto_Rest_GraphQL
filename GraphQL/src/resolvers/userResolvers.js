const User = require('../models/user');

const userResolvers = {
  /*São 3 resolvers para ler usuário, puxando todos, por Id e por tipo.
  OBS: Só utilizei o parent com o intuito de uma boa lógica de programação, porque se tivesse um relacionamento
  de herança ou algo do tipo (como tem no nosso restfull) fica mais fácil de implementar se for o caso.*/
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserById: async (parent, args) => {
    try {
      return await User.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUsersByType: async (parent, args) => {
    try {
      return await User.find({ tipo: args.tipo });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /*3 mutations, para criar o usuário, update de acordo com o Id do usuário e para deletar de acordo com o Id também.*/
  createUser: async (parent, args) => {
    const { nome, email, senha, tipo } = args;
    const user = new User({
      nome,
      email,
      senha,
      tipo,
    });
    try {
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (parent, args) => {
    const { id, nome, email, senha, tipo } = args;
    try {
      return await User.findByIdAndUpdate(
        id,
        { nome, email, senha, tipo },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (parent, args) => {
    try {
      return await User.findByIdAndDelete(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userResolvers;