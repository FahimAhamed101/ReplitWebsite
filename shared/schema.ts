import { pgTable, text, serial, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  image: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  categoryId: text("category_id").notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("4.0").notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  discount: true,
  image: true,
  categoryId: true,
  rating: true,
  inStock: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cart Items Schema (for frontend use)
export const cartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number().min(1),
  name: z.string(),
  price: z.number(),
  image: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
