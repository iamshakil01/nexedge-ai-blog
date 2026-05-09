import { getCurrentUser } from "@/lib/auth";

export async function POST(req) {
  try {
    // Admin only
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await req.formData();
    const file     = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided." }, { status: 400 });
    }

    // Convert file to base64
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary via REST API (no SDK needed)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey    = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Generate signature
    const timestamp = Math.round(Date.now() / 1000);
    const folder    = "nexedge-ai";

    // Sign using crypto
    const crypto = await import("crypto");
    const signStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha256")
      .update(signStr)
      .digest("hex");

    // Build form data for Cloudinary
    const uploadForm = new FormData();
    uploadForm.append("file",      base64);
    uploadForm.append("api_key",   apiKey);
    uploadForm.append("timestamp", timestamp.toString());
    uploadForm.append("signature", signature);
    uploadForm.append("folder",    folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    const data = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: data.error?.message || "Upload failed." },
        { status: 500 }
      );
    }

    return Response.json({
      url:       data.secure_url,
      publicId:  data.public_id,
      width:     data.width,
      height:    data.height,
    });

  } catch (err) {
    return Response.json({ error: "Upload failed." }, { status: 500 });
  }
}
