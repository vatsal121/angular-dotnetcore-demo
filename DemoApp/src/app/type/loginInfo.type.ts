export class loginInfo {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    createdDate: Date;
    constructor() {
      this.userId = 0;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.userName = "";
      this.password = "";
      this.createdDate = null;
    }
  }
  