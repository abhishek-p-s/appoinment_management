import React, { memo } from 'react';
import { Button, ButtonProps } from 'antd';

type Props = {
  title: string;
  className?: string;
  icon?: React.ReactNode;
} & ButtonProps;

const ButtonCustom: React.FC<Props> = ({
  title,
  className,
  icon,
  ...rest
}: Props) => {
  return (
    <Button
      className={`border border-1 flex justify-center items-center font-inter h-12 font-medium rounded-md opensans ${className}`}
      {...rest}
      icon={icon}
    >
      {title}
    </Button>
  );
};

export default memo(ButtonCustom);
