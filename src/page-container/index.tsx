import React from "react";
import classNames from "classnames";
import { Spin } from "antd";
import { getPrefixCls } from "@/utils";
import "./index.less";

export interface IPageContainer {
  title?: React.ReactNode;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  extra?: React.ReactNode;
}

const PageContainer: React.FC<IPageContainer> = ({
  title = "标题",
  children,
  loading = false,
  className,
  style = {},
  headerClassName,
  headerStyle,
  contentClassName,
  contentStyle,
  extra,
}) => {
  const prefixCls = getPrefixCls("page-container");
  const pageContainerClassNames = classNames(prefixCls, className);
  const pageContainerHeaderClassNames = classNames(
    `${prefixCls}-header`,
    headerClassName
  );
  const pageContainerHeaderExtraClassNames = classNames(
    `${prefixCls}-header-extra`
  );
  const pageContainerContentClassNames = classNames(
    `${prefixCls}-content`,
    contentClassName
  );
  return (
    <div className={pageContainerClassNames} style={style}>
      <div className={pageContainerHeaderClassNames} style={headerStyle}>
        {title}
        <div className={pageContainerHeaderExtraClassNames}>{extra}</div>
      </div>
      <Spin spinning={loading}>
        <section
          className={pageContainerContentClassNames}
          style={contentStyle}
        >
          {children}
        </section>
      </Spin>
    </div>
  );
};

export default PageContainer;
