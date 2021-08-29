import React from "react";
import classNames from "classnames";
import { Descriptions as AntdDescriptions, DescriptionsProps } from "antd";

import { getPrefixCls } from "@/utils";

import "./index.less";

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  span?: number;
  render?: () => React.ReactNode;
  value?: React.ReactNode;
}

export interface IDescriptions extends DescriptionsProps {
  options: DescriptionsItemProps[];
}

const { Item } = AntdDescriptions;

const Descriptions: React.FC<IDescriptions> = ({
  options,
  bordered = false,
  size = "middle",
  className,
  ...restDescriptionsProps
}) => {
  // const { title, itemGroup } = options;
  const prefixCls = getPrefixCls("descriptions");
  const descriptionsClassNames = classNames(prefixCls, className);
  return (
    <AntdDescriptions
      bordered={bordered}
      size={size}
      {...restDescriptionsProps}
      className={descriptionsClassNames}
    >
      {options.map((i, index) => (
        <Item {...i} span={i.span || 1} key={index}>
          {i.render ? i.render() : i?.value}
        </Item>
      ))}
    </AntdDescriptions>
  );
};

export default Descriptions;
