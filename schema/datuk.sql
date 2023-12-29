CREATE TABLE IF NOT EXISTS "datuk" (
	"word" integer REFERENCES "words"(id),
	"meaning" integer REFERENCES "meanings"(id)
);
