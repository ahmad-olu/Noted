import { getDb } from "./utils/surreal";
import { jsonify, RecordId } from "surrealdb";

// ! Create Session

type CreateSession = {
  id?: RecordId;
  userId: string;
  token: string;
  // [x: string]: unknown;
};

export async function createSession(userId: string, token: string) {
  const db = await getDb();
  // Check if the database is initialized
  if (!db) {
    console.error("Database not initialized");
    return undefined;
  }
  // Create a new session
  try {
    const session = await db.create<CreateSession>("Session", {
      userId: userId,
      token: token,
    });
    // Log the created session
    console.log("Session created:", jsonify(session));
    return session;
  } catch (err: unknown) {
    console.error(
      "Failed to create user:",
      err instanceof Error ? err.message : String(err)
    );
  } finally {
    // Close the database connection
    await db.close();
  }
}

//! delete sessions

interface DeleteSession {
  id: string;
  [key: string]: unknown; // Index signature
  // Add other user properties here
}

export async function deleteSession() {
  const db = await getDb();
  if (!db) {
    console.error("Database not initialized");
    return;
  }
  try {
    const deletedUser = await db.delete<DeleteSession>("Session");
    console.log("Deleted session:", jsonify(deletedUser));
    return deletedUser;
  } catch (err) {
    console.error("Failed to delete session:", err);
  } finally {
    await db.close();
  }
}
