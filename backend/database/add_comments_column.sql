-- Migration: Add comments column to initiatives table
ALTER TABLE initiatives ADD COLUMN comments TEXT;
