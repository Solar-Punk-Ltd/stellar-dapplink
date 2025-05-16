import { Layout } from '@stellar/design-system';

import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Layout.Header projectId="Auth" projectTitle="Auth" />
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer hideLegalLinks />
    </>
  );
}
