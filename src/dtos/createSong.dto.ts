import { CreateGenreDto } from "@/dtos/createGenre.dto";
export class CreateSongDto {  
    name: string; 

    description: string;

    lyrics: [];

    // artistIds: AddExistingArtistDto[];

    genres: CreateGenreDto[];

    genreIds: number[];

    audioFile: [];

    releaseDate: Date;

    coverImg: []

    status: string;


}