import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Form from "@/app/components/Form";
// import { useState } from "react";

export default async function GiveGuestPass() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  // const [isSubmitted, setIsSubmitted] = useState<Boolean>(false);

  return (
    <main>
      <h1 className="text-2xl font-bold">Give Guest Pass</h1>
      <Form give={true} />
    </main>
  );
}
