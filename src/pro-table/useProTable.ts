import { useRef, useState, useEffect } from "react";
import { TablePaginationConfig } from "antd";

export interface ProTableInstance {
  getParams: () => TablePaginationConfig & { [x: string]: any };
}

const useProTable = () => {
  const proTableRef = useRef<any>();
  return [proTableRef, proTableRef.current];
};

export default useProTable;
