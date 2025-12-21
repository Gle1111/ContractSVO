import { db } from "./db";
import { requests, type InsertRequest, type Request } from "@shared/schema";

export interface IStorage {
  createRequest(request: InsertRequest): Request;
}

export class DatabaseStorage implements IStorage {
  createRequest(insertRequest: InsertRequest): Request {
    const result = db
      .insert(requests)
      .values(insertRequest)
      .returning()
      .all();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
