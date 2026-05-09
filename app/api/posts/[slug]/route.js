import { ObjectId }    from "mongodb";
import clientPromise   from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

// PUT /api/posts/[slug] — update a post (admin only)
export async function PUT(req, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { title, thumbnail, content, category, tags, publishedDate } = body;

    if (!title?.trim() || !content?.trim()) {
      return Response.json({ error: "title and content are required." }, { status: 400 });
    }

    const parsedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const client = await clientPromise;
    const db     = client.db("blogDB");

    const result = await db.collection("posts").updateOne(
      { slug },
      {
        $set: {
          title:         title.trim(),
          thumbnail:     thumbnail?.trim() || "",
          content:       content.trim(),
          category:      category?.trim() || "General",
          tags:          parsedTags,
          publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
          updatedAt:     new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Post not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to update post." }, { status: 500 });
  }
}

// DELETE /api/posts/[slug] — delete a post (admin only)
export async function DELETE(req, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    const client   = await clientPromise;
    const db       = client.db("blogDB");

    const result = await db.collection("posts").deleteOne({ slug });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Post not found." }, { status: 404 });
    }

    // Also delete all comments for this post
    await db.collection("comments").deleteMany({ slug });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
