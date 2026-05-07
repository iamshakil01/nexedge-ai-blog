import clientPromise from "@/lib/mongodb";

// GET /api/comments?slug=xxx
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug?.trim()) {
      return Response.json({ error: "slug query param is required." }, { status: 400 });
    }

    const client   = await clientPromise;
    const db       = client.db("blogDB");
    const comments = await db
      .collection("comments")
      .find({ slug })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(comments);
  } catch {
    return Response.json({ error: "Failed to fetch comments." }, { status: 500 });
  }
}

// POST /api/comments
export async function POST(req) {
  try {
    const body = await req.json();
    const { slug, name, rating, comment } = body;

    if (!slug?.trim() || !name?.trim() || !comment?.trim()) {
      return Response.json({ error: "slug, name, and comment are required." }, { status: 400 });
    }

    const parsedRating = Number(rating);
    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return Response.json({ error: "rating must be an integer between 1 and 5." }, { status: 400 });
    }

    const client = await clientPromise;
    const db     = client.db("blogDB");

    await db.collection("comments").insertOne({
      slug:      slug.trim(),
      name:      name.trim().slice(0, 80),
      rating:    parsedRating,
      comment:   comment.trim().slice(0, 1000),
      createdAt: new Date(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to submit comment." }, { status: 500 });
  }
}
