import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define the location table
export const locationTable = sqliteTable("location", {
  locationId: integer("location_id")
    .notNull()
    .primaryKey({ autoIncrement: true }),
  prefs: text("prefs"),
  cities: text("cities"),
  districts: text("districts"),
  towns: text("towns"),
  villages: text("villages"),
});

// Define the schedule table with a foreign key reference to the location table
export const scheduleTable = sqliteTable("schedule", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  day: integer("day"),
  month: integer("month"),
  weekDay: text("week_day"),
  event: text("event"),
  wasteType: text("waste_type"),
  locationId: integer("location_id")
    .notNull()
    .references(() => locationTable.locationId, { onDelete: "cascade" }), // Foreign key
});

// Types for inserting and selecting from the tables
export type NewLocation = typeof locationTable.$inferInsert;
export type Location = typeof locationTable.$inferSelect;

export type NewSchedule = typeof scheduleTable.$inferInsert;
export type Schedule = typeof scheduleTable.$inferSelect;
