import { createFileRoute } from "@tanstack/react-router";
import { Program } from "../components/Program";
import { OperationsManagementAndLogistics } from "../data/data";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Component() {
  const { user } = useUser();

  return (
    <div className={"flex flex-col gap-5"}>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      {JSON.stringify(user?.id, null, 2)}
      <Program program={OperationsManagementAndLogistics} />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Component,
});
