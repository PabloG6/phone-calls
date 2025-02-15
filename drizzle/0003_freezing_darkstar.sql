CREATE TYPE "public"."supplier" AS ENUM('weight', 'count');--> statement-breakpoint
CREATE TABLE "receivables" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"supplier" text NOT NULL,
	"supplierType" "supplier",
	"total" numeric NOT NULL,
	"cost" numeric NOT NULL,
	"user_id" text NOT NULL,
	"date_received" timestamp
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" text PRIMARY KEY NOT NULL,
	"customer" text NOT NULL,
	"product" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"phone_number" text,
	"email" text
);
--> statement-breakpoint
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_product_receivables_id_fk" FOREIGN KEY ("product") REFERENCES "public"."receivables"("id") ON DELETE no action ON UPDATE no action;