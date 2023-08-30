export interface ISidebarItem {
  name: string;
  items: ISidebarSubItem[];
}

export interface ISidebarSubItem {
  name: string;
  path: string;
  icon?: React.ReactElement;
  items?: ISidebarSubItem[];
}
