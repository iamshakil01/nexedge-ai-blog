// SERVER PAGE — static shell, delegates interactivity to PublishForm (client)

import AdminHeader  from "@/app/components/server/AdminHeader/page";
import PublishForm  from "@/app/components/client/PublishForm/page";

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Static header — server rendered */}
      <AdminHeader />

      {/* Interactive form — client rendered */}
      <PublishForm />
    </div>
  );
}
