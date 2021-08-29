import { IFormItemProps } from "@/form/FormItem";

export const searchFormControl = ({
  expand,
  formOptionsFormProps,
  operationItem,
  expandHiddenClassName,
}: any) => {
  const inputFormOptions = expand
    ? formOptionsFormProps
    : formOptionsFormProps.slice(0, 2);
  const operationSpan = (3 - (inputFormOptions.length % 3)) * 8;
  const formOptions: IFormItemProps[] = [
    ...inputFormOptions,
    operationItem(operationSpan),
  ];
  return {
    formOptions,
    expandHiddenClassName:
      formOptionsFormProps.length < 3 ? expandHiddenClassName : "",
  };
};
