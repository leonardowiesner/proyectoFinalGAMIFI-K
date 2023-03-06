import { UserData } from "./users-data.interface";

export class StudentData extends UserData {
  constructor(
    id: number,
    nick: string,
    name: string,
    surnames: string,
    email: string,
    password: string,
    img: string,
    public nacimiento: Date,
  ) {
    super(id,nick, name, surnames, email, password,img);
  }
  }
  