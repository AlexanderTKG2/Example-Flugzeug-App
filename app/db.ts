import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { config } from "@/config";
import path from "path";

const dbOptions: SequelizeOptions = {
  ...config.db,
  modelPaths: [path.join(__dirname, "/models")],
  define: {
    freezeTableName: true,
    timestamps: true,
  },
};

export const db = new Sequelize(dbOptions);

// Should be called in server
export async function setupDB(): Promise<Sequelize> {
  return db.sync();
}

export async function setupDBClearData(): Promise<Sequelize> {
  return db.sync({
    force: true,
  });
}

export async function setupDBAlterSchema(): Promise<Sequelize> {
  return db.sync({
    alter: true,
  });
}

export async function printDBCreateSQL(): Promise<Sequelize> {
  return db.sync({
    logging: data => {
      // Clean output
      data = data.replace("Executing (default): ", "");
      if (data.indexOf("SHOW INDEX FROM") != -1) return;
      console.log(data);
    },
  });
}
