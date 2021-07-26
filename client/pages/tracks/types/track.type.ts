export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  picture: string;
  audio: string;
  listens: number;
  comments: IComment[];
}

export interface IComment {
  _id: string;
  track: string;
  username: string;
  text: string;
}
