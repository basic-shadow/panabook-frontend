import { type AppType } from "next/app";

import "@/styles/globals.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/server/api/query-client";

const MyApp: AppType = ({ Component, ...pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
