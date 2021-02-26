import { Ecole } from "./ecole.interface";

export interface Domaine{
    idDomaine: number;
    domaine: string;
    ecoles: Ecole[];
}