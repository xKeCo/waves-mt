import type { TWorkspace } from './TWorkspace';

export type TUser = {
  id: string;
  email: string;
  username: string;
  photoURL: string;
  workspaces: TWorkspace[];
  createdAt: string;
  updatedAt: string;
};
