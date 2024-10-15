CREATE TABLE `location` (
	`location_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prefs` text,
	`cities` text,
	`districts` text,
	`towns` text,
	`villages` text
);
--> statement-breakpoint
CREATE TABLE `schedule` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` integer,
	`month` integer,
	`week_day` text,
	`event` text,
	`waste_type` text,
	`location_id` integer NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON UPDATE no action ON DELETE cascade
);
