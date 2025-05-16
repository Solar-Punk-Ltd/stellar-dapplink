import { useEffect } from 'react';
import { Key } from '@solarpunkltd/passkey-kit';

interface AuthProviderProps {
  domain: string;
  onCreate: (passKey: Key) => void;
}

export function AuthProvider({ onCreate, domain = 'http://localhost:5173' }: AuthProviderProps) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'passkey-auth') {
        onCreate(event.data.payload);
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [onCreate]);

  return (
    <iframe
      src={`${domain}/passkey-widget`}
      title="Passkey Auth"
      allow="publickey-credentials-create"
      style={{ height: '100%', width: '100%' }}
      sandbox="allow-scripts allow-same-origin allow-modals"
    />
  );
}
