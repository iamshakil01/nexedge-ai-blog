import AuthForm from "@/app/components/client/AuthForm/page.jsx";

export const metadata = { title: "Login — NexEdge AI" };

export default function LoginPage({ searchParams }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <AuthForm mode="login" from={searchParams?.from || "/"} />
    </div>
  );
}
