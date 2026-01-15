import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products } from "@/lib/SeedProducts";

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find();

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, image, description } = body;

        if (!name || !price || !image || !description) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        try {
            new URL(image);
        } catch {
            return new Response(
                JSON.stringify({ message: "Invalid image URL" }),
                { status: 400 }
            );
        }

        await connectDB();

        // Normalize name to prevent duplicates
        const normalizedName = name.trim().toLowerCase();

        const existingProduct = await Product.findOne({
            name: normalizedName
        });

        if (existingProduct) {
            return NextResponse.json(
                { message: "Product already exists" },
                { status: 409 }
            );
        }

        const newProduct = await Product.create({
            name: normalizedName,
            price,
            image,
            description
        });

        return NextResponse.json(
            {
                acknowledged: true,
                insertedId: newProduct?._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);
        return NextResponse.json(
            { message: "Failed to create product" },
            { status: 500 }
        );
    }
}

// export async function DELETE() {
// try {
// await connectDB(); // Connect to MongoDB
// const result = await Product.deleteMany({}); // Delete all products
// return NextResponse.json({
// acknowledged: true,
// deletedCount: result.deletedCount,
// message: `${result.deletedCount} products deleted successfully`,
// });
// } catch (err) {
// console.error(err);
// return NextResponse.json(
// { message: "Failed to delete products", error: err.message },
// { status: 500 }
// );
// }
// }