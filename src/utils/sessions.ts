import { v4 as uuidv4 } from "uuid";

export function generateLongTokenWithUUID() {
  let a = `${uuidv4()}-${uuidv4()}`; // Concatenate two UUIDs for a longer token
  return a.split("-").join("_");
}
