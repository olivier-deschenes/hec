export const FormRow = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={"flex gap-5 justify-between items-center"}>{children}</div>
  );
};
