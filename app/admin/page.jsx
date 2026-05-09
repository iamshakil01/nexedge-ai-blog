import AdminHeader   from "@/app/components/server/AdminHeader/page";
import PublishForm   from "@/app/components/client/PublishForm/page";
import AdminPostList from "@/app/components/server/AdminPostList/page.jsx";

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <AdminHeader />
      <PublishForm />
      <AdminPostList posts={posts} />
    </div>
  );
}
