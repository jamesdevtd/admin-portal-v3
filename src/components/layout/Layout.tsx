import * as React from 'react';

import Home from './Home';
import Login from './Login';
import Dashboard from './Login';
export default function Layout(props: {
  children: React.ReactNode;
  layoutName: string;
  pageTitle?: string;
}) {
  const { children, layoutName, pageTitle } = props;
  switch (layoutName) {
    case 'login':
      return <Login pageTitle={pageTitle}>{children}</Login>;
    case 'dashboard':
      return <Dashboard>{children}</Dashboard>;
    default:
      return <Home>{children}</Home>;
  }
}
Layout.defaultProps = {
  layoutName: 'default',
};
