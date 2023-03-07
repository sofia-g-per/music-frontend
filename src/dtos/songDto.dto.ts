
export class SongDto {  

    id: number;

    name: string; 

    releaseDate: Date;

    description?: string;

    lyrics?: string;
    
    artists: ArtistAsAuthor[];

    genres?: GenreDto[];

    coverImg?: string;

    filePath: string;

}