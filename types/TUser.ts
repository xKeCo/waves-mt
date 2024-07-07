import type { TWorkspace } from './TWorkspace';

export type TUser = {
  id: number;
  email: string;
  username: string;
  photoURL: string;
  workspaces: TWorkspace[];
  createdAt: string;
  updatedAt: string;
};
