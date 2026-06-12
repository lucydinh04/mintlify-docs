# Ahamove Handbook — Design Master 2026
> Tài liệu design tổng hợp (gộp 4 tài liệu). Mục lục:
> 1. Blueprint & Information Architecture (nền tảng)
> 2. Redesign Roadmap 2026
> 3. Design System Audit
> 4. UX & Layout System (mới nhất — ưu tiên tham chiếu)

---


<!-- ============================================================ -->
# 📄 PHẦN: Ahamove_Employee_Portal_Blueprint.md
<!-- ============================================================ -->

# Ahamove Employee Portal — Strategy & Information Architecture Blueprint

> **MVP launchable in 1 week · Built on Mintlify · Future home: docs.ahamove.com**
> Designed for a non-technical HR/EX team to own and maintain for years.
> Brand: Primary `#FF7A21` · Secondary `#0E4174` · Tone: Professional · Friendly · Modern · Technology-driven · People-centric.

This document is the *thinking* behind the portal. The deployable files (`docs.json` + 35 `.mdx` pages) live in the accompanying `ahamove-portal/` folder.

---

## A. Employee Portal Strategy

**The problem with the source.** The uploaded `Ahamazing_Onboard_Guide_v3.html` is an excellent *onboarding microsite* — but it's a single, long-scrolling page built for **week one of a career**. Everything (welcome, history, tools, benefits, FAQ) lives on one URL. That design has three structural limits for a long-lived portal: (1) a tenured employee who just wants "parking hours" must scroll past the welcome hero; (2) content can only ever grow *down*, never *out*; (3) it mixes two fundamentally different jobs — **onboarding a new joiner** (a linear, time-boxed journey) and **answering a question** (random-access, lifelong).

**The strategy: split the two jobs.**

| Job to be done | Mental model | Section that serves it |
| --- | --- | --- |
| "I'm new — walk me through it" | A **journey** (linear, time-boxed) | **Ahamazing Guide** |
| "I have a question — answer it now" | A **help center** (random-access, evergreen) | **Employee Handbook + Policies + Benefits + Office Guide** |
| "I want to work smarter" | A **toolkit** | **AI Hub** |
| "I'm stuck" | A **safety net** | **FAQ & Support** |

**Five design principles** (drawn from Notion / Stripe / Linear docs):

1. **Search-first.** Most visits after week one are lookups. Mintlify's instant search + AI assistant are the primary navigation; the sidebar is the backup.
2. **2–3 clicks to anything.** Home → Section → Page. Every key task ("request leave", "where to park") is reachable in ≤3 clicks and surfaced on the homepage.
3. **Short, single-purpose pages.** Replace one 1,200-line scroll with ~35 focused pages. One page = one question.
4. **HR-maintainable.** No custom JavaScript, no build engineering. HR edits Markdown text and one config file. Placeholders are explicitly flagged.
5. **Scalable shell, filled incrementally.** Ship the full *structure* in week 1 (so the IA never needs re-architecting), even where some pages start as summaries + "to be completed by HR" notes.

**What's explicitly out of scope for this MVP:** careers site, AI photo generator, the localStorage HR-admin demo from the HTML. (The photo tool is parked in the roadmap, Phase 3.)

---

## B. Information Architecture

Top-level navigation = **7 product tabs + Home**, each tab a self-contained section with its own landing page.

```
🏠 Home  (dashboard)
│
├── 🧭 Ahamazing Guide      → the new-joiner JOURNEY (linear)
│     Welcome · Company Overview · Culture · Before Day 1 · Day 1 · Week 1 · First Month
│
├── 📖 Employee Handbook    → the central HELP CENTER (evergreen, search-first)
│     Working Tools · Internal Systems · HR Processes · IT Support · Contact HR
│
├── ⚖️ Policies             → the rulebook
│     Leave · Attendance · Expense · Code of Conduct
│
├── 🎁 Benefits             → what you get
│     Health Check · Insurance · Uniform Program · Learning Support
│
├── 🏢 Office Guide         → the physical workplace
│     Office Locations · Parking · Pantry · Meeting Rooms
│
├── ✨ AI Hub               → the AI-Driven toolkit
│     ChatGPT Guide · Claude Guide · Prompt Library · Internal AI Tools
│
└── 🆘 FAQ & Support        → the safety net
      FAQ · Ask Ahamove AI
```

**Why this is MECE (mutually exclusive, collectively exhaustive):**

- **Ahamazing Guide vs Handbook** is the key split: *time-bound journey* vs *evergreen reference*. The HTML mixed them; we separate them so a 3-year employee never re-reads "Welcome", and a new joiner gets a clean linear path.
- **Handbook vs Policies vs Benefits.** Handbook = *how to do things* (process & tools). Policies = *the rules* (entitlements & conduct). Benefits = *what you receive*. A question like "how do I request leave" lives in Handbook (process) and links to Policies (the rule) — process and rule are deliberately separated so each can be updated independently.
- **Office Guide** isolates the *physical* workplace (parking, pantry, rooms) from digital systems — these are owned by Admin, not HRBP, so a clean boundary matches who maintains it.
- **Cross-links, not duplication.** Each fact lives on exactly one page; everything else links to it. Example: leave rules live only in `policies/leave-policy`; Handbook, FAQ and the homepage all link there.

**Navigation philosophy.** The **Employee Handbook is the hub**, treated as a *help center* (root landing page + card directory of articles), not a document. This mirrors Stripe/Linear: a tab opens to an overview of cards, each card a focused article.

---

## C. Folder Structure

```
ahamove-portal/
├── docs.json                     # single source of truth for nav + branding
├── index.mdx                     # 🏠 Home dashboard
├── favicon.svg
├── logo/
│   ├── ahamove-light.svg
│   └── ahamove-dark.svg
├── README.md                     # HR maintenance guide
│
├── ahamazing-guide/
│   ├── overview.mdx              # section landing (cards)
│   ├── welcome.mdx
│   ├── company-overview.mdx
│   ├── culture.mdx
│   ├── before-day-1.mdx
│   ├── day-1.mdx
│   ├── week-1.mdx
│   └── first-month.mdx
│
├── handbook/
│   ├── overview.mdx
│   ├── working-tools.mdx
│   ├── internal-systems.mdx
│   ├── hr-processes.mdx
│   ├── it-support.mdx
│   └── contact-hr.mdx
│
├── policies/
│   ├── overview.mdx
│   ├── leave-policy.mdx
│   ├── attendance-policy.mdx
│   ├── expense-policy.mdx
│   └── code-of-conduct.mdx
│
├── benefits/
│   ├── overview.mdx
│   ├── health-check.mdx
│   ├── insurance.mdx
│   ├── uniform-program.mdx
│   └── learning-support.mdx
│
├── office-guide/
│   ├── overview.mdx
│   ├── office-locations.mdx
│   ├── parking.mdx
│   ├── pantry.mdx
│   └── meeting-rooms.mdx
│
├── ai-hub/
│   ├── overview.mdx
│   ├── chatgpt-guide.mdx
│   ├── claude-guide.mdx
│   ├── prompt-library.mdx
│   └── internal-ai-tools.mdx
│
└── support/
    ├── overview.mdx
    ├── faq.mdx
    └── ask-ahamove-ai.mdx
```

35 content pages + config + assets. Folder names map 1:1 to URL paths (`docs.ahamove.com/policies/leave-policy`).

---

## D. docs.json

The full file ships in `ahamove-portal/docs.json`. Key decisions:

- **`theme: "mint"`**, brand colors set (`primary #FF7A21`, `light #FF9A52`, `dark #0E4174`).
- **Fonts** echo the source: Space Grotesk (headings) + Be Vietnam Pro (body).
- **`navigation.tabs`** — 8 tabs (Home + 7 sections). Each section tab contains **one group with a `root` landing page and `"directory": "card"`**, so clicking the tab opens a card directory of its articles (the help-center pattern).
- **`navigation.global.anchors`** — persistent quick links on every page: *Ask Ahamove AI*, *1Office*, *Liên hệ HR*.
- **`navbar.primary`** — a always-visible "Hỏi Ahamove AI" button.
- **`footer`** — three columns (Get started / Popular / Support) for fast access.
- **`styling.eyebrows: "breadcrumbs"`** — shows the path so users always know where they are.

Skeleton:

```json
{
  "$schema": "https://mintlify.com/docs.json",
  "theme": "mint",
  "name": "Ahamove Employee Portal",
  "colors": { "primary": "#FF7A21", "light": "#FF9A52", "dark": "#0E4174" },
  "navigation": {
    "tabs": [
      { "tab": "Home", "icon": "house", "pages": ["index"] },
      { "tab": "Ahamazing Guide", "icon": "compass",
        "groups": [{ "group": "Ahamazing Guide — Onboarding Journey",
          "root": "ahamazing-guide/overview", "directory": "card",
          "pages": ["ahamazing-guide/welcome", "…"] }] },
      { "tab": "Employee Handbook", "icon": "book-open", "groups": [ … ] },
      { "tab": "Policies", "icon": "scale-balanced", "groups": [ … ] },
      { "tab": "Benefits", "icon": "gift", "groups": [ … ] },
      { "tab": "Office Guide", "icon": "building", "groups": [ … ] },
      { "tab": "AI Hub", "icon": "sparkles", "groups": [ … ] },
      { "tab": "FAQ & Support", "icon": "life-ring", "groups": [ … ] }
    ],
    "global": { "anchors": [ { "anchor": "Ask Ahamove AI", "icon": "robot", "href": "/support/ask-ahamove-ai" }, … ] }
  }
}
```

---

## E. Homepage Structure (`index.mdx`)

The home page is a **dashboard**, not a wall of text — built with `mode: "custom"` and Mintlify card/step components. Seven required blocks, top to bottom:

1. **Welcome section** — navy gradient hero, "Chào mừng đến Ahamove 👋", the *Always Moving* promise.
2. **Quick Start cards** — 6 cards for the highest-frequency intents (New joiner, Request leave, Access systems, Contact HR, Benefits, Ask AI).
3. **New Joiner Journey** — a 4-step `<Steps>` strip: Before Day 1 → Day 1 → Week 1 → First Month.
4. **Important Links** — 1Office, AhaLearn, Website, HR email.
5. **Popular Resources** — 6 horizontal cards (leave, parking, login, insurance, conduct, IT).
6. **Latest Updates** — `<Update>` feed; the single HR-editable announcements area (seeded with the 2026 message + Generali launch).
7. **Ask Ahamove AI** — full-width CTA card.

---

## F. Ahamazing Guide Structure

Linear journey, ordered exactly as a new joiner experiences time. Landing page = card directory.

| Page | Purpose | Key components |
| --- | --- | --- |
| `overview` | Section landing | Card directory |
| `welcome` | "You're expected" | Tip, Info, cards |
| `company-overview` | Ahamove in 1 minute | Quick-facts table, history `<Steps>`, Scommerce, 2026 message |
| `culture` | 4 values + One Ahamove | Value cards, Áo Aha tip |
| `before-day-1` | Be ready | Checklist `<Steps>`, office address table |
| `day-1` | The first day | Timeline `<Steps>` |
| `week-1` | First-week checklist | `<Steps>` checklist |
| `first-month` | 30-60-90 | 3 milestone cards |

---

## G. Employee Handbook Structure (the hub)

Treated as a **searchable help center**. Landing page is a directory of "how-to" articles, each short and task-focused.

| Page | Answers the question | Owner |
| --- | --- | --- |
| `overview` | "Where do I find…?" | EX |
| `working-tools` | Email, Telegram, 1Office + 1Office AI Assistant prompts | EX/HR |
| `internal-systems` | "How do I log in / activate accounts?" | IT/HR |
| `hr-processes` | Timekeeping, leave, probation review, OM workflows | HRBP |
| `it-support` | Accounts, devices, IT assets, scanners | IT |
| `contact-hr` | "Who do I ask?" — the contact matrix | HR |

---

## H. Policies Structure

The rulebook — separated from "how-to" so rules can change independently.

| Page | Content today | Status |
| --- | --- | --- |
| `leave-policy` | Annual-leave rules (full, from source) + how to file | ✅ Complete |
| `attendance-policy` | Timekeeping, check-in/out fixes, OT via 1Office | ⚠️ Needs HR detail (work hours, OT caps) |
| `expense-policy` | Business travel & OM expense workflows | ⚠️ Needs HR detail (rates, receipts) |
| `code-of-conduct` | 4 values → conduct principles | ⚠️ Needs HR official CoC doc |

---

## I. Benefits Structure

| Page | Content today | Status |
| --- | --- | --- |
| `health-check` | Periodic health check | ⚠️ Needs HR schedule/provider |
| `insurance` | Generali 2025 + VssID (full, from source, with links) | ✅ Complete |
| `uniform-program` | Áo Aha eligibility table | ✅ Complete |
| `learning-support` | AhaLearn + L&D | ⚠️ Needs HR L&D budget policy |

---

## J. Office Guide Structure

| Page | Content today | Status |
| --- | --- | --- |
| `office-locations` | 3 office addresses (from source) | ✅ + needs maps/floor plans |
| `parking` | Parking card, 22:30 cutoff, lost-card → Admin | ✅ Complete |
| `pantry` | Vending machines, 50% staff discount | ✅ Complete |
| `meeting-rooms` | Scanner guide + device connection | ⚠️ Needs room list/booking method |

---

## K. AI Hub Structure

Net-new section operationalizing the **AI-Driven 2026** vision. Safety-first.

| Page | Content | Status |
| --- | --- | --- |
| `overview` | AI-Driven framing + Responsible-AI principles | ✅ + needs official AI policy |
| `chatgpt-guide` | Getting started, use cases, guardrails | ✅ + needs enterprise-account note |
| `claude-guide` | Getting started, use cases, guardrails | ✅ + needs enterprise-account note |
| `prompt-library` | Copy-paste prompts by task (CodeGroups) | ✅ living library |
| `internal-ai-tools` | AhaGuide + Chatbot 1Office | ✅ + grows with new tools |

---

## L. FAQ & Support Structure

| Page | Content | Status |
| --- | --- | --- |
| `faq` | Accordions: Pay & benefits / Tools / Process & culture (from source FAQ + KB) | ✅ living page |
| `ask-ahamove-ai` | What the assistant answers + how to enable Mintlify Assistant | ✅ + needs config toggle |

---

## M. Content Migration Mapping

How every block of the source HTML moves into the new IA. **Nothing is lost; everything is re-homed and improved.**

| Source section (HTML `#id`) | → New page | Treatment |
| --- | --- | --- |
| `#welcome` Welcome to Ahamove | `ahamazing-guide/welcome` | Rewritten as warm intro + "read first" cards |
| `#overview` Tổng quan + Quick facts + history + Scommerce + partners + training | `ahamazing-guide/company-overview` | Facts → table; history → `<Steps>`; placeholders flagged |
| `#media` Video & 2026 message | `ahamazing-guide/company-overview` (2026 message as Info block) + homepage Update | Video grid deferred to Phase 2; message text preserved |
| `#culture` 4 values + Áo Aha | `ahamazing-guide/culture` (+ `code-of-conduct`, `uniform-program`) | Values → cards; uniform detail → Benefits |
| `#preday1` Trước Day 1 | `ahamazing-guide/before-day-1` | Checklist `<Steps>` + office table |
| `#day1` Lịch trình Day 1 | `ahamazing-guide/day-1` | Timeline `<Steps>` |
| `#week1` Checklist Week 1 | `ahamazing-guide/week-1` | `<Steps>` checklist |
| `#month1` Month 1 (30-60-90) | `ahamazing-guide/first-month` | 3 milestone cards |
| `#tools` Công cụ + 1Office setup + 1Office AI Assistant + sample Qs | `handbook/working-tools` + `handbook/internal-systems` | Setup steps → Internal Systems; tools+AI assistant → Working Tools |
| `#process` Quy trình + probation + "ask who" | `handbook/hr-processes` (+ `contact-hr`) | Probation `<Steps>`; contact matrix → Contact HR |
| `#office` Văn phòng & tiện ích + OM + IT assets + scanner | `office-guide/*` + `handbook/it-support` | Amenities → Office Guide; IT assets/OM → IT Support & HR Processes |
| `#benefits` Generali + VssID + leave + other perks | `benefits/insurance` + `policies/leave-policy` + `benefits/overview` | Insurance → Benefits; leave rules → Policies |
| `#faq` FAQ | `support/faq` | Re-grouped into accordions |
| `#photo` AI photo tool | *Roadmap Phase 3* | Out of MVP scope (per brief) |
| `#support` Kênh hỗ trợ matrix | `handbook/contact-hr` | Contact matrix table |
| AhaGuide chatbot | `support/ask-ahamove-ai` + AI Hub | Reframed as Mintlify Assistant + internal tool |
| `HANDBOOK_KB` (resign, personas, etc.) | `support/faq` + `handbook/hr-processes` | Seeds FAQ; resign → "contact HRBP" |

---

## N. Week 1 Implementation Plan

A realistic 5-day path to a live MVP for a non-technical owner (with light IT help on Day 1 + Day 5).

**Day 1 — Account & deploy skeleton (IT-assisted, ~2 hrs)**
- Create Mintlify account; create a private GitHub repo; upload the `ahamove-portal/` folder.
- Connect repo to Mintlify → instant live preview URL. *The whole structure is already correct — no architecture work needed.*

**Day 2 — Brand & verify**
- Replace placeholder logos/favicon with official Ahamove assets.
- Confirm colors/fonts render; click through all 8 tabs; fix any typos.

**Day 3 — Fill the easy placeholders (HR)**
- Company Quick Facts (real numbers), partner list, office maps/floor plans, meeting-room list. Search the files for `[…]` and `<Note>` blocks marked "Cần … hoàn thiện".

**Day 4 — Fill the policy placeholders (HRBP)**
- Attendance hours & OT rules, expense rates, official Code of Conduct, health-check schedule, L&D policy. Attach official PDFs/links.

**Day 5 — AI + launch (IT-assisted)**
- Enable Mintlify **Assistant ("Ask AI")** in dashboard (zero-code).
- Point custom domain **docs.ahamove.com**.
- Soft-launch to a pilot group (e.g. latest cohort), collect feedback, then announce company-wide.

**Definition of done for MVP:** all 35 pages render, every nav link works, brand applied, search + Ask AI live, domain connected, no `[…]` left on the ✅-Complete pages.

---

## O. Recommended Next-Phase Roadmap

**Phase 2 — Richen the content (weeks 2–4)**
- Embed real **videos** (Look Back 2025, 2026 message, history) on Company Overview via Mintlify `<Frame>`/iframe.
- Add **screenshots/GIFs** to how-to pages (1Office login, leave request).
- Build out **Prompt Library** with team-contributed prompts; expand **FAQ** from real tickets.
- Add a lightweight **Changelog** page (global anchor) for HR announcements history.

**Phase 3 — Interactivity & self-service (months 2–3)**
- Re-introduce the **AI onboard photo tool** as a proper integration (approved storage + access control), linked from the portal — not embedded localStorage demo.
- **Role-based views** (new hire / manager / HRBP) using Mintlify groups or tags — the source KB already had persona logic to reuse.
- Deeper **1Office / SSO** linking so authenticated quick-actions are one click.

**Phase 4 — Scale & govern (quarter 2+)**
- **Content ownership model:** assign each section an owner (HRBP, Admin, IT, EX) + a quarterly review cadence.
- **Analytics:** use Mintlify search/page analytics to find top questions and gaps → close them.
- **Localization:** Mintlify supports a `vi`/`en` language switcher if a fully English version is later needed.
- Expand toward the broader vision (careers site, etc.) — *kept separate from this employee portal*.

---

*Prepared as the strategic companion to the deployable `ahamove-portal/` Mintlify scaffold. Edit Markdown, ship value — Always Moving.* ⚡

---


<!-- ============================================================ -->
# 📄 PHẦN: Ahamove_Redesign_Roadmap_2026.md
<!-- ============================================================ -->

# Ahamove Digital Workplace & AI-Driven Hub 2026
### Redesign Roadmap — từ "Employee Handbook" → "Digital Workplace & AI Learning Platform"

> Principal Product Designer review. Tham chiếu phong cách: Notion · Linear · Anthropic · OpenAI · Stripe/Vercel/GitHub Docs.
> Nền tảng: Mintlify (`theme: mint`, Lexend, cam `#FF7A21` / navy `#0E4174`). Đã có 8 tab, homepage custom, AI Hub, style.css bo góc ảnh.
> Tài sản mới phát hiện trong bản upload: `images/poster.png`, `images/Claude.jpg` → dùng được ngay (xem Quick Wins).

---

## 0. Chẩn đoán nhanh — vì sao đang giống "Corporate Handbook"

| Triệu chứng hiện tại | Nguyên nhân gốc | Hệ quả |
| --- | --- | --- |
| Cảm giác "tài liệu" hơn "sản phẩm" | Hero nền kem sáng, tĩnh, không chiều sâu; thiếu motion/screenshot/dark surface | Không "high-tech / AI-driven" |
| 8 tab ngang ngang nhau | "Trang chủ" là 1 tab (trùng logo); 3 tab hành chính (Chính sách/Phúc lợi/Văn phòng) tách rời | Quá tải điều hướng, không có thứ bậc ưu tiên |
| AI Hub = thư mục tài liệu | Là list 6 trang phẳng, không có lộ trình học / cấp độ / tiến trình | Không cảm giác "Academy", không khuyến khích học |
| Benefits/Policies/Office quá hành chính | Đặt tên & gom nhóm theo phòng ban, không theo trải nghiệm nhân viên | Khô khan, thiếu "Life at Ahamove" |
| Thẻ không nhất quán | Trộn `<Card>` native + khối inline-style tự chế | Thị giác rời rạc giữa các trang |
| Khó khám phá | Chỉ dựa sidebar; không tag NEW/HOT, không "related", không "popular" trong nav | Người dùng không thấy nội dung mới/nổi bật |

**Định hướng tổng:** giữ nội dung tốt đang có, nâng cấp **vỏ trải nghiệm** (hero, IA, hệ thẻ, AI Academy, Life-at-Ahamove) để chạm cảm giác *modern SaaS, product-first*.

---

## 1. Information Architecture

### 1.1 Vấn đề cụ thể
- **8 tab** là ngưỡng trên của "shallow nav". "Trang chủ" không nên là tab (logo đã về home).
- 3 tab **Chính sách / Phúc lợi / Văn phòng** đều là "đời sống & hành chính" → nên gom.
- **AI Hub** xứng đáng là tab *flagship* (tầm nhìn 2026) nhưng đang xếp ngang như mục phụ.
- Thiếu khái niệm **Learning Path** (lộ trình) — onboarding tuyến tính nhưng AI/skill thì không.

### 1.2 IA đề xuất (gom 8 → 6 trụ, rõ thứ bậc)

```
🏠 (logo → Home)            ← bỏ tab "Trang chủ", logo về home
🚀 Start Here               ← gộp Ahamazing Guide (onboarding journey)
📘 Workplace                ← Sổ tay nhân sự (công cụ, hệ thống, quy trình, lương, tổ chức)
🌿 Life at Ahamove          ← gộp Phúc lợi + Văn phòng + Văn hóa + Ghi nhận
📜 Policies                 ← giữ riêng (tính pháp lý, cần tách bạch)
🤖 AI Academy               ← nâng cấp từ AI Hub (flagship)
🆘 Help & People            ← Trung tâm hỗ trợ + Liên lạc nhân sự
```

> Vì sao gom **Life at Ahamove** = Phúc lợi + Văn phòng + Văn hóa: cả ba đều trả lời câu hỏi *"làm việc & sống ở Ahamove như thế nào"* — đúng tinh thần Notion/Linear "Life at" page. Policies tách riêng vì người dùng tìm nó với tâm thế *tra cứu quy định*, khác hẳn.

### 1.3 Discoverability — thêm 4 cơ chế
1. **Tag trong nav**: `NEW`, `HOT`, `AI` (docs.json hỗ trợ `tag` trên group; với trang dùng badge trong nội dung).
2. **Global banner 2026** (thông báo định hướng AI-Driven, dismissible).
3. **"Phổ biến / Mới"** trên Home (đã có Tài nguyên phổ biến — thêm hàng "Mới cập nhật" dạng badge).
4. **Related links** cuối mỗi trang (block `<CardGroup>` "Xem tiếp").

### 1.4 Learning Paths (mới)
Trong AI Academy & Start Here, thêm khái niệm **lộ trình theo cấp độ**:
`Level 1 — AI Basics` → `Level 2 — AI for my role` → `Level 3 — AI Builder`. Dùng `<Steps>` + thẻ "Bắt đầu lộ trình".

---

## 2. Homepage Experience

### 2.1 Vấn đề
- Hero nền kem = "friendly handbook", không phải "AI-driven tech".
- Thiếu **dark hero** + chiều sâu (glow, gradient mesh) như Anthropic/Linear/Vercel.
- AI Academy chưa được "đẩy" lên như sản phẩm chủ lực.
- Không có "personal" layer (vd: lời chào theo thời gian, lối tắt hay dùng).

### 2.2 Cấu trúc Home đề xuất (giữ search-first, thêm chiều sâu)
```
1. HERO (dark, AI-driven)      → navy gradient + orange glow + poster.png mờ ở nền, tagline "2026 · AI-Driven Company", 2 CTA
2. SEARCH bar nổi bật          → khối search lớn, gợi ý từ khóa (chip)
3. QUICK ACTIONS (4)           → 1Office · Hỏi AI · Hỗ trợ IT · Nghỉ phép
4. AI ACADEMY SPOTLIGHT        → banner ngang nổi bật (khác biệt màu) — "Học AI cùng Ahamove"
5. EXPLORE (6 trụ)             → card lớn cho 6 section
6. NEW JOINER PATH             → stepper (đã có)
7. POPULAR + LATEST            → 2 cột
```

### 2.3 Mockup mô tả (Hero mới)
> **Khung hình:** nền `linear-gradient(135deg,#0B1530,#0E4174)` phủ kín bo góc 24px; góc phải có quầng sáng cam `radial-gradient(circle, rgba(255,122,33,.35), transparent)`; lớp lưới mờ (grid mesh) opacity .15. Bên trái: eyebrow "AHAMOVE · 2026" (chữ cam, letter-spacing rộng), H1 trắng đậm *"Digital Workplace của người Ahamove"*, sub *"Mọi thứ bạn cần để làm việc & phát triển trong kỷ nguyên AI-Driven."*, 2 nút: **Bắt đầu** (cam) + **Khám phá AI Academy** (viền sáng). Bên phải: `poster.png` hoặc `ai-bot.svg` lớn, đổ bóng. Cảm giác: Linear/Anthropic landing.

### 2.4 MDX ví dụ — Hero high-tech (custom mode, inline-style, responsive)
```mdx
<div style={{position:"relative",overflow:"hidden",borderRadius:"24px",
  background:"radial-gradient(900px 360px at 85% -10%, rgba(255,122,33,.35), transparent 60%), linear-gradient(135deg,#0B1530,#0E4174)",
  color:"#fff",padding:"56px 40px"}}>
  <p style={{color:"#FF9A52",letterSpacing:"3px",fontSize:"12px",fontWeight:700,margin:0}}>AHAMOVE · 2026 · AI-DRIVEN COMPANY</p>
  <h1 style={{fontSize:"40px",fontWeight:800,margin:"12px 0",lineHeight:1.1}}>Digital Workplace<br/>của người Ahamove</h1>
  <p style={{maxWidth:"520px",color:"rgba(255,255,255,.82)",fontSize:"17px"}}>Mọi thứ bạn cần để làm việc & phát triển trong kỷ nguyên AI-Driven. <b style={{color:"#fff"}}>Always Moving.</b></p>
  <div style={{display:"flex",gap:"12px",marginTop:"22px",flexWrap:"wrap"}}>
    <a href="/start-here/overview" style={{background:"#FF7A21",color:"#fff",fontWeight:700,padding:"12px 22px",borderRadius:"12px",textDecoration:"none"}}>Bắt đầu</a>
    <a href="/ai-academy/overview" style={{background:"rgba(255,255,255,.12)",color:"#fff",fontWeight:700,padding:"12px 22px",borderRadius:"12px",border:"1px solid rgba(255,255,255,.25)",textDecoration:"none"}}>Khám phá AI Academy</a>
  </div>
</div>
```

---

## 3. Visual Design

### 3.1 Vấn đề & nguyên tắc
- **Hệ thẻ:** chọn MỘT chuẩn. Khuyến nghị: `<Card>`/`<CardGroup>` native cho 90% (responsive sẵn), inline-style chỉ cho hero & timeline.
- **Visual hierarchy:** mỗi trang nên có 1 *hero strip* nhỏ (eyebrow + H1 + 1 dòng sub) thay vì vào thẳng `##`.
- **Dark surface có chủ đích:** dùng nền navy cho các khối "AI", "2026", "Spotlight" để tạo điểm nhấn high-tech.
- **Typography:** Lexend tốt; quy ước cỡ: H1 30–40 / H2 20–22 / body 15–16 / caption 12.5–13. Hạn chế bôi đậm tràn lan.
- **Spacing:** nhịp 8px (8/12/16/24/32). Section cách nhau 28–32px.
- **Icon:** thống nhất Font Awesome qua `<Icon>`/`icon=`; KHÔNG emoji (đã làm).
- **Illustration:** dùng bộ icon-illustration của ahamove.com (`MoneyBagDriver.svg`, `ClockDriver.svg`…) + ảnh thật (`Claude.jpg`, `poster.png`) qua `<Frame>` (đã bo góc qua style.css).

### 3.2 style.css — nâng cấp "design tokens" toàn cục (mở rộng file đang có)
```css
:root{
  --aha-orange:#FF7A21; --aha-navy:#0E4174; --aha-ink:#1F2733;
  --aha-radius:14px; --aha-radius-lg:20px;
}
/* Card hover nhẹ — cảm giác product */
#content-area a[href] > div, .card { transition: transform .15s ease, box-shadow .15s ease; }
.card:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(20,34,70,.12); }
/* H2 có gạch nhấn cam */
#content-area h2::before{ content:""; display:inline-block; width:18px; height:3px; border-radius:3px;
  background:var(--aha-orange); margin-right:10px; vertical-align:middle; }
img{ border-radius:14px; }
```

---

## 4. AI Hub → **AI Academy** (chuyển đổi flagship)

### 4.1 Vấn đề: hiện là list 6 trang phẳng (folder feel).
### 4.2 Cấu trúc AI Academy đề xuất (3 lớp: Học · Chương trình · Trình diễn)

```
AI Academy
├── 🚀 Start Here — AI tại Ahamove   (overview: tầm nhìn AI-Driven + Claude Pro 100% + lộ trình)
├── 📚 Learn
│   ├── Claude Guide
│   ├── Prompt Library
│   └── AI Playbook (theo phòng ban)
├── 🎓 Programs
│   ├── YES A.I DO        (tag: PROGRAM)
│   ├── Study Tour China  (tag: HOT)
│   └── AI Showcase 2026  (tag: EVENT)
└── 🏆 Showcase Gallery   (mới — bộ sưu tập câu chuyện "YES AI Powered Me")
```

### 4.3 Landing AI Academy — MDX (hero + lộ trình + chương trình)
```mdx
---
title: "AI Academy"
description: "Học, ứng dụng và toả sáng cùng AI tại Ahamove — Claude Pro cho 100% nhân sự."
---

<div style={{borderRadius:"20px",background:"linear-gradient(135deg,#0B1530,#0E4174)",color:"#fff",padding:"34px 30px"}}>
  <p style={{color:"#FF9A52",letterSpacing:"2px",fontSize:"12px",fontWeight:700,margin:0}}>AI-DRIVEN COMPANY · 2026</p>
  <h1 style={{fontSize:"30px",fontWeight:800,margin:"8px 0"}}>AI Academy</h1>
  <p style={{maxWidth:"560px",color:"rgba(255,255,255,.82)"}}>Claude Pro cho 100% nhân sự. Học cách dùng AI, ứng dụng theo phòng ban, và toả sáng tại AI Showcase.</p>
</div>

## Lộ trình học AI
<Steps>
  <Step title="Level 1 · AI Basics" icon="seedling">Làm quen Claude & viết prompt cơ bản → [Claude Guide](/ai-academy/claude-guide)</Step>
  <Step title="Level 2 · AI cho vai trò của bạn" icon="user-gear">Ứng dụng theo phòng ban → [AI Playbook](/ai-academy/ai-playbook)</Step>
  <Step title="Level 3 · AI Builder" icon="rocket">Tự động hoá quy trình, chia sẻ tại [AI Showcase](/ai-academy/ai-showcase-2026)</Step>
</Steps>

## Chương trình
<CardGroup cols={3}>
  <Card title="YES A.I DO" icon="chalkboard-user" href="/ai-academy/yes-ai-do">Chuỗi workshop ứng dụng AI.</Card>
  <Card title="Study Tour Trung Quốc" icon="plane" href="/ai-academy/study-tour-china">Học mô hình AI logistics. <Tooltip tip="Đang hot">HOT</Tooltip></Card>
  <Card title="AI Showcase 2026" icon="trophy" href="/ai-academy/ai-showcase-2026">"YES AI Powered Me".</Card>
</CardGroup>
```

### 4.4 Claude Guide — dùng ảnh thật `Claude.jpg`
```mdx
<Frame caption="Claude Pro được trang bị cho 100% nhân sự Ahamove">
  <img src="/images/Claude.jpg" alt="Claude tại Ahamove" />
</Frame>
```

---

## 5. Employee Experience → **Life at Ahamove**

### 5.1 Vấn đề: Benefits/Policies/Office tách rời, đặt tên hành chính.
### 5.2 Gom thành **Life at Ahamove** (giữ Policies riêng vì pháp lý)
```
🌿 Life at Ahamove
├── Overview            (hero "Cuộc sống tại Ahamove" + ảnh thật)
├── Phúc lợi            (Khám sức khỏe · Bảo hiểm · Đồng phục · Học tập)
├── Ghi nhận & Vinh danh
├── Văn phòng & Tiện ích (Địa điểm · Gửi xe · Pantry · Phòng họp)
└── Văn hóa One Ahamove (Thứ Hai Áo Aha, giá trị, sự kiện)
```
Đổi giọng từ "hành chính" → "đời sống": vd *"Khám sức khỏe"* mô tả "Chăm sóc bạn khoẻ mạnh để Always Moving" thay vì liệt kê khô.

### 5.3 Overview "Life at Ahamove" — MDX
```mdx
## Cuộc sống tại Ahamove
<CardGroup cols={2}>
  <Card title="Phúc lợi" icon="gift" href="/life/benefits">Sức khỏe, bảo hiểm, đồng phục, học tập.</Card>
  <Card title="Ghi nhận & Vinh danh" icon="award" href="/life/recognition">Tôn vinh đóng góp của bạn.</Card>
  <Card title="Văn phòng & Tiện ích" icon="building" href="/life/office">Chỗ làm, gửi xe, pantry, phòng họp.</Card>
  <Card title="Văn hóa One Ahamove" icon="heart" href="/life/culture">Always Moving — cách chúng ta gắn kết.</Card>
</CardGroup>
```

---

## 6. Mintlify-Specific — docs.json & components

### 6.1 docs.json đề xuất (rút gọn 8→6 tab + banner + tab AI Academy nổi bật)
```json
{
  "theme": "mint",
  "name": "Ahamove Digital Workplace",
  "colors": { "primary": "#FF7A21", "light": "#FF9A52", "dark": "#0E4174" },
  "fonts": { "heading": { "family": "Lexend", "weight": 700 }, "body": { "family": "Lexend" } },
  "banner": {
    "content": "🚀 Ahamove 2026 — AI-Driven Company. Khám phá [AI Academy](/ai-academy/overview).",
    "dismissible": true
  },
  "navigation": {
    "tabs": [
      { "tab": "Start Here", "icon": "compass", "groups": [ /* ahamazing-guide */ ] },
      { "tab": "Workplace", "icon": "book-open", "groups": [ /* handbook */ ] },
      { "tab": "Life at Ahamove", "icon": "heart", "groups": [ /* benefits+office+culture+recognition */ ] },
      { "tab": "Policies", "icon": "scale-balanced", "groups": [ /* policies */ ] },
      { "tab": "AI Academy", "icon": "robot", "groups": [ /* learn + programs + showcase */ ] },
      { "tab": "Help & People", "icon": "life-ring", "groups": [ /* help-center */ ] }
    ]
  }
}
```
> Ghi chú di trú: đổi tên tab **không** đổi đường dẫn ngay — giữ thư mục `benefits/`, `office-guide/` để tránh vỡ link; chỉ gom hiển thị dưới 1 tab "Life at Ahamove" bằng nhiều `groups`. Đổi thư mục là việc Phase 2 (kèm redirect).

### 6.2 Component nên dùng nhiều hơn
| Mục đích | Component | Ghi chú |
| --- | --- | --- |
| Lộ trình/quy trình | `<Steps>` | thay bullet |
| Số liệu nổi bật | `<CardGroup cols={3}>` + Card title=số | stat blocks |
| So sánh/2 cách | `<Tabs>` | vd ký số "Cách 1/Cách 2" (đã dùng) |
| FAQ | `<AccordionGroup>` | đã dùng |
| Cảnh báo/dữ liệu cá nhân | `<Warning>` | đã dùng |
| Ảnh | `<Frame>` | bo góc qua style.css |
| Nhấn mạnh AI/2026 | khối inline navy gradient | hero/spotlight |

### 6.3 Custom component qua **Snippets** (tái sử dụng — DRY)
Tạo `/snippets/Stat.mdx` rồi import:
```mdx
export const Stat = ({n, label}) => (
  <div style={{background:"#FFF4EC",border:"1px solid #F6DCC8",borderRadius:"14px",padding:"16px"}}>
    <div style={{fontSize:"24px",fontWeight:800,color:"#D65A12"}}>{n}</div>
    <div style={{fontSize:"12.5px",color:"#667089"}}>{label}</div>
  </div>
);
```
Dùng: `<Stat n="45 triệu+" label="Đơn hàng / năm" />` trên nhiều trang.

---

## 7. Visual Storytelling — "Ahamove đang trở thành AI-Driven Company"

- **Hero concept:** "Hành trình hoá rồng AI" — dark navy + quầng cam, dòng thời gian *Data-Driven (2015) → AI-Driven (2026)* (tái dùng timeline đã build ở Company Overview, nhưng đặt ở Home dạng mini).
- **Visual themes:** 3 nền chủ đạo: (1) Light cream — đời sống/onboarding; (2) Navy gradient — AI/2026/spotlight; (3) White card — tra cứu. Dùng nhất quán để "đọc" được ngữ cảnh.
- **Illustration direction:** giữ bộ nhân vật Ahamover + truck (đã có `poster.png`), bổ sung mascot AI (`ai-bot.svg`) làm "người dẫn" trong AI Academy.
- **3D / motion (nhẹ, không lạm dụng):** glow radial + grid mesh ở hero (CSS thuần, không cần JS); hover nâng card 2px. Tránh animation nặng (đúng yêu cầu "không over-engineer").
- **AI-themed sections:** mỗi trang AI Academy mở đầu bằng strip navy + eyebrow "AI-DRIVEN"; badge "Powered by Claude".

---

## 8. Quick Wins

### Top 10 — làm trong 1 NGÀY (chỉ sửa file, không đổi cấu trúc)
1. **Banner 2026** trong `docs.json` (`banner.content` trỏ AI Academy). *(5')*
2. **Hero Home dark** — thay hero kem bằng khối navy-glow ở mục 2.4. *(20')*
3. **Dùng `Claude.jpg`** trong `<Frame>` ở trang Claude Guide. *(5')*
4. **Dùng `poster.png`** làm ảnh nền/illustration hero. *(10')*
5. **Đổi tên AI Hub → AI Academy** (tab label + tiêu đề overview). *(5')*
6. **Thêm lộ trình `<Steps>`** (Level 1-2-3) vào AI Hub overview. *(15')*
7. **Hover-lift card** + gạch cam H2 trong `style.css` (mục 3.2). *(10')*
8. **Stat blocks**: thêm hàng số liệu (45 triệu đơn, 300 nhân sự Claude Pro, 20+ tỉnh) vào Home & Company Overview. *(15')*
9. **Tag NEW/HOT**: badge cho Study Tour, AI Showcase, YES A.I DO. *(10')*
10. **Related links** cuối 5 trang hay xem nhất (CardGroup "Xem tiếp"). *(20')*

### Top 10 — làm trong 1 TUẦN (cấu trúc + nội dung)
1. **Gom IA 8→6 tab** (Start Here / Workplace / Life at Ahamove / Policies / AI Academy / Help & People) + redirect.
2. **Dựng "Life at Ahamove"** overview + đổi giọng Benefits/Office sang "đời sống".
3. **AI Academy 3 lớp** (Learn / Programs / Showcase) + trang **Showcase Gallery** mới.
4. **Snippet design system** (`Stat`, `SectionHero`, `RelatedLinks`) để đồng bộ & dễ bảo trì.
5. **Bật Mintlify Assistant (Ask AI)** + đổi nhãn "Hỏi Ahamove AI" (dashboard).
6. **Trang "Bắt đầu" (Start Here)** gộp onboarding + chọn lộ trình theo persona (nhân viên mới / chuyển phòng / quản lý).
7. **Chuẩn hoá mọi trang** theo template: SectionHero → nội dung component → RelatedLinks.
8. **Bổ sung ảnh thật** (văn phòng, sự kiện, đồng phục, org chart) qua `<Frame>`.
9. **Trang "What's New"** (changelog) + global anchor — để Home gọn mà vẫn có tin mới.
10. **Analytics + vòng lặp**: bật Mintlify analytics, mỗi tháng đưa top tìm kiếm lên Home "Phổ biến".

---

## 9. Lộ trình triển khai (đề xuất)
- **Phase 0 (1 ngày):** 10 quick wins ở trên → cảm giác "AI-driven" rõ rệt ngay.
- **Phase 1 (tuần 1):** IA 8→6, Life at Ahamove, AI Academy 3 lớp, snippet design system.
- **Phase 2 (tuần 2–3):** Showcase Gallery, Start Here theo persona, ảnh thật, What's New, Assistant.
- **Phase 3 (liên tục):** analytics-driven, cập nhật nội dung placeholder, mở rộng AI Playbook theo phòng ban.

---

*Mọi ví dụ MDX/CSS ở trên dùng cơ chế responsive an toàn (component native + inline-style + flex/auto-fit), tránh `<style>` media-query trong custom page (đã từng gây lỗi mobile). Sẵn sàng để mình triển khai Phase 0 ngay khi bạn duyệt.*

---


<!-- ============================================================ -->
# 📄 PHẦN: Ahamove_DesignSystem_Audit_2026.md
<!-- ============================================================ -->

# Ahamove Digital Workplace & AI-Driven Portal 2026
## Design Audit + Redesign (concrete MDX & CSS)

> Vai trò: Principal Product Designer · Design System Architect · Mintlify Expert.
> Nguyên tắc: **không thêm nội dung mới** — chỉ tổ chức lại layout, tăng visual hierarchy, cảm giác công nghệ. Giữ brand cam `#FF7A21` / navy `#0E4174`, font Lexend.
> *2 thay đổi đã áp dụng sẵn vào source kèm theo: `style.css` (design tokens + glass/glow/gradient) và `ai-hub/yes-ai-do.mdx` (Internal AI Academy, cấu trúc workshop).*

---

## 1. AUDIT

### Điểm mạnh (giữ nguyên)
- IA đã gọn: 7 tab, gom **Life at Ahamove**, **AI Academy** 3 lớp, **Hành trình hội nhập** infographic.
- Đã Việt hoá nhất quán, bỏ emoji, dùng component native (CardGroup/Steps/Tabs/Accordion).
- Trang chủ đã có hero dark AI-driven + stat row; `style.css` bo góc ảnh + hover card + gạch cam H2.
- `ai-showcase-2026.mdx` đã rất tốt (poster, CardGroup màu, Steps đăng ký) — **mẫu chuẩn** để nhân rộng.

### Điểm yếu cụ thể (cần xử lý)
| # | Vấn đề | Trang | Ảnh hưởng |
| --- | --- | --- | --- |
| 1 | **YES A.I DO** vẫn là bài recap: `## Bạn sẽ học được gì / ## Hình thức` + Note — đúng kiểu wiki | `ai-hub/yes-ai-do.mdx` | Không ra "Internal AI Academy" |
| 2 | Nhiều trang mở đầu **vào thẳng `##`** thay vì hero strip → thiếu "điểm vào" thị giác | overview các section | Cảm giác tài liệu |
| 3 | Hệ thẻ phẳng, **không có chiều sâu** (glass/gradient/glow) | toàn site | Thiếu cảm giác công nghệ |
| 4 | AI Academy overview tốt nhưng **các trang con (claude/prompt/playbook)** chưa có hero strip đồng bộ | ai-hub/* | Visual hierarchy chưa nhất quán |
| 5 | Một số trang còn **bullet dài** (glossary, company-calendar) | handbook/* | Đọc mỏi |
| 6 | `style.css` mới có hover + gạch cam, **chưa có** glass/gradient/glow/spacing tokens | style.css | Thiếu "AI feel" |

### Page nào redesign / giữ nguyên
- **Redesign (layout):** `index.mdx`, `ai-hub/yes-ai-do.mdx`, `ai-hub/overview.mdx` (đã ok, tinh chỉnh), các `*/overview.mdx` (thêm hero strip nhẹ).
- **Giữ nguyên nội dung, chỉ thêm hero strip:** claude-guide, prompt-library, ai-playbook, study-tour-china, ai-showcase-2026 (đã đẹp — giữ).
- **Giữ nguyên hoàn toàn:** policies/*, contact-hr, faq, glossary (chỉ cân nhắc), office/* (placeholder).

---

## 2. NEW INFORMATION ARCHITECTURE
Giữ 7 tab hiện tại (đã tốt). Chỉ tinh chỉnh **nhãn AI** để ra "Learning Center":

```
AI Academy  (AI Learning Center)
├── Bắt đầu (overview) — lộ trình Level 1·2·3
├── Học & Công cụ:  Claude Guide · Prompt Library · AI Playbook
└── Chương trình:   YES A.I DO (Academy) · AI Showcase 2026 · Study Tour China
```
Không cần đổi path. Mọi thay đổi là **trình bày**.

---

## 3. HOMEPAGE REDESIGN — "Ahamove Digital Workplace"

Giữ cấu trúc hiện tại (hero dark + stat + quick access + journey + rail), nâng cảm giác bằng **glass cards** & **glow**. Thay class cho card để dùng CSS mới:

```mdx
{/* Quick Access — dùng class glass + gradient để có chiều sâu */}
<div style={S.qgrid}>
  <a className="aha-card aha-glass" style={S.qcard} href="/ahamazing-guide/overview"> … </a>
  …
</div>
```

Hero strip dùng class `aha-hero-glow` (định nghĩa trong style.css) thay vì gradient inline dài:
```mdx
<div className="aha-hero-glow" style={{ borderRadius:"22px", padding:"40px 32px", color:"#fff" }}>
  <p className="aha-eyebrow">Ahamove · 2026 · AI-Driven Company</p>
  <h1 style={{ fontSize:"32px", fontWeight:800, margin:"10px 0 0" }}>Ahamove Digital Workplace</h1>
  <p style={{ maxWidth:"460px", color:"rgba(255,255,255,.82)" }}>Mọi thứ một Ahamover cần để làm việc & phát triển trong kỷ nguyên AI.</p>
</div>
```

---

## 4. AI HUB → "AI LEARNING CENTER"

`ai-hub/overview.mdx` đã có hero dark + lộ trình Level 1·2·3 + 2 nhóm card → **đạt**. Bổ sung 1 hàng "tiến trình" để ra cảm giác learning platform:

```mdx
## Tiến trình của bạn
<CardGroup cols={3}>
  <Card title="Level 1 · Basics" icon="circle-check">Hoàn thành Claude Guide + 1 prompt thực tế.</Card>
  <Card title="Level 2 · Apply" icon="circle-half-stroke">Áp dụng theo phòng ban (AI Playbook).</Card>
  <Card title="Level 3 · Build" icon="circle">Tạo workflow & trình diễn ở AI Showcase.</Card>
</CardGroup>
```
*(Đây là khung học tập, không phải nội dung mới — text mô tả tối thiểu.)*

Mỗi trang con thêm **hero strip 3 dòng** (eyebrow + H1 + 1 dòng) để đồng bộ — ví dụ Claude Guide:
```mdx
<div className="aha-hero-glow" style={{borderRadius:"18px",padding:"26px 24px",color:"#fff",marginBottom:"18px"}}>
  <p className="aha-eyebrow">AI Learning Center · Học & Công cụ</p>
  <h1 style={{fontSize:"24px",fontWeight:800,margin:"6px 0 0"}}>Hướng dẫn Claude</h1>
</div>
```

---

## 5. YES A.I DO → "INTERNAL AI ACADEMY" (đã áp dụng)

Cấu trúc mới dùng **`<Tabs>`**, mỗi workshop là 1 tab, trong tab theo đúng thứ tự bạn yêu cầu và **Resources nằm ngay trong workshop**:

```mdx
<Tabs>
  <Tab title="Workshop #1 · Shape · Setup · Showcase">
    <div className="aha-hero-glow" style={{borderRadius:"16px",padding:"22px 20px",color:"#fff",marginBottom:"16px"}}>
      <p className="aha-eyebrow">YES A.I DO · Workshop #1</p>
      <h2 style={{color:"#fff",margin:"6px 0 0",border:"none"}}>[Tên workshop #1]</h2>
    </div>

    **Host:** `[Tên host #1]`

    ### Giới thiệu
    `[1–2 câu giới thiệu mục tiêu buổi #1]`

    ### Shape
    `[Nội dung phần Shape]`
    ### Setup
    `[Nội dung phần Setup]`
    ### Showcase
    `[Nội dung phần Showcase]`

    ### Tài liệu tham khảo
    <CardGroup cols={2}>
      <Card title="Slide / Recording" icon="file-lines" href="#">`[Link]`</Card>
      <Card title="Prompt mẫu" icon="wand-magic-sparkles" href="/ai-hub/prompt-library">Bộ prompt liên quan.</Card>
    </CardGroup>
  </Tab>

  <Tab title="Workshop #2 · Nội dung chính">
    … Host → Giới thiệu → Nội dung chính → Tài liệu tham khảo (CardGroup inline) …
  </Tab>

  <Tab title="Workshop #3 · Nội dung chính">
    … Trainer → Giới thiệu → Nội dung chính → Tài liệu tham khảo (CardGroup inline) …
  </Tab>
</Tabs>
```
Đặc điểm: **không có** mục Objectives/Learning Outcomes/Summary/Notes/FAQ; **không** gom Resources cuối trang — mỗi workshop tự chứa Resources. Nội dung thật để placeholder cho EX điền.

---

## 6. style.css IMPROVEMENTS (đã áp dụng)

Bổ sung design tokens + tiện ích **glass / gradient / AI glow / spacing / hover** (giữ brand). Trích các phần chính:

```css
:root{ --aha-orange:#FF7A21; --aha-orange2:#FF9A52; --aha-navy:#0E4174; --aha-navy2:#0B1530; --aha-radius:14px; }

/* Hero / khối AI có quầng sáng cam trên nền navy */
.aha-hero-glow{
  background:
    radial-gradient(720px 300px at 88% -12%, rgba(255,122,33,.38), transparent 60%),
    linear-gradient(135deg, var(--aha-navy2), var(--aha-navy));
}
.aha-eyebrow{ color:var(--aha-orange2); letter-spacing:2px; font-size:12px; font-weight:700;
  text-transform:uppercase; margin:0; }

/* Glassmorphism card */
.aha-glass{
  background:rgba(255,255,255,.65) !important;
  backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.5) !important;
}

/* Gradient viền trên khi hover (cảm giác AI) */
.aha-card{ position:relative; }
.aha-card::after{ content:""; position:absolute; inset:0; border-radius:14px; padding:1px;
  background:linear-gradient(135deg,var(--aha-orange),transparent 60%); opacity:0; transition:.18s;
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude; }
.aha-card:hover::after{ opacity:1; }

/* Card hover nâng + glow nhẹ (đã có, tăng cường) */
[class*="Card"]:hover{ transform:translateY(-3px); box-shadow:0 14px 34px rgba(20,34,70,.14); }

/* Spacing dễ đọc hơn */
.prose h2{ margin-top:2.2em; } .prose p{ line-height:1.7; }
```

---

## 7. TOP 20 QUICK WINS (triển khai ngay trong Mintlify)

**Nhóm A — đã làm sẵn trong bản kèm theo**
1. `style.css`: thêm tokens + `.aha-hero-glow`, `.aha-glass`, `.aha-card` gradient, hover glow, spacing.
2. YES A.I DO → Internal AI Academy (Tabs theo workshop, Resources inline).

**Nhóm B — dán code là xong (≤10' mỗi việc)**
3. Hero strip 3 dòng (eyebrow+H1+sub) cho mọi `*/overview.mdx`.
4. Thêm "Tiến trình của bạn" (Level 1·2·3) vào AI Academy overview.
5. Bọc quick-access card trang chủ bằng `className="aha-card aha-glass"`.
6. Đổi hero trang chủ sang `className="aha-hero-glow"` (bỏ gradient inline dài).
7. Đổi `name` docs.json → **"Ahamove Digital Workplace"** (cảm giác workplace, không "Handbook").
8. Thêm `<Tooltip>`/badge **NEW/HOT** cho card chương trình (đã có chữ HOT — chuyển thành badge cam).
9. Glossary: đổi bảng dài → `<AccordionGroup>` theo nhóm (gọn, đỡ mỏi mắt).
10. company-calendar: đổi bullet → bảng + 3 thẻ "mốc cố định".
11. Mỗi trang AI Academy con: thêm dòng badge **"Powered by Claude"**.
12. Footer: thêm cột "AI Academy" (Claude · Prompt · Playbook).
13. Trang chủ: thêm 1 dòng "Tiếp tục học AI" (CTA tới AI Academy) dưới stat row.
14. Chuẩn hoá icon-box card (nền `--aha-cream`, bo 12px) cho mọi CardGroup overview.
15. `contextual.options`: thêm `"chatgpt"`,`"claude"` để nút "Open in ChatGPT/Claude" xuất hiện (AI feel, hợp tầm nhìn).

**Nhóm C — cấu hình Dashboard (không sửa file)**
16. Bật **Assistant (Ask AI)**, đổi nhãn "Hỏi Ahamove AI".
17. Bật **Analytics** → theo dõi top search.
18. Trỏ **custom domain** docs.ahamove.com.
19. Bật **dark mode** mặc định cho trang AI Academy (cảm giác high-tech) qua `appearance` hoặc per-page.
20. Thêm **OG image** (poster.png) cho share link nội bộ đẹp.

---

*File `style.css` và `ai-hub/yes-ai-do.mdx` trong zip kèm theo đã áp dụng mục 5 & 6. Các mục 3–15 đều có code mẫu ở trên, dán trực tiếp vào Mintlify là chạy — không đổi nền tảng.*

---


<!-- ============================================================ -->
# 📄 PHẦN: Ahamove_UX_Layout_System_2026.md
<!-- ============================================================ -->

# Ahamove Handbook — UX & Layout System 2026
## Audit + Page-type Layout Library + AI Academy / YES A.I DO redesign

> Vai trò: Senior Product Designer · UX Writer · Employee Experience Designer · Mintlify Expert.
> Ràng buộc: **KHÔNG đổi** IA / navigation / folder / nội dung cốt lõi. Chỉ nâng **visual hierarchy, layout diversity, engagement, AI-driven feeling**.
> Hiện trạng đã có: `style.css` (tokens `--aha-*`, `.aha-hero-glow`, `.aha-glass`, `.aha-card`, hover, H2 accent), AI Academy 3 lớp, YES A.I DO 3 tab, AI Showcase 2026 (mẫu tốt), brand cam `#FF7A21` / navy `#0E4174`, font Lexend.

---

## 1. AUDIT TOÀN HỆ THỐNG

### Điểm mạnh
- IA gọn (7 tab), đã Việt hoá, dùng component native, không emoji.
- Trang chủ đã là dashboard (hero + stat + quick access + journey + rail).
- **AI Showcase 2026** đạt chuẩn "event page": poster → quote → CardGroup màu → Steps đăng ký. Dùng làm **khuôn mẫu** cho mọi event/gallery page.
- `style.css` đã có nền tảng design-system (glass/glow/gradient).

### Điểm yếu & phân loại theo triệu chứng
| Triệu chứng | Trang điển hình | Vì sao |
| --- | --- | --- |
| **Layout lặp** (mọi trang = H2 + CardGroup) | overview của Handbook/Policies/Benefits/Office | Cùng 1 khuôn → đơn điệu |
| **Khu vực nhàm chán** (bullet dài) | glossary, company-calendar, learning-support, expense-policy | Text liệt kê, ít nhịp |
| **Thiếu visual** | day-1, week-1, first-month (timeline nhưng phẳng) | Chưa có timeline thực thụ, thiếu số liệu |
| **Thiếu storytelling** | AI Academy overview, YES A.I DO | Là "mục lục" hơn là "hành trình học" |
| **Trang con AI thiếu hero** | claude-guide, prompt-library, ai-playbook | Vào thẳng `##`, không có điểm vào thị giác |
| **Dashboard feel chưa đủ** | trang chủ + AI Academy | Thiếu metric/counter & "tiếp tục học" |

**Kết luận:** không thiếu nội dung — thiếu **đa dạng layout** và **nhịp thị giác**. Giải pháp = một **thư viện 5 loại page** dùng lại nhất quán (bên dưới).

---

## 2. ƯU TIÊN THEO IMPACT / EFFORT

| # | Cải tiến | Impact | Effort | Ưu tiên |
| --- | --- | --- | --- | --- |
| 1 | YES A.I DO → 9-section workshop template | ★★★ | TB | **Now** |
| 2 | AI Academy overview → Learning Journey (Steps lớn + progress) | ★★★ | Thấp | **Now** |
| 3 | Hero strip 3 dòng cho mọi `*/overview` + trang con AI | ★★★ | Thấp | **Now** |
| 4 | Component `<StatRow>` (metric AI adoption) tái dùng | ★★ | Thấp | **Now** |
| 5 | Timeline thật cho Ngày/Tuần/Tháng đầu | ★★ | TB | P2 |
| 6 | Dashboard tiles cho AI Academy & Công cụ nội bộ | ★★ | TB | P2 |
| 7 | Gallery grid cho Showcase/Event recap | ★★ | TB | P2 |
| 8 | glossary/calendar: bullet → Accordion/bảng+thẻ | ★ | Thấp | P2 |
| 9 | CSS: stat/timeline/dashboard/gallery utilities | ★★ | Thấp | **Now** |
| 10 | Illustration/icon nhất quán + ảnh thật | ★★ | Cao | P3 |

---

## 3. WIREFRAME 5 LOẠI PAGE + CODE MẪU

### 3.1 HERO PAGE — Homepage · AI Academy · Life at Ahamove
```
┌──────────────────────────────────────────┐
│  [eyebrow cam]  AHAMOVE · 2026            │
│  H1 lớn trắng                              │  ← .aha-hero-glow (navy + quầng cam)
│  1 dòng mô tả · 2 CTA                      │
├──────────────────────────────────────────┤
│  [Stat] [Stat] [Stat] [Stat]              │  ← StatRow (metric)
├──────────────────────────────────────────┤
│  CardGroup truy cập nhanh (glass cards)   │
└──────────────────────────────────────────┘
```
```mdx
<div className="aha-hero-glow" style={{borderRadius:"22px",padding:"40px 32px",color:"#fff"}}>
  <p className="aha-eyebrow">Ahamove · 2026 · AI-Driven Company</p>
  <h1 style={{fontSize:"32px",fontWeight:800,margin:"10px 0 6px"}}>Ahamove Digital Workplace</h1>
  <p style={{maxWidth:"480px",color:"rgba(255,255,255,.82)",margin:0}}>Mọi thứ một Ahamover cần để làm việc & phát triển trong kỷ nguyên AI.</p>
</div>

<div className="aha-stats">
  <div className="aha-stat"><b>45 triệu+</b><span>Đơn hàng / năm</span></div>
  <div className="aha-stat"><b>100%</b><span>Nhân sự dùng Claude Pro</span></div>
  <div className="aha-stat"><b>20+</b><span>Tỉnh thành</span></div>
  <div className="aha-stat"><b>2015</b><span>Năm thành lập</span></div>
</div>
```

### 3.2 TIMELINE PAGE — Ngày/Tuần/Tháng đầu
```
●─ 09:00  Đào tạo hội nhập cùng HRBP
│
●─ 09:30  Giới thiệu với team
│
●─ 12:00  Ăn trưa cùng team
```
Dùng `<Steps>` (đã hỗ trợ icon) cho dòng thời gian — **đủ** và responsive; nếu muốn timeline dọc có chấm, dùng `.aha-timeline` (CSS mục 5). Code:
```mdx
<Steps>
  <Step title="09:00 – 09:30 · Đào tạo hội nhập cùng HRBP" icon="handshake">…</Step>
  <Step title="09:30 – 10:00 · Giới thiệu với team" icon="users">…</Step>
</Steps>
```

### 3.3 DASHBOARD PAGE — AI Academy · Công cụ nội bộ
```
┌───────── Hero strip ─────────┐
│ Learning Journey (Steps)     │
├──── tiles 2×N ───────────────┤
│ [Claude] [Prompt] [Playbook] │  ← Feature tiles (icon lớn + 1 dòng + tag)
│ [YES AI] [Showcase] [Tour]   │
└──────────────────────────────┘
```
```mdx
<CardGroup cols={3}>
  <Card title="Hướng dẫn Claude" icon="robot" href="/ai-hub/claude-guide">Trợ lý AI chính · Claude Pro 100%.</Card>
  <Card title="Prompt Library" icon="wand-magic-sparkles" href="/ai-hub/prompt-library">Bộ prompt dùng ngay.</Card>
  <Card title="AI Playbook" icon="lightbulb" href="/ai-hub/ai-playbook">Ứng dụng theo phòng ban.</Card>
</CardGroup>
```

### 3.4 GALLERY PAGE — YES A.I DO · AI Showcase · Event recap
```
[ poster lớn / banner ]
[ img ][ img ][ img ]   ← Frame grid 3 cột, bo góc (đã có CSS)
caption ngắn mỗi ảnh
```
```mdx
<Columns cols={3}>
  <Frame caption="Khoảnh khắc Workshop #1"><img src="/images/ws1-1.jpg" /></Frame>
  <Frame caption="Demo thực tế"><img src="/images/ws1-2.jpg" /></Frame>
  <Frame caption="Đội ngũ AI Ambassadors"><img src="/images/ws1-3.jpg" /></Frame>
</Columns>
```

### 3.5 RESOURCE HUB — Prompt Library · AI Playbook · Claude Guide
```
Hero strip → Tabs theo nhóm → CodeGroup / Accordion (copy nhanh)
```
```mdx
<Tabs>
  <Tab title="Viết & Email"><CodeGroup>```text Email\n…\n```</CodeGroup></Tab>
  <Tab title="Phân tích"><CodeGroup>```text So sánh\n…\n```</CodeGroup></Tab>
</Tabs>
```

---

## 4. AI ACADEMY — LEARNING JOURNEY (Nhiệm vụ 3)

Biến overview từ "mục lục" thành **hành trình học** rõ ràng:
`AI Academy → Learning Journey → Workshop → Practice → Showcase → Study Tour`

```mdx
## Learning Journey
<Steps>
  <Step title="1 · Khởi động — AI Mindset & Tooling" icon="seedling">
    Cấp Claude Pro & tư duy AI-first. → [YES A.I DO](/ai-hub/yes-ai-do)
  </Step>
  <Step title="2 · Workshop — Học theo buổi" icon="chalkboard-user">
    3 buổi: Shape · Setup · Showcase. → [YES A.I DO](/ai-hub/yes-ai-do)
  </Step>
  <Step title="3 · Practice — Áp dụng vào việc thật" icon="wand-magic-sparkles">
    Prompt Library + AI Playbook theo phòng ban.
  </Step>
  <Step title="4 · Showcase — Trình diễn kết quả" icon="trophy">
    Thi & nhân rộng workflow. → [AI Showcase 2026](/ai-hub/ai-showcase-2026)
  </Step>
  <Step title="5 · Study Tour — Học hỏi quốc tế" icon="plane">
    Giải nhất đi Trung Quốc. → [Study Tour](/ai-hub/study-tour-china)
  </Step>
</Steps>
```

---

## 5. YES A.I DO — 9-SECTION WORKSHOP TEMPLATE (Nhiệm vụ 4 — đã áp dụng vào source)

Mỗi workshop là 1 `<Tab>`, **cùng 1 cấu trúc 9 mục**, **Workshop Materials nằm trong chính workshop** (không tách trang):
```
Workshop Hero → Overview → Key Learnings → Trainer → Tools & Platforms
→ Workshop Materials → Practice Resources → Gallery/Showcase → Related Workshops
```
Khuôn MDX (rút gọn — bản đầy đủ trong `ai-hub/yes-ai-do.mdx`):
```mdx
<Tab title="Workshop #1">
  <div className="aha-hero-glow" style={{borderRadius:"14px",padding:"18px",color:"#fff"}}>
    <p className="aha-eyebrow">YES A.I DO · Workshop #1</p>
    <p style={{fontSize:"18px",fontWeight:800,color:"#fff",margin:"4px 0 0"}}>`[Tên workshop]`</p>
  </div>

  ### Overview
  `[Giới thiệu ngắn]`

  ### Key Learnings
  <CardGroup cols={3}><Card title="…" icon="check">…</Card>…</CardGroup>

  ### Trainer
  <Card title="`[Tên Host/Trainer]`" icon="user">`[Vai trò]`</Card>

  ### Tools & Platforms
  <CardGroup cols={3}><Card title="Claude Pro" icon="robot">…</Card>…</CardGroup>

  ### Workshop Materials
  <CardGroup cols={2}><Card title="Slide / Recording" icon="file-lines" href="#">`[Link]`</Card>…</CardGroup>

  ### Practice Resources
  <CardGroup cols={2}><Card title="Prompt Library" icon="wand-magic-sparkles" href="/ai-hub/prompt-library">…</Card>…</CardGroup>

  ### Gallery / Showcase
  <Columns cols={3}><Frame><img src="/images/…" /></Frame>…</Columns>

  ### Related Workshops
  <CardGroup cols={2}><Card title="Workshop #2" href="#">…</Card></CardGroup>
</Tab>
```
> Nội dung thật để placeholder `[…]` cho EX điền — **không viết nội dung mới**.

---

## 6. MINTLIFY COMPONENTS — KHI NÀO DÙNG GÌ
| Mục đích | Component | Tránh |
| --- | --- | --- |
| Điểm vào trang | `.aha-hero-glow` block | vào thẳng `##` |
| Nhóm lối tắt | `<CardGroup>` (+`.aha-glass`) | bullet list |
| Quy trình/lịch | `<Steps>` / `.aha-timeline` | đoạn văn dài |
| So sánh / nhiều buổi | `<Tabs>` | nhiều H2 nối tiếp |
| Hỏi đáp | `<AccordionGroup>` | bảng dài |
| Số liệu | `.aha-stats` (StatRow) | câu chữ |
| Nhấn mạnh | `<Note>/<Tip>/<Warning>` | bôi đậm tràn lan |
| Ảnh/sự kiện | `<Frame>` + `<Columns>` | ảnh rời không bo góc |

---

## 7. CSS BỔ SUNG (thêm vào `style.css` hiện có — đã áp dụng các phần cốt lõi)

```css
/* Stat row — metric AI adoption */
.aha-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; margin:14px 0; }
.aha-stat{ background:var(--aha-cream); border:1px solid #F6DCC8; border-radius:14px; padding:16px; }
.aha-stat b{ display:block; font-size:24px; font-weight:800; color:#D65A12; line-height:1; }
.aha-stat span{ font-size:12.5px; color:var(--aha-grey); }

/* Timeline dọc có chấm cam */
.aha-timeline{ border-left:2px solid #F6DCC8; margin-left:8px; padding-left:24px; }
.aha-timeline .t{ position:relative; padding-bottom:18px; }
.aha-timeline .t::before{ content:""; position:absolute; left:-31px; top:3px; width:13px; height:13px;
  border-radius:50%; background:#fff; border:3px solid var(--aha-orange); }

/* Dashboard tile glow khi hover */
.aha-tile{ border-radius:16px; border:1px solid var(--aha-line); padding:18px; background:#fff; }
.aha-tile:hover{ box-shadow:0 0 0 1px rgba(255,122,33,.4), 0 14px 34px rgba(255,122,33,.15); }
```

---

## 8. HÌNH ẢNH / ILLUSTRATION / ICON STYLE
- **Icon:** giữ Font Awesome qua `<Icon>` (đồng bộ, free); 1 màu cam/navy, không trộn emoji.
- **Illustration:** dùng bộ nhân vật Ahamover + truck của ahamove.com (flat, 2 màu thương hiệu) cho hero phụ; mascot AI cho AI Academy.
- **Ảnh thật:** sự kiện (Showcase/Workshop), văn phòng, đồng phục, org chart — luôn qua `<Frame>` (đã bo góc bằng `style.css`). Tỷ lệ 16:9 hoặc 1:1, nén < 300KB.
- **AI feel:** nền navy + quầng cam (`.aha-hero-glow`) cho mọi khối "AI/2026"; badge "Powered by Claude".

---

## 9. KẾ HOẠCH NÂNG CẤP

**Phase 1 — Now (đã/đang làm, ≤1 ngày)**
- YES A.I DO 9-section template (đã áp dụng). · AI Academy Learning Journey. · `.aha-stats` + CSS utilities. · Hero strip cho trang con AI.

**Phase 2 — Tuần 1–2**
- Timeline thật cho Ngày/Tuần/Tháng đầu. · Dashboard tiles cho AI Academy & Công cụ nội bộ. · Gallery grid cho Showcase/Workshop (cần ảnh thật). · glossary/calendar đổi sang Accordion/bảng+thẻ.

**Phase 3 — Tháng 1+**
- Bộ illustration/ảnh thật đồng bộ. · AI adoption metrics dashboard (số liệu cập nhật). · Bật Assistant + Analytics (Dashboard). · Chuẩn hoá template toàn site qua snippet.

---

*Toàn bộ code trên dùng component native + class `.aha-*` đã có trong `style.css`, responsive an toàn (không dùng `<style>` media-query trong custom page). `ai-hub/yes-ai-do.mdx` trong zip kèm theo đã áp dụng cấu trúc 9 mục ở Mục 5.*

---

