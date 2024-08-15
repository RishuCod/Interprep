/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://inter_owner:UGg1CBIxdYJ9@ep-sparkling-boat-a5uefyi0.us-east-2.aws.neon.tech/inter?sslmode=require",
    },
  };