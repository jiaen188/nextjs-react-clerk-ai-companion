import Categories from "@/components/categories";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";
import { Category } from "@prisma/client";

const RootPage = async () => {
  let categories: Category[] = [];
  try {
    categories = await prismadb.category.findMany();
  } catch (error) {
    console.log("categories error", error);
  }

  return (
    <div className="h-full p-4 space-y-2">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <SearchInput></SearchInput>
      <Categories data={categories}></Categories>
    </div>
  );
};

export default RootPage;
