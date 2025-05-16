import { useEffect, useState } from 'react';
import { Key } from '@solarpunkltd/passkey-kit';

import { passkeyClient } from '@/lib/passkey-client';

import './AccountSelection.scss';

export const AccountSelection = () => {
  const [passKeys, setPassKeys] = useState<Key[]>([]);

  useEffect(() => {
    const storedPasskeys = JSON.parse(localStorage.getItem('passkeys') || '[]');
    setPassKeys(storedPasskeys);
  }, []);

  const updatedSigners = (prev: Key[], curr: Key) => {
    const updatedSigners = [...prev, curr];

    localStorage.setItem('passkeys', JSON.stringify(updatedSigners));

    return updatedSigners;
  };

  const register = async () => {
    const user = prompt('Give this passkey a name');

    if (!user) return;

    try {
      // TODO: app should be parameterized
      const key = await passkeyClient.createKey('Doomsday', user);
      setPassKeys((prev) => updatedSigners(prev, { ...key, user }));
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSelect = (signer: Key) => {
    window.parent.postMessage(
      {
        type: 'passkey-auth',
        payload: signer,
      },
      '*',
    );
  };

  return (
    <div className="account-chooser">
      <div className="account-chooser-card">
        <h1 className="title">Choose your identity</h1>
        <ul className="accounts">
          {passKeys.map((acc, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={async () => {
                  console.log(`Selected account: ${acc.user}`);
                  handleSelect(acc);
                }}
              >
                <span className="account-name">{acc.user}</span>
                <span className="account-key">{acc.keyIdBase64}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={async () => {
                console.log(`creating new identity...`);
                await register();
              }}
            >
              <span className="create-text">Create new identity</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
