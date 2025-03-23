export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public lastName: string,
        public email: string,
        public passwordHash: string
    ) {}
}
