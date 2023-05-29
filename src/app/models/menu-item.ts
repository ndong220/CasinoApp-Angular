export interface MenuItem {
  label: string;
  icon: string;
  subMenuItems: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  link: string;
}

