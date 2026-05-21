---
title: "Building Ledger: A Personal Finance App Built With Claude"
classes: wide
categories:
  - software
tags:
  - software
  - ai
  - journal
---

# Building Ledger: A Personal Finance App Built With Claude

This site exists, per my own about page, as a vehicle for me to explore and organize things I've learned by writing about them. This post is about building Ledger, a self-hosted personal finance dashboard, and what I learned doing it almost entirely with Claude as a development partner.

For a few years my wife and I tracked our finances using a Google Sheet built by Money With Katie, a personal finance resource connected to Morning Brew where my wife works. It was a great starting point - got us paying attention to our finances and actually talking about money in a useful way. I'd recommend it to anyone getting started.

After three years the cracks started to show - not in the spreadsheet, but in how we were using it. Our priorities had shifted toward investment tracking: allocations, savings rate, risk exposure across a portfolio. The spreadsheet had a lot of machinery for things we didn't need anymore and not enough of what we did: a macro view of net worth, portfolio composition, and savings rate over time. The monthly update also took about an hour. Too many accounts, tedious entry, and we kept putting it off until we stopped altogether.

My first instinct was to hack the spreadsheet apart. I spent about 45 minutes on this before giving up and deciding to build something from scratch. And since I wanted to use this as a testbed for working more seriously with AI assisted development - something increasingly relevant professionally - I treated it as an opportunity to figure out how to build something real with Claude rather than just using it as a smarter autocomplete.

# The Process

## Planning Before Building

The first thing I did was not write any code. On walks with my dog I had planning conversations with Claude in a Project. Brain dumps about what I wanted, what I disliked about existing finance tools, what features were necessary vs. not. Claude interviewed me, I rambled, we worked backward toward requirements.

Those requirements got formalized into a PRD that lived in the repo. Not just features but constraints:

- **Tech stack:** Python and Flask. Things I've worked with and can read.
- **Code structure:** How the project should be organized, what patterns to follow.
- **Framework decisions:** Claude helped evaluate options. We landed on Bootstrap 5.

The goal was that by the time an agent was writing code it had enough context to not produce something unreadable or architecturally bizarre.

## Iterative Development

From there:

1. Build something minimal
2. Get it running, use it
3. Note what's missing or broken
4. Planning conversation to scope the fix or feature
5. Build it
6. Repeat

The UI went through a few passes. I'd look at Fidelity, Schwab, Wealthfront - not to copy them but to understand what information hierarchies made sense for finance dashboards. Feed those observations back into planning sessions, do some rough mocking, land on something I liked.

I also ran agent "personas" to critique the product - a financial advisor, a high net worth individual, a UI/UX designer. The financial advisor and HNW personas were useful for identifying requirements around net worth projections, FI calculations, and industry standard approaches I wasn't familiar with. The UI/UX designer surfaced interface patterns and practices I wouldn't have thought to include. More on this below.

When I started using the app for real I kept a running dialogue in the same chat context. "This is what I noticed. Here's what I don't like. Here's what I want." That became the backlog. Prioritize with the agent, let it execute.

## Shipping from a Phone

With a newborn, sitting down at a laptop for hobby projects essentially stopped being an option. I was on paternity leave at a moment when AI tooling was moving fast and I wanted something more engaging to do during contact naps than watch TV - so by necessity, essentially all of this development happened on my phone. Claude helped me set up CI/CD scripts so the Raspberry Pi serving the app would pick up changes from GitHub and automatically redeploy. That meant I could start a development session from my phone, describe what I wanted, review a PR, and see the result running on the home network within minutes - no laptop required.

The other thing I hadn't anticipated: you can offload more than just the interesting work. I'd been treating Claude as a tool for creative and architectural tasks - feature design, planning, writing code. What I hadn't done was hand over the friction tasks: debugging, log triage, merge conflicts. All of those are things the model can handle when it already has the codebase and PR context loaded. Once I started doing that, I stopped having backlogs of unmerged branches and undiagnosed errors sitting around waiting for me to find time at a computer.

# What I Built (And What I Didn't)

## The App

![Ledger Dashboard]({{ site.url }}{{ site.baseurl }}/assets/images/ledger_hero.png){: .align-center}

Ledger is a self-hosted personal finance dashboard. Monthly net worth tracking across account types (cash, retirement, investments, real estate, mortgage) with calculated metrics for savings rate and net worth change. There's a holdings system for tracking individual securities, a projections view for modeling portfolio growth and FI timeline, and a dividends view for understanding portfolio income.

![Projections — Path to FI]({{ site.url }}{{ site.baseurl }}/assets/images/ledger_projections.png){: .align-center}

![Reports — Portfolio Allocation & Asset Drift]({{ site.url }}{{ site.baseurl }}/assets/images/ledger_charts.png){: .align-center}

Tech stack:
- **Backend:** Python, Flask, SQLAlchemy, SQLite
- **Frontend:** Bootstrap 5, Plotly for charts, vanilla JS
- **AI integration:** Anthropic API (Haiku) for holdings classification; Yahoo Finance for price data

The architecture I'm most happy with: Haiku owns reasoning and classification tasks, Yahoo Finance owns price data. Clean separation, keeps costs low.

## What I Left Out

Ledger has no budgeting features. No spending categories. No "you overspent $12 on groceries" notifications. No debt payoff calculator.

Monthly cash flow entry is intentionally blunt: total income, total expenses. I look at my credit card bills, add them up, enter the number. I look at my paycheck, enter the number. Five minutes, no categorization.

![Monthly Data Entry]({{ site.url }}{{ site.baseurl }}/assets/images/ledger_monthly_update.png){: .align-center}

Most personal finance apps are built around budgeting and debt management - that's a real and important problem for a lot of people. Ledger is built for a different use case: savings rate, risk exposure, asset allocation, and portfolio performance over time. Anything else would have been scope creep.

The holdings classification feature is a good example of what I built instead. Enter a ticker symbol, the Anthropic API pulls information about the fund and classifies it automatically - domestic equity, international, bonds, market cap, sector. Building this required stitching together Yahoo Finance and the Anthropic API in a way I might have dismissed as too difficult or time intensive without going through a planning session first. Planning with Claude made the path obvious, then we built it.

# What I Learned About Working With LLMs

Before this project I used LLMs carefully and formally - writing prompts like drafting an email to a senior colleague. Part of this was that I wasn't used to voice dictation, which is actually how I do most of my planning with Claude now: walking the dog, dictating into my phone. Once I started doing that the whole interaction changed. Stream of consciousness works. Clarity comes faster when you're not spending energy on formality.

The other shift was around iteration. Failing fast and cheap iteration have always been hallmarks of software engineering - that's part of what makes it different from traditional engineering. In professional contexts I'd internalized that. What I hadn't applied it to was personal projects, where my time is genuinely limited and I'm not going to try five different approaches to see what sticks. Working with Claude changed that calculus for hobby development specifically. I can explore more ideas, move faster, and throw things away without it costing me a weekend.

A few things that made the process work:

**Use a tech stack you know.** The reason I could maintain engineering judgment over what the agent was producing - catch bad patterns, question architectural decisions, understand what was being built - is that I know Python and Flask. If I'd let Claude pick the stack I might have ended up with something I couldn't read or maintain. Your expertise is what makes AI-assisted development more than just vibe coding.

**Keep context alive.** Using a persistent Project meant planning conversations, backlog items, and architectural decisions built on each other over time. The agent knew the codebase, knew the constraints, knew why decisions had been made. That's what makes it a development partner rather than a code generator.

**Use agent teams for perspectives you don't have.** Running a prompt through a single agent gives you one perspective. Running it through a team of agents with different personas gives you something closer to a real design review. I used this a few different ways: software engineer personas for code reviews (useful for catching things I'd let slide because I was moving fast), finance professional and HNW user personas for feature feedback and sanity checking the financial accuracy of the app, and to surface industry standard features I'd internalized from years of using finance apps but hadn't thought to articulate as explicit requirements - the kind of thing you only notice when it's missing.

# Where It Stands

Ledger runs on a Raspberry Pi on my home network. CI/CD pipeline. Test suite. Backlog is alive and I'm still adding to it.

The five-minutes-a-month target is still a little aspirational - I'm working on it. The unexpected win has been the dividends view. I knew the portfolio generated some passive income but had never looked at it closely in aggregate. Seeing that number tracked over time was more clarifying than I expected. That's the thing about building your own tools: sometimes you learn something about your finances just by making the data legible.

The Google Sheet is archived but not deleted.

---

*Ledger is open source at [github.com/panderson54/ledger](https://github.com/panderson54/ledger). Self-hosted, no authentication layer, designed for use on a trusted local network.*
