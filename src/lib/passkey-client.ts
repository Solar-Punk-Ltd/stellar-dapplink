import { PasskeyKit } from '@solarpunkltd/passkey-kit';

export const passkeyClient = new PasskeyKit({
  rpcUrl: import.meta.env.VITE_rpcUrl,
  networkPassphrase: import.meta.env.VITE_networkPassphrase,
  walletWasmHash: import.meta.env.VITE_walletWasmHash,
  challenge: 'doomsdaychallange',
  // seed: 'doomsdayseed',
});
