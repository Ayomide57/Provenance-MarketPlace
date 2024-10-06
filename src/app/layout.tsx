"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";

import { mainnet, sepolia } from "wagmi/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { config, neo } from "@/util/config";
import { Toaster } from "react-hot-toast";

const chains = [mainnet, sepolia, neo];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const clientId = process.env.NEXT_PUBLIC_ClIENT_ID || "";

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <WagmiConfig config={config}>
      <ThirdwebProvider
        clientId={clientId} // You can get a client id from dashboard settings
        activeChain="sepolia"
      >
        <html lang="en">
          <body suppressHydrationWarning={true} className="max-h-fit">
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              <Toaster position="bottom-center" />
              {loading ? <Loader /> : children}
            </div>
          </body>
        </html>
      </ThirdwebProvider>
    </WagmiConfig>
  );
}
