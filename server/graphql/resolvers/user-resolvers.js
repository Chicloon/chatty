import AuthService from '../../services/auth.js';

export default {  
  login: (_, {username, password}, req) => {
    return AuthService.login({username, password, req})
  },
  signup: (_, {username, password}, req)=> {
    return AuthService.signup({username, password, req});    
  },
  logout: (_, args, req) => {
    const {user} = req;
    req.logout();
    return user;
  },
  user: (_, args, req) => {
    return req.user;
  }
}