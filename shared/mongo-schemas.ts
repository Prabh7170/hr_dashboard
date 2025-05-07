import { z } from "zod";

// User schema
export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string().optional(),
  role: z.string().default("employee"),
});

export type User = {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
};

export type InsertUser = {
  username: string;
  password: string;
  name?: string;
  role?: string;
};

// Employee schema
export const employeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position: z.string(),
  department: z.string(),
  joinDate: z.string(),
  status: z.string().default("active"),
  profile: z.string().nullable().optional(),
});

export type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
  profile: string | null;
};

export type InsertEmployee = {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status?: string;
  profile?: string | null;
};

// Candidate schema
export const candidateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string(),
  status: z.string().default("screening"),
  appliedDate: z.string().optional(),
  resume: z.string().nullable().optional(),
});

export type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  appliedDate: string;
  resume: string | null;
};

export type InsertCandidate = {
  name: string;
  email: string;
  phone?: string;
  position: string;
  status?: string;
  appliedDate?: string;
  resume?: string | null;
};

// Leave schema
export const leaveSchema = z.object({
  employeeId: z.number(),
  employeeName: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  date: z.string(),
  reason: z.string(),
  status: z.string().default("pending"),
  type: z.string().default("vacation"),
  document: z.string().nullable().optional(),
  profile: z.string().nullable().optional(),
});

export type Leave = {
  id: number;
  employeeId: number;
  employeeName: string;
  position: string;
  department: string;
  date: string;
  reason: string;
  status: string;
  type: string;
  document: string | null;
  profile: string | null;
};

export type InsertLeave = {
  employeeId: number;
  employeeName?: string;
  position?: string;
  department?: string;
  date: string;
  reason: string;
  status?: string;
  type?: string;
  document?: string | null;
  profile?: string | null;
};

// Attendance schema
export const attendanceSchema = z.object({
  employeeId: z.number(),
  name: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  task: z.string().optional(),
  status: z.string().default("present"),
  profile: z.string().nullable().optional(),
  date: z.date().optional(),
});

export type Attendance = {
  id: number;
  employeeId: number;
  name: string;
  position: string;
  department: string;
  task: string;
  status: string;
  profile: string | null;
  date: Date;
};

export type InsertAttendance = {
  employeeId: number;
  name?: string;
  position?: string;
  department?: string;
  task?: string;
  status?: string;
  profile?: string | null;
  date?: Date;
};