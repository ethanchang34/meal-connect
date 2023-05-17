import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Request() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl font-bold py-4 px-4">Request</h1>
      <div id="parent" className="py-4 px-4 flex flex-col items-center">
        <Link
          href="/request/guest-pass"
          className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md w-40"
        >
          Guest Pass
        </Link>
        <Link
          href="/request/meal-exchange"
          className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md w-40"
        >
          Meal Exchange
        </Link>
      </div>
    </main>
  );
}
