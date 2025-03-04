import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  bigserial,
  integer,
} from "drizzle-orm/pg-core";
export const callDirection = pgEnum("callDirectionEnum", [
  "outgoing",
  "incoming",
]);
export const callStatus = pgEnum("callStatus", [
  "initiated",
  "accepted",
  "rejected",
  "missed",
]);
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const contacts = pgTable("contacts", {
  id: bigserial({ mode: "bigint" }).primaryKey(),
  name: text("name").notNull(),
  userId: text("user")
    .notNull()
    .references(() => user.id),
  phoneNumber: text("phone_number").notNull(),
  e164Rep: text("e164_rep").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});
export type ContactSelect = typeof contacts.$inferSelect;
export const callHistory = pgTable("callHistory", {
  id: bigserial({ mode: "bigint" }).primaryKey(),
  contact: bigserial("contact_id", { mode: "bigint" }).references(
    () => contacts.id,
  ),
  extCallId: text("ext_call_id").notNull(),
  anonymousCall: text("anonymous_call"),
  status: callStatus("status"),
  userId: text("user_id").references(() => user.id),
  duration: integer("duration"),
  direction: callDirection("direction").notNull(),
});

export const schema = {
  user,
  verification,
  account,
  session,
};
