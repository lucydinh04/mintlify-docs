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
