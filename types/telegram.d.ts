export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        setBackgroundColor: (color: string) => void;
        ready: () => void;
        initData: string;
        [key: string]: any;
      };
    };
  }
}
