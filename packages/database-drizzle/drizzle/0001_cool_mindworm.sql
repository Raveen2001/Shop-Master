ALTER TABLE "order_items" ADD COLUMN "total_price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" DROP COLUMN IF EXISTS "is_loose";