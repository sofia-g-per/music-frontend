import { SongDto } from "./songDto.dto";


export class PlaylistDto{
    id: number;
    
    name: string;

    // @AutoMap()
    // isPublic: boolean;
    
    description?: string;

    coverImg?: string;

    // @AutoMap()
    // genres?: Genre[];

    songs: SongDto[];

    creationDate?: Date;
}