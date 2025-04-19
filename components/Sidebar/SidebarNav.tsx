'use client';

import { VStack, Box, Flex } from '@chakra-ui/react';
import SidebarNavItem from './SidebarNavItem';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';
import type { IconType } from 'react-icons';

type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

const mainNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/dashboard/instellingen', label: 'Instellingen', icon: FiSettings },
];

const bottomNav: NavItem[] = [
  { href: '/dashboard/profiel', label: 'Profiel', icon: FiUser },
];

export default function SidebarNav() {
  return (
    <Flex direction="column" justify="space-between" flex="1">
      <VStack align="start" spacing={4}>
        {mainNav.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </VStack>

      <Box mt={10}>
        <VStack align="start" spacing={4}>
          {bottomNav.map((item) => (
            <SidebarNavItem key={item.href} {...item} />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
