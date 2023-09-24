export type TSidebarItem = {
  name: string;
  items: TSidebarSubItem[];
};

export type TSidebarSubItem = {
  name: string;
  path: string;
  icon?: React.ReactElement;
  highlightPathPattern: RegExp;
  items?: TSidebarSubItem[];
};
