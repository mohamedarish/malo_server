CREATE TABLE IF NOT EXISTS "words" (
	"id" serial PRIMARY KEY,
	"entry" text NOT NULL,
	"origin" text,
	"info" text,
);
