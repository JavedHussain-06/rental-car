export interface IAdminUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    totalBookings: number;
    status: "active" | "disabled";
}

export const ADMIN_MOCK_USERS: IAdminUser[] = [
    {
        id: "USR-001",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 9006412619",
        avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
        totalBookings: 3,
        status: "active",
    },
    {
        id: "USR-002",
        name: "Priya Patel",
        email: "priya@example.com",
        phone: "+91 91234 56780",
        avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=8B5CF6&color=fff",
        totalBookings: 8,
        status: "active",
    },
    {
        id: "USR-003",
        name: "Amit Kumar",
        email: "amit@example.com",
        phone: "+91 99887 76655",
        avatar: "https://ui-avatars.com/api/?name=Amit+Kumar&background=EC4899&color=fff",
        totalBookings: 1,
        status: "disabled",
    },
    {
        id: "USR-004",
        name: "Sneha Reddy",
        email: "sneha@example.com",
        phone: "+91 9006412619",
        avatar: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=10B981&color=fff",
        totalBookings: 5,
        status: "active",
    },
    {
        id: "USR-005",
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "+91 90000 12345",
        avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=F59E0B&color=fff",
        totalBookings: 0,
        status: "active",
    },
    {
        id: "USR-006",
        name: "Neha Gupta",
        email: "neha@example.com",
        phone: "+91 88888 99999",
        avatar: "https://ui-avatars.com/api/?name=Neha+Gupta&background=6366F1&color=fff",
        totalBookings: 2,
        status: "active",
    },
];
