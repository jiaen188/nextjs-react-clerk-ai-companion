import Categories from "@/components/categories";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { Category, Companion } from "@prisma/client";
import Companions from "@/components/companions";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  let data: (Companion & {
    _count: {
      messages: number;
    };
  })[] = [];

  try {
    data = await prismadb.companion.findMany({
      where: {
        categoryId: searchParams.categoryId,
        name: {
          contains: searchParams.name,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("companions error", error);
  }

  let categories: Category[] = [];
  try {
    categories = await prismadb.category.findMany();
  } catch (error) {
    console.log("categories error", error);
  }

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput></SearchInput>
      <Categories data={categories}></Categories>
      <Companions data={data}></Companions>
    </div>
  );
};

export default RootPage;
