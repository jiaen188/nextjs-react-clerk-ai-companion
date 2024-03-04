import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
  return (
    <div>
      root page (protected) <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default RootPage;
