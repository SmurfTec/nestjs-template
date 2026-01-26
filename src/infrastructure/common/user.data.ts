export class UserData {
  constructor(data: any) {
    UserData.data = data;
  }

  private static data: any;

  static getUserData() {
    return UserData.data;
  }
}
