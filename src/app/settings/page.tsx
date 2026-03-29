import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Settings Redirect",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SettingsPage() {
    redirect("/clock");
}
