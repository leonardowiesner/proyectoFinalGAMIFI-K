import { UserData } from "./users-data.interface";

export class StudentData extends UserData {
  constructor(
    nick: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    public nacimiento: Date,
  ) {
    super(nick, nombre, apellidos, email, password);
  }
  }
  