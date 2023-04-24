import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { WalletKitProvider } from '@mysten/wallet-kit';
import { Nav } from '../components';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // colors: {...}, // override dark theme colors
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider theme={darkTheme}>
        <WalletKitProvider
          features={['sui:signTransactionBlock']}
          enableUnsafeBurner
        >
          <Nav />
          <Component {...pageProps} />
        </WalletKitProvider>
      </NextUIProvider>
    </>
  );
}
