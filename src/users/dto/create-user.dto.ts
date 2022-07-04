export class CreateUserDto {
  name: string;
  spotify_id: number;
  albums?: [
    {
      title: string;
      artist: string;
      id: string;
    },
  ];
}
