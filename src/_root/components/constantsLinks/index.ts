import {
  BadgePlus,
  BookMarked,
  House,
  LucideProps,
  Telescope,
  UserRound,
} from "lucide-react";

export type SideBarLinksType = {
  name: string;
  route: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const SideBarLinks: SideBarLinksType[] = [
  {
    name: "Home",
    route: "/",
    icon: House,
  },
  {
    name: "Explore",
    route: "/explore",
    icon: Telescope,
  },
  {
    name: "All users",
    route: "/all-users",
    icon: UserRound,
  },
  {
    name: "Saved",
    route: "/saved",
    icon: BookMarked,
  },
  {
    name: "Create Post",
    route: "/create-post",
    icon: BadgePlus,
  },
];
