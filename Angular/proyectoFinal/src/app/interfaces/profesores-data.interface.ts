import { UserData } from "./users-data.interface";

export class TeachersData extends UserData {

    constructor(
      id: number,
      nick: string,
      name: string,
      surnames: string,
      email: string,
      password: string,
      img: string,
      public centro: string
    ) {
      super(id,nick, name, surnames, email, password,img);
    }
  }
  