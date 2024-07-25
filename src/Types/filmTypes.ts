export interface Film {
    id: number;
    title: string;
    releaseYear: number;
}

export interface FilmResponse {
    films: Film[];
}