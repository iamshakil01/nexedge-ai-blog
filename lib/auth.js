import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET;
const COOKIE = "nexedge_token";

// Sign a JWT and return it
export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// Verify a JWT string
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

// Get current user from cookie (server-side only)
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export const COOKIE_NAME = COOKIE;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge:   60 * 60 * 24 * 7, // 7 days
  path:     "/",
};
