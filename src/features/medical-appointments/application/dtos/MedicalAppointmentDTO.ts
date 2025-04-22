import { SpecialtyDTO } from "./SpecialtyDTO.js";

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
