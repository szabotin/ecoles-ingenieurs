import { Departement } from "./departement.interface";
import { Ecole } from "./ecole.interface";

export interface Commune {
    nom: string;
    codePostal: string;
    idCommune: string;
    idDepartement: Departement;
    ecoles: Ecole[];
}