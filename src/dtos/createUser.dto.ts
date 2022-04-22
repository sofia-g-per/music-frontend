
import { CreateArtistDto } from "@/dtos/createArtist.dto";

export class CreateUserDto {

    username: string;

    name: string;
    
    surname: string;

    avatar?: string;

    email: string;

    password: string;

    roleId?: boolean;

    artist?: CreateArtistDto;
}