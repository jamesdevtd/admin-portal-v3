import * as React from 'react';

import styles from './ButtonLink.module.scss';

type ButtonLinkProps = {
  href: string;
  className?: string;
  variant?: string;
  isDarkBg?: boolean;
  children: React.ReactNode;
};

const ButtonLink = ({
  href,
  className = '',
  variant = 'default',
  children,
}: ButtonLinkProps) => {
  return (
    <a
      href={href}
      className={`${styles.buttonLink} ${className} 
        ${styles[variant]}`}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
