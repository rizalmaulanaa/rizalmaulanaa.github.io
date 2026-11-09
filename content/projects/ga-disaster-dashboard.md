---
title: PLN Recovery Center — Disaster Response & Executive Dashboards
category: Data
year: 2026
status: Production
featured: true
order: 3
summary: A disaster-response command map and an executive data platform for PLN's General Affairs & Property division, taken from development to production.
tags: [Next.js, Leaflet, FastAPI, TimescaleDB, Alembic, Google Sheets]
repos:
  - name: GA-monitoring-bencana-FE
    role: Disaster-response dashboard — Leaflet command map, logistics board, and a 1920×1080 wallboard for command posts (Next.js, ECharts).
    url: https://github.com/project-anak-muda/GA-monitoring-bencana-FE
    private: true
  - name: GA-Monotoring-BE
    role: Command-post API — reads the "assets affected by disaster" sheet that units fill in, normalizes it, and flags incomplete rows so units can be chased.
    url: https://github.com/project-anak-muda/GA-Monotoring-BE
    private: true
  - name: GA-data-ingest
    role: ETL — pulls Google Sheets, Excel, and application data into a raw layer, then publishes clean tables to the mart; runnable per division on a schedule or on demand.
    url: https://github.com/project-anak-muda/GA-data-ingest
    private: true
  - name: GA-data-migration
    role: Schema owner — Alembic migrations for the TimescaleDB database, including render-ready views and a read-only role for the API.
    url: https://github.com/project-anak-muda/GA-data-migration
    private: true
  - name: GA-api-read-only
    role: Read API — thin FastAPI layer serving the executive dashboard's KPIs, budgets, projects, and procurement from the mart views.
    url: https://github.com/project-anak-muda/GA-api-read-only
    private: true
---

Data products for PLN's **General Affairs & Property division (Divisi Umum & Aset Properti)**, taken from development to production.

**Disaster-response dashboard (PLN Recovery Center).** During a disaster, units across Indonesia report damaged property assets, access routes, and logistics needs in a shared sheet. The dashboard turns that into:

- a **command map** of affected assets with per-unit detail,
- a **logistics board** with a priority queue and needs per region, and
- a **wallboard** scaled for the screens in a command post.

A deliberate rule runs through it: **the dashboard never shows numbers it didn't get from the API.** If the API is down, it says why instead of falling back to sample data — a screen full of plausible-looking fake numbers is the costliest mistake in an emergency. Test data sources are visually marked so they can't be mistaken for the real thing.

**Executive dashboard data platform.** A small, layered pipeline behind the division's executive dashboard:

Google Sheets / Excel / apps → **data-ingest** (raw → mart) → **TimescaleDB** (schema owned by **data-migration**) → **read-only API** → dashboard.

- The database does the math. Render-ready views supply percentages, rankings, status labels, and display text, so the API only selects rows and the frontend only draws.
- Least privilege throughout: the API connects with a role that can only read the mart.
- Change history is kept by trigger, while the mart always holds the latest state.
- New divisions plug in by registering a connector — no pipeline changes.
