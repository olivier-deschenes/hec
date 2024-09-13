import { LoaderCircle, EditIcon } from "lucide-react";

type DeleteButtonProps = {
  onClick: () => void;
  isPending: boolean;
};

export const UpdateButton = ({
  onClick,
  isPending,
  children,
}: React.PropsWithChildren<DeleteButtonProps>) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={
        "flex items-center gap-1 hover:bg-slate-100 transition-colors w-fit px-1.5 py-0.5 rounded-md"
      }
    >
      {isPending ? <LoaderCircle size={16} /> : <EditIcon size={16} />}
      {children}
    </button>
  );
};
