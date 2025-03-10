import { 
  users, 
  type User, 
  type InsertUser,
  products,
  type Product,
  type InsertProduct,
  categories,
  type Category,
  type InsertCategory
} from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

// Implement in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<string, Category>;
  private userCurrentId: number;
  private productCurrentId: number;
  private categoryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.categoryCurrentId = 1;

    // Initialize with some categories
    const defaultCategories: InsertCategory[] = [
      { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
      { name: "Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
      { name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
      { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80" },
    ];

    defaultCategories.forEach(category => {
      this.createCategory(category);
    });

    // Initialize with some products
    const defaultProducts: InsertProduct[] = [
      { 
        name: "Wireless Earbuds", 
        price: 79.99, 
        discount: 99.99, 
        rating: 4.5, 
        image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "electronics", 
        description: "High-quality wireless earbuds with noise cancellation and long battery life.",
        inStock: true
      },
      { 
        name: "Smart Watch Series 7", 
        price: 349.99, 
        discount: 399.99, 
        rating: 4.8, 
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "electronics", 
        description: "The latest smartwatch with health monitoring, GPS, and customizable bands.",
        inStock: true
      },
      { 
        name: "Cotton T-Shirt", 
        price: 29.99, 
        discount: 39.99, 
        rating: 4.2, 
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "clothing", 
        description: "Comfortable cotton t-shirt available in multiple colors and sizes.",
        inStock: true
      },
      { 
        name: "Coffee Maker", 
        price: 89.99, 
        discount: 119.99, 
        rating: 4.7, 
        image: "https://images.unsplash.com/photo-1570287357410-8e5389aef389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "home", 
        description: "Programmable coffee maker that brews the perfect cup every time.",
        inStock: true
      },
      { 
        name: "Running Shoes", 
        price: 119.99, 
        discount: 149.99, 
        rating: 4.6, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "clothing", 
        description: "Lightweight and durable running shoes with superior cushioning.",
        inStock: true
      },
      { 
        name: "Skincare Set", 
        price: 59.99, 
        discount: 79.99, 
        rating: 4.3, 
        image: "https://images.unsplash.com/photo-1556228578-397bc69f7f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "beauty", 
        description: "Complete skincare set with cleanser, moisturizer, and serum.",
        inStock: true
      },
      { 
        name: "Digital Camera", 
        price: 499.99, 
        discount: 599.99, 
        rating: 4.4, 
        image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "electronics", 
        description: "Professional digital camera with 4K video recording and image stabilization.",
        inStock: true
      },
      { 
        name: "Kitchen Mixer", 
        price: 249.99, 
        discount: 299.99, 
        rating: 4.9, 
        image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
        categoryId: "home", 
        description: "Powerful kitchen mixer with multiple attachments for all your baking needs.",
        inStock: true
      }
    ];

    defaultProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery),
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId.toString();
    this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
