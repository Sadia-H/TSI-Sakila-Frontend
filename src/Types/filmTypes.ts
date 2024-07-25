export interface Film {
    filmId: number;
    title: string;
    releaseYear: number;
}

export interface FilmResponse {
    films: Film[];
}