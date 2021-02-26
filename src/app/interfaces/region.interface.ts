import { Departement } from "./departement.interface";

export interface Region{
    idRegion: string;
    nom: string;
    departements: Departement[];
}