import { Dialect } from "sequelize/types";
import ip from "ip";
import path from "path";

export const config = {
  root: path.normalize(`${__dirname}/..`),

  env: process.env.NODE_ENV || "development",

  jwt: {
    secret:
      process.env.JWT_SECRET || "tIPGafKxVB_9ZPGTle8UsAyJ3UqhQkjfrHRGWWl6dVI", // y
    access: {
      expiry: {
        unit: "hours",
        length: process.env.JWT_EXPIRY_HOURS // y
          ? parseInt(process.env.JWT_EXPIRY_HOURS) // y
          : 30 * 24, // y
      },
      subject: "access",
      audience: "user",
    },
    refresh: {
      expiry: {
        unit: "months",
        length: 6,
      },
      subject: "refresh",
      audience: "user",
    },
    reset: {
      expiry: {
        unit: "hours",
        length: 12,
      },
      subject: "reset",
      audience: "user",
    },
  },

  email: {
    from_address:
      process.env.EMAIL_FROM_ADDRESS || "MyApp <no-reply@example.com>", // y
    host: process.env.EMAIL_SMTP_HOST || "smtp.gmail.com", // y
    port: process.env.EMAIL_SMPT_PORT // y
      ? parseInt(process.env.EMAIL_SMPT_PORT) // y
      : 587, // y
    secure: process.env.EMAIL_SMTP_SECURE // y
      ? process.env.EMAIL_SMTP_SECURE === "true" // y
      : true, // y
    auth: {
      user: process.env.EMAIL_SMTP_USER || "(your SMTP user)", // y
      pass: process.env.EMAIL_SMTP_PASS || "(your SMTP password)", // y
    },
  },

  server: {
    port: process.env.SERVER_PORT || 8888, // y
  },

  api: {
    // Default limit and offset levels for responses
    limit: 99,
    offset: 0,
    // Show detailed error responses or not
    debug: true,
  },

  log: {
    // Console Log levels: error, warn, info, verbose, debug, silly
    level: process.env.LOG_LEVEL || "debug", // y
    logToFiles: process.env.LOG_TO_FILES // y
      ? process.env.LOG_TO_FILES === "true" // y
      : false, // y
  },

  urls: {
    // Url config as seen from the user NOT NECESSARILY THE SAME AS SERVER
    // http or https
    protocol: process.env.URLS_PROTOCOL || "http", // y
    url: process.env.URLS_URL || ip.address(), // y
    port: process.env.URLS_PORT ? String(process.env.URLS_PORT) : "", // y
    apiRoot: process.env.URLS_API_ROOT || "/api/v1", // y
    base: "",
    baseApi: "",
  },

  db: {
    database: process.env.DB_NAME || "", // y
    username: process.env.DB_USER || "root", // y
    password: process.env.DB_PASSWORD || "", // y
    host: process.env.DB_HOST || "localhost", // y
    dialect: (process.env.DB_TYPE || "sqlite") as Dialect, // y
    logging: false,
    storage: process.env.DB_STORAGE || "db.sqlite", // y
    timezone: "utc", // IMPORTANT For correct timezone management with DB.
  },
};

let portString = "";
if (Number.isInteger(parseInt(config.urls.port)))
  portString = `:${config.urls.port}`;

config.urls.base = `${config.urls.protocol}://${config.urls.url}${portString}`;
config.urls.baseApi = `${config.urls.base}${config.urls.apiRoot}`;

if (config.db.dialect === "sqlite") {
  // sqlite dialect doesn't support timezone and crashes if we pass one (it is utc by default anyway)
  delete config.db.timezone;
}
