import TutorForm from "../../src/views/TutorForm";

export const metadata = {
  title: "Register as a Home Tutor in Hyderabad - Free",
  description:
    "Join Apke Tuitions as a verified home tutor in Hyderabad. Get matched with students near you. Free registration, no commission.",
  openGraph: {
    title: "Become a Home Tutor in Hyderabad | Apke Tuitions",
    url: "https://apketuitions.com/tutor",
  },
  alternates: {
    canonical: "https://apketuitions.com/tutor",
  },
};

export default function Page() {
  return <TutorForm />;
}

