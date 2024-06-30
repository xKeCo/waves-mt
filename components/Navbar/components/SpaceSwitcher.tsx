import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export const SpaceSwitcher = () => {
  return (
    <Select defaultValue="workspace1">
      <SelectTrigger className="w-auto border-none rounded-full h-9 py-2 px-3 gap-2 hover:bg-neutral-700 focus:ring-0 focus:ring-offset-0 ">
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
