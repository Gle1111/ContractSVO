import { db } from "./db";
import { requests, type InsertRequest, type Request } from "@shared/schema";

export interface IStorage {
  createRequest(request: InsertRequest): Promise<Request>;
}

export class DatabaseStorage implements IStorage {
  async createRequest(insertRequest: InsertRequest): Promise<Request> {
    const [request] = await db
      .insert(requests)
      .values(insertRequest)
      .returning();
    return request;
  }
}

export const storage = new DatabaseStorage();
