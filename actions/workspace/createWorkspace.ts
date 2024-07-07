'use server';
import prisma from '@/lib/prisma';

export const createWorkspace = async (
  workspaceName: string,
  workspaceSlug: string,
  userId: any,
) => {
  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        name: workspaceName,
        slug: workspaceSlug,
        logoURL: `https://source.boringavatars.com/marble/50/${workspaceSlug}`,

        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        owner: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ok: true,
      workspace: newWorkspace,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error creating your workspace, please try again.',
      error: 'serverError',
    };
  }
};
