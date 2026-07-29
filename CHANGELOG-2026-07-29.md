# Changelog — Điều chỉnh theo feedback (29/07/2026)

Nguồn feedback: Google Sheet "Ahamove_Handbook_Sitemap_Feedback" (tab Sitemap & Feedback + tab BinhNT).
Structure sidebar giữ nguyên như bản gốc (5 tab, các group cũ) — chỉ thêm trang mới, không xóa/đảo section nào (trừ 1 khối trùng lặp ở Khám sức khỏe, theo feedback #9).

## File MỚI

| File | Nội dung |
| :--- | :--- |
| `life/activities.mdx` | Trang "Hoạt động & Truyền thông nội bộ" (Life at Ahamove): khối Tin tức (feed 6 tháng, 2 tin placeholder: tiền xăng + IT), khối Sự kiện & Khoảnh khắc (gallery: YEP/Trip/Team building/AHA Tây Du Ký = placeholder ảnh; YES A.I DO + AI Showcase = ảnh sẵn có), bảng Kênh truyền thông, đầu mối Truyền thông & Event |

## File SỬA

| File | Thay đổi chính |
| :--- | :--- |
| `docs.json` | Thêm `week-1`, `first-month` sau `day-1` (cùng group cũ); thêm `life/activities` vào Life at Ahamove; đổi tên group "Hệ thống 1Office & Quy trình nhân sự" → "Tài khoản, Hệ thống & Quy trình" (feedback #12); navbar "Cập nhật gần đây" chuyển thành button (#1.3) |
| `ahamazing-guide/overview.mdx` | Subtitle nêu rõ mục đích lộ trình (#2.2); thêm section "Lộ trình theo thời gian" (Ngày đầu → Tuần đầu → Tháng đầu) (#2.4); list "Tôi nên bắt đầu từ đâu?" giữ nguyên 6 mục |
| `ahamazing-guide/company-overview.mdx` | Thay section Hệ sinh thái Scommerce bằng nội dung đã duyệt tab BinhNT (3 card GHN Express/GHN Logistics/Ahamove + flow chuỗi cung ứng) (#3.2); ảnh scommerce giữ vị trí gốc |
| `ahamazing-guide/culture.mdx` | Intro nêu rõ học được gì (#4.1); fix pill click cuộn đúng section — thêm id anchor (#4.2); khối giải thích quote CEO "ngăn nắp & minh bạch" (#4.3); bảng Giá trị → Hành vi nên làm/nên tránh (#4.4); section mới "Cách chúng ta làm việc" (#4.5); scrollbar ngang hiển thị rõ |
| `ahamazing-guide/day-1.mdx` | Title → "Ngày đầu tiên" (khớp sitemap); section Pre-onboarding (hồ sơ + giờ có mặt 09:00) (#11.1); fix pill anchors (#5.1); lấp slot 10:00–12:00 (#5.2); checklist thêm Ở đâu/Xong khi/Ai hỗ trợ (#5.3); khối "Bị vướng thì hỏi ai?" (#5.4) |
| `ahamazing-guide/week-1.mdx` | Đổi "Ahamove AI" → "Ahassistant" |
| `handbook/org-structure.mdx` | Mở rộng toàn trang (#6): cách dùng sơ đồ, giới thiệu CEO Phạm Hữu Ngôn + Lương Duy Hoài (nguồn công khai), bảng Khối/Phòng ban · Vai trò · Khi nào phối hợp (11 đơn vị), link mở ảnh org chart tab mới (né bug zoom), TODO ảnh MT |
| `handbook/glossary.mdx` | Ô tìm kiếm lọc realtime (#7.1); thêm ~15 thuật ngữ (BD, ENT, MP, BMI, C&B, L&OD, MT, OKR, G-Grade, GenVita, 1AI Assistant, Ahassistant…); id anchor cho 4 nhóm |
| `handbook/internal-systems.mdx` | Bảng "Tài khoản của bạn" (Email/1Office/Telegram/Claude Pro — ai cấp, ai hỗ trợ) (#12.3); viết lại mục đích dùng 1Office gồm tạo/duyệt quy trình (#12.2); "AI Assistant" → "1AI Assistant" (#12.4); số liệu cá nhân: hỏi 1AI Assistant trước rồi HRBP (#12.5); note hệ thống theo phòng ban đang tổng hợp (#12.1) |
| `handbook/hr-processes.mdx` | Strip đổi thành "Quy định & Quy trình nhân sự" (#13); bỏ ý "NV nam có vợ sinh con nghỉ 2 ngày" (#13.1); hướng dẫn nghỉ phép viết lại 2 cách: tự tạo + qua chatbot (#13.2); OKRs "trong tuần đầu tiên" (#13.4); note quy trình khác đang bổ sung cùng HRBP (#13.5) |
| `handbook/payroll.mdx` | Xem phiếu lương 2 cách (tự xem + chatbot) (#14.1); T13 tính theo thời gian làm việc trong năm (#14.2); "các phúc lợi khác" (#14.3); chuẩn tên Ahassistant/1AI Assistant (#14.4) |
| `benefits/overview.mdx` | Bỏ card "Sức khỏe định kỳ" trùng; bold Thưởng T13 & Hiệu suất năm; thêm card quà lễ Tết/L&D/Claude Pro/Welcome Kit (#8.1); bảng Eligibility 5 câu hỏi (#8.2); bảng How to claim (#8.3); tip "hỏi Ahassistant trước → HRBP" (#8.4) |
| `benefits/health-check.mdx` | Xóa khối Info "Chi tiết chương trình" trùng lặp (#9) |
| `benefits/insurance.mdx` | Thêm card đầu mối EW SCommerce (placeholder chờ tên/contact) (#10) |
| `office-guide/overview.mdx` | Giờ nhận việc 09:00 (bỏ "~") + link Pre-onboarding (#11.1); viết lại quy định bãi xe (#11.2); pantry = nơi ăn trưa/bonding + placeholder máy cà phê (#11.3); placeholder in màu (#11.4); "chịu trách nhiệm quản lý" thiết bị + note chính sách laptop (#11.5); thống nhất term IT Support/OM (#11.6) |
| `ai-hub/overview.mdx` | Khối highlight "100% NVCT được cấp Claude Pro" đưa thẳng ra trang (#15.2); note AI Playbook đang kiểm chứng (#15.1) |
| `ai-hub/claude-guide.mdx` | Làm rõ hạn kích hoạt 01 tuần kể từ khi nhận email (#16.1); section "Dùng hết token thì sao?" (#16.2 — quy trình chờ DevOps chuẩn hóa) |
| `ai-hub/yes-ai-do.mdx` | Thêm 3 card giới thiệu 3 workshop trước Tabs để 2 khóa sau không bị chìm (#15.3) |
| `ai-hub/ai-playbook.mdx` | Note thư viện đang kiểm chứng cùng từng phòng ban (#17) |
| `help-center/overview.mdx` | "Hỏi Ahamove AI" → "Hỏi Ahassistant"; "Ask Ahamove AI" → "Ask AI Ahassistant" (#1.1) |
| `help-center/faq.mdx` | 3 chỗ "Ahamove AI" → "Ahassistant" |
| `help-center/ask-ahamove-ai.mdx` | Title → "Hỏi Ahassistant"; phân biệt rõ với 1AI Assistant; fix link gãy /office-guide/parking → /office-guide/overview |
| `aha-custom.js` | Thêm hàm lọc thuật ngữ realtime cho trang Glossary (không phân biệt dấu) |
| `style.css` | Thêm cuối file: style ô tìm kiếm glossary + scrollbar ngang màu cam dễ thấy (#3.1) |

## Placeholder chờ thông tin nội bộ

OM/chị Thức: để xe qua đêm, máy cà phê, in màu · C&B: eligibility chi tiết, quà lễ Tết · HRBP: quy trình bổ sung, xác nhận bảng phòng ban · EW SCommerce: tên/contact · DevOps: quy trình nâng cấp Claude · L&OD: tin tức 6 tháng (tiền xăng, IT), ảnh YEP/Trip/Team building/Tây Du Ký, ảnh MT

## Chưa xử lý được bằng code

- Nút "Copy page" / "Ask a question" là chuỗi mặc định Mintlify → chỉnh trong Mintlify dashboard
- Bug zoom ảnh org chart là hành vi component Frame → đã thêm link "mở ảnh đầy đủ" làm workaround
