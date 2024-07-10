'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import type { TWorkspace } from '../../../types/TWorkspace';
import { setActiveWorkspace } from '../../../actions/workspace/setActiveWorkspace';
import { useParams } from 'next/navigation';

export const SpaceSwitcher = ({
  username,
  workspaces,
}: {
  username: string;
  workspaces: TWorkspace[];
}) => {
  const { workspaceSlug } = useParams();

  return (
    <Select
      defaultValue={workspaceSlug as string}
      onValueChange={(value) => {
        setActiveWorkspace(value, username);
      }}
    >
      <SelectTrigger className="h-9 w-auto gap-2 rounded-full border-none px-3 py-2 hover:bg-neutral-700 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Select Workspace" />
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace.slug} value={workspace.slug} className="mr-3">
            {workspace.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
