import React, { memo } from 'react';
import { Breadcrumb } from 'antd';

type ItemList = {
  title: string;
  href?: string;
};

const BreadcrumbComponent: React.FC<{ itemList: ItemList[] }> = ({
  itemList,
}) => {
  return <Breadcrumb separator=">" items={itemList} className="mb-[2rem]" />;
};

export default memo(BreadcrumbComponent);
