---
title: Building NextGen
description: A database-first 3D plant design system for oil and gas — discipline tools in Electron, a spatial-graph backend, and derived PFD/P&ID docs, still mid–Phase 1 MVP.
date: 2026-08-10
published: true
tags: [nextgen, plant-design, threejs, electron, postgresql, typescript, portfolio]
---

# Building NextGen

[NextGen](https://github.com/mmmbacon/nextgen) is a plant design system I am building for the oil and gas engineering industry. The pitch is simple: the 3D model is the source of truth. Every object lives in a spatial-graph database; drawings and diagrams are derived from that model, not the other way around.

Phase 1 — the 3D modeling MVP — is roughly halfway done. This post is a walkthrough of what works today, with screenshots of the pieces that matter most.

## The idea

Legacy plant tools are powerful and heavy. NextGen aims at the same problem domain with a modern stack: Electron + React + Three.js on the desktop, NestJS and PostgreSQL/PostGIS on the backend, and Rust/OpenCascade for commit-time solid geometry.

The design philosophy I keep coming back to:

- **Model as source of truth** — author in 3D; documents follow
- **Database-driven** — parametric objects with hierarchy, edges, and spatial queries
- **Discipline-focused** — specialized tools for piping, structural, vessel, area, and equipment work
- **Open standards where it counts** — DEXPI for P&ID exchange today; IFC and friends on the roadmap

I am not claiming AutoCAD or Smart 3D parity. I am building a focused MVP that proves the architecture and the day-to-day modeling loop.

## App shell and discipline modes

The desktop app is an Electron shell around a Three.js viewport. Discipline modes sit on a vertical toolbar; the object tree and property panel stay available while you model.

![Desktop shell: viewport, discipline toolbar, object tree, and property panel](/blog/nextgen/01-desktop-shell.png)

Working modes with real tools today include piping, structural, vessel, assembly, area/equipment management, and coordinate systems. Electrical and system modes exist as scaffolding; I am not leading with those yet.

## Piping

Piping is the clearest demo of path-based geometry. You draw centerline runs, then place fittings from the toolbar — elbows, tees, flanges, weldolets, supports — against ANSI/ASME-style catalogs.

![Piping run with elbows, tee, and flanges](/blog/nextgen/02-piping-run.png)

There is also auto-route between nozzles and flanges, which is useful when a vessel already owns connectable nozzle systems. You pick the ends, get a proposed route, and can recalculate when the layout changes.

![Auto-route in progress between vessel connections](/blog/nextgen/03-auto-route.png)

![Completed auto-routed pipe run between vessels](/blog/nextgen/03-auto-route-complete.png)

## Connection endpoints and snapping

Selecting a pipe or structural member exposes endpoint gizmos. Unconnected ends read yellow; connected ends green. Click-move-click repositions an endpoint with a ghost preview; nearby objects offer snap targets so connections land in the database as real relationships.

![Selected pipe showing endpoint gizmos and snap feedback](/blog/nextgen/04-connection-endpoints.png)

This is the interaction layer that makes centerline modeling feel like engineering software instead of freeform mesh sculpting.

## Structural

Structural tools cover beams, columns, piles, plates/slabs, foundations, end plates, base plates, stiffeners, and copes. Profiles pull from shared CISC-oriented catalogs (with AISC-style W-shapes in the placement UI as well). Continuous placement and optional connection creation keep a frame moving quickly once the grid is set.

![Column placement on a structural grid with elevation markers](/blog/nextgen/05-column-placement.png)

![Beam placement with W-shape options and create-connections enabled](/blog/nextgen/05-beam-placement.png)

## Vessels

Vessels are parametric: shell, heads, skirt, baseplate, and a nozzle schedule that creates child piping systems you can route from. Specs live in an edit dialog — diameter, length, orientation, nozzle NPS and position — then rebuild in the model.

![Edit Vessel dialog with shell specs and nozzle schedule](/blog/nextgen/06-vessel-1.png)

![Parametric vessel in the model with nozzles and nearby structure](/blog/nextgen/06-vessel-2.png)

Together with structural, this shows that the same path-and-profile pipeline serves linear members and equipment-driven piping, not just one domain.

## Coordinate systems

Before a dense model fills the viewport, a UCS / grid gives you something to snap against: counts and spacing in X and Y, elevation levels, and an orientation lock. Columns and beams in the shots above sit on that kind of framework.

![Coordinate system placement with grid counts, spacing, and elevations](/blog/nextgen/07-coordinate-systems.png)

## Areas, volumes, and views

Plant work needs spatial organization. Area and equipment volumes are translucent boxes you can place, select, and use for visibility filtering. There is also a detail-view volume meant for later drawing generation — not a full drawing tool yet, but the hook is in the model.

![Area and equipment volumes in the viewport](/blog/nextgen/08-volumes.png)

Volumes stay hidden by default so the scene stays readable; turn them on when you need plant structure, not just geometry.

## Spec Manager and PFD/P&ID

Beside the desktop app sits a web dashboard. Spec Manager holds structural CISC data and piping material-class packs (CS-150, SS-300, AS-150) with schedule/matrix editing. Placement enforcement is still maturing; the catalog surface is already useful.

![Spec Manager showing a piping or structural pack](/blog/nextgen/09-spec-manager.png)

PFD and P&ID editing uses a React Flow diagram editor with symbol libraries, process/signal lines, and DEXPI 1.4 import/export. Bidirectional tag linking back to the 3D model is still in progress — the diagram side exists; full sync does not.

![PFD or P&ID diagram in the dashboard](/blog/nextgen/10-pid-diagram.png)

## How it is built

At a high level:

```
Electron (React + Three.js)
        │
        ▼
   NestJS API (/api/v1)
        │
        ▼
PostgreSQL + PostGIS  ←—— spatial prefetch, hierarchy, edges
        │
        ▼
   Rust FFI + OCCT    ←—— commit-time solids / display mesh
```

Objects are parametric (centerline + profile, vessel specs, transforms). The renderer regenerates display geometry; the database stays the authority. Spatial APIs support bbox prefetch and detail fetch so the viewport can load plant-scale data without pulling everything at once.

The monorepo also includes the dashboard (diagrams, specs, WBS, users) and a Rust core for OpenCascade and import work. CI covers TypeScript packages and Rust (clippy + tests).

## Honest status

Phase 1 is in progress. Solid today: piping and structural tool sets, vessel placement, assemblies, area/equipment volumes, UCS, 3D selection/snapping/measure, Spec Manager catalogs, and PFD/P&ID with DEXPI.

Still thin or stubbed: electrical tray placement, modular package boundaries, rule/clearance manager, full IFC export, and complete diagram ↔ 3D linking. Near-term work is finishing piping joints (reducers, valves), richer vessel nozzle UX, structural bracing/connections, and tightening specs against placement.

## What’s next

I want the MVP to close the loop from catalog → discipline tools → model → derived documents without pretending every discipline is done. Demo models, installers, and a clearer public README will come with that.

For now, NextGen is the project where I am putting the most depth: spatial data modeling, multi-discipline 3D UX, and a stack that can grow into drawings and modular workflows without rewriting the core.
