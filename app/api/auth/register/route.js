import bcrypt          from "bcryptjs";
import clientPromise   from "@/lib/mongodb";
import { signToken, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";
import { cookies }     from "next/headers";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const client = await clientPromise;
    const db     = client.db("blogDB");

    const existing = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json({ error: "Email already registered." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const isAdmin = email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

    const result = await db.collection("users").insertOne({
      name:      name.trim(),
      email:     email.toLowerCase(),
      password:  hashed,
      role:      isAdmin ? "admin" : "user",
      createdAt: new Date(),
    });

    const token = signToken({
      id:    result.insertedId.toString(),
      name:  name.trim(),
      email: email.toLowerCase(),
      role:  isAdmin ? "admin" : "user",
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return Response.json({
      success: true,
      user: { name: name.trim(), email: email.toLowerCase(), role: isAdmin ? "admin" : "user" },
    }, { status: 201 });

  } catch {
    return Response.json({ error: "Registration failed." }, { status: 500 });
  }
}
