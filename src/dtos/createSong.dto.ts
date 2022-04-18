import { CreateGenreDto } from "@/dtos/createGenre.dto";
import { AddExistingArtistDto } from "./addExistingArtistDto.dto";

export class CreateSongDto {  
    name: string; 

    released_at: Date;

    description: string;

    lyrics: string;

    artistIds: AddExistingArtistDto[];

    genres: CreateGenreDto[];

    genreIds: number[];

    audioFile: [];
}