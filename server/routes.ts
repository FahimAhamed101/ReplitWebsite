import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Express> {
  // API routes with /api prefix


  const httpServer = createServer(app);
  return httpServer;
}