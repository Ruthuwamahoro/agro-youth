import {
  BookOpen,
  ShoppingBag,
  Award,
  User,
  Home,
  LucideIcon,
  Group,
  Users
} from "lucide-react";
import { JSX } from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const createIcon = (LucideIcon: LucideIcon) => {
  const IconComponent = (props: IconProps) => <LucideIcon {...props} />;
  IconComponent.displayName = `Icon(${LucideIcon.displayName || LucideIcon.name || 'Unknown'})`;
  return IconComponent;
};

interface SubNavItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: (props: IconProps) => JSX.Element;
  items?: SubNavItem[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface MenuItems {
  user: User;
  navMain: NavItem[];
}

export const adminMenuItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: createIcon(Home)
  },
  {
    title: "Courses",
    href: "/dashboard/courses/create",
    icon: createIcon(BookOpen),
    items: [
      {
        title: "My Courses",
        href: "/dashboard/courses/admin"
      }
    ]
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: createIcon(ShoppingBag)
  },
  {
    title: "Live Sessions",
    href: "/dashboard/livesessions",
    icon: createIcon(Group)
  },
  {
    title: "All Users",
    href: "/dashboard/users",
    icon: createIcon(Users),
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: createIcon(User)
  }
];

export const investorMenuItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: createIcon(Home)
  },
  {
    title: "Live Sessions",
    href: "/dashboard/livesessions",
    icon: createIcon(Group)
  },
  {
    title: "Project",
    href: "/dashboard/projects",
    icon: createIcon(BookOpen),
  },
  {
    title: "Application Review",
    href: "/dashboard/investor/review-applications",
    icon: createIcon(Award)
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: createIcon(User)
  }
];

export const farmerMenuItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: createIcon(Home)
  },
  {
    title: "Courses",
    href: "/dashboard/courses",
    icon: createIcon(BookOpen),
    items: [
      {
        title: "All Courses",
        href: "/dashboard/courses"
      },
      {
        title: "Enrolled Courses",
        href: "/dashboard/courses/enrolled"
      }
    ]
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: createIcon(ShoppingBag)
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: createIcon(Award)
  },
  {
    title: "Live Sessions",
    href: "/dashboard/livesessions",
    icon: createIcon(Group)
  },
  {
    title: "Donation",
    href: "/dashboard/allapplications",
    icon: createIcon(BookOpen),
    items: [
      {
        title: "All Applications",
        href: "/dashboard/allapplications"
      }
    ]
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: createIcon(User)
  }
];

export const getMenuItems = (role?: string, userType?: string): NavItem[] => {
  
  if (role && (role.toLowerCase() === "admin" || role === "ADMIN")) {
    return adminMenuItems;
  }
  
  if (userType && userType.toLowerCase() === "investor") {
    return investorMenuItems;
  }
  
  if (userType && userType.toLowerCase() === "farmer") {
    return farmerMenuItems;
  }
  
  return farmerMenuItems;
};

export const createMenuItems = (user: {
  name: string;
  email: string;
  avatar: string;
  role?: string;
  userType?: string;
}): MenuItems => {
  return {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    navMain: getMenuItems(user.role, user.userType),
  };
};