import { PlaylistDto } from "@/dtos/playlistDto.dto";

export class PlayingPlaylist {
    type: string;
    name: string;
    id: number;
    playlist: PlaylistDto;
    shuffledSongs: any;
    isShuffled: boolean;
}