/**
 * 同じ LAN の他の端末から開発サーバーを開くときに許可するホスト名。
 * .env.local の ALLOWED_DEV_ORIGINS にカンマ区切りで書く(例: 192.168.1.6,192.168.1.10)。
 */
const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins,
};

export default nextConfig;
