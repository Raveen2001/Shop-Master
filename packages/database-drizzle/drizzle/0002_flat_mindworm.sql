ALTER TABLE "employee_payments" RENAME COLUMN "created_by" TO "created_by_employee_id";--> statement-breakpoint
ALTER TABLE "employee_payments" DROP CONSTRAINT "employee_payments_created_by_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_payments" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_payments" ADD CONSTRAINT "employee_payments_created_by_employee_id_employees_id_fk" FOREIGN KEY ("created_by_employee_id") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
