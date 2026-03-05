export interface IVehicle {
    id: string;
    name: string;
    brand: string;
    slug: string;
    image: string;
    pricePerDay: number;
    transmission: "manual" | "automatic";
    fuelType: "petrol" | "diesel" | "electric" | "hybrid";
    seats: number;
    location: string;
    rating: number;
    status: "available" | "maintenance";
}

export const MOCK_VEHICLES: IVehicle[] = [
    {
        id: "v_1",
        name: "Swift",
        brand: "Maruti Suzuki",
        slug: "maruti-swift",
        image: "https://images.unsplash.com/photo-1549317661-bd32c0e5a809?auto=format&fit=crop&q=80",
        pricePerDay: 1200,
        transmission: "manual",
        fuelType: "petrol",
        seats: 5,
        location: "Mumbai",
        rating: 4.5,
        status: "available",
    },
    {
        id: "v_2",
        name: "Creta",
        brand: "Hyundai",
        slug: "hyundai-creta",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80",
        pricePerDay: 2500,
        transmission: "automatic",
        fuelType: "diesel",
        seats: 5,
        location: "Delhi",
        rating: 4.8,
        status: "available",
    },
    {
        id: "v_3",
        name: "Nexon",
        brand: "Tata",
        slug: "tata-nexon",
        image: "https://images.unsplash.com/photo-1550355191-863a354174d5?auto=format&fit=crop&q=80",
        pricePerDay: 2000,
        transmission: "manual",
        fuelType: "petrol",
        seats: 5,
        location: "Bangalore",
        rating: 4.7,
        status: "available",
    },
    {
        id: "v_4",
        name: "XUV700",
        brand: "Mahindra",
        slug: "mahindra-xuv700",
        image: "https://images.unsplash.com/photo-1688636952763-712dce42ee4c?auto=format&fit=crop&q=80",
        pricePerDay: 4000,
        transmission: "automatic",
        fuelType: "diesel",
        seats: 7,
        location: "Mumbai",
        rating: 4.9,
        status: "available",
    },
    {
        id: "v_5",
        name: "Innova Crysta",
        brand: "Toyota",
        slug: "toyota-innova-crysta",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        pricePerDay: 3500,
        transmission: "manual",
        fuelType: "diesel",
        seats: 7,
        location: "Hyderabad",
        rating: 4.6,
        status: "maintenance",
    },
    {
        id: "v_6",
        name: "Seltos",
        brand: "Kia",
        slug: "kia-seltos",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
        pricePerDay: 2400,
        transmission: "automatic",
        fuelType: "petrol",
        seats: 5,
        location: "Delhi",
        rating: 4.4,
        status: "available",
    },
    {
        id: "v_7",
        name: "Hector",
        brand: "MG",
        slug: "mg-hector",
        image: "https://images.unsplash.com/photo-1606145326589-9c5c16503c1b?auto=format&fit=crop&q=80",
        pricePerDay: 2800,
        transmission: "automatic",
        fuelType: "diesel",
        seats: 5,
        location: "Bangalore",
        rating: 4.5,
        status: "available",
    },
    {
        id: "v_8",
        name: "City",
        brand: "Honda",
        slug: "honda-city",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80",
        pricePerDay: 1800,
        transmission: "manual",
        fuelType: "petrol",
        seats: 5,
        location: "Mumbai",
        rating: 4.3,
        status: "available",
    }
];
