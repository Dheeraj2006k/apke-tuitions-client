import ParentForm from "../../src/views/ParentForm";

export const metadata = {
  title: "Find a Home Tutor in Hyderabad - Submit a Request",
  description:
    "Tell us your subject and class. We match you with a verified, experienced tutor near you in Hyderabad. Free demo class, no commitment.",
  openGraph: {
    title: "Find a Home Tutor in Hyderabad | Apke Tuitions",
    url: "https://apketuitions.com/parent",
  },
  alternates: {
    canonical: "https://apketuitions.com/parent",
  },
};

export default function Page() {
  return <ParentForm />;
}

