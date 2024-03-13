import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { Category, Companion } from "@prisma/client";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  // TODO check subscription

  let companion: Companion | null = null;
  let categories: Category[] = [];

  try {
    companion = await prismadb.companion.findUnique({
      where: {
        id: params.companionId,
      },
    });
  } catch (error) {}

  try {
    categories = await prismadb.category.findMany();
  } catch (error) {}

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    ></CompanionForm>
  );
};

export default CompanionIdPage;
