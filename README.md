# Thiệp cưới Tuấn Long & Khánh Chi

Site thiệp cưới tự host, viết bằng Next.js (App Router) + MongoDB. Được clone lại từ giao diện thiệp trên chungdoi.com với dữ liệu thật của chính cặp đôi; RSVP và sổ lưu bút lưu thẳng vào MongoDB của bạn qua 2 API route nhỏ, không cần backend riêng.

## Chạy thử

```bash
npm install
cp .env.local.example .env.local   # rồi điền MONGODB_URI thật của bạn
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Cấu trúc chính

- `lib/invitationData.ts` — toàn bộ nội dung thiệp (tên, ngày giờ, địa điểm, nhãn văn bản...). Sửa nội dung ở đây.
- `lib/mongodb.ts` — kết nối MongoDB dùng chung.
- `app/api/rsvp/route.ts` — lưu xác nhận tham dự vào collection `rsvps`.
- `app/api/wishes/route.ts` — lấy danh sách + lưu lời chúc vào collection `wishes`.
- `components/` — từng phần của thiệp (mở phong bì, đếm ngược, gallery, RSVP, sổ lưu bút...).

## Việc cần làm trước khi gửi thiệp thật

1. **Ngân hàng / QR mừng cưới** — hiện đang để trống (giống bản gốc). Điền vào `gift` trong `lib/invitationData.ts`:
   - `groomBankName`, `groomBankAccountName`, `groomBankAccountNumber`, `groomBankQr` (đường dẫn ảnh QR đặt trong `public/images/`)
   - Tương tự cho `bride...`
2. **Nhạc nền** — bỏ file mp3 có bản quyền hợp lệ của bạn vào `public/music/track.mp3`. Nút loa ở góc màn hình sẽ tự hiện khi file tồn tại (và ẩn nếu chưa có file).
3. **Ảnh hoa trang trí** (`public/images/decor/hoa.webp`) — ảnh này đang tạm lấy từ theme gốc của chungdoi.com để có ngay giao diện gần đúng. **Đây là asset độc quyền của chungdoi.com, nên thay bằng ảnh/hoa văn khác (tự thiết kế, mua license, hoặc AI-generate) trước khi dùng lâu dài hoặc chia sẻ công khai rộng rãi.**
   - **Ảnh địa điểm** (`public/images/venue/venue.jpg`) — hiện là ảnh dummy tự tạo. Thay bằng ảnh thật của địa điểm (giữ nguyên tên file, hoặc đổi đường dẫn `venueImage` trong `lib/invitationData.ts`).
   - **Quê quán gia đình** — sửa `familyLocation` của `groom`/`bride` trong `lib/invitationData.ts` (đang tạm để "Hà Nội").
4. **Bản đồ** — `mapEmbedUrl` trong `invitationData.ts` build tự động từ địa chỉ text; nếu muốn ghim đúng toạ độ, thay bằng link "Nhúng bản đồ" lấy từ Google Maps > Chia sẻ > Nhúng bản đồ.
5. Kiểm tra lại tên bố mẹ hai bên, giờ giấc, địa điểm trong `lib/invitationData.ts` cho chính xác 100%.

## Preview khi chia sẻ link (Facebook / Zalo)

Trang đã có sẵn thẻ Open Graph + Twitter Card, dùng ảnh preview `public/og.jpg` (1200×630).

- **Bắt buộc khi deploy:** đặt `NEXT_PUBLIC_SITE_URL` = domain thật (vd `https://ten-mien-cua-ban.com`) để Facebook/Zalo lấy được **URL tuyệt đối** của ảnh preview. Nếu để `localhost` thì bên ngoài không tải được ảnh.
- Muốn đổi ảnh preview: thay `public/og.jpg` (giữ tỉ lệ ~1200×630) hoặc sửa `ogImage` trong `lib/invitationData.ts`.
- Sau khi deploy/đổi ảnh, nếu Facebook còn hiện preview cũ: dùng [Sharing Debugger](https://developers.facebook.com/tools/debug/) → dán link → **Scrape Again** để làm mới cache. Zalo cũng cache, share lại sau vài phút hoặc thêm `?v=2` vào link.

## Deploy

Deploy như một app Next.js bình thường (Vercel, hoặc bất kỳ Node host nào hỗ trợ Next.js). Nhớ set biến môi trường `MONGODB_URI` (và `MONGODB_DB` nếu muốn đổi tên database) trên môi trường deploy — dùng MongoDB Atlas (free tier) nếu chưa có cluster public truy cập được từ server deploy.
