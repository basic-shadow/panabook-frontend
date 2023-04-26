// import httpProxy from "http-proxy";
// import { type NextRequest, type NextResponse } from "next/server";

// export const config = {
//   api: {
//     // Enable `externalResolver` option in Next.js
//     externalResolver: true,
//     bodyParser: false,
//   },
// };

// export default (req: NextRequest, res: NextResponse) =>
//   new Promise((resolve, reject) => {
//     console.log("PROXYING");
//     const proxy: httpProxy = httpProxy.createProxy();
//     proxy.once("proxyReq", (...args: any[]) => {
//       if (args.length > 0) {
//         const [req] = args as any[];
//         console.log("PROXYING - ", req.path);
//       }
//     });
//     proxy
//       .once("proxyRes", resolve as any)
//       .once("error", reject)
//       .web(req, res, {
//         changeOrigin: true,
//         target: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
//       });
//   });
