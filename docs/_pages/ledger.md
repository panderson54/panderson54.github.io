---
title: "Ledger"
permalink: /ledger/
---

A self-hosted personal finance dashboard for people who want to own their financial data.

Ledger is a locally-run web app built for tracking net worth, savings rate, and asset allocation without handing your data to a cloud service. Monthly data entry takes under five minutes. Everything stays on your machine.

**[View on GitHub](https://github.com/panderson54/ledger_finance)**

---

### What it tracks

- **Net worth** — monthly balance snapshots across all accounts with automatic calculations
- **Savings rate** — income vs. spending, categorized by account or card
- **Asset allocation** — holdings per account with drift analysis and rebalancing guidance
- **Financial independence projections** — compound-growth forecasts to your FI target
- **S&P 500 comparison** — benchmark your portfolio's performance over time

### Data management

- CSV import with flexible date formats (`Jan '24`, `2024-01`, etc.)
- CSV export for all snapshots and spending data
- Recurring entries that auto-populate each month
- Import audit logging

### Setup & deployment

Ledger runs as a local Flask app backed by SQLite — no external database or account required.

- **Local:** Python 3.10+, one `pip install`, runs on port 5001
- **Docker:** `docker-compose up` and you're done
- **Raspberry Pi:** Gunicorn + Nginx for a persistent home server setup

### Tech stack

Python / Flask 3.0 · SQLite / SQLAlchemy 2.0 · Bootstrap 5 · Plotly 5.18 · pandas 2.2

### A note on security

Ledger has no built-in authentication — it is designed for trusted local networks or VPN access only. Do not expose it to the public internet.

---

*First release: v1.0 "Keynes"*
