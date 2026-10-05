import { type ReactNode, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({
  children,
}: AppProvidersProps): React.ReactElement => {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <BrowserRouter>{children}</BrowserRouter>;
};
