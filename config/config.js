import dotenv from "dotenv";

dotenv.config();

export default function () {
    process.lms = {
        db: {
            url: process.env.DATABASE_URL || "postgres://myuser:mypassword@localhost:5432/mydb",
        },
        app: {
            port: process.env.PORT || 3000,
            env: "dev"
        },
        auth: {
            jwt_secret: "lms-app",
            jwt_expires_in: "1h",
            jwt_expires_refresh_in: "7d",
        }
    };
}