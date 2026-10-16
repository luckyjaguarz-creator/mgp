import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortTitle: text("short_title"),
  category: text("category").default("Градостроительное проектирование").notNull(),
  normBase: text("norm_base").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  stages: text("stages").notNull(), // JSON array
  results: text("results").notNull(), // JSON array
  iconName: text("icon_name").notNull(),
  duration: text("duration").default("от 30 рабочих дней"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  year: integer("year").notNull(),
  status: text("status").notNull(), // "Утвержден" | "В работе" | "Согласование"
  excerpt: text("excerpt").notNull(),
  description: text("description").notNull(),
  tep: text("tep"), // JSON key-value
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "Муниципальные образования" | "Бизнес-партнеры"
  logoFile: text("logo_file").notNull(),
  websiteUrl: text("website_url"),
  description: text("description"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const usefulLinks = pgTable("useful_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // "Государственные системы" | "Кадастровые карты" | "Инструменты инженера" | "Нормативно-правовая база"
  url: text("url").notNull(),
  description: text("description").notNull(),
  badge: text("badge"),
  isExternal: boolean("is_external").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceType: text("service_type"),
  cadastralNumber: text("cadastral_number"),
  message: text("message"),
  fileName: text("file_name"),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
