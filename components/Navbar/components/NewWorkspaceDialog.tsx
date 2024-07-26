'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { createWorkspace } from '../../../actions/workspace/createWorkspace';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  workspaceName: z.string().min(4, {
    message: 'Name must be at least 4 characters long',
  }),
  workspaceSlug: z.string().min(2, {
    message: 'Slug must be at least 2 characters long',
  }),
});

export const NewWorkspaceDialog = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspaceName: '',
      workspaceSlug: '',
    },
  });

  const handleOpenChange = () => {
    setOpenModal(!openModal);
    form.reset();
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.workspaceSlug === '' || data.workspaceName === '') {
      return;
    }

    setIsLoading(true);

    const {
      ok,
      errorMessage,
      error,
      workspace: newWorkspace,
    } = await createWorkspace(data.workspaceName, data.workspaceSlug);

    setIsLoading(false);

    if (!ok) {
      if (error === 'workspaceSlugExists') {
        form.setError('workspaceSlug', {
          type: 'manual',
          message: 'You already have a workspace with that slug.',
        });
      }

      return toast.error(errorMessage);
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        workspaces: [
          ...(session?.user?.workspaces ?? []),
          {
            id: newWorkspace?.id,
            slug: newWorkspace?.slug,
            name: newWorkspace?.name,
            logoURL: newWorkspace?.logoURL,
          },
        ],
      },
    });

    router.refresh();
    toast.success('Workspace created successfully!');
    form.reset();
    setOpenModal(false);
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-primary">Create a new workspace</DialogTitle>
          <DialogDescription className="text-xs">
            A workspace is a space where you can track your finances separately.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="workspaceName">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="workspaceName"
                      required
                      type="text"
                      onChange={(e) => {
                        field.onChange(e);
                        form.setValue(
                          'workspaceSlug',
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-zA-Z0-9]/g, '-')
                            .replace(/-+/g, '-'),
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workspaceSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="workspaceSlug">Slug</FormLabel>
                  <FormControl>
                    <Input id="workspaceSlug" required type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="button" variant="ghost" disabled={isLoading} onClick={handleOpenChange}>
                Cancel
              </Button>

              <Button type="submit" variant="secondary" disabled={isLoading}>
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
