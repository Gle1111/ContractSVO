import { db } from "./db";
import { requests, type InsertRequest, type Request } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createRequest(request: InsertRequest): Promise<Request>;
}

export class DatabaseStorage implements IStorage {
  async createRequest(insertRequest: InsertRequest): Promise<Request> {
    const result = db
      .insert(requests)
      .values(insertRequest)
      .returning()
      .all();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
