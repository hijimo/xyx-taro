import React from "react";
import { useQuery } from "react-query";
import SimpleTree from "@/components/SimpleTree";
import type { DeviceGroupSSD, ResponseData, PaginationData } from "@/types";
import { getDeviceGroupTree } from "@/services/device";

interface DeviceGroupTreeProps {
  companyNo?: string;
  className?: string;
  defaultExpandAll?: boolean;
  onDataReady?: (data: DeviceGroupSSD[]) => void;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
}

const DeviceGroupTree: React.FC<DeviceGroupTreeProps> = ({
  companyNo,
  onDataReady,
  ...props
}) => {
  const { data } = useQuery(
    ["getDeviceGroupTree", { companyNo }],
    () => getDeviceGroupTree({ strVal: companyNo! }),
    {
      select: (d: ResponseData<PaginationData<DeviceGroupSSD[]>>) => d.data,
      enabled: !!companyNo,
      onSuccess: (d) => {
        onDataReady?.(d.records);
      },
    }
  );

  return <SimpleTree data={data} {...props} />;
};

export default React.memo(DeviceGroupTree);
