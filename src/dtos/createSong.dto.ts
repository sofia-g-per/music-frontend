import { CreateGenreDto } from "@/dtos/createGenre.dto";
import { AddExistingArtistDto } from "./addExistingArtistDto.dto";

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


}