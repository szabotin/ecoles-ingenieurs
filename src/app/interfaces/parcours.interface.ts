import { Ecole } from "./ecole.interface";

export interface Parcours {
    idParcours: number;
    parcours: string;
    fraisScolarite: number | null;
    description: string | null;
    ecoles: Ecole[];
}