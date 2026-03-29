import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Clock App",
    description: "Clock App home redirect to online clock.",
    alternates: {
        canonical: "/clock",
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function HomePage() {
    redirect("/clock");
}
