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

  // Login
  findOne(email, body) {
    return Rx.Observable.create(observer => {
      User.findOne({email: body.email}, (err, user) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(user);
          observer.complete();
        }
      })
    });
  }

}

export default new UserRepository();
