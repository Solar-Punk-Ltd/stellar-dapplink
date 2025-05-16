## Overview

**stellar-dapplink** is a project focused on enabling interoperability between Stellar blockchain accounts and passkey-based authentication (WebAuthn). The goal is to allow users to securely manage Stellar accounts using modern, passwordless authentication methods.

## Features

- Passkey (WebAuthn) authentication for Stellar accounts
- Provides interoperability between dApps so you can use the same wallet with different dapps
- Secure key management and signing
- Example flows for account creation, authentication, and transaction signing
- Modular design for integration with other Stellar or WebAuthn projects

## Getting Started

### Prerequisites

- Node.js (version v22.0.0 or higher)
- yarn
- A supported browser for WebAuthn (only Chrome is supported as of now)

### Installation and Usage

```bash
git clone https://github.com/Solar-Punk-Ltd/stellar-dapplink.git
cd stellar-dapplink
yarn install
npm run dev
```

**Example usage**

```tsx
import { AuthProvider } from './src/Provider/Auth';

function App() {
  const handleCreate = (passKey) => {
    // Use passKey to connect the user's Stellar wallet
    // Redirect or update UI as needed
  };

  return <AuthProvider domain="https://your-app-domain.com" onCreate={handleCreate} />;
}
```

- **Identity Selection:** Users can choose from their available passkeys, providing a familiar and secure login experience.
- **Wallet Connection:** After authentication, the selected passkey can be linked to a Stellar account for secure transaction signing and account management.
- **Redirection:** Once authenticated, you can programmatically redirect users back to the original website or update the application state.

## Authentication Flow

The core of this project is the seamless authentication of users via passkeys (WebAuthn), allowing them to select their identity and connect their Stellar wallet. This is achieved using the [`AuthProvider`](./src/Provider/Auth.tsx) React component and the [`@solarpunkltd/passkey-kit`](https://www.npmjs.com/package/@solarpunkltd/passkey-kit) library, which is a fork of [`passkey-kit
`](https://www.npmjs.com/package/passkey-kit)

![`identity creation flow 1`](./data/identity_creation_1.png)

![`identity creation flow 2`](./data/identity_creation_2.png)

![`identity creation flow 3`](./data/identity_creation_3.png)

### AuthProvider Component

The `AuthProvider` component renders a secure iframe that handles passkey-based authentication. When a user initiates authentication, they are prompted to select a passkey (identity) from their device. Upon successful authentication, the selected passkey is returned and can be used to connect the user's Stellar wallet.

See the example videos below:
The user authenticates from different domains and then uses the chat functionality from the same and identity.
[`same passkeys`](https://drive.google.com/file/d/1EKZ3Oyw94pVbz_jI_6RcjObheju89KDI/view?usp=sharing)

The user authenticates from different domains with different identities.
[`different passkeys`](https://drive.google.com/file/d/1IR4CZQ8gc-CvqXThy54ZPU5jTRTC8MQ_/view?usp=sharing)

### Session Key Management

Signing all transactions one-by-one in a dApp can be frustrating. Creating a temporary key and authorizing it to sign transactions is a solution for this problem. This way you only sign the authorization transaction with a passkey and the session key stored securely locally in IndexedDB. We utilize smart wallets' addSigner functionality to add the session key to the authorized signers list.
See more at [`ithaca.xyz`](https://ithaca.xyz/updates/exp-0002#example)

[`session keys`](https://drive.google.com/file/d/1JxYND26l1SmTnIjifHZv2xtJq_NC_Q13/view?usp=sharing)

### Passkey Library

This project uses [`@solarpunkltd/passkey-kit`](https://www.npmjs.com/package/@solarpunkltd/passkey-kit) for handling passkey creation, authentication, and key management. This library abstracts the WebAuthn API and provides a simple interface for integrating passkey authentication into your app.

## Example Flow and Application

1. **User visits your site** and clicks "Login".
2. **AuthProvider** opens a passkey selection prompt.
3. **User selects a passkey or generates a new one** identity and authenticates.
4. **App receives the passkey** and connects it to the user's Stellar wallet.
5. **User is redirected** or the UI updates to reflect the connected state.

An example application of this library can be found at [`@solarpunkltd/smart-stellar-demo`](https://www.npmjs.com/package/@solarpunkltd/smart-stellar-demo)

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.
