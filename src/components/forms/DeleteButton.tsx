import { LoaderCircle, CircleXIcon } from "lucide-react";

type DeleteButtonProps = {
  onClick: () => void;
  isPending: boolean;
}

export const DeleteButton = ({
  onClick,
  isPending,
  children
}: React.PropsWithChildren<DeleteButtonProps>) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={"flex items-center gap-1 hover:bg-red-100 transition-colors w-fit px-1.5 py-0.5 rounded-md"}
    >
      {isPending ? <LoaderCircle size={16} /> : <CircleXIcon size={16} />}
      {children}
    </button>
  )
}