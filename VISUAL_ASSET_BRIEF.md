# Visual Asset Brief — Ahamove Employee Hub Homepage

Ghi chú các asset placeholder đang dùng trong `index.mdx` và cách thay thế khi có ảnh thật.
Đặt ảnh vào `/public/images/` và dùng đường dẫn `/images/<filename>` trong MDX.

> Cập nhật lần cuối theo brief tháng 6/2026 — homepage redesign.


---

## 1. Hero Right Panel

| Field | Value |
|---|---|
| **Element** | `className="aha-hero-mock"` — right column of hero |
| **Target file** | `/public/images/employee-hub-dashboard.png` |
| **Aspect ratio** | 16:10 (wider than tall) |
| **Dimensions** | 640 × 400 px minimum; 2× for retina |
| **Background** | Dark navy / transparent (will sit on navy hero bg) |
| **Description** | A product UI screenshot or illustrative mockup of the Employee Hub portal dashboard. Shows the navigation, a welcome card, and key quick-action tiles. Should feel like a real-product screenshot, not an illustration. |
| **Tone** | Premium, clean, professional. No stock photo people. |

**When ready, replace:**
```mdx
<div className="aha-hero-mock" ...>
  {/* CSS mock */}
</div>
```
**With:**
```mdx
<img src="/images/employee-hub-dashboard.png" alt="Employee Hub dashboard" style={{ borderRadius: "16px", width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,.35)" }} />
```

---

## 2. Stat Band Visual

| Field | Value |
|---|---|
| **Element** | `className="aha-stat-visual"` — right side of stat band |
| **Target file** | `/public/images/ahamove-network-proof.png` |
| **Aspect ratio** | 4:3 (landscape) |
| **Dimensions** | 400 × 300 px minimum |
| **Background** | Dark navy (will sit on `#0B1530 → #0E2E5A` band — use transparent PNG or light-on-dark treatment) |
| **Description** | A map, network visualization, or data chart that represents Ahamove's scale (cities, deliveries, shipper network). Alternatively: a montage of delivery moments. Illustrates the stats beside it. |
| **Tone** | Data-driven, energetic, brand-positive. |

**When ready, add** `<img>` inside `.aha-stat-visual` div and remove the `.aha-visual-slot.compact` placeholder.

---

## 3. 1Office Feature Card Visual

| Field | Value |
|---|---|
| **Element** | `className="aha-visual-slot compact"` inside `bigCard` |
| **Target file** | `/public/images/1office-workflow-preview.png` |
| **Aspect ratio** | 16:10 |
| **Dimensions** | 560 × 350 px minimum |
| **Background** | White / very light (card has white background) |
| **Description** | Screenshot of the 1Office UI — ideally the leave-request or payroll screen. Shows real interface to build confidence before user clicks through. |
| **Tone** | Clean UI screenshot. Cropped tightly to the key workflow. |

---

## 4. Onboarding Journey Map

| Field | Value |
|---|---|
| **Element** | Journey section background / decorative (optional) |
| **Target file** | `/public/images/onboarding-journey-map.png` |
| **Aspect ratio** | 16:9 |
| **Dimensions** | 900 × 506 px minimum |
| **Description** | A timeline or roadmap graphic showing the 3-phase onboarding journey (Day 1 → Week 1 → Month 1). Could be an illustrated infographic or a clean diagram. Optional — section works without it. |

---

## 5. 1Office System Map

| Field | Value |
|---|---|
| **Element** | Small scard tile — "1Office" quick link |
| **Target file** | `/public/images/1office-system-map.png` |
| **Aspect ratio** | 1:1 (square icon/thumb) |
| **Dimensions** | 160 × 160 px minimum |
| **Description** | Icon or small illustration representing 1Office. Could be the 1Office logo on a clean background. |

---

## 6. Help Center Search Hub

| Field | Value |
|---|---|
| **Element** | Support panel in `.aha-bottom-band` |
| **Target file** | `/public/images/help-center-search-hub.png` |
| **Aspect ratio** | 3:2 |
| **Dimensions** | 480 × 320 px |
| **Description** | A simple illustration of an HR support / help desk concept. Could be an icon-based illustration — no real people faces. |

---

## 7. AI Academy Learning Path

| Field | Value |
|---|---|
| **Element** | AI Academy mention in bottom band updates panel |
| **Target file** | `/public/images/ai-academy-learning-path.png` |
| **Aspect ratio** | 16:9 |
| **Dimensions** | 560 × 315 px minimum |
| **Description** | Clean illustration of an AI learning journey or course curriculum cards. Should not dominate — this section is de-emphasized. Small thumbnail usage only. |

---

## Implementation Notes

- All images go in `/public/images/` — Mintlify serves `/public/` as the static root.
- Reference in MDX as `/images/<filename>` (no `/public` prefix).
- Use `width: "100%"` and explicit `borderRadius` in inline style when replacing a `.aha-visual-slot`.
- Remove the entire `<div className="aha-visual-slot ...">` block including `.vbadge`, `.vicon`, `.vtitle`, `.vratio`, `.vfile` children when replacing.
- Keep `.aha-hero-mock` div wrapper and just swap its contents for the `<img>` tag — the wrapper handles responsive hide on mobile.
