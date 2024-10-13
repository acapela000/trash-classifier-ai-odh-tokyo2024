import { Schedule } from '@/db/schema';

// mapping database from "schema.ts" to the calendar chart data format
export const DateFormat = (data: Schedule[]) => {
  return data.map((d) => {
    return [
      `2024-${d.month}-${d.day}`, // Add the year to the date
      d.event || 'default', // Ensure there's a value for the event
    ];
  });
};
