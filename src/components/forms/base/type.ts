export type BaseFormRef = React.RefObject<BaseFormRefType>;

export type BaseFormRefType = {
  open: () => void;
  close: () => void;
};
