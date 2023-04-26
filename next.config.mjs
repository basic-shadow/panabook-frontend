// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://panabook.kz/api/:path*", // proxy to external API
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["kazbooking-images.object.pscloud.io"],
  },
  env: {
    NEXT_PHOTO_BASE_URL: "https://kazbooking-images.object.pscloud.io/",
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
};
export default config;
