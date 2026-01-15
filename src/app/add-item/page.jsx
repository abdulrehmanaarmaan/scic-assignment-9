"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddItem = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    });

    // ✅ Protect route using cookies
    useEffect(() => {
        const isLoggedIn =
            document.cookie.includes("auth=true") ||
            document.cookie.includes("next-auth.session-token");

        if (!isLoggedIn) {
            router.replace("/login");
        } else {
            setCheckingAuth(false);
        }
    }, [router]);

    useEffect(() => {
        const savedForm = localStorage.getItem("addItemForm");
        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
    }, []);

    if (checkingAuth) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-500">Checking authentication...</p>
            </div>
        );
    }

    const handleChange = (e) => {

        const updatedForm = { ...formData, [e.target.name]: e.target.value };
        setFormData(updatedForm);

        // Persist to localStorage
        localStorage.setItem("addItemForm", JSON.stringify(updatedForm));
    };

    // Check if the URL points to a loadable image
    const checkImage = (url) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Trim values before sending
            const payload = {
                name: formData.name.trim(),
                price: formData.price,
                image: formData.image.trim(),
                description: formData.description.trim(),
            };

            // ✅ Validate image URL before sending
            const isValidImage = await checkImage(payload.image);
            if (!isValidImage) {
                setError("Image URL is not valid or accessible");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {

                toast.error("Failed to add product")

                // API sends proper status + message
                throw new Error(data.message || "Failed to add product");
            }

            toast.success("Successfully added")

            // Optional: reset form
            setFormData({ name: "", price: "", image: "", description: "" });

            // ✅ Clear saved form from localStorage
            localStorage.removeItem("addItemForm");

            router.push("/items-list");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-xl mx-auto px-4 pt-6 pb-16 min-h-screen flex items-center justify-center bg-gray-50">

            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
                <h1 className="mb-6 text-3xl font-semibold text-gray-900">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />

                    <input
                        name="image"
                        type="url"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />

                    {formData.image && (
                        <img
                            src={formData?.image}
                            alt={formData?.name}
                            className="h-32 object-contain border rounded"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = '/placeholder.png'
                            }}
                        />
                    )}

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white disabled:opacity-60 cursor-pointer rounded-lg px-6 py-3 text-sm font-medium hover:bg-black/90 transition">
                        {loading ? "Adding..." : "Add Item"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddItem
