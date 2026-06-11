# Ahamove Employee Portal — Hướng dẫn cho HR

Đây là cổng thông tin nội bộ Ahamove, xây trên [Mintlify](https://mintlify.com). Trang web tương lai: **docs.ahamove.com**.

## Cấu trúc / Structure

- `docs.json` — cấu hình toàn bộ portal: màu sắc, logo, navigation (tabs/groups). **Sửa file này để thêm/đổi/xóa trang trong menu.**
- `*.mdx` — mỗi file là một trang. Viết bằng Markdown + vài component (Card, Steps, Accordion…).
- `index.mdx` — trang chủ (dashboard). Khu vực "Latest Updates" để đăng tin mới.
- `logo/`, `favicon.svg` — thay bằng logo Ahamove chính thức.

## HR cần làm gì để sửa nội dung / How to edit

1. **Sửa chữ trên một trang:** mở file `.mdx` tương ứng, sửa như văn bản thường, lưu lại.
2. **Thêm một trang mới:**
   - Tạo file mới, ví dụ `policies/new-policy.mdx` (có phần `---` frontmatter ở đầu: `title`, `description`, `icon`).
   - Mở `docs.json`, thêm `"policies/new-policy"` vào mảng `pages` của nhóm tương ứng.
3. **Đăng tin mới ở trang chủ:** mở `index.mdx`, thêm một khối `<Update label="..." description="...">...</Update>` ở đầu phần "Latest Updates".
4. **Đổi màu/logo:** sửa `colors` và `logo` trong `docs.json`.

> Mẹo: dùng [Mintlify web editor](https://mintlify.com/docs/editor) để sửa trực quan, không cần code.

## Chạy thử trên máy / Preview locally (tùy chọn)

```bash
npm i -g mint
mint dev
```

## Đăng lên web / Deploy

Kết nối repo GitHub này với Mintlify dashboard → mỗi lần push là tự cập nhật. Trỏ domain **docs.ahamove.com** trong phần Custom Domain.

## Phông chữ / Font

Portal dùng font **Lexend** (heading + body), cấu hình trong `docs.json` → `fonts`. Lexend là Google Font (có hỗ trợ tiếng Việt) nên Mintlify tự tải, không cần thao tác thêm.

Thư mục `fonts/` chứa sẵn file Lexend (.ttf, đủ các độ đậm) nếu cần **tự host offline**: chuyển .ttf sang .woff2, đặt vào repo, rồi trỏ trong `docs.json`:

```json
"fonts": {
  "heading": { "family": "Lexend", "weight": 700, "source": "/fonts/Lexend-Bold.woff2", "format": "woff2" },
  "body":    { "family": "Lexend", "weight": 400, "source": "/fonts/Lexend-Regular.woff2", "format": "woff2" }
}
```

## Placeholder cần thay / To fill in

Các trang có khối `<Note>` ghi *"Cần HR/Admin/Tech hoàn thiện"* hoặc `[…]` là chỗ cần điền dữ liệu thật (số liệu công ty, quy định chi tiết, lịch khám, định mức chi phí…).
