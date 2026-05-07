// HOME PAGE — fetches latest posts, composes all sections

import HeroSection    from "@/app/components/server/HeroSection/page.jsx";
import FeaturedPost   from "@/app/components/server/FeaturedPost/page.jsx";
import RecentPosts    from "@/app/components/server/RecentPosts/page.jsx";
import TopicsSection  from "@/app/components/server/TopicsSection/page.jsx";
import CtaBanner      from "@/app/components/server/CtaBanner/page.jsx";

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

export default async function HomePage() {
  const posts = await getPosts();

  // Featured = latest post, Recent = next 6
  const featured = posts[0] ?? null;
  const recent   = posts.slice(1, 7);

  return (
    <div className="relative overflow-hidden">

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Featured post — latest article, large card */}
      <FeaturedPost post={featured} />

      {/* 3. Recent posts grid */}
      <RecentPosts posts={recent} />

      {/* 4. Topics / categories */}
      <TopicsSection />

      {/* 5. CTA — join community */}
      <CtaBanner />

    </div>
  );
}
