ALTER TABLE "employees" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "shop_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "owners" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "email" varchar(256);--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shops" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;