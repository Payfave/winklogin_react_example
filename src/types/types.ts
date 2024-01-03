import KeycloakJs, {
  KeycloakConfig,
  KeycloakError,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakTokenParsed,
} from 'keycloak-js';

export type WinkInitParams = {
  onFailure?(error: unknown): void;
  onSuccess?(): void | Promise<void>;
};

export type WinkLoginParams = KeycloakLoginOptions & {
  onFailure?(error: unknown): void;
};

export type WinkLogoutParams = KeycloakLogoutOptions & {
  onFailure?(error: unknown): void;
};

export type WinkKeycloakConfig = KeycloakConfig & {
  onAuthErrorFailure?(error: KeycloakError): void;
  loggingEnabled?: boolean;
};

export type TokenData = {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  winkTag: string;
  winkToken: string;
  dateOfBirth: string;
  expiryTime: string;
};

export interface WinkLogin extends KeycloakJs {
  winkInit(params?: WinkInitParams): Promise<void>;
  winkLogout(params?: WinkLogoutParams): ReturnType<KeycloakJs['logout']>;
  winkLogin(params?: WinkLoginParams): ReturnType<KeycloakJs['login']>;
}
export interface WinkData {
  id?: string;
  username?: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  oid?: string;
  sub?: string;
  access_token?: string;
  access_token_parsed: { exp?: number };
  access_token_exp?: string;
  refresh_token?: string;
  refresh_token_parsed?: KeycloakTokenParsed;
  refresh_token_exp?: string;
  id_token?: string;
  id_token_parsed?: KeycloakTokenParsed;
  id_token_exp?: string;
}
