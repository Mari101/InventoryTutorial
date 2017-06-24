import Rx from 'rxjs/Rx';
import BaseRepository from './BaseRepository';
import User from '../models/user';

class UserRepository extends BaseRepository {
  constructor(){
    super(User)
  }

  //  Add User
  save(user) {
    const newUser = new User({
      displayName: user.displayName,
      email: user.email,
      password: user.password
    });
    return super.save(newUser);
  }



}

export default new UserRepository();
