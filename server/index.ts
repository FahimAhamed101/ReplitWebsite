import express, { type Request, Response, NextFunction } from "express";

import cors from "cors";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "https://replit-website-g6d6.vercel.app",
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Root route
app.get("/", (req, res) => {
  res.send("Lebaba E-commerce Server is running....");
});

const defaultProducts: any[] = [
  {
    name: "Wireless Earbuds",
    price: 79.99,
    discount: 99.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "electronics",
    description: "High-quality wireless earbuds with noise cancellation and long battery life.",
    inStock: true,
  },
  {
    name: "Smart Watch Series 7",
    price: 349.99,
    discount: 399.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "electronics",
    description: "The latest smartwatch with health monitoring, GPS, and customizable bands.",
    inStock: true,
  },
  {
    name: "Cotton T-Shirt",
    price: 29.99,
    discount: 39.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "clothing",
    description: "Comfortable cotton t-shirt available in multiple colors and sizes.",
    inStock: true,
  },
  {
    name: "Coffee Maker",
    price: 89.99,
    discount: 119.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1570287357410-8e5389aef389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "home",
    description: "Programmable coffee maker that brews the perfect cup every time.",
    inStock: true,
  },
  {
    name: "Running Shoes",
    price: 119.99,
    discount: 149.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "clothing",
    description: "Lightweight and durable running shoes with superior cushioning.",
    inStock: true,
  },
  {
    name: "Skincare Set",
    price: 59.99,
    discount: 79.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1556228578-397bc69f7f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "beauty",
    description: "Complete skincare set with cleanser, moisturizer, and serum.",
    inStock: true,
  },
  {
    name: "Digital Camera",
    price: 499.99,
    discount: 599.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "electronics",
    description: "Professional digital camera with 4K video recording and image stabilization.",
    inStock: true,
  },
  {
    name: "Kitchen Mixer",
    price: 249.99,
    discount: 299.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    categoryId: "home",
    description: "Powerful kitchen mixer with multiple attachments for all your baking needs.",
    inStock: true,
  },
];
const defaultCategories: any [] = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
  { name: "Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
  { name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
];

// Get all products
app.get("/api/products", async (_req, res) => {
  try {
    res.json(defaultProducts); // Send the default products directly
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await  res.json(defaultProducts); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});




// Get all categories
app.get("/api/categories", async (_req, res) => {
  try {
    const categories = await res.json(defaultCategories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});



// Register routes and start the server
async function main() {
  // Register routes


  // Start the server
  const port = 5000;
  app.listen(port, () => {
    console.log(`Serving on port ${port}`); // Properly log the server start message
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});