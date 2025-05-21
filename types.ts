import { ObjectId } from "mongodb";

export interface FavoriteCharacter {
    name: string;
    image: string;
}

export interface User {
    _id: ObjectId;
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    country: string;
    ToS: boolean;
    favorites?: FavoriteCharacter[]; 

    language?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    region?: string; 
    postalCode?: string;
}