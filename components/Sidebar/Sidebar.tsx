import { Box } from '@chakra-ui/react';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import type { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <Box
      w="240px"
      bg="red.400"
      color="white"
      p={6}
      display="flex"
      flexDir="column"
      minH="100vh"
    >
      <SidebarHeader />
      <SidebarNav />
    </Box>
  );
};

export default Sidebar;
