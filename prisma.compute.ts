import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "skincare-shop",
    framework: "nextjs",
    httpPort: 3000,
    build: {
      command: "npx prisma generate && npx prisma migrate deploy && npm run seed && next build",
      outputDirectory: ".next",
    },
  },
});