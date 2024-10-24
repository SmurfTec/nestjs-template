// import { UserModel } from 'src/domain/models/user';

export class UserData {
  constructor(data: any) {
    UserData.data = data;
  }

  private static data: any;

  static getUserData() {
    return UserData.data;
  }
}
