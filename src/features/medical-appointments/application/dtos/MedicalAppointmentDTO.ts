import { SpecialtyDTO } from "./SpecialtyDTO";

export class MedicalAppointmentDTO {
    constructor(
        public readonly id: string,
        public title: string,
        public start: Date,
        public end: Date,
        public userId: string,
        public specialty: SpecialtyDTO
    ) {}
}
