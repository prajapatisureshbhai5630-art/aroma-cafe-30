/*
# Create reservations table (single-tenant, public submission)

## Purpose
Aroma Cafe is a public marketing + reservation site with NO sign-in screen.
Visitors submit table-reservation requests through the website form; the cafe
owner reviews them in the Supabase dashboard. Because there is no
authentication, the anon-key frontend must be able to insert rows directly.

## New Tables
- `reservations`
  - `id`            uuid, primary key
  - `name`          text, not null — guest's full name
  - `phone`         text, not null — contact number
  - `email`         text, nullable — optional email
  - `date`          date, not null — requested reservation date
  - `time`          text, not null — requested time slot (e.g. "19:30")
  - `guests`        int, not null, default 2 — party size
  - `message`       text, nullable — optional notes / occasion
  - `status`        text, not null, default 'pending' — pending | confirmed | cancelled
  - `created_at`    timestamptz, default now()

## Security
- RLS enabled on `reservations`.
- Single-tenant, no-auth app → policies are `TO anon, authenticated`.
- Anyone visiting the site may submit a reservation (INSERT) and the cafe
  owner reads/manages rows from the Supabase dashboard (which bypasses RLS
  via the service role). Public SELECT is intentionally closed so one guest
  cannot read another guest's reservation details.
- INSERT is wide-open with WITH CHECK (true) since the data is user-submitted
  and there is no ownership concept to enforce without auth.
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  date date NOT NULL,
  time text NOT NULL,
  guests int NOT NULL DEFAULT 2,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- INSERT: anyone (anon + authenticated) may submit a new reservation request.
DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations"
ON reservations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT/UPDATE/DELETE are intentionally NOT granted to anon/authenticated.
-- The cafe owner manages reservations via the Supabase dashboard (service role),
-- which bypasses RLS. This keeps one guest from reading another's details.
