import type { TUser } from './TUser';

export type TWorkspace = {
  id: string;
  slug: string;
  name: string;
  ownerId: string;
  owner?: TUser;
  createdAt: string;
  updatedAt: string;
};
