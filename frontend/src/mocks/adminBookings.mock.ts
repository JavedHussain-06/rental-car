export interface IAdminBooking {
    id: string;
    userName: string;
    userEmail: string;
    vehicle: string;
    pickupDate: string;
    returnDate: string;
    amount: number;
    status: "confirmed" | "pending" | "completed" | "cancelled";
}

export const ADMIN_MOCK_BOOKINGS: IAdminBooking[] = [
    {
        id: "BKG-1001",
        userName: "Rahul Sharma",
        userEmail: "rahul@example.com",
        vehicle: "Maruti Swift",
        pickupDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 1).toISOString(),
        amount: 4500,
        status: "confirmed",
    },
    {
        id: "BKG-1002",
        userName: "Priya Patel",
        userEmail: "priya@example.com",
        vehicle: "Hyundai Creta",
        pickupDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        returnDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        amount: 9000,
        status: "completed",
    },
    {
        id: "BKG-1003",
        userName: "Amit Kumar",
        userEmail: "amit@example.com",
        vehicle: "Mahindra XUV700",
        pickupDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 6).toISOString(),
        amount: 13500,
        status: "pending",
    },
    {
        id: "BKG-1004",
        userName: "Sneha Reddy",
        userEmail: "sneha@example.com",
        vehicle: "Toyota Innova",
        pickupDate: new Date(Date.now() + 86400000 * 1).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        amount: 4000,
        status: "cancelled",
    },
    {
        id: "BKG-1005",
        userName: "Vikram Singh",
        userEmail: "vikram@example.com",
        vehicle: "Kia Seltos",
        pickupDate: new Date(Date.now() - 86400000 * 0).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 4).toISOString(),
        amount: 11200,
        status: "confirmed",
    },
    {
        id: "BKG-1006",
        userName: "Neha Gupta",
        userEmail: "neha@example.com",
        vehicle: "Tata Nexon",
        pickupDate: new Date(Date.now() - 86400000 * 10).toISOString(),
        returnDate: new Date(Date.now() - 86400000 * 8).toISOString(),
        amount: 5000,
        status: "completed",
    },
    {
        id: "BKG-1007",
        userName: "Arjun Desai",
        userEmail: "arjun@example.com",
        vehicle: "MG Hector",
        pickupDate: new Date(Date.now() + 86400000 * 10).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 15).toISOString(),
        amount: 16000,
        status: "pending",
    },
    {
        id: "BKG-1008",
        userName: "Pooja Joshi",
        userEmail: "pooja@example.com",
        vehicle: "Honda City",
        pickupDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        amount: 6600,
        status: "confirmed",
    },
];
