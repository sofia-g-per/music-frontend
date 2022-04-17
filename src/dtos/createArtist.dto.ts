import { CreateGenreDto } from '@/dtos/createGenre.dto';
export class CreateArtistDto {

    stagename: string;

    description?: string;

    //существующие жанры
    genreIds?: [];

    //новые жанры
    genres?: CreateGenreDto[];

}