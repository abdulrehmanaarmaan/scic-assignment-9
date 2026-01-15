// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const getProducts = async () => {

    try {
        const res = await fetch('https://scic-project-9.vercel.app/api/products', { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

const ItemsList = async () => {

    const products = await getProducts();

    return (
        <section className="max-w-7xl mx-auto px-6 pt-6 pb-16">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-semibold text-gray-900 mb-3">
                    Products List
                </h1>
                <p className="text-gray-600 max-w-2xl">
                    Browse the complete list of available products. Click on any product to
                    view detailed information.
                </p>
            </div>

            {/* Add Item Button */}
            <Link
                href="/add-item"
                className="inline-flex items-center gap-2 text-sm font-medium hover:bg-primary/90 shrink-0 text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer mb-10"
            >
                + Add Item
            </Link>

            {/* Items Grid */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <div
                        key={product?._id}
                        className="bg-white rounded-xl border border-gray-200
                       hover:shadow-md transition overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-56 w-full bg-gray-100">
                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="object-cover h-full w-full"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {product?.name}
                            </h2>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product?.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-primary font-medium text-lg">
                                    ${product?.price}
                                </span>

                                <Link
                                    href={`/item-details/${product?._id}`}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    No items available at the moment.
                </div>
            )}
        </section>
    );
};

export default ItemsList;