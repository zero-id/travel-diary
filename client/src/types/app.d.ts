export interface IJourney {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  userId: number;
  createdAt: string;
  user: IUser;
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar?: string;
  journey?: IJourney[];
  bookmark?: IBookmark[];
}

export interface IBookmark {
  userId: number;
  journeyId: number;
  createdAt: string;
  updatedAt: string;
  journey: IJourney;
}
