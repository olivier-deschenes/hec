import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type DeleteButtonProps = {
  onClick: () => void;
  isPending: boolean;
};

export const DeleteButton = ({
  onClick,
  isPending,
  children,
}: React.PropsWithChildren<DeleteButtonProps>) => {
  return (
    <Button onClick={onClick} disabled={isPending} variant={"destructive"}>
      {isPending ? <LoaderCircle size={16} /> : children}
    </Button>
  );
};
