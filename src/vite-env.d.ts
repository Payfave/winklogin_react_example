/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    iFrameResize: any;
    WinkLogin: any;
    winkEnvValues: any;
    getWinkLoginClient: (config: any) => any;
  }
}
