export interface IAdminCar {
    id: string;
    name: string;
    brand: string;
    image: string;
    pricePerDay: number;
    transmission: "manual" | "automatic";
    fuelType: "petrol" | "diesel" | "electric" | "hybrid";
    seats: number;
    location: string;
    status: "available" | "maintenance" | "inactive";
    rating: number;
}

export const ADMIN_MOCK_CARS: IAdminCar[] = [
    {
        id: "car-001",
        name: "Swift",
        brand: "Maruti",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        pricePerDay: 1500,
        transmission: "manual",
        fuelType: "petrol",
        seats: 5,
        location: "Mumbai",
        status: "available",
        rating: 4.5,
    },
    {
        id: "car-002",
        name: "Creta",
        brand: "Hyundai",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80",
        pricePerDay: 3000,
        transmission: "automatic",
        fuelType: "diesel",
        seats: 5,
        location: "Delhi",
        status: "available",
        rating: 4.8,
    },
    {
        id: "car-003",
        name: "Nexon",
        brand: "Tata",
        image: "https://images.unsplash.com/photo-1605896559795-3bc6775677ac?auto=format&fit=crop&q=80",
        pricePerDay: 2500,
        transmission: "automatic",
        fuelType: "electric",
        seats: 5,
        location: "Bangalore",
        status: "available",
        rating: 4.7,
    },
    {
        id: "car-004",
        name: "XUV700",
        brand: "Mahindra",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80",
        pricePerDay: 4500,
        transmission: "automatic",
        fuelType: "diesel",
        seats: 7,
        location: "Pune",
        status: "maintenance",
        rating: 4.9,
    },
    {
        id: "car-005",
        name: "Innova Crysta",
        brand: "Toyota",
        image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?auto=format&fit=crop&q=80",
        pricePerDay: 4000,
        transmission: "manual",
        fuelType: "diesel",
        seats: 7,
        location: "Mumbai",
        status: "available",
        rating: 4.8,
    },
    {
        id: "car-006",
        name: "Seltos",
        brand: "Kia",
        image: "https://images.unsplash.com/photo-1549557492-3511eb4bb014?auto=format&fit=crop&q=80",
        pricePerDay: 2800,
        transmission: "automatic",
        fuelType: "petrol",
        seats: 5,
        location: "Hyderabad",
        status: "available",
        rating: 4.6,
    },
    {
        id: "car-007",
        name: "Hector",
        brand: "MG",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        pricePerDay: 3200,
        transmission: "automatic",
        fuelType: "petrol",
        seats: 5,
        location: "Delhi",
        status: "inactive",
        rating: 4.5,
    },
    {
        id: "car-008",
        name: "City",
        brand: "Honda",
        image: "https://images.unsplash.com/photo-1550462000-8bfafe7d6438?auto=format&fit=crop&q=80",
        pricePerDay: 2200,
        transmission: "manual",
        fuelType: "petrol",
        seats: 5,
        location: "Chennai",
        status: "available",
        rating: 4.7,
    },
];
