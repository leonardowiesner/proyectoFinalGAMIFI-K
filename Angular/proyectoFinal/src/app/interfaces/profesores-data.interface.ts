import { UserData } from "./users-data.interface";

export class TeachersData extends UserData {

    constructor(
      id: number,
      nickname: string,
      name: string,
      surnames: string,
      email: string,
      password: string,
      img: string,
      public centro: string
    ) {
      super(id,nickname, name, surnames, email, password,img);
    }
  }
  