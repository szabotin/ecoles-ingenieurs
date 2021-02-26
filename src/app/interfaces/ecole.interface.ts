import { Commune } from "./commune.interface";
import { Domaine } from "./domain.interface";
import { NiveauEntree } from "./niveauEntree.interface";
import { Parcours } from "./parcours.interface";
import { TypeEntree } from "./typeEntree.interfacee";

export interface Ecole
{
    codeUai: string;
    nom: string;
    academie: string;
    adresse: string;
    statut: string;
    sigle: string | null;
    telephone: string | null;
    longitude: number;
    latitude: number;
    urlSite: string | null;
    domaines: Domaine[];
    idCommune: Commune;
    niveauEntrees: NiveauEntree[];
    parcours: Parcours[];
    typeEntrees: TypeEntree[];
}