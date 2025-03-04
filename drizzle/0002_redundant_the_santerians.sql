ALTER TYPE "public"."callStatus" ADD VALUE 'initiated' BEFORE 'accepted';--> statement-breakpoint
ALTER TABLE "callHistory" ADD COLUMN "ext_call_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "callHistory" ADD COLUMN "anonymous_call" text;