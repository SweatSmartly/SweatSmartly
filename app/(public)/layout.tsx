import Navbar from '../../components/ui/navigation/Navbar';
import type { ReactNode, FC } from 'react';

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PublicLayout;
