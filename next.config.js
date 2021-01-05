module.exports = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false,
            },
          },
        ],
      },
    );
    return config;
  },
};

// module.exports = {
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };
module.exports = {
  images: {
    // loader: "cloudinary",
    domains: ["res.cloudinary.com"],
    // path: "/duhye49dt/image/upload/v1609838999",

  },
};
