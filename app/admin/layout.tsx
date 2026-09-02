import AdminSidebar from "@/components/navigation/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminSidebar />
      <main className="min-w-0 pt-[72px] lg:pl-64">{children}</main>
    </>
  );
}
