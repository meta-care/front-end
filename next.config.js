require("dotenv").config();

const nextConfig = {
	reactStrictMode: true,
};

module.exports = { nextConfig, env: { INFURA_API_KEY: process.env.INFURA_API_KEY } };
