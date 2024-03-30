"use client"

import { ThemeProvider } from "./theme/ThemeProvider"
// import { SessionProvider } from "./session/SessionProvider"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SessionProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    {/* </SessionProvider> */}
  );
}
export default AppProvider;