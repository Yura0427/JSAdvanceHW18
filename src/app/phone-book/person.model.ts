import { IPerson } from "./person.interface";

export class Person implements IPerson{
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public number: string,
    ){}
}