---
title: "Ledger"
permalink: /ledger/
---

I built Ledger because I was tired of managing my finances in a spreadsheet and didn't want to hand all my account data to yet another cloud app. I wanted something that was fast to update — we're talking five minutes at the end of the month — and that lived on my own hardware. So I built the thing I actually wanted to use.

**[View on GitHub](https://github.com/panderson54/ledger_finance)**

---

### What it tracks

- Net worth across all your accounts with automatic monthly calculations
- Savings rate — income vs. spending, broken down by account or card
- Asset allocation with drift analysis and guidance on when to rebalance
- Projections to financial independence based on your actual numbers
- S&P 500 comparison so you can see how your portfolio is doing against the benchmark

### Getting your data in and out

- CSV import that handles whatever date format your bank exports (`Jan '24`, `2024-01`, whatever)
- CSV export for snapshots and spending data
- Recurring entries that auto-populate each month so you're not re-entering the same stuff
- Import audit log so you can see what came in and when

### Running it

Ledger runs as a local Flask app backed by SQLite — no external database needed. I run it on a Raspberry Pi using Gunicorn. If you want to set that up as a home server, [the repo has everything you need](https://github.com/panderson54/ledger_finance).

One thing worth knowing: there's no built-in authentication. This thing is designed to live on your local network or behind a VPN — don't put it on the open internet.

### Tech stack

Python / Flask 3.0 · SQLite / SQLAlchemy 2.0 · Bootstrap 5 · Plotly 5.18 · pandas 2.2

### Fork it, modify it, whatever

If you want to use this for your own finances, go for it. Fork the repo, change what doesn't work for you, ignore what doesn't apply. If you want to contribute something back, pull requests are welcome.

I'll keep updating this as my own needs change, so expect it to keep evolving. v1.0 "Keynes" is just the start.
