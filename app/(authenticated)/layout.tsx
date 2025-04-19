import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PageHeader from '@/components/ui/PageHeader';
import type { ReactNode, FC } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={8} bg="gray.50" minH="100vh">
        <PageHeader />
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
