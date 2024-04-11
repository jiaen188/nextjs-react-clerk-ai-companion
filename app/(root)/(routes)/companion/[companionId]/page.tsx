import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { Category, Companion } from "@prisma/client";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  // TODO check subscription

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  let companion: Companion | null = null;
  let categories: Category[] = [];

  try {
    companion = await prismadb.companion.findUnique({
      where: {
        id: params.companionId,
        userId,
      },
    });
  } catch (error) {
    console.log("companion error", error);
  }

  try {
    categories = await prismadb.category.findMany();
  } catch (error) {
    console.log("category error", error);
  }

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    ></CompanionForm>
  );
};

export default CompanionIdPage;
