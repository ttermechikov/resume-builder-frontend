import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => (
  <header className={cn('w-full', className)}>{children}</header>
);

export default Header;
