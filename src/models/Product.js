import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;       // Remove __v from JSON output
                return ret;
            }
        }
    }
);

// Export the model (avoid redefining it in dev/hot reload)
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

