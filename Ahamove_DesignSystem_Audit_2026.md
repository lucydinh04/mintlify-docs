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
