"use client";

import { Category } from "@prisma/client";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoriesProps {
  data: Category[];
}

export default function Categories({ data }: CategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={() => onClick("")}
        className={cn(
          `flex items-center text-center text-sx md:text-sm px-2 md:py-2 rounded-md bg-primary/10 hover:opacity-75 transition`,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          className={cn(
            `flex items-center text-center text-sx md:text-sm px-2 md:py-2 rounded-md bg-primary/10 hover:opacity-75 transition`,
            category.id === categoryId ? "bg-primary/25" : "bg-primary/10"
          )}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
