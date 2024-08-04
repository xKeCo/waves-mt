import type { TWorkspace } from './TWorkspace';

export type TUser = {
  id: string;
  email: string;
  username: string;
  workspaces: TWorkspace[];
  createdAt: string;
  updatedAt: string;
};
