import React from "react";
import {
  Space,
  Divider,
  PopconfirmProps,
  ButtonProps,
  SpaceProps,
  Typography,
  Button,
} from "antd";
import ConfirmButton from "../confirm-button";

interface IApprovalProps {
  confirmTitle?: string;
  buttonText?: string;
  needConfirm?: boolean;
  buttonProps?: ButtonProps;
}
type ApprovalType = string | number | undefined | null | boolean;

export interface IApprovalButtonGroup {
  popconfirmProps?: PopconfirmProps;
  buttonProps?: ButtonProps;
  spaceProps?: SpaceProps;
  approveConfig?: IApprovalProps;
  rejectConfig?: IApprovalProps;
  dataSource?: any;
  approvalOptions?: {
    approve: ApprovalType;
    reject: ApprovalType;
    approving: ApprovalType;
  };
  finishNode?: React.ReactNode | string | null;
  onChange?: (status: any) => void;
  status?: ApprovalType;
  transform?: ({
    dataSource,
    status,
  }: {
    dataSource: any;
    status: ApprovalType;
  }) => any;
}

const { Text } = Typography;
const defaultApproveConfig: IApprovalProps = {
  confirmTitle: "确认通过？",
  buttonText: "通过",
  needConfirm: false,
  buttonProps: {},
};
const defaultRejectConfig: IApprovalProps = {
  confirmTitle: "确认拒绝？",
  buttonText: "拒绝",
  needConfirm: true,
  buttonProps: {},
};
const defaultSpaceProps: SpaceProps = {
  size: "small",
  split: <Divider type="vertical" />,
};
const ApprovalButtonGroup: React.FC<IApprovalButtonGroup> = ({
  popconfirmProps = {},
  spaceProps = {},
  approveConfig = {},
  rejectConfig = {},
  dataSource,
  approvalOptions = {
    approve: "1",
    reject: "2",
    approving: "3",
  },
  finishNode = <Text>操作完成</Text>,
  onChange,
  status,
  transform = ({ dataSource, status }) => ({ dataSource, status }),
}) => {
  const { approve, reject, approving } = approvalOptions;

  const options = [
    {
      type: reject,
      ...defaultRejectConfig,
      ...rejectConfig,
    },
    {
      type: approve,
      ...defaultApproveConfig,
      ...approveConfig,
    },
  ];

  const onConfirm = (status: any) => {
    const params = { dataSource, status };
    if (transform && typeof transform === "function") {
    }
    typeof onChange === "function" && onChange(transform(params));
  };

  if (status !== approving) {
    return finishNode ? <span>{finishNode}</span> : null;
  }
  return (
    <Space {...defaultSpaceProps} {...spaceProps}>
      {options.map((option, index) => {
        const {
          confirmTitle,
          type,
          buttonText,
          buttonProps,
          needConfirm,
        } = option;
        if (!needConfirm) {
          return (
            <Button
              key={index}
              {...buttonProps}
              onClick={() => onConfirm(type)}
            >
              {buttonText}
            </Button>
          );
        }
        return (
          <ConfirmButton
            key={index}
            popconfirmProps={{
              ...popconfirmProps,
              title: confirmTitle,
              onConfirm: () => onConfirm(type),
            }}
            buttonProps={buttonProps}
          >
            {buttonText}
          </ConfirmButton>
        );
      })}
    </Space>
  );
};
export default ApprovalButtonGroup;
