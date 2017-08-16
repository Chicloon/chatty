const graphql = require('graphql');
const {
	GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('.././types/user_type');
const AuthService = require('../../services/auth');

const usermutations = {
  signup: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, { email, password }, req) {
      return AuthService.signup({ email, password, req });
    }
  },
  logout: {
    type: UserType,
    resolve(parentValue, args, req) {
      const { user } = req;
      req.logout();
      return user;
    }
  },
  me: {
    type: UserType,
    resolve(parentValue, args, req) {
      const { user } = req;
      // req.logout();
      console.log(req);
      return user;
    }
  },
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, { email, password }, req) {
      return AuthService.login({ email, password, req });
    }
  }
}



export default usermutations

