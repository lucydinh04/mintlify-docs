# Ahamove Employee Hub — Visual Asset Brief

Danh sách hình ảnh cần bổ sung để hoàn thiện visual system theo hướng **Atlassian-inspired product platform** (branded Ahamove, không copy Atlassian).

Mỗi vị trí hiện đang dùng **placeholder có chủ đích** (class `.aha-visual-slot` trong `style.css`, hoặc mockup dựng bằng CSS ở homepage). Khi có ảnh thật, thay khối placeholder bằng `<Frame>![alt](/images/<file>)</Frame>` (trang nội dung) hoặc `<img>` (homepage `mode: custom`).

## Brand & style chung

- Màu: Orange `#FF7A21` · Light orange `#FF9A52` · Navy `#0E4174` · Navy đậm `#0B1530` · Cream `#FFF4EC`.
- Nền chính: navy / off-white / white. Cam dùng cho accent, CTA, motion line. Cream cho warm.
- Mood: clean SaaS / enterprise product, rounded cards (radius 16–24px), soft shadow, subtle grid. **Không** poster truyền thông, **không** cartoon, **không** neon gradient nặng.
- Tất cả mockup/illustration: không chứa dữ liệu mật thật (khách hàng, tài xế, lương cá nhân).

## Bảng asset

| Asset | Page | Placement | Ratio | Priority | Brief | Style direction |
| --- | --- | --- | --- | --- | --- | --- |
| `employee-hub-dashboard.png` | `index.mdx` | Hero — visual bên phải | 16:10 | High | Dashboard "Employee Hub" với mini card: Onboarding progress, 1Office quick action, Help Center, Latest update, AI Academy spotlight | Clean SaaS dashboard, navy/off-white, orange accent, rounded cards, subtle shadow |
| `onboarding-journey-map.png` | `index.mdx` · `ahamazing-guide/overview.mdx` | Sau section Hành trình hội nhập / trước phase ① | 16:9 | High | Bản đồ hành trình Ngày đầu → Tuần đầu → Tháng đầu nối bằng path | Friendly product illustration, cam/navy, đường path mềm, không trẻ con |
| `1office-workflow-preview.png` | `index.mdx` | Trong card lớn "Hệ thống 1Office" | 16:10 | High | Mockup UI workflow: Thủ tục nhân sự, Nghỉ phép, Phiếu lương, Chữ ký số, Trợ lý AI 1Office | Product UI mockup, workflow cards, clean enterprise portal |
| `1office-system-map.png` | `handbook/internal-systems.mdx` | Sau intro/CTA, đầu trang | 16:9 | High | Sơ đồ hệ thống: Đăng nhập → Thiết lập → Nghỉ phép/Công tác → Phiếu lương → Chữ ký số → Trợ lý AI | System map, connected workflow cards, navy/cam, internal product style |
| `ahamove-network-proof.png` | `index.mdx` | Nền band "Ahamove qua những con số" | 21:9 | Medium | Mạng lưới logistics trừu tượng làm nền cho 3 stat card | Abstract logistics network, soft blue bg, orange motion line, premium, không cartoon |
| `help-center-search-hub.png` | `help-center/overview.mdx` | Sau hero strip | 16:9 | Medium | Support hub: thanh search lớn, category icons, support routing flow | Intercom/Atlassian-inspired, clean search UI, category cards, thân thiện-chuyên nghiệp |
| `benefits-care-illustration.png` | `benefits/overview.mdx` | Sau benefit tiles | 16:9 | Medium | Minh họa employee care: khám sức khỏe, bảo hiểm, chăm sóc nhân viên | Warm corporate illustration, nền cream, accent cam/navy, hiện đại, không quá cute |
| `office-guide-map.png` | `office-guide/overview.mdx` | Sau facility tiles | 16:9 | Low | Sơ đồ/card văn phòng: địa điểm, phòng họp, pantry, gửi xe, hỗ trợ | Modern workplace map, facility icons sạch, nền sáng, accent thương hiệu |
| `ai-academy-learning-path.png` | `ai-hub/overview.mdx` | Trước "Learning Journey" | 16:9 | Medium | Lộ trình học AI modular: Claude Guide → AI Playbook → YES A.I DO → AI Showcase → Study Tour | Premium AI learning hub, navy gradient, orange glow vừa phải, product-tech, không poster |
| `ahamove-company.png` | `index.mdx` | Section "Ahamove — ngôi nhà chung" | 21:9 | Medium | Ảnh công ty: đội ngũ, văn phòng, tài xế hoặc khoảnh khắc công ty | Ảnh thương hiệu chân thực, tông cam/navy |
| `message-2026.png` | `ahamazing-guide/company-overview.mdx` | Dưới khung "Thông điệp 2026" | 16:9 | Medium | Key visual thông điệp 2026 trong khung brand guideline (CEO/town hall/strategy key visual) | Navy gradient, accent cam, logo Ahamove |
| `uniform-team.png` | `ahamazing-guide/culture.mdx` | Khu "Văn hóa" — ảnh lớn bên trái | 4:5 hoặc 1:1 | Medium | Nhân viên Ahamove mặc áo cam trong "Thứ Hai Chill" | Ảnh đời thường, tươi, đúng tông thương hiệu |
| `shirt-classic.png` · `shirt-polo.png` · `shirt-jacket.png` · `shirt-event.png` | `ahamazing-guide/culture.mdx` | Carousel ấn phẩm áo (cuộn ngang) | 1:1 | Low | Ảnh ấn phẩm áo Ahamove: thun cổ điển, polo, khoác, bản sự kiện | Nền sạch, tông cam/navy, product shot |
| `org-chart.png` | `handbook/org-structure.mdx` | Section "Sơ đồ cơ cấu tổ chức" | 16:9 hoặc dọc | High | Sơ đồ tổ chức hiện tại của Ahamove, **click-to-zoom** (chèn bằng component Frame) | Sơ đồ sạch, tông navy/cam |

## Cách thay placeholder bằng ảnh thật

**Trang nội dung (MDX thường):**

```mdx
<Frame caption="Ahamove Employee Hub">
  ![Employee Hub dashboard](/images/employee-hub-dashboard.png)
</Frame>
```

**Homepage (`index.mdx`, `mode: custom`):** thay block mockup/`<p style={S.brief}>` bằng:

```jsx
<img src="/images/employee-hub-dashboard.png" alt="Employee Hub dashboard" style={{ width: "100%", borderRadius: "18px" }} />
```

Đặt file vào thư mục `images/`. Giữ đúng tên file ở cột Asset để khớp brief.

## Lưu ý

- Không dùng ảnh Atlassian thật, không dùng ảnh random từ internet.
- Không đưa poster AI vuông lớn vào homepage (AI giữ vai trò spotlight phụ).
- Không khôi phục các mục đã bỏ: Prompt Library, Quy tắc ứng xử, Hỗ trợ học tập, Ghi nhận & vinh danh.
