import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithRef<"form">;

export const FormContent = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <form className={cn("flex flex-col gap-6 pt-3", className)} {...props}>
      {children}
    </form>
  );
};
