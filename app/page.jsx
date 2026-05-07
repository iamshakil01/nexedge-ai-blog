// SERVER PAGE — home page, composed of server components

import HeroSection     from "@/app/components/server/HeroSection/page.jsx";
import FeaturesSection from "@/app/components/server/FeaturesSection/page.jsx";
import CtaBanner       from "@/app/components/server/CtaBanner/page.jsx";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <HeroSection />

      {/* Shimmer divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="shimmer-line" />
      </div>

      {/* Features grid */}
      <FeaturesSection />

      {/* CTA banner */}
      <CtaBanner />
    </div>
  );
}
