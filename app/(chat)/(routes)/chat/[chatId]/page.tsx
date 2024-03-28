import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  let companion;
  try {
    companion = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            userId,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("companion error", error);
  }

  // if (!companion) {
  //   return redirect("/");
  // }

  return <ChatClient companion={companion}></ChatClient>;
};

export default ChatIdPage;
