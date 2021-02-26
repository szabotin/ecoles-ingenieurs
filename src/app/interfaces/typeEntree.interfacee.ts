import { Ecole } from "./ecole.interface";

export interface TypeEntree {
    idTypeEntree: number;
    type: string;
    ecoles: Ecole[];
}