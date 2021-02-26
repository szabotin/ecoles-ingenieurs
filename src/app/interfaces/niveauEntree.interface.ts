import { Ecole } from "./ecole.interface";

export interface NiveauEntree{
    idNivEntree: number;
    niveau: string;
    ecoles: Ecole[];
}