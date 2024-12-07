import { getDb } from "./utils/surreal";
import { jsonify, RecordId } from "surrealdb";

// ! Create User

interface CreateUser {
  username: string;
  email: string;
  password: string;
  [key: string]: unknown; // Index signature
}

async function createUser(): Promise<void> {
  const db = await getDb();
  // Check if the database is initialized
  if (!db) {
    console.error("Database not initialized");
    return;
  }
  // Create a new user
  try {
    const user = await db.create<CreateUser>("User", {
      // User details
      username: "newUser",
      email: "user@example.com",
      password: "securePassword", // Note: Store hashed passwords, not plain text
    });
    // Log the created user
    console.log("User created:", jsonify(user));
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

//createUser();

// ! Select User

interface SelectUser {
  id: string;
  [key: string]: unknown; // Index signature
  // Add other user properties here
}

export async function getAllUsers(): Promise<SelectUser[] | undefined> {
  const db = await getDb();
  if (!db) {
    console.error("Database not initialized");
    return undefined;
  }
  try {
    const users = await db.select<SelectUser>("User");
    console.log("All users:", jsonify(users));
    return users;
  } catch (err) {
    console.error("Failed to get users:", err);
    return undefined;
  } finally {
    await db.close();
  }
}

// ! Update user

interface UpdateUser {
  id?: RecordId;
  username: string;
  password?: string;
  email: string;
  [key: string]: unknown; // Index signature
}

export async function updateUser() {
  const db = await getDb();
  if (!db) {
    console.error("Database not initialized");
    return;
  }
  try {
    // Assuming the record id is nsg3k2he7mhxa8hk5qdu
    const updatedUser = await db.update<UpdateUser>(
      new RecordId("User", "nsg3k2he7mhxa8hk5qdu"),
      {
        username: "John Doe",
        email: "john@example.com",
      }
    );
    console.log("Updated user:", jsonify(updatedUser));
    return updatedUser;
  } catch (err) {
    console.error("Failed to update user:", err);
  } finally {
    await db.close();
  }
}

// ! delete user

export async function deleteUser() {
  const db = await getDb();
  if (!db) {
    console.error("Database not initialized");
    return;
  }
  try {
    const deletedUser = await db.delete<SelectUser>("User");
    console.log("Deleted user:", jsonify(deletedUser));
    return deletedUser;
  } catch (err) {
    console.error("Failed to delete user:", err);
  } finally {
    await db.close();
  }
}
