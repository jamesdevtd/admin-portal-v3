import React from 'react';

type Props = {
  className: string;
  formId: string;
  children: React.ReactNode;
  clickHander?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SubmitButton = ({ className, formId, children, clickHander }: Props) => {
  return (
    <button
      type='submit'
      form={formId}
      className={`btn ${className}`}
      onClick={clickHander}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
