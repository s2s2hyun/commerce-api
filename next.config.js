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
      'cdn.mustit.co.kr',
      'image.mustit.co.kr',
      'lh3.googleusercontent.com',
      'source.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
