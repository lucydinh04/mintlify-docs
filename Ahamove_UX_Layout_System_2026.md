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
