import { scheduleTable, locationTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function allSchedules() {
  return await db.select().from(scheduleTable).execute();
}

export async function allSchedulesForLocation(locationId: number) {
  return await db
    .select()
    .from(scheduleTable)
    .where(eq(scheduleTable.locationId, locationId))
    .execute();
}
