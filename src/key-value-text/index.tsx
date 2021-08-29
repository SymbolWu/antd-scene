import React from "react";
import { Space, Typography, SpaceProps } from "antd";
import { TextProps } from "antd/es/typography/Text";

export interface IKeyValueText {
  spaceProps?: SpaceProps;
  nameProps?: TextProps;
  valueProps?: TextProps;
  value?: React.ReactNode;
  name?: React.ReactNode;
}

const { Text } = Typography;

const KeyValueText: React.FC<IKeyValueText> = ({
  name,
  value,
  valueProps,
  nameProps,
  spaceProps,
}) => {
  const calcValueProps = {
    strong: true,
    ...valueProps,
  };
  return (
    <Space {...spaceProps}>
      <Text {...nameProps}>{`${name}:`}</Text>
      <Text {...calcValueProps}>{value}</Text>
    </Space>
  );
};

export default KeyValueText;
