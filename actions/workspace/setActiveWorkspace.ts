'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setActiveWorkspace = (workspaceId: string, username: string) => {
  cookies().set('activeWorkspace', workspaceId);
  redirect(`/${username}/${workspaceId}/dashboard`);
};

export const getActiveWorkspace = () => {
  return cookies().get('activeWorkspace')?.value;
};

export const deleteActiveWorkspace = () => {
  cookies().delete('activeWorkspace');
};
