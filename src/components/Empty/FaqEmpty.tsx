import React, { FC } from 'react';
import Empty, { EmptyProps } from './index';

const FaqEmpty: FC<EmptyProps> = (props) => (
  <Empty
    remark='暂无信息'
    buttonVisible={false}
    imgSrc='https://betta-park-static.oss-cn-hangzhou.aliyuncs.com/empty/empty_access.png'
    {...props}
  />
);

export default FaqEmpty;
