import { SpecialtyDTO } from "./SpecialtyDTO.ts";

export class MedicalAppointmentDTO {
    constructor(
        public readonly id: string,
        public title: string,
        public start: Date,
        public end: Date,
        public specialty: SpecialtyDTO
    ) {}
}
