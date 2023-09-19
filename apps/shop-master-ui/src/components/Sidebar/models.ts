export type TSidebarItem = {
  name: string;
  items: TSidebarSubItem[];
};

export type TSidebarSubItem = {
  name: string;
  path: string;
  icon?: React.ReactElement;
  additionalPathPattern: string;
  items?: TSidebarSubItem[];
};
