import AuthForm from "@/components/client/AuthForm/page.jsx";

export const metadata = { title: "Register — NexEdge AI" };

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <AuthForm mode="register" from="/" />
    </div>
  );
}
