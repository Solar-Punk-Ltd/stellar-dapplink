import { AccountSelection } from '../components/AccountSelection/AccountSelection';
import { MainLayout } from '../layouts/Main/MainLayout';

export function Auth() {
  return (
    <MainLayout>
      <AccountSelection />
    </MainLayout>
  );
}
