DO $$ BEGIN
 CREATE TYPE "employee_payment_types" AS ENUM('SALARY', 'ADVANCE', 'BONUS', 'PRODUCT_PURCHASE', 'OTHERS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "employee_payment_types" NOT NULL,
	"amount" numeric NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid,
	"employee_id" uuid NOT NULL,
	"shop_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_payments" ADD CONSTRAINT "employee_payments_created_by_employees_id_fk" FOREIGN KEY ("created_by") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_payments" ADD CONSTRAINT "employee_payments_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_payments" ADD CONSTRAINT "employee_payments_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_payments" ADD CONSTRAINT "employee_payments_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
