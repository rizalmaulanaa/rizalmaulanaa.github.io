---
title: HCC — CCTV AI Safety Command Center
category: Computer Vision
year: 2026
featured: true
order: 2
summary: An end-to-end CCTV AI platform for workplace safety — edge YOLO detection, a VLM second opinion, WhatsApp alerts, and a command-center dashboard.
tags: [YOLO, VLM, FastAPI, SvelteKit, Redis, TimescaleDB, MinIO]
repos:
  - name: hcc-ingest
    role: Stream ingest — go2rtc pulls RTSP, Tuya, and WebRTC camera feeds and re-serves them at stable addresses for the detector.
  - name: hcc-detector
    role: Edge detector — YOLO inference on on-site MiniPCs for PPE compliance, fatigue (PERCLOS, yawning, head drop), and proximity to energized equipment.
    url: https://github.com/project-anak-muda/hcc-detector
    private: true
  - name: hcc-reviewer
    role: Reviewer — pulls detections from a Redis queue, re-checks each one with a vision-language model, and sends cooldown-throttled WhatsApp alerts.
    url: https://github.com/project-anak-muda/hcc-reviewer
    private: true
  - name: hcc-api
    role: Control-plane REST API — cameras, models, camera-to-model assignments, training runs with human promote/reject, and detection queries.
    url: https://github.com/project-anak-muda/hcc-api
    private: true
  - name: hcc-common
    role: Shared library — settings, database schema, object-storage layout, and Redis contracts, versioned with semver so every service agrees.
    url: https://github.com/project-anak-muda/hcc-common
  - name: FE-HCC-V2
    role: Command-center dashboard — SvelteKit 2 + ECharts, responsive from phone to video wall, with live detection feeds and annotation correction.
    url: https://github.com/project-anak-muda/FE-HCC-V2
    private: true
---

A platform that turns ordinary CCTV into a **workplace-safety (K3) monitor** for PLN field sites. Cameras are watched by AI on the edge; every detection is double-checked before anyone is paged; and operators manage cameras, models, and retraining from one command center.

**Three safety analytics, one decode.** Each camera can run several analytics on the same decoded frames:

- **PPE compliance** — missing helmet, vest, or mask.
- **Fatigue** — PERCLOS, yawning, and head drop.
- **Proximity** — distance to energized equipment, in meters.

**Built for the field**

- **Survives bad networks.** The edge detector writes events to an on-disk outbox first and ships them in the background, so inference never waits on the network. In testing, 169 events queued during an outage were delivered once it recovered — with zero duplicates, thanks to idempotent event keys.
- **Survives power loss.** The queue lives on disk, so a restarted container picks up where it left off; it is capped so it can never fill the disk.
- **Dead cameras stay visible.** A camera that can't be opened still sends heartbeats, so the dashboard shows it as degraded instead of going silent.
- **Fewer false alarms.** A vision-language model gives each detection a second opinion before a WhatsApp alert goes out — and if the model fails, it errs on the side of confirming rather than dropping a real event.
- **Human-in-the-loop training.** Operators correct annotations in the dashboard, queue training runs, and promote or reject the resulting models.
