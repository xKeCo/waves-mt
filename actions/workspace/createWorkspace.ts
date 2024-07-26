'use server';
import prisma from '@/lib/prisma';
import { auth } from '../../auth';

export const createWorkspace = async (workspaceName: string, workspaceSlug: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        ok: false,
        errorMessage: 'You must be logged in to create a workspace.',
        error: 'notLoggedIn',
      };
    }

    const existingWorkspace = await prisma.workspace.findFirst({
      where: {
        slug: workspaceSlug,
        ownerId: session?.user.id,
      },
    });

    if (existingWorkspace) {
      return {
        ok: false,
        errorMessage: 'You already have a workspace with that slug.',
        error: 'workspaceSlugExists',
      };
    }

    const newWorkspace = await prisma.workspace.create({
      data: {
        name: workspaceName,
        slug: workspaceSlug,
        logoURL: `https://source.boringavatars.com/marble/50/${workspaceSlug}`,

        ownerId: session?.user.id,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        logoURL: true,
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

export const createWorkspaceRegister = async (
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
