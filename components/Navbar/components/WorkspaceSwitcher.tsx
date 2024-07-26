'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Plus } from 'lucide-react';

import { NewWorkspaceDialog } from './NewWorkspaceDialog';
import { setActiveWorkspace } from '../../../actions/workspace/setActiveWorkspace';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Button } from '../../ui/button';
import type { TWorkspace } from '../../../types/TWorkspace';

export const WorkspaceSwitcher = ({
  username,
  workspaces,
}: {
  username: string;
  workspaces: TWorkspace[];
}) => {
  const { workspaceSlug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <>
      <Select
        open={openSelect}
        onOpenChange={() => {
          setOpenSelect(!openSelect);
        }}
        defaultValue={workspaceSlug as string}
        onValueChange={(value) => {
          setActiveWorkspace(value, username);
        }}
      >
        <SelectTrigger
          className="h-9 w-auto gap-2 rounded-full border-none px-3 py-2 hover:bg-neutral-700 focus:ring-0 focus:ring-offset-0"
          onClick={() => setOpenSelect(!openSelect)}
        >
          <SelectValue placeholder="Select Workspace" />
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((workspace) => (
            <SelectItem key={workspace.slug} value={workspace.slug} className="mr-3">
              <div className="flex items-center gap-2">
                <Image
                  src={workspace.logoURL}
                  alt={workspace.name}
                  width={16}
                  height={16}
                  priority
                  className="h-4 w-4"
                />
                {workspace.name}
              </div>
            </SelectItem>
          ))}

          <Separator className="my-2" />

          <Button
            variant="ghost"
            className="mb-1 h-8 w-full justify-start gap-2 px-2"
            size="sm"
            onClick={() => {
              setOpenSelect(false);
              setOpenModal(true);
            }}
          >
            <Plus className="h-4 w-4" />
            New group
          </Button>
        </SelectContent>
      </Select>

      <NewWorkspaceDialog openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
