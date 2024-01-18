import {
  AbstractPowerSyncDatabase,
  Column,
  ColumnType,
  Schema,
  Table,
  WASQLitePowerSyncDatabaseOpenFactory,
} from "@journeyapps/powersync-sdk-web";
import { SupabaseClient } from "@supabase/supabase-js";
import { InjectionKey, Plugin, inject } from "vue";

import { PowerSyncSupabaseConnector } from "@/db/connector";

const AppSchema = new Schema([
  new Table({
    name: "todo",
    columns: [
      new Column({ name: "title", type: ColumnType.TEXT }),
      new Column({ name: "created_at", type: ColumnType.TEXT }),
      new Column({ name: "completed", type: ColumnType.INTEGER }),
      new Column({ name: "owner_id", type: ColumnType.TEXT }),
    ],
  }),
]);

export const createPowerSync = async (supabase: SupabaseClient) => {
  const powerSync = new WASQLitePowerSyncDatabaseOpenFactory({
    schema: AppSchema,
    dbFilename: "todos.db",
  }).getInstance();

  await powerSync.init();

  const connector = new PowerSyncSupabaseConnector(
    import.meta.env.VITE_POWERSYNC_URL,
    supabase,
  );

  await powerSync.connect(connector);

  return powerSync;
};

const key: InjectionKey<AbstractPowerSyncDatabase> = Symbol("powersync");

export const PowerSyncPlugin: Plugin = {
  install: (app, powerSync) => {
    app.provide(key, powerSync);
  },
};

export const usePowerSync = () => {
  const powerSync = inject(key);

  if (!powerSync) {
    throw new Error("PowerSync not found. Did you forget to use the plugin?");
  }

  return powerSync;
};
