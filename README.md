# Sakshi Kejriwal — Portfolio

A personal portfolio for **Sakshi Kejriwal**, a digital marketing strategist and creative.
It showcases her professional work, in-depth case studies, and creative projects in one
polished, interactive site.

> Built once, runs everywhere — it works in a web browser today, and the same code can
> become an iPhone or Android app later if ever needed.

---

## 📖 What is this?

This repository holds the complete source code for Sakshi's portfolio website — think of it
as the **blueprint** a builder uses: all the instructions a computer needs to assemble the
finished site.

The portfolio has two kinds of pages:

- **Landing page** — the main page visitors see first. It introduces Sakshi, lists her
  services, highlights her best work, and shows how to get in touch.
- **Case study pages** — one per project, each telling the full story of a specific piece
  of work in detail.

### The pages at a glance

```mermaid
flowchart TD
    Home["🏠 Landing Page"]
    Home --> About["About Sakshi"]
    Home --> Services["Services"]
    Home --> Work["Selected Work"]
    Home --> Contact["Contact"]
    Work --> Xpert["📂 Xpert"]
    Work --> Strings["📂 Story of Strings"]
    Work --> Envision["📂 Envision X"]
    Work --> Hobiz["📂 Hobiz"]
```

---

## 🧩 How it's put together (in plain English)

The project keeps **the words and pictures separate from the design and layout**. This is a
deliberate choice — it means the content can be updated later (even through an easy-to-use
online editor) without anyone having to touch the design code.

```mermaid
flowchart LR
    Content["📝 Content<br/>text, images, links"] --> Library["📦 Content Library<br/>single source of truth"]
    Library --> Design["🎨 Page Designs<br/>layout, colours, animation"]
    Design --> Site["💻 Finished Website"]
```

Today the content lives in files inside the project. Later it can be swapped for an online
editor (a "CMS" — content management system), and because of this separation **none of the
design code has to change**.

---

## 🛠️ What it's built with

You don't need to know these to use the site — they're listed for developers and curious readers.

| Tool | What it does, in simple terms |
| --- | --- |
| **Expo + React Native** | The framework — lets one set of code run on web *and* mobile. |
| **Expo Router** | Handles moving between pages (the landing page, each case study). |
| **TypeScript** | The programming language — a safer version of JavaScript. |
| **Reanimated** | Powers the smooth scrolling, hover effects, and animations. |

---

## 📁 Project layout

A quick map of the main folders, so you know where things live:

| Folder | What's inside |
| --- | --- |
| `app/` | The actual pages of the site. |
| `src/components/` | Reusable building blocks (buttons, cards, the navigation bar…). |
| `src/data/` | All the content — the text, project details, and the "content library". |
| `src/theme/` | The design system — colours, fonts, and spacing rules. |
| `assets/images/` | Photos, logos, and videos used across the site. |

---

## 🚀 Running it on your own computer

For developers, or anyone curious to see the site run locally.

**1. Install the toolkit** (one-time setup — downloads everything the project needs):

```bash
npm install
```

**2. Start the site:**

```bash
npx expo start
```

Then press **`w`** in the terminal to open it in your web browser.

**3. Build the final website** (creates a ready-to-publish version in a `dist` folder):

```bash
npx expo export --platform web
```

---

## 🌐 Status

The site is content-complete and ready to be published online (e.g. on Vercel). A future
step is connecting an online content editor so the portfolio can be updated without code.
