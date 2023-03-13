import { StudentData } from "./alumnos-data.interface";
import { TeachersData } from "./profesores-data.interface";

export interface RespuestaServidor {
    status: number;
    msg: string;
    token: string | null;
    student: StudentData;
    teacher:TeachersData;
}
