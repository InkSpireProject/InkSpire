// next.config.js
module.exports = {
  images: {
    domains: ["img.clerk.com"], // Add the external domain here for images
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,POST" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};
