import { config } from "dotenv";

// Load environment-specific .env file
const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });

export default {
  expo: {
    name: "musicu",
    slug: "musicu",
    extra: {
      env: process.env.NODE_ENV,
      apiUrl: process.env.API_URL
    },
  },
};
