import AdminDashboard from "../../../src/views/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AdminDashboard />;
}

