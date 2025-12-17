/**
 * Type declarations for Elfsight widget platform
 */
declare global {
  interface Window {
    Elfsight?: {
      init?: () => void;
      [key: string]: any;
    };
  }
}

export {};

