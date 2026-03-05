/**
 * Database Seed Script
 * Creates location + car records matching the frontend mock vehicle slugs.
 * Run:  npx ts-node src/seed.ts
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { LocationModel } from "./modules/locations/location.model";
import { CarModel } from "./modules/cars/car.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MONGO_URI not set in .env");
    process.exit(1);
}

// ──────────────────────────────────────────────────────────────
// Seed Data
// ──────────────────────────────────────────────────────────────

const LOCATIONS = [
    { name: "Mumbai Central Hub", city: "Mumbai", address: "Bandra West, Mumbai", lat: 19.0596, lng: 72.8295 },
    { name: "Delhi Connaught Hub", city: "Delhi", address: "Connaught Place, New Delhi", lat: 28.6315, lng: 77.2167 },
    { name: "Bangalore Koramangala", city: "Bangalore", address: "Koramangala, Bangalore", lat: 12.9352, lng: 77.6245 },
    { name: "Hyderabad Banjara Hills", city: "Hyderabad", address: "Banjara Hills, Hyderabad", lat: 17.4126, lng: 78.4477 },
];

async function seed() {
    console.log("🌱 Connecting to MongoDB…");
    await mongoose.connect(MONGO_URI!);
    console.log("✅ Connected");

    // Wipe existing data
    await LocationModel.deleteMany({});
    await CarModel.deleteMany({});
    console.log("🗑️  Cleared existing locations and cars");

    // Create locations
    const [mumbai, delhi, bangalore, hyderabad] = await LocationModel.insertMany(LOCATIONS);
    console.log("📍 Created 4 locations");

    // Create cars — slugs match frontend mock vehicles exactly
    const CARS = [
        {
            name: "Swift",
            brand: "Maruti Suzuki",
            slug: "maruti-swift",
            description: "Peppy hatchback perfect for city commutes and weekend getaways.",
            images: ["https://images.unsplash.com/photo-1549317661-bd32c0e5a809?auto=format&fit=crop&q=80"],
            pricePerDay: 1200,
            transmission: "manual" as const,
            fuelType: "petrol" as const,
            seats: 5,
            locationId: mumbai._id,
            status: "available" as const,
        },
        {
            name: "Creta",
            brand: "Hyundai",
            slug: "hyundai-creta",
            description: "Feature-rich SUV with premium interiors and smooth ride.",
            images: ["https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80"],
            pricePerDay: 2500,
            transmission: "automatic" as const,
            fuelType: "diesel" as const,
            seats: 5,
            locationId: delhi._id,
            status: "available" as const,
        },
        {
            name: "Nexon",
            brand: "Tata",
            slug: "tata-nexon",
            description: "India's first 5-star safety rated SUV with bold styling.",
            images: ["https://images.unsplash.com/photo-1550355191-863a354174d5?auto=format&fit=crop&q=80"],
            pricePerDay: 2000,
            transmission: "manual" as const,
            fuelType: "petrol" as const,
            seats: 5,
            locationId: bangalore._id,
            status: "available" as const,
        },
        {
            name: "XUV700",
            brand: "Mahindra",
            slug: "mahindra-xuv700",
            description: "Powerful 7-seater with ADAS technology and panoramic sunroof.",
            images: ["https://images.unsplash.com/photo-1688636952763-712dce42ee4c?auto=format&fit=crop&q=80"],
            pricePerDay: 4000,
            transmission: "automatic" as const,
            fuelType: "diesel" as const,
            seats: 7,
            locationId: mumbai._id,
            status: "available" as const,
        },
        {
            name: "Innova Crysta",
            brand: "Toyota",
            slug: "toyota-innova-crysta",
            description: "The benchmark in premium MPV space — reliable and spacious.",
            images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80"],
            pricePerDay: 3500,
            transmission: "manual" as const,
            fuelType: "diesel" as const,
            seats: 7,
            locationId: hyderabad._id,
            status: "maintenance" as const,
        },
        {
            name: "Seltos",
            brand: "Kia",
            slug: "kia-seltos",
            description: "Segment-leading SUV with connected car features.",
            images: ["https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80"],
            pricePerDay: 2400,
            transmission: "automatic" as const,
            fuelType: "petrol" as const,
            seats: 5,
            locationId: delhi._id,
            status: "available" as const,
        },
        {
            name: "Hector",
            brand: "MG",
            slug: "mg-hector",
            description: "Internet car of India with large touchscreen and panoramic roof.",
            images: ["https://images.unsplash.com/photo-1606145326589-9c5c16503c1b?auto=format&fit=crop&q=80"],
            pricePerDay: 2800,
            transmission: "automatic" as const,
            fuelType: "diesel" as const,
            seats: 5,
            locationId: bangalore._id,
            status: "available" as const,
        },
        {
            name: "City",
            brand: "Honda",
            slug: "honda-city",
            description: "Iconic premium sedan with refined ride and spacious cabin.",
            images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80"],
            pricePerDay: 1800,
            transmission: "manual" as const,
            fuelType: "petrol" as const,
            seats: 5,
            locationId: mumbai._id,
            status: "available" as const,
        },
    ];

    // insertMany skips the pre-save hook — slugs are set exactly as we want
    await CarModel.collection.insertMany(CARS.map(car => ({
        ...car,
        // Timestamps are not auto-set via insertMany, add manually
        createdAt: new Date(),
        updatedAt: new Date(),
    })));

    console.log(`🚗 Created ${CARS.length} cars`);
    console.log("\n✅ Seed complete! Cars seeded:\n");
    CARS.forEach(c => console.log(`   ${c.brand} ${c.name} → slug: "${c.slug}"`));

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
