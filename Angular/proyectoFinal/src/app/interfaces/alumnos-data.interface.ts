import { UserData } from "./users-data.interface";

export class StudentData extends UserData {
  constructor(
    id: number,
    nickname: string,
    name: string,
    surnames: string,
    email: string,
    password: string,
    img: string,
    public nacimiento: Date,
  ) {
    super(id,nickname, name, surnames, email, password, img);
  }
  }
  