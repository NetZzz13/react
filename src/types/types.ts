
export type PostType = {
  id: number;
  message: string;
  likeCount: number;
  isLike?: boolean;
};

export type ContacsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small?: string;
  large?: string;
};

export type ProfileType = {
  iserId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContacsType;
  photos: PhotosType;
  aboutMe: string
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

