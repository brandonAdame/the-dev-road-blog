import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const BlogPosts = pgTable("blog_posts", {
  id: integer().primaryKey().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  blog_title: varchar("blog_title").unique().notNull(),
  blog_content: text("blog_content").notNull(),
  slug: text("slug").notNull().unique(),
});
