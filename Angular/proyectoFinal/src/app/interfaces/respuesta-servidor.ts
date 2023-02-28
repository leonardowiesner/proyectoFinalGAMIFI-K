import { StudentData } from "./alumnos-data.interface";

export interface RespuestaServidor {
    status: number;
    msg: string;
    token: string | null;
    student: StudentData;
}
