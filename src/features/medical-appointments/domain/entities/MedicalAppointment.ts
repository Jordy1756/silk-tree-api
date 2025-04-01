import { Model } from "sequelize";
import { Specialty } from "./Specialty.ts";

export class MedicalAppointment extends Model {
    declare id: string;
    declare title: string;
    declare startDate: Date;
    declare endDate: Date;
    declare specialty: Specialty;
}
