import React, { memo } from 'react';
import { Input, InputProps } from 'antd';

type Props = {
  type: string;
  className?: string;
  placeHolder?: string;
} & InputProps;

const InputField: React.FC<Props> = (props: Props) => {
  const { type, className, placeHolder, ...rest } = props;
  return (
    <Input
      type={type}
      className={`${className}`}
      placeholder={placeHolder}
      size="large"
      {...rest}
    />
  );
};

export default memo(InputField);
