import { isDev } from "@builder.io/qwik";
import consola from "consola";
import { Sequelize } from "sequelize";

export const db = new Sequelize({
  storage: "./.data/db.sqlite",
  dialect: "sqlite",
  logging: (sql) => {
    if (isDev) {
      consola.info(sql.replace("Executing (default):", "🛢️:"));
    }
  },
});

try {
  await db.authenticate();
  consola.success("🔌 Connection has been established successfully.");
} catch (error) {
  consola.error("❌ Unable to connect to the database:", error);
}

try {
  await db.sync();
  consola.success("🔁 Database synchronized");
} catch (error) {
  consola.error("❌ Failed to synchronize database", error);
}
