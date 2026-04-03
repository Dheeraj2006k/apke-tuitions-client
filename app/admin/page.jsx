import AdminLogin from "../../src/views/admin/AdminLogin";

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AdminLogin />;
}

