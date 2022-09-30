import React, { FC } from 'react';
import Empty, { EmptyProps } from './index';

const VisitEmpty: FC<EmptyProps> = (props) => (
  <Empty
    remark='暂无访客信息'
    buttonVisible={false}
    imgSrc='https://betta-park-static.oss-cn-hangzhou.aliyuncs.com/empty/empty_access.png'
    {...props}
  />
);

export default VisitEmpty;
