import { DeleteButton } from "@/components/forms/buttons/DeleteButton";
import { Button } from "@/components/ui/button";

type Props = {
  isEdit: boolean;
  isPending: boolean;
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export const FormFooter = ({
  isEdit,
  isPending,
  onDeleteClick,
  onCancelClick,
}: Props) => {
  return (
    <div className={"flex justify-between gap-6"}>
      {isEdit ? (
        <DeleteButton isPending={isPending} onClick={onDeleteClick}>
          Delete Block
        </DeleteButton>
      ) : null}
      <div className={"flex gap-2 ml-auto"}>
        <Button variant={"outline"} onClick={onCancelClick} type={"button"}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};
