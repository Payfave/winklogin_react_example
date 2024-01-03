/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';

import {
  TokenData,
  WinkData,
  WinkInitParams,
  WinkKeycloakConfig,
  WinkLogin,
  WinkLoginParams,
  WinkLogoutParams,
} from '../types/types';

const clientId = import.meta.env.VITE_CLIENT_ID;
const realm = import.meta.env.VITE_REALM;
const sandbox = 'stagekeycloak';

const winkConfig: WinkKeycloakConfig = {
  url: `https://${sandbox}.winklogin.com`,
  realm,
  clientId,
  loggingEnabled: true, // Change to false in production
  // eslint-disable-next-line no-console
  onAuthErrorFailure: (error) => console.error(error), // Pass custom error handler
};

const useWinkAuth = () => {
  const winkKeycloakClient = useRef<WinkLogin>(
    window.getWinkLoginClient(winkConfig)
  );
  const didInit = useRef(false);
  const [keycloakData, setKeycloakData] = useState<WinkData | undefined>();
  const [tokenData, setTokenData] = useState<TokenData | undefined>();
  const [tokenDataLoading, setTokenDataLoading] = useState(false);

  const winkInit = useCallback(async (params?: WinkInitParams) => {
    await winkKeycloakClient.current.winkInit(params);
  }, []);

  const winkLogin = useCallback(async (params?: WinkLoginParams) => {
    await winkKeycloakClient.current.winkLogin(params);
  }, []);

  const winkLogout = useCallback(async (params: WinkLogoutParams) => {
    await winkKeycloakClient.current.winkLogout(params);
  }, []);

  const winkRefreshToken = useCallback(async (minValidity = 5) => {
    const refreshed = await winkKeycloakClient.current.updateToken(minValidity);
    if (refreshed) {
      console.log('Token was successfully refreshed');
    } else {
      console.log('Token is still valid');
    }
  }, []);

  const parseJwt = (token: string): { exp?: number } => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const getFormattedTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleString();
  };

  const winkValidateToken = useCallback(async () => {
    const formData = {
      ClientId: clientId,
      AccessToken: winkKeycloakClient.current.token,
      ClientSecret: import.meta.env.VITE_CLIENT_SECRET,
    };

    try {
      setTokenDataLoading(true);

      const result = await axios.post<{
        firstName: string;
        lastName: string;
        contactNo: string;
        email: string;
        winkTag: string;
        winkToken: string;
        dateOfBirth: string;
        expiryTime: string;
      }>(
        'https://stage-api.winklogin.com/api/ConfidentialClient/verify-client',
        formData
      );
      setTokenData(result.data);
    } catch (error) {
      console.error(`Failed to validate token: ${error}`);
    } finally {
      setTokenDataLoading(false);
    }
  }, [setTokenData, setTokenDataLoading]);

  useEffect(() => {
    if (didInit.current) {
      return;
    }

    didInit.current = true;

    winkInit({
      // eslint-disable-next-line no-console
      onFailure: (error: unknown) => console.error(error),
      onSuccess: () => {
        const {
          idToken,
          idTokenParsed,
          refreshToken,
          refreshTokenParsed,
          profile,
          token,
        } = winkKeycloakClient.current;

        const accessTokenParsed = parseJwt(token ?? '');
        const winkData: WinkData = {
          id: profile?.id,
          username: profile?.username,

          name: idTokenParsed?.given_name,
          surname: idTokenParsed?.family_name,
          phone: idTokenParsed?.phone_number,
          email: idTokenParsed?.email,
          oid: idTokenParsed?.oid,
          sub: idTokenParsed?.sub,

          access_token: token,
          access_token_parsed: accessTokenParsed,
          access_token_exp: accessTokenParsed?.exp
            ? getFormattedTime(accessTokenParsed?.exp)
            : '',

          refresh_token: refreshToken,
          refresh_token_parsed: refreshTokenParsed,
          refresh_token_exp: refreshTokenParsed?.exp
            ? getFormattedTime(refreshTokenParsed?.exp)
            : '',

          id_token: idToken,
          id_token_parsed: idTokenParsed,
          id_token_exp: idTokenParsed?.exp
            ? getFormattedTime(idTokenParsed?.exp)
            : '',
        };

        setKeycloakData(winkData);
      },
    });
  }, [winkInit]);

  return {
    winkLogin,
    winkLogout,
    winkRefreshToken,
    winkValidateToken,
    keycloakData,
    clientId,
    tokenData,
    tokenDataLoading,
  };
};

export default useWinkAuth;
