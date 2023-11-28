import { IDay } from 'src/days/days.types';
import { IUser } from 'src/users/users.types';
export interface IMember {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  userId: string;
  challangeId: string;
  days: IDay[];
}

export interface IChallange {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string;
  creator: IUser;
  members: IMember[];
}
