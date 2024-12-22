declare module '@radix-ui/react-toast' {
    import { ReactNode } from 'react';
  
    export interface ToastProviderProps {
      children: ReactNode; // Allow children to be passed
    }
  
    export const Provider: React.FC<ToastProviderProps>;
    export const Viewport: React.FC<React.ComponentProps<'div'>>;
    export const Root: React.FC<React.ComponentProps<'div'>>;
    export const Title: React.FC<React.ComponentProps<'h3'>>;
    export const Description: React.FC<React.ComponentProps<'p'>>;
    export const Action: React.FC<React.ComponentProps<'button'>>;
    export const Close: React.FC<React.ComponentProps<'button'>>;
  }
  