-- CreateTable
CREATE TABLE "t_types" (
    "id" TEXT NOT NULL,
    "parent" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" VARCHAR(3) NOT NULL,
    "url" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT,
    "title" TEXT NOT NULL,
    "metakeywords" TEXT,
    "metadescription" TEXT,
    "sorting" INTEGER DEFAULT 0,

    CONSTRAINT "t_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_about" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "position" TEXT NOT NULL DEFAULT '',
    "employment" TEXT NOT NULL DEFAULT '',
    "body" TEXT,
    "publick" INTEGER NOT NULL DEFAULT 0,
    "order_number" INTEGER NOT NULL,
    "photo" VARCHAR(255),

    CONSTRAINT "t_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_banner" (
    "id" TEXT NOT NULL,
    "file" VARCHAR(14) NOT NULL DEFAULT '',
    "fileext" VARCHAR(5) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "header" VARCHAR(255) NOT NULL DEFAULT '',
    "width" VARCHAR(5) NOT NULL DEFAULT '',
    "height" VARCHAR(5) NOT NULL DEFAULT '',
    "type" INTEGER NOT NULL DEFAULT 0,
    "cnt" INTEGER NOT NULL DEFAULT 0,
    "tcnt" INTEGER NOT NULL DEFAULT 0,
    "info" TEXT,
    "email" VARCHAR(40) NOT NULL DEFAULT '',
    "act" INTEGER NOT NULL DEFAULT 1,
    "cityid" TEXT NOT NULL,

    CONSTRAINT "t_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_city" (
    "id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "body" TEXT,
    "map" TEXT,
    "photo" VARCHAR(200) NOT NULL DEFAULT '',
    "metakeywords" VARCHAR(255) NOT NULL DEFAULT '',
    "metadescription" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "t_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_country" (
    "id" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metadescription" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "t_country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_cityphoto" (
    "id" TEXT NOT NULL,
    "header_ru" VARCHAR(255) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "foto" VARCHAR(200) NOT NULL DEFAULT '',
    "fotoext" VARCHAR(5) NOT NULL DEFAULT '',
    "type" INTEGER NOT NULL DEFAULT 1,
    "domain" VARCHAR(20) NOT NULL DEFAULT 'www',
    "header_en" VARCHAR(255) NOT NULL DEFAULT '',
    "cat" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "t_cityphoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_dayplace" (
    "id" TEXT NOT NULL,
    "tourid" INTEGER NOT NULL,
    "dayid" INTEGER NOT NULL,
    "placeid" INTEGER NOT NULL,

    CONSTRAINT "t_dayplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_exchange" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchange_rate" DOUBLE PRECISION NOT NULL,
    "primary_valuta" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_faq" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "archive" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "t_faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_guide" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "name_ru" VARCHAR(255) NOT NULL DEFAULT '',
    "name_en" VARCHAR(255) NOT NULL DEFAULT '',
    "local_ru" VARCHAR(255) NOT NULL DEFAULT '',
    "local_en" VARCHAR(255) NOT NULL DEFAULT '',
    "lang_ru" VARCHAR(255) NOT NULL DEFAULT '',
    "lang_en" VARCHAR(255) NOT NULL DEFAULT '',
    "body_ru" TEXT,
    "body_en" TEXT,
    "foto" CHAR(14) NOT NULL DEFAULT '0',
    "fotoext" VARCHAR(5) NOT NULL DEFAULT '',
    "vote" INTEGER NOT NULL DEFAULT 0,
    "voters" INTEGER NOT NULL DEFAULT 0,
    "cert_ru" TEXT,
    "cert_en" TEXT,

    CONSTRAINT "t_guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_guideresponses" (
    "id" TEXT NOT NULL,
    "guide" INTEGER NOT NULL,
    "cat" INTEGER NOT NULL,
    "type" CHAR(20) NOT NULL DEFAULT '',
    "name" VARCHAR(150) NOT NULL DEFAULT '',
    "city" VARCHAR(50) NOT NULL DEFAULT '',
    "email" VARCHAR(150) NOT NULL DEFAULT '',
    "dtime" TIMESTAMP(3),
    "response" TEXT,
    "answer" TEXT,
    "active" INTEGER NOT NULL DEFAULT 0,
    "foto" CHAR(14) NOT NULL DEFAULT '0',
    "fotoext" VARCHAR(5) NOT NULL DEFAULT '',
    "ftext" CHAR(16) NOT NULL DEFAULT '0',
    "fotoext2" VARCHAR(5) NOT NULL DEFAULT '',

    CONSTRAINT "t_guideresponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_hotel" (
    "id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "cityid" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "metakeywords" VARCHAR(255) NOT NULL DEFAULT '',
    "metadescription" VARCHAR(255) NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL,
    "address" VARCHAR(250) NOT NULL DEFAULT '',
    "photo" TEXT NOT NULL,
    "booking_rating" INTEGER NOT NULL,
    "body" TEXT,
    "map" TEXT,
    "services" JSONB NOT NULL,
    "service_text" TEXT,
    "conditions" TEXT,
    "publics" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "t_hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_hotel_photo" (
    "id" TEXT NOT NULL,
    "hotelid" TEXT NOT NULL,
    "photo" VARCHAR(200) NOT NULL DEFAULT '',
    "alt" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "t_hotel_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_hotel_rooms" (
    "id" TEXT NOT NULL,
    "hotelid" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL,
    "sizem" INTEGER NOT NULL,
    "body" TEXT,
    "breakfast" BOOLEAN NOT NULL DEFAULT false,
    "lunch" BOOLEAN NOT NULL DEFAULT false,
    "dinner" BOOLEAN NOT NULL DEFAULT false,
    "p_person" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "t_hotel_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_hotel_room_photo" (
    "id" TEXT NOT NULL,
    "room_id" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "alt" VARCHAR(60) NOT NULL,

    CONSTRAINT "t_hotel_room_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_hotel_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "t_hotel_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_news" (
    "id" TEXT NOT NULL,
    "new_date" VARCHAR(255),
    "header" VARCHAR(255) NOT NULL DEFAULT '',
    "body" TEXT,
    "firsttext" TEXT,
    "lang" CHAR(2) NOT NULL DEFAULT 'ru',
    "type_id" TEXT NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT NOT NULL,
    "foto" VARCHAR(200) NOT NULL,
    "fototext" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "metakeywords" VARCHAR(255) NOT NULL DEFAULT '',
    "metadescription" VARCHAR(255) NOT NULL DEFAULT '',
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "publick" INTEGER NOT NULL DEFAULT 0,
    "country" VARCHAR(50) NOT NULL DEFAULT 'Узбекистан',
    "tags" TEXT,

    CONSTRAINT "t_news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_news_type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "metakeywords" VARCHAR(255) NOT NULL,
    "metadescription" VARCHAR(255) NOT NULL,

    CONSTRAINT "t_news_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_order_product" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "tour_id" INTEGER NOT NULL,

    CONSTRAINT "t_order_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "travellers_count" INTEGER NOT NULL,
    "tour_date_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tour_date_end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_updated" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_paid_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payment_type" TEXT NOT NULL,
    "tour_type" TEXT NOT NULL,
    "order_data" INTEGER NOT NULL,
    "order_status" INTEGER NOT NULL,
    "payment_status" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,

    CONSTRAINT "t_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_order_hotels" (
    "id" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "hotel_id" INTEGER NOT NULL,

    CONSTRAINT "t_order_hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_oreder_services" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_price" DOUBLE PRECISION NOT NULL,
    "service_count" INTEGER NOT NULL,

    CONSTRAINT "t_oreder_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_order_status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "t_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_order_travellers" (
    "id" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "billing_adress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,

    CONSTRAINT "t_order_travellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_pages" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "isdel" INTEGER NOT NULL DEFAULT 0,
    "metakeywords" TEXT,
    "metadescription" TEXT,
    "title" TEXT,
    "titlename" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "t_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_payment_status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "t_payment_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_photo" (
    "id" TEXT NOT NULL,
    "photo_type" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "t_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_place" (
    "id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "cityid" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "body" TEXT,
    "photo" TEXT NOT NULL,
    "foto" TEXT NOT NULL DEFAULT '',
    "fotoext" TEXT NOT NULL DEFAULT '',
    "metakeywords" TEXT NOT NULL DEFAULT '',
    "metadescription" TEXT NOT NULL DEFAULT '',
    "publics" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "t_place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_place_photo" (
    "id" TEXT NOT NULL,
    "place_id" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "t_place_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_restaurant" (
    "id" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "cityid" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "body" TEXT,
    "photo" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL DEFAULT '',
    "metadescription" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "t_restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_restaurant_photo" (
    "id" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "photo" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "t_restaurant_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_review" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT DEFAULT '',
    "city" TEXT NOT NULL,
    "dtime" TIMESTAMP(3),
    "review" TEXT,
    "answer" TEXT,
    "active" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "t_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "t_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "t_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour" (
    "id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "main_title" TEXT,
    "name" TEXT NOT NULL,
    "name2" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "oldPrice" DOUBLE PRECISION NOT NULL,
    "sales" TEXT NOT NULL,
    "body" TEXT,
    "map" TEXT,
    "url" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL,
    "metadescription" TEXT NOT NULL,
    "ftext" TEXT,
    "ftext2" TEXT,
    "intop" INTEGER NOT NULL DEFAULT 0,
    "intop2" INTEGER NOT NULL DEFAULT 0,
    "intop3" INTEGER NOT NULL DEFAULT 0,
    "types" JSONB,
    "include" JSONB,
    "exclude" JSONB,
    "notes" JSONB,
    "paid_services" JSONB,
    "places" JSONB,
    "transport" JSONB,
    "country" JSONB,
    "city" JSONB,
    "travellers" TEXT NOT NULL,
    "archive" INTEGER NOT NULL DEFAULT 0,
    "solo_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "single_price" DOUBLE PRECISION NOT NULL,
    "guaranted" INTEGER NOT NULL DEFAULT 0,
    "new_type" TEXT NOT NULL DEFAULT 'i',

    CONSTRAINT "t_tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tourcity" (
    "id" TEXT NOT NULL,
    "tourid" TEXT NOT NULL,
    "cityid" TEXT NOT NULL,

    CONSTRAINT "t_tourcity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tourtoday" (
    "id" TEXT NOT NULL,
    "tourid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "breakfast" BOOLEAN NOT NULL DEFAULT false,
    "lunch" BOOLEAN NOT NULL DEFAULT false,
    "dinner" BOOLEAN NOT NULL DEFAULT false,
    "hotels" JSONB,

    CONSTRAINT "t_tourtoday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tourdayphoto" (
    "id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "foto" TEXT DEFAULT '',
    "fotoext" TEXT DEFAULT '',
    "alt" TEXT NOT NULL,

    CONSTRAINT "t_tourdayphoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tourphoto" (
    "id" TEXT NOT NULL,
    "tourid" TEXT NOT NULL,
    "photo" TEXT,

    CONSTRAINT "t_tourphoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_meta" (
    "id" TEXT NOT NULL,
    "lang" CHAR(2) NOT NULL,
    "title" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL,
    "metadescription" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "t_tour_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_country" (
    "id" TEXT NOT NULL,
    "tour_id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,

    CONSTRAINT "t_tour_country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_day_price" (
    "id" TEXT NOT NULL,
    "tourid" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "double_price" INTEGER NOT NULL,
    "single_price" INTEGER NOT NULL,
    "transferPrice" INTEGER NOT NULL,

    CONSTRAINT "t_tour_day_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_faqs" (
    "id" TEXT NOT NULL,
    "tourid" TEXT NOT NULL,
    "faqid" TEXT NOT NULL,

    CONSTRAINT "t_tour_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_services" (
    "id" TEXT NOT NULL,
    "type_id" TEXT,
    "title" TEXT,
    "icon" TEXT,
    "price" INTEGER NOT NULL,
    "archive" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "t_tour_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_team" (
    "id" TEXT NOT NULL,
    "tour_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "t_tour_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tour_type" (
    "id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "photo_name" TEXT NOT NULL,
    "photo_ext" TEXT NOT NULL,
    "description" TEXT,
    "metakeywords" TEXT,
    "metadescription" TEXT,
    "parent" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "t_tour_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_users" (
    "id" TEXT NOT NULL,
    "login" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "password" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 2,
    "photo" TEXT NOT NULL,

    CONSTRAINT "t_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_users_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type_name" TEXT NOT NULL DEFAULT 'guest',

    CONSTRAINT "t_users_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_user_address" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "t_user_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_video" (
    "id" TEXT NOT NULL,
    "header" VARCHAR(255) NOT NULL DEFAULT '',
    "code" TEXT NOT NULL DEFAULT '',
    "header_en" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "t_video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_types_url_key" ON "t_types"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_city_url_key" ON "t_city"("url");

-- CreateIndex
CREATE INDEX "t_city_country_id_idx" ON "t_city"("country_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_country_url_key" ON "t_country"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_dayplace_tourid_dayid_placeid_key" ON "t_dayplace"("tourid", "dayid", "placeid");

-- CreateIndex
CREATE UNIQUE INDEX "t_guide_url_key" ON "t_guide"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_hotel_url_key" ON "t_hotel"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_news_url_key" ON "t_news"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_news_type_url_key" ON "t_news_type"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_pages_url_key" ON "t_pages"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_place_url_key" ON "t_place"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_restaurant_url_key" ON "t_restaurant"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_tour_url_key" ON "t_tour"("url");

-- CreateIndex
CREATE UNIQUE INDEX "t_tour_day_price_tourid_date_start_date_end_key" ON "t_tour_day_price"("tourid", "date_start", "date_end");

-- CreateIndex
CREATE UNIQUE INDEX "t_users_login_key" ON "t_users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "t_users_email_key" ON "t_users"("email");

-- AddForeignKey
ALTER TABLE "t_banner" ADD CONSTRAINT "t_banner_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "t_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_city" ADD CONSTRAINT "t_city_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "t_country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_hotel" ADD CONSTRAINT "t_hotel_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "t_country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_hotel" ADD CONSTRAINT "t_hotel_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "t_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_hotel_photo" ADD CONSTRAINT "t_hotel_photo_hotelid_fkey" FOREIGN KEY ("hotelid") REFERENCES "t_hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_hotel_rooms" ADD CONSTRAINT "t_hotel_rooms_hotelid_fkey" FOREIGN KEY ("hotelid") REFERENCES "t_hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_news" ADD CONSTRAINT "t_news_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "t_news_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_orders" ADD CONSTRAINT "t_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_place" ADD CONSTRAINT "t_place_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "t_country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_place" ADD CONSTRAINT "t_place_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "t_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour" ADD CONSTRAINT "t_tour_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "t_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tourcity" ADD CONSTRAINT "t_tourcity_tourid_fkey" FOREIGN KEY ("tourid") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tourcity" ADD CONSTRAINT "t_tourcity_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "t_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tourtoday" ADD CONSTRAINT "t_tourtoday_tourid_fkey" FOREIGN KEY ("tourid") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tourdayphoto" ADD CONSTRAINT "t_tourdayphoto_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "t_tourtoday"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tourphoto" ADD CONSTRAINT "t_tourphoto_tourid_fkey" FOREIGN KEY ("tourid") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_country" ADD CONSTRAINT "t_tour_country_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_country" ADD CONSTRAINT "t_tour_country_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "t_country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_day_price" ADD CONSTRAINT "t_tour_day_price_tourid_fkey" FOREIGN KEY ("tourid") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_faqs" ADD CONSTRAINT "t_tour_faqs_tourid_fkey" FOREIGN KEY ("tourid") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_faqs" ADD CONSTRAINT "t_tour_faqs_faqid_fkey" FOREIGN KEY ("faqid") REFERENCES "t_faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_team" ADD CONSTRAINT "t_tour_team_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "t_tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_team" ADD CONSTRAINT "t_tour_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "t_team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_tour_type" ADD CONSTRAINT "t_tour_type_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "t_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_user_address" ADD CONSTRAINT "t_user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "t_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
