/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface UserData {
  acr: string;
  allowed_origins: string[];
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  nonce: string;
  oid: string;
  phone_number: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: Record<string, unknown>;
  };
  scope: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
}

interface WinkLoginConfig {
  url: string;
  realm: string;
  clientId: string;
  onAuthErrorFailure: (error: Error) => void;
  loggingEnabled: boolean;
}

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const useWinkAuth = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [winkClient, setWinkClient] = useState<any | null>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const realm = import.meta.env.VITE_REALM;
    const sandbox = 'stagekeycloak'; // or 'prod' for producción
    const config: WinkLoginConfig = {
      url: `https://${sandbox}.winklogin.com`,
      realm,
      clientId,
      onAuthErrorFailure: (error: Error) => console.error(error),
      loggingEnabled: true,
    };

    const winkLoginClient = window.getWinkLoginClient(config);
    setWinkClient(winkLoginClient);

    winkLoginClient.winkInit({
      onSuccess: () => {
        const data = parseJwt(winkLoginClient.token);
        setUserData(data);
      },
      onFailure: (error: Error) => console.error(error),
    });
  }, []);

  return { userData, winkClient };
};

export default useWinkAuth;
