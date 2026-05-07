import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db     = client.db("blogDB");
    const posts  = await db
      .collection("posts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(posts);
  } catch {
    return Response.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, content } = body;

    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return Response.json({ error: "title, slug, and content are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db     = client.db("blogDB");

    // Prevent duplicate slugs
    const existing = await db.collection("posts").findOne({ slug: slug.trim() });
    if (existing) {
      return Response.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    await db.collection("posts").insertOne({
      title:     title.trim(),
      slug:      slug.trim(),
      content:   content.trim(),
      createdAt: new Date(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create post." }, { status: 500 });
  }
}
