"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Form from "@/app/components/Form";
import { useState } from "react";

export default async function GiveGuestPass() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const submit = () => {
    setIsSubmitted(true);
    console.log("isSubmitted", isSubmitted);
  };

  return (
    <main>
      <h1 className="text-2xl font-bold">Give Guest Pass</h1>
      {true ? <Form give={true} /> : <p>Component for 'waiting...'</p>}
      {/* {true ? <Form give={true} submit={submit} isSubmitted={isSubmitted} /> : <p>Component for 'waiting...'</p>} */}
    </main>
  );
}
