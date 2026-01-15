import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const getProduct = async (id) => {

    try {
        const res = await fetch(`https://scic-project-9.vercel.app/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Product not found");
        return await res.json();
    } catch (err) {
        console.error(err);
        return {};
    }
}

const ItemDetails = async ({ params }) => {

    const query = await params

    const product = await getProduct(query?.id);

    console.log(product)

    const { name, image, description, price } = product;

    console.log(image)

    return (
        <main className="px-4 pt-6 pb-16 max-w-5xl mx-auto">
            {/* Breadcrumb / Navigation */}
            <nav className="mb-6 text-gray-500 text-sm">
                <Link href="/" className="hover:underline">
                    Home
                </Link>{" "}
                /{" "}
                <Link href="/items-list" className="hover:underline">
                    Products List
                </Link>{" "}
                / <span className="font-semibold text-gray-700">{name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Image */}
                <div className="shrink-0">
                    <img
                        src={image}
                        alt={name}
                        className="rounded-lg shadow-md h-100 w-150 object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{name}</h1>
                        <p className="text-gray-700 mb-6">{description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">
                            ${price}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/items-list"
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition text-center"
                        >
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>

            {/* Optional Additional Info */}
            {/* <section className="mt-12"> */}
            {/* <h2 className="text-2xl font-semibold mb-4">Product Details</h2> */}
            {/* <ul className="list-disc list-inside text-gray-700 space-y-2"> */}
            {/* <li>High-quality materials and build</li> */}
            {/* <li>Durable and long-lasting</li> */}
            {/* <li>Compatible with most devices</li> */}
            {/* <li>Professional-grade performance</li> */}
            {/* </ul> */}
            {/* </section> */}
        </main>
    );
};

export default ItemDetails;