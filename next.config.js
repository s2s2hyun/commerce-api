/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'picsum.photos',
      'raw.githubusercontent.com',
      'static.shoeprize.com',
      'ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com',
    ],
  },
};

module.exports = nextConfig;
