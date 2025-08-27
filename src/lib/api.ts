// api.ts - Centralized API functions for fetching backend data

export const API_BASE = "http://localhost:5000/api"; 
export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function fetchCareers() {
  const res = await fetch(`${API_BASE}/careers`);
  if (!res.ok) throw new Error("Failed to fetch careers");
  return res.json();
}

export async function fetchUniversities() {
  const res = await fetch(`${API_BASE}/universities`);
  if (!res.ok) throw new Error("Failed to fetch universities");
  return res.json();
}