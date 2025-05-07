import { pgTable, text, serial, integer, boolean, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Employee schema
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  joiningDate: text("joining_date").notNull(),
  profile: text("profile"),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true
});

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

// Candidate schema
export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  status: text("status").notNull(),
  resume: text("resume"),
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;

// Leave schema
export const leaves = pgTable("leaves", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  employeeName: text("employee_name").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  date: text("date").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull(),
  document: text("document"),
  profile: text("profile"),
});

export const insertLeaveSchema = createInsertSchema(leaves).omit({
  id: true
});

export type InsertLeave = z.infer<typeof insertLeaveSchema>;
export type Leave = typeof leaves.$inferSelect;

// Attendance schema
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  task: text("task").notNull(),
  status: text("status").notNull(),
  profile: text("profile"),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
  date: true
});

export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendance.$inferSelect;
