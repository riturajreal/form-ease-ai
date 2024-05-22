import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://aiformdb_owner:DZvF7fjX6QUK@ep-yellow-sound-a5oy5z6o.us-east-2.aws.neon.tech/ai-form-builder?sslmode=require'
  }
});