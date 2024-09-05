import { scheduleTable, locationTable } from "@/db/schema";
import { db } from "@/db";

export async function allSchedules() {
  return await db.select().from(scheduleTable).execute();
}

// export async function getSchedulesFromLocation() {
//   return await db.select().from(scheduleTable).where().execute();
// }
