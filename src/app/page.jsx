import Image from "next/image";
import Link from "next/link";

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

export default async function Home() {

  const products = await getProducts();

  const featuredProducts = products.sort((a, b) => b?.price - a?.price).slice(0, 3);

  return (
    <div className="flex flex-col gap-32 pb-16">
      {/* 1️⃣ Hero Section */}
      <section className="bg-linear-to-b from-blue-50 to-white py-28 text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          ProductHub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          A clean and modern product catalog application built with Next.js.
          Browse items, view detailed information, and manage products with ease.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/items-list">
            <button className="text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer">
              View Items
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* 2️⃣ Value Proposition */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Simple Catalog</h3>
            <p className="text-gray-600">
              Browse products in a structured and distraction-free interface.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Clear Details</h3>
            <p className="text-gray-600">
              Each item includes name, description, price, and visual preview.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Protected Actions</h3>
            <p className="text-gray-600">
              Authenticated users can access protected product management features.
            </p>
          </div>
        </div>
      </section>

      {/* 3️⃣ Featured Items Preview */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-14">
            Featured Items
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div
                key={product?._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={product?.image}
                  alt="Product preview"
                  className="w-full object-cover h-86"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">
                    Product {product?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product?.description}
                  </p>
                  <span className="font-medium text-primary">$ {product?.price * 15}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ About the Application */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">About This Project</h2>
        <p className="text-gray-600 leading-relaxed">
          This application demonstrates a modern Next.js App Router setup with
          public and protected routes, mock authentication, and API-driven product
          data. It is designed as a technical assessment and portfolio project.
        </p>
      </section>

      {/* 5️⃣ Technology Stack */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-10">Built With</h2>
          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Next.js</span>
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Tailwind CSS</span>
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Express.js API</span>
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Cookies Auth</span>
          </div>
        </div>
      </section>

      {/* 6️⃣ Call to Action */}
      <section className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Start Exploring the Catalog
        </h2>
        <p className="text-gray-600 mb-8">
          View the full list of products or log in to access protected features.
        </p>
        <Link href="/items-list">
          <button className="text-white px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer">
            Go to Items
          </button>
        </Link>
      </section>

      {/* 7️⃣ Support / Info */}
      <section className="text-center pb-24 px-6">
        <p className="text-gray-500">
          For evaluation purposes only · Built as a technical assignment
        </p>
      </section>
    </div>
  );
}
