export interface Film {
    filmId: number;
    title: string;
    description: string;
    releaseYear: number;
    language: Language;
    rentalDuration: number;
    rentalRate: number;
    length: number;
    replacementCost: number;
    rating: string;
    specialFeatures: string;
    cast: Actor[]; 

}

export interface Language {
    id: number;
    name: string;
}

export interface Actor {
    id: number;
    firstName: string;
    lastName: string;
}