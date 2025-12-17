import { Github, Home, LayoutDashboard, LibraryBig, LineChart, LogOut, MessagesSquare, Shield } from "lucide-react";

export const sideBarMenu = [
    {
        name: "My Forms",
        icon: LibraryBig,
        path: "/dashboard/forms"
    },
    {
        name: "Responses",
        icon: MessagesSquare,
        path: "/dashboard/responses"
    },
    {
        name: "Analytics",
        icon: LineChart,
        path: "/dashboard/analytics"
    },
    {
        name: "Upgrade",
        icon: Shield,
        path: "/dashboard/upgrade"
    },
]

export const navMenuHome = [
    {
        name: "Dashboard",
        to: "/dashboard/forms",
        icon: LayoutDashboard,
    },
    {
        name: "GitHub",
        to: "https://github.com/SubhamSaha9",
        icon: Github,
    },
    {
        name: "Logout",
        to: "/logout",
        icon: LogOut,
    }
]
export const navMenuDash = [
    {
        name: "Home",
        to: "/",
        icon: Home,
    },
    {
        name: "GitHub",
        to: "https://github.com/SubhamSaha9",
        icon: Github,
    },
    {
        name: "Logout",
        to: "/logout",
        icon: LogOut,
    }
]