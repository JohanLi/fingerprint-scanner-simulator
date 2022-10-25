/** @type {import('next').NextConfig} */

// used for hosting on johan.li/gta-online/fingerprint-scanner-simulator
const BASE_PATH = process.env.BASE_PATH;

module.exports = {
  reactStrictMode: true,
  basePath: BASE_PATH,
};
