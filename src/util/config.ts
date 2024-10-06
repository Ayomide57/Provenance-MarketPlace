import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, sepolia } from '@wagmi/core/chains';

import { defineChain } from 'viem'

export const neo = defineChain({
  id: 12227332,
  name: 'NeoX Testnet',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 8 },
  rpcUrls: {
    default: { http: ['https://neoxt4seed1.ngd.network'] },
  },
  blockExplorers: {
    default: { name: 'Neoxt4scan', url: 'https://neoxt4scan.ngd.network/' },
  },
})

declare module 'wagmi' { 
  interface Register { 
    config: typeof config 
  } 
} 


export const config = createConfig({ 
  chains: [mainnet, sepolia, neo],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [neo.id]: http(),
  },
}) 
