"use client";

import { BaseFormRef } from "@/components/forms/base/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImperativeHandle, useState } from "react";

type Props = {
  title: string;
  openButtonTitle: string;
  children: (setOpen: (open: boolean) => void) => React.ReactNode;
  dialogRef?: BaseFormRef;
};

export function BaseForm({ children, title, dialogRef }: Props) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    dialogRef,
    () => ({
      open: () => {
        console.log("open");
        setOpen(true);
      },
      close: () => {
        console.log("close");
        setOpen(false);
      },
    }),
    []
  );

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children(setOpen)}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
