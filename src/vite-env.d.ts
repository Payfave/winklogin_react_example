/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    WinkLogin: any;
    getWinkLoginClient: (config: any) => any;
  }
}
