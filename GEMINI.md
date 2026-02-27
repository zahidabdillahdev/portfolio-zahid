# AGENTS.md — Zahid Portfolio Architecture

## Project Purpose

Transform Once UI Magic Portfolio into a dynamic, self-managed portfolio with an integrated admin dashboard.

The dashboard must allow CRUD operations while preserving the original Magic Portfolio design system.

---

## Core Stack

Frontend + Backend:

* Next.js (App Router)
* TypeScript
* Once UI Magic Portfolio

Infrastructure:

* OCI Ubuntu Server (ARM)
* PostgreSQL (self-hosted)
* Cloudflare R2 (file storage)
* Cloudflare Access (authentication layer)

No internal authentication system must be implemented.

---

## Architectural Rule

Magic Portfolio MUST remain the visual foundation.

Agents must EXTEND the system, never rewrite or replace existing layout or routing logic.

---

## Dashboard Requirements

Create an integrated admin dashboard located at:

/dashboard

Requirements:

* Uses existing Once UI layout automatically
* Shares typography, spacing, and theme
* Accessible only behind Cloudflare Access
* No login UI inside application

Dashboard features:

* Create project
* Edit project
* Delete project
* Upload media
* Manage certificates
* Update portfolio content

---

## Data Strategy

Current system:
Static MDX and config-based content.

Target system:
Hybrid model.

Rules:

* Static content remains fallback.
* Database content overrides static content when available.
* Migration must be incremental.

---

## Database Rules

Use PostgreSQL via environment variables.

Database stores:

* projects
* certificates
* media metadata

Never store files directly in database.

---

## Storage Rules

All uploaded files must be stored in Cloudflare R2.

Database only stores URLs and metadata.

---

## Coding Constraints

* Prefer Server Components
* Avoid unnecessary client components
* Maintain SEO rendering
* Preserve existing routes
* Avoid destructive refactors

---

## Commit Convention

feat: feature
fix: bug
refactor: structure improvement
style: UI update
docs: documentation
chore: setup

---

## Agent Goal

Gradually evolve Magic Portfolio into a CMS-powered portfolio without breaking compatibility.
