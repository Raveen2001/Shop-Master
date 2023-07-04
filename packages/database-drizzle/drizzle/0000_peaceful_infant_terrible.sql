DO $$ BEGIN
 CREATE TYPE "employeeType" AS ENUM('MANAGER', 'CASHIER', 'ACCOUNTANT', 'SALESMAN', 'DELIVERY_PERSON', 'PARCEL_COUNTER_DEVICE', 'BILLING_DEVICE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"phone" varchar(10),
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"type" "employeeType" NOT NULL,
	"shop_id" uuid,
	"owner_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "owners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" varchar(10) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" varchar(10) NOT NULL,
	"email" varchar(256),
	"address" text NOT NULL,
	"description" text,
	"website" text,
	"ownerId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shops" ADD CONSTRAINT "shops_ownerId_owners_id_fk" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
