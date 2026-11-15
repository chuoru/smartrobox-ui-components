// https://github.com/beaugunderson/ip-address
import { Address4, Address6 } from 'ip-address';

export const useIpAddress = (mode: 'v4' | 'v6' = 'v4') => {
  const Instance = mode === 'v6' ? Address6 : Address4;

  const isValid = (address: string) => {
    return Instance.isValid(address);
  };

  const isInSubnet = (host: string, network: string) => {
    const instance = new Instance(host);
    return instance.isInSubnet(new Instance(network));
  };

  return {
    isValid,
    isInSubnet,
  };
};
