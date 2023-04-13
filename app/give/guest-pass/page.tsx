import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Form from "@/app/components/Form";

export default async function GiveGuestPass() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Give Guest Pass</h1>
      <Form />

      {/* <div className="flex flex-col my-4"></div> */}
      {/* <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-700" : "text-gray-700"
            }`}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Create a post
          </button>
        </div> */}
    </main>
  );
}
