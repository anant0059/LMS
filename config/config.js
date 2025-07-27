import dotenv from "dotenv";

dotenv.config();

export default function () {
    process.lms = {
        db: {
            url: process.env.DATABASE_URL || "postgres://myuser:mypassword@localhost:5432/mydb",
        },
        app: {
            port: process.env.PORT || 3000,
        }
    };
}