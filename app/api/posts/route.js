import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db     = client.db("blogDB");
    const posts  = await db
      .collection("posts")
      .find()
      .sort({ publishedDate: -1, createdAt: -1 })
      .toArray();

    return Response.json(posts);
  } catch {
    return Response.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, thumbnail, content, category, tags, publishedDate } = body;

    // Required fields
    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return Response.json(
        { error: "title, slug, and content are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db     = client.db("blogDB");

    // Prevent duplicate slugs
    const existing = await db.collection("posts").findOne({ slug: slug.trim() });
    if (existing) {
      return Response.json(
        { error: "A post with this slug already exists." },
        { status: 409 }
      );
    }

    // Parse tags — accept comma-separated string or array
    const parsedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    await db.collection("posts").insertOne({
      title:         title.trim(),
      slug:          slug.trim(),
      thumbnail:     thumbnail?.trim() || "",
      content:       content.trim(),
      category:      category?.trim() || "General",
      tags:          parsedTags,
      publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
      createdAt:     new Date(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create post." }, { status: 500 });
  }
}
