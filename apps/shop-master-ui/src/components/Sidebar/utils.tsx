interface ISidebarItem {
  name: string;
  items: ISidebarSubItem[];
}

interface ISidebarSubItem {
  name: string;
  path: string;
  icon: string;
}
