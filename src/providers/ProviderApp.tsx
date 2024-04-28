'use client';
import { PropsWithChildren } from 'react';
import ProviderStarknet from './ProviderStarknet';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return <ProviderStarknet>{children}</ProviderStarknet>;
};

export default ProviderApp;
