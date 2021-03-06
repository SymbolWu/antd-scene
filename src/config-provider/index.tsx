import * as React from "react";
import { createContext, useContext } from "react";
import { SpaceSize } from "antd/es/space";
import { CardSize } from "antd/es/card";
import { SizeType } from "antd/es/config-provider/SizeContext";

export interface IConfigProviderProps {
  proTable?: {
    gap?: SpaceSize;
    formCardSize?: CardSize;
    tableCardSize?: CardSize;
    formCardBodyStyle?: React.CSSProperties;
    formCardHeadStyle?: React.CSSProperties;
    tableCardBodyStyle?: React.CSSProperties;
    tableCardHeadStyle?: React.CSSProperties;
    tableSize?: SizeType;
    paramsNormalizeMap?: { [x: string]: string };
  };
  modalForm?: {
    closeIcon?: React.ReactNode;
  };
}

const defaultValue: IConfigProviderProps = {
  proTable: {},
  modalForm: {},
};
const Context = createContext<IConfigProviderProps>(defaultValue);

const ConfigProvider: React.FC<IConfigProviderProps> = ({
  children,
  proTable,
  modalForm,
}) => {
  const value = {
    ...defaultValue,
    proTable,
    modalForm,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export const useConfig = () => {
  const config = useContext(Context);
  return config;
};

export default ConfigProvider;
