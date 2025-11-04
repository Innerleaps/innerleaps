-- Create masterclass_registrations table
create table public.masterclass_registrations (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  naam text not null,
  email text not null,
  is_leidinggevende boolean not null,
  functie_titel text not null,
  selected_timeslot text not null,
  timeslot_display text not null,
  calendar_url text,
  source_page text default 'masterclass-stress-qr',
  
  primary key (id)
);

-- Enable RLS
alter table public.masterclass_registrations enable row level security;

-- RLS Policies
create policy "Allow anonymous inserts"
  on public.masterclass_registrations
  for insert
  with check (true);

create policy "No public read access"
  on public.masterclass_registrations
  for select
  using (false);

create policy "No updates allowed"
  on public.masterclass_registrations
  for update
  using (false);

create policy "No deletes allowed"
  on public.masterclass_registrations
  for delete
  using (false);

-- Index for quick email lookups (duplicate detection)
create index idx_masterclass_registrations_email 
  on public.masterclass_registrations(email, created_at desc);

-- Index for analytics/reporting
create index idx_masterclass_registrations_timeslot 
  on public.masterclass_registrations(selected_timeslot, created_at desc);