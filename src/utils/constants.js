import { LibraryBig, LineChart, MessagesSquare, Shield } from "lucide-react";

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