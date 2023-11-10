import React, { memo } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

const { TextArea } = Input;

type Props = {
  rows: number;
  className?: string;
  placeHolder?: string;
} & TextAreaProps;

const InputTextAreaField: React.FC<Props> = (props: Props) => {
  const { rows, className, placeHolder, ...rest } = props;
  return (
    <TextArea
      rows={rows}
      placeholder={placeHolder}
      className={className}
      {...rest}
    />
  );
};

export default memo(InputTextAreaField);
