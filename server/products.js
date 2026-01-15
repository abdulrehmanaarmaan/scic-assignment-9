import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

let products = []; // temporary storage (OK for job task)

router.get("/", (req, res) => {
    res.json(products);
});

router.post("/", upload.single("image"), (req, res) => {
    const { name, price, description } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        image: `/uploads/${req.file.filename}`,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

export default router;
