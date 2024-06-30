import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export const SpaceSwitcher = () => {
  return (
    <Select defaultValue="workspace1">
      <SelectTrigger className="h-9 w-auto gap-2 rounded-full border-none px-3 py-2 hover:bg-neutral-700 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Select Workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="workspace1" className="mr-3">
          Workspace 1
        </SelectItem>
        <SelectItem value="workspace2" className="mr-3">
          Workspace 2
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
