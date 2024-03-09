"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url); // 更新URL
  }, [debouncedValue, categoryId, router]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"></Search>
      <Input
        onChange={onChange}
        className="pl-10 bg-primary/10"
        placeholder="search ..."
      ></Input>
    </div>
  );
};

export default SearchInput;
