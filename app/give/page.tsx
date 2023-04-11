import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl font-bold">Give</h1>
      <Link
        href="/give/guest-pass"
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        Guest pass
      </Link>
    </main>
  );
}
