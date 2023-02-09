import { UserData } from "./users-data.interface";

export class TeachersData extends UserData {

    constructor(
      nick: string,
      nombre: string,
      apellidos: string,
      email: string,
      password: string,
      public centro: string
    ) {
      super(nick, nombre, apellidos, email, password);
    }
  }
  