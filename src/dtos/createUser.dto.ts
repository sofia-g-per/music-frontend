
import { CreateArtistDto } from "@/dtos/createArtist.dto";

export class CreateUserDto {

    username: string;

    name: string;
    
    avatar?: File;

    email: string;

    password: string;

    roleName?: string;

    artist?: CreateArtistDto;
}