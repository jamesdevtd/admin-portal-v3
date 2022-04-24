import React from 'react';

import styles from './Buttons.module.scss';

type Props = {
  className?: string;
  formId?: string;
  variant?: string;
  children: React.ReactNode;
  clickHander?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const SubmitButton = ({ className, formId, variant, children, clickHander, disabled }: Props) => {
  return (
    <button
      type='submit'
      form={formId}
      className={`${styles.submitButton} ${variant && styles[variant]} ${className}`}
      onClick={clickHander}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
