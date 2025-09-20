ALTER TABLE "order_items" ALTER COLUMN "quantity" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "unit_price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "total_price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "total_price" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "discount" SET DATA TYPE numeric;