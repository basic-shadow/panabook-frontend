import { type AppType } from "next/app";

import "@/styles/globals.css";
import "react-day-picker/dist/style.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/server/api/query-client";
import AppToaster from "@/shared/UI/AppToaster/AppToaster";

const MyApp: AppType = ({ Component, ...pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <AppToaster />
    </QueryClientProvider>
  );
};

export default MyApp;
