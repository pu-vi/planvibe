-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "meta_keywords" TEXT,
    "canonical_url" VARCHAR(255),
    "og_title" VARCHAR(255),
    "og_description" VARCHAR(255),
    "og_image_url" VARCHAR(255),
    "robots_noindex" BOOLEAN NOT NULL DEFAULT false,
    "robots_nofollow" BOOLEAN NOT NULL DEFAULT false,
    "featured_image_url" VARCHAR(255),
    "travel_season" VARCHAR(50),
    "best_time_to_visit" VARCHAR(100),
    "blogger_page_id" VARCHAR(100),
    "blogger_url" VARCHAR(255),
    "blogger_updated_at" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");
