# Hệ Thống Giả Lập Xã Hội AI 🌍

> Một hệ thống giả lập xã hội thông minh sử dụng Ollama AI để mô phỏng hành vi của từng cá nhân trong một cộng đồng. Mỗi người dân có tính cách riêng, đưa ra quyết định thông minh và xã hội phát triển tự nhiên.

## ✨ Tính Năng Nổi Bật

- **🤖 AI-Driven Decision Making**: Mỗi người dân được điều khiển bởi AI với tính cách và mục tiêu riêng
- **🏘️ Xã Hội Sinh Động**: 20 người dân với mối quan hệ, nghề nghiệp và cuộc sống đa dạng
- **🎯 20+ Hành Động**: Từ làm việc, học tập đến khởi nghiệp và sáng tạo nghệ thuật
- **📊 Thống Kê Real-time**: Theo dõi kinh tế, sức khỏe, hạnh phúc của toàn xã hội
- **🌍 Thế Giới Mở**: 10 địa điểm với hoạt động riêng biệt
- **📰 Sự Kiện Động**: AI tự tạo ra các sự kiện xã hội bất ngờ
- **🎮 3 Chế Độ Chạy**: Demo, CLI Interactive, và Full AI Simulation
- **📈 Phân Tích Sâu**: Báo cáo chi tiết về tính cách, kinh tế và mối quan hệ

## 🚀 Bắt Đầu Nhanh

### Chạy Demo (Không cần AI)

```bash
git clone <repository>
cd society-simulator
bun install
bun run demo
```

### Chạy CLI Tương Tác

```bash
bun run cli
```

### Chạy Full AI Simulation

```bash
# Cài đặt Ollama + model
bun run setup

# Chạy simulation đầy đủ
bun run dev
```

## 📦 Cài Đặt Chi Tiết

### 1. Cài đặt Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows: Tải từ https://ollama.ai/download
```

### 2. Tải model AI

```bash
ollama pull deepseek-r1:1.5b
```

### 3. Cài đặt dependencies

```bash
bun install
```

## Chạy Hệ Thống

```bash
# Development mode với hot reload
bun run dev

# Production mode
bun start
```

## Cấu Trúc Dự Án

```
src/
├── index.ts                 # Entry point
├── types.ts                # Định nghĩa kiểu dữ liệu
├── society-simulator.ts    # Engine chính của simulation
├── person-generator.ts     # Tạo người dân ngẫu nhiên
└── ai-decision-maker.ts    # AI logic cho quyết định
```

## Cách Hoạt Động

1. **Khởi Tạo**: Hệ thống tạo 20 người dân với tính cách, kỹ năng và mối quan hệ ngẫu nhiên
2. **Simulation Loop**: Mỗi time step (giờ):
   - Mỗi người dân được AI quyết định hành động
   - AI đánh giá kết quả và cập nhật trạng thái
   - Có khả năng xuất hiện sự kiện xã hội ngẫu nhiên
3. **Tiến Hóa**: Xã hội phát triển tự nhiên theo thời gian

## Ví Dụ Output

```
🌍 Bắt đầu mô phỏng xã hội...

📊 THỐNG KÊ XÃ HỘI:
👥 Dân số: 20
💰 Tài sản TB: 2,450
📈 Thất nghiệp: 15%
📊 Lạm phát: 2.5%
❤️ Sức khỏe TB: 78/100
😊 Hạnh phúc TB: 65/100

⏰ Ngày 1, giờ 8:00 - Mùa spring
👤 Nguyễn Minh: Làm việc - Hoàn thành công việc kỹ sư với hiệu quả cao
👤 Trần Linh: Giao tiếp với người khác - Trò chuyện vui vẻ với bạn bè tại quán cà phê
👤 Lê Hoàng: Tập thể dục - Chạy bộ trong công viên, cảm thấy sảng khoái
📰 Sự kiện xã hội: Một lễ hội mùa xuân được tổ chức tại trung tâm thành phố
```

## Customization

### Thay đổi Model AI

Sửa trong `src/ai-decision-maker.ts`:

```typescript
constructor(model: string = 'deepseek-r1:1.5b') {
  // Thay đổi model ở đây
}
```

### Thêm Hành Động Mới

Sửa `availableActions` trong `src/society-simulator.ts`

### Điều Chỉnh Dân Số

Sửa số lượng trong `initializeSociety()`:

```typescript
const people = this.personGenerator.generateMultiplePeople(30, locations); // Thay đổi từ 20 thành 30
```

## Yêu Cầu Hệ Thống

- Node.js 18+ hoặc Bun
- Ollama với model `deepseek-r1:1.5b`
- RAM: Tối thiểu 4GB (cho Ollama)
- CPU: Đa nhân được khuyến nghị

## Troubleshooting

### Lỗi kết nối Ollama

```bash
# Kiểm tra Ollama đang chạy
ollama list

# Khởi động lại Ollama service
ollama serve
```

### Lỗi memory

- Giảm số lượng người dân
- Sử dụng model nhỏ hơn (deepseek-r1:1.5b)
- Tăng swap memory

## Phát Triển Tiếp

- [ ] Web interface với React/Vue
- [ ] Lưu/load simulation state
- [ ] Visualization charts cho statistics
- [ ] Multiplayer mode
- [ ] Custom scenarios
- [ ] Export simulation data

## License

MIT License - Sử dụng tự do cho mục đích học tập và nghiên cứu.
