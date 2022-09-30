import React, { FC } from 'react';
import Empty, { EmptyProps } from './index';

const CanteenEmpty: FC<EmptyProps> = (props) => (
  <Empty
    remark='周末不开放'
    buttonVisible={false}
    // imgSrc='https://betta-park-static.oss-cn-hangzhou.aliyuncs.com/empty/empty_access.png'
    {...props}
  />
);

export default CanteenEmpty;
