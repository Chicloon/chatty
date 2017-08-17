const graphql = require('graphql');
const {
	GraphQLObjectType,
  GraphQLString
} = graphql;

import UserType from '.././types/user_type';
const AuthService = require('../../services/auth');

const usermutations = {
  signup: {
    type: UserType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, { username, password }, req) {
      return AuthService.signup({ username, password, req });
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
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, { username, password }, req) {
      return AuthService.login({ username, password, req });
    }
  }
}



export default usermutations

