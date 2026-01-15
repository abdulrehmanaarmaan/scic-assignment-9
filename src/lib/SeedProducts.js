import { connectDB } from "./mongodb.js";
import Product from "../models/Product.js";

export const products = [
    {
        name: "Wireless Bluetooth Headphones",
        description:
            "High-quality over-ear headphones with noise cancellation, 20-hour battery life, and premium sound.",
        price: 99.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768337870/01_34af94b9-40d7-4956-805e-0cb7df907ef7_gr2fij.jpg",
    },
    {
        name: "Smart Fitness Watch",
        description:
            "Track your activity, heart rate, sleep, and notifications with this sleek and lightweight smartwatch.",
        price: 149.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768338000/H3d3431ab984c48c2b9cb794614820b7bs_syy4hs.webp",
    },
    {
        name: "Portable External SSD 1TB",
        description:
            "Ultra-fast USB-C portable solid state drive with 1TB storage, shockproof design, and compact form factor.",
        price: 129.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768338341/03_candap.jpg",
    },
    {
        name: "Ergonomic Office Chair",
        description:
            "Comfortable office chair with lumbar support, adjustable height, and breathable mesh for long working hours.",
        price: 199.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768325778/Crandall-Remanufactured-Steelcase-Gesture-0001_hdyr2q.jpg",
    },
    {
        name: "Wireless Charging Pad",
        description:
            "Fast wireless charger compatible with Qi-enabled devices. Slim design and non-slip surface for easy charging.",
        price: 29.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768338538/61mBfpz7vKL_vrowvh.jpg",
    },
    {

        name: "Compact Drone with Camera",
        description:
            "Foldable drone with 4K camera, 30 min flight time, GPS positioning, and easy smartphone control.",
        price: 349.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768325589/S9HW-Min-Drone-white_cefroa.jpg",
    },
    {
        name: "Mechanical Gaming Keyboard",
        description:
            "RGB backlit mechanical keyboard with tactile switches, programmable keys, and ergonomic design.",
        price: 89.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768321662/Mercury-K1-Lite-Gaming-Keyboard-Transparent-Black-75-Mechanical_aqc7ul.jpg"
    },
    {
        name: "Noise Cancelling Earbuds",
        description:
            "True wireless earbuds with active noise cancellation, 24-hour battery, and crystal-clear audio quality.",
        price: 79.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768321936/noise-cancelling-headphone-2048px-0872_o9ura1.jpg",
    },
    {
        name: "Smart Home Security Camera",
        description:
            "Indoor/outdoor security camera with 1080p HD video, motion detection, two-way audio, and cloud storage.",
        price: 129.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768322058/NxZBSyM8dZcLMWgDEr0HUAOVSGrs-znXWq_-6_V5QZbpakIxCP_iea4npVO88cYzofEICmhtfcSe5q3wErYyNYVj-2gBWrdsK90vvesn_rw-e365-w842-v1_epfz7m.webp",
    },
    {
        name: "Adjustable Laptop Stand",
        description: "Aluminum laptop stand with adjustable height and angle, designed to improve posture and cooling.",
        price: 39.99,
        image: "https://res.cloudinary.com/dincextlz/image/upload/v1768323082/UNITEK_OT180SL_Adjustable_Laptop_Stand_with_360__Rotating_Base_product_side_v1_ojhzqh.jpg",
    }
];

export async function seedProducts() {
    await connectDB();

    for (const p of products) {
        const exists = await Product.findOne({ name: p.name.trim().toLowerCase() });
        if (!exists) {
            await Product.create(p);
        }
    }

    console.log("Initial products seeded successfully!");
}
