import bcrypt          from "bcryptjs";
import clientPromise   from "@/lib/mongodb";
import { signToken, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";
import { cookies }     from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email?.trim() || !password?.trim()) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db     = client.db("blogDB");

    const user = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signToken({
      id:    user._id.toString(),
      name:  user.name,
      email: user.email,
      role:  user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return Response.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });

  } catch {
    return Response.json({ error: "Login failed." }, { status: 500 });
  }
}
