import { Ecole } from "./ecole.interface";

export interface Utilisateur
{
    login: string;
    password: string;
    codeUai: Ecole;
}