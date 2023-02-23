import { UserData } from "./users-data.interface";

export class TeachersData extends UserData {

    constructor(
      id: number,
      nick: string,
      nombre: string,
      apellidos: string,
      email: string,
      password: string,
      public centro: string
    ) {
      super(id,nick, nombre, apellidos, email, password);
    }
  }
  