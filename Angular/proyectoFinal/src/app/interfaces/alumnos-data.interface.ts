import { UserData } from "./users-data.interface";

export class StudentData extends UserData {
  constructor(
    id: number,
    nick: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    public nacimiento: Date,
  ) {
    super(id,nick, nombre, apellidos, email, password);
  }
  }
  