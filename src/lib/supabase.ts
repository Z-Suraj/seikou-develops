import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RealEstateInquiry, ConstructionInquiry } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey &&
  supabaseAnonKey.trim().length > 0
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage keys for resilient data retention when backend env vars are pending
const RE_STORAGE_KEY = 'seikou_re_inquiries';
const CONST_STORAGE_KEY = 'seikou_const_inquiries';

export function getStoredRealEstateInquiries(): RealEstateInquiry[] {
  try {
    const raw = localStorage.getItem(RE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read real estate inquiries from storage', e);
    return [];
  }
}

export function getStoredConstructionInquiries(): ConstructionInquiry[] {
  try {
    const raw = localStorage.getItem(CONST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read construction inquiries from storage', e);
    return [];
  }
}

export async function submitRealEstateInquiry(
  data: Omit<RealEstateInquiry, 'id' | 'createdAt'>
): Promise<{ success: boolean; id: string; persistedToSupabase: boolean; error?: string }> {
  const newInquiry: RealEstateInquiry = {
    ...data,
    id: `RE-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  // Always retain locally so administration works regardless of network
  try {
    const current = getStoredRealEstateInquiries();
    localStorage.setItem(RE_STORAGE_KEY, JSON.stringify([newInquiry, ...current]));
  } catch (err) {
    console.warn('LocalStorage save failed', err);
  }

  // If Supabase is connected, persist to remote database
  if (supabase) {
    try {
      const { error } = await supabase.from('real_estate_inquiries').insert([
        {
          id: newInquiry.id,
          full_name: newInquiry.fullName,
          phone: newInquiry.phone,
          email: newInquiry.email,
          property_category: newInquiry.propertyCategory,
          requirement: newInquiry.requirement,
          preferred_location: newInquiry.preferredLocation,
          budget_range: newInquiry.budgetRange,
          message: newInquiry.message,
          created_at: newInquiry.createdAt,
        },
      ]);

      if (error) {
        console.warn('Supabase insertion error:', error.message);
        return { success: true, id: newInquiry.id, persistedToSupabase: false, error: error.message };
      }
      return { success: true, id: newInquiry.id, persistedToSupabase: true };
    } catch (e: any) {
      return { success: true, id: newInquiry.id, persistedToSupabase: false, error: e?.message };
    }
  }

  return { success: true, id: newInquiry.id, persistedToSupabase: false };
}

export async function submitConstructionInquiry(
  data: Omit<ConstructionInquiry, 'id' | 'createdAt'>
): Promise<{ success: boolean; id: string; persistedToSupabase: boolean; error?: string }> {
  const newInquiry: ConstructionInquiry = {
    ...data,
    id: `CONST-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const current = getStoredConstructionInquiries();
    localStorage.setItem(CONST_STORAGE_KEY, JSON.stringify([newInquiry, ...current]));
  } catch (err) {
    console.warn('LocalStorage save failed', err);
  }

  if (supabase) {
    try {
      const { error } = await supabase.from('construction_inquiries').insert([
        {
          id: newInquiry.id,
          full_name: newInquiry.fullName,
          phone: newInquiry.phone,
          email: newInquiry.email,
          project_type: newInquiry.projectType,
          project_location: newInquiry.projectLocation,
          approximate_size: newInquiry.approximateSize,
          requirement_description: newInquiry.requirementDescription,
          message: newInquiry.message,
          created_at: newInquiry.createdAt,
        },
      ]);

      if (error) {
        console.warn('Supabase insertion error:', error.message);
        return { success: true, id: newInquiry.id, persistedToSupabase: false, error: error.message };
      }
      return { success: true, id: newInquiry.id, persistedToSupabase: true };
    } catch (e: any) {
      return { success: true, id: newInquiry.id, persistedToSupabase: false, error: e?.message };
    }
  }

  return { success: true, id: newInquiry.id, persistedToSupabase: false };
}

export const SUPABASE_SETUP_SQL = `-- Supabase SQL Schema for Seikou Develops
-- Run this in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS real_estate_inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  property_category TEXT NOT NULL,
  requirement TEXT NOT NULL,
  preferred_location TEXT,
  budget_range TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS construction_inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_location TEXT,
  approximate_size TEXT,
  requirement_description TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE real_estate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE construction_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public lead submissions (Insert only)
CREATE POLICY "Allow public submission for RE" ON real_estate_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public submission for Construction" ON construction_inquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view and manage leads
CREATE POLICY "Allow authenticated read for RE" ON real_estate_inquiries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read for Construction" ON construction_inquiries
  FOR SELECT TO authenticated USING (true);
`;
