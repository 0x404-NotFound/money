# Hướng Dẫn Sử Dụng Chi Tiết

## 🚀 Bắt Đầu Nhanh

### 1. Chạy Demo (Không cần Ollama)

```bash
bun run demo
```

Demo này sẽ hiển thị thông tin ban đầu của xã hội mà không cần AI.

### 2. Chạy CLI Tương Tác

```bash
bun run cli
```

Giao diện dòng lệnh cho phép bạn điều khiển simulation real-time.

### 3. Chạy Simulation Đầy Đủ với AI

```bash
# Cài đặt Ollama trước
bun run setup

# Chạy simulation với AI
bun run dev
```

## 📋 Các Chế Độ Chạy

### Demo Mode

- Hiển thị thông tin ban đầu
- Không có AI logic
- Phù hợp để kiểm tra cài đặt

### CLI Interactive Mode

- Giao diện điều khiển real-time
- Simulation đơn giản không cần AI
- Menu tương tác với các tùy chọn:
  - Bắt đầu/dừng simulation
  - Xem thống kê
  - Xem thông tin người dân
  - Tạo báo cáo phân tích

### Full AI Mode

- Sử dụng Ollama AI cho tất cả quyết định
- Mỗi người dân có hành vi thông minh
- Các sự kiện xã hội được tạo tự động

## ⚙️ Cấu Hình

Chỉnh sửa `config.json` để tùy chỉnh:

```json
{
  "simulation": {
    "initialPopulation": 20, // Số dân ban đầu
    "timeStepDelay": 2000 // Delay giữa các bước (ms)
  },
  "ai": {
    "model": "deepseek-r1:1.5b", // Model Ollama
    "fallbackToRandom": true // Dùng random nếu AI lỗi
  }
}
```

## 🧑‍🤝‍🧑 Hiểu Về Người Dân

Mỗi người dân có:

### Thông Tin Cơ Bản

- **Tên**: Tên Việt Nam ngẫu nhiên
- **Tuổi**: 5-85 tuổi
- **Giới tính**: Nam, nữ, khác
- **Nghề nghiệp**: 20 nghề khác nhau

### Tính Cách (Big Five)

- **Openness**: Độ cởi mở với trải nghiệm mới
- **Conscientiousness**: Tính tận tâm, có trách nhiệm
- **Extraversion**: Hướng ngoại hay hướng nội
- **Agreeableness**: Tính dễ mến, hợp tác
- **Neuroticism**: Mức độ lo lắng, căng thẳng

### Kỹ Năng

- **Creativity**: Sáng tạo
- **Intelligence**: Thông minh
- **Charisma**: Sức hút cá nhân
- **Strength**: Sức mạnh thể chất
- **Craftsmanship**: Kỹ năng thủ công
- **Leadership**: Khả năng lãnh đạo

### Trạng Thái

- **Health**: Sức khỏe (0-100)
- **Happiness**: Hạnh phúc (0-100)
- **Energy**: Năng lượng (0-100)
- **Wealth**: Tài sản (số tiền)

## 🏘️ Thế Giới Simulation

### Địa Điểm

- **Trung tâm thành phố**: Hoạt động công cộng
- **Khu dân cư**: Nơi ở
- **Khu công nghiệp**: Làm việc
- **Chợ**: Mua bán
- **Trường học**: Giáo dục
- **Bệnh viện**: Chăm sóc sức khỏe
- **Công viên**: Giải trí
- **Quán cà phê**: Giao tiếp xã hội
- **Nhà thờ**: Hoạt động tôn giáo

### Thời Gian

- **Giờ**: 0-23 giờ mỗi ngày
- **Ngày**: Tăng dần từ ngày 1
- **Mùa**: Spring → Summer → Autumn → Winter

## 🎯 Hành Động Của Người Dân

### Hành Động Cơ Bản

- Làm việc, nghỉ ngơi, ăn uống
- Giao tiếp, học tập, tập thể dục
- Mua sắm, chơi game, đọc sách

### Hành Động Đặc Biệt

- Khởi nghiệp, đầu tư
- Sáng tạo nghệ thuật
- Giúp đỡ người khác
- Tham gia sự kiện cộng đồng

### Kết Quả Hành Động

Mỗi hành động có thể:

- Thay đổi sức khỏe, hạnh phúc, năng lượng
- Tăng/giảm tài sản
- Cải thiện kỹ năng
- Ảnh hưởng đến mối quan hệ

## 📊 Hệ Thống Kinh Tế

### Chỉ Số Theo Dõi

- **Tài sản trung bình**: Mức sống chung
- **Tỷ lệ thất nghiệp**: % người không có việc
- **Lạm phát**: Biến động giá cả
- **Hệ số Gini**: Đo bất bình đẳng tài sản

### Nghề Nghiệp & Thu Nhập

- **Bác sĩ, Kỹ sư**: Thu nhập cao
- **Giáo viên**: Thu nhập trung bình
- **Nông dân, Thợ may**: Thu nhập thấp
- **Thương gia**: Thu nhập rất cao nhưng rủi ro

## 🔍 Phân Tích & Báo Cáo

### Thống Kê Real-time

- Sức khỏe, hạnh phúc trung bình
- Phân bố tuổi tác
- Mối quan hệ xã hội

### Báo Cáo Chi Tiết

- Phân tích tính cách cộng đồng
- Top các cá nhân nổi bật
- Thống kê mối quan hệ
- Phân tích bất bình đẳng

## 🤖 AI & Ollama

### Yêu Cầu

- Ollama đã cài đặt
- Model deepseek-r1:1.5b (hoặc tương tự)
- RAM tối thiểu 4GB
- CPU đa nhân khuyến nghị

### Cách AI Hoạt Động

1. **Quyết định hành động**: AI xem xét tính cách, hoàn cảnh để chọn hành động
2. **Đánh giá kết quả**: AI quyết định kết quả dựa trên logic thực tế
3. **Tạo sự kiện**: AI tạo ra các sự kiện xã hội ngẫu nhiên

### Prompt Engineering

AI được cung cấp:

- Thông tin cá nhân đầy đủ
- Bối cảnh xã hội hiện tại
- Lựa chọn hành động có thể
- Lịch sử sự kiện gần đây

## 🛠️ Troubleshooting

### Lỗi Ollama

```bash
# Kiểm tra Ollama đang chạy
curl http://localhost:11434/api/tags

# Khởi động lại
ollama serve

# Cài model
ollama pull deepseek-r1:1.5b
```

### Lỗi Memory

- Giảm `initialPopulation` trong config
- Sử dụng model nhỏ hơn (deepseek-r1:1.5b)
- Tăng swap space

### Lỗi Performance

- Tăng `timeStepDelay` để giảm tần suất
- Giảm số người dân
- Tắt logging chi tiết

## 🔄 Mở Rộng

### Thêm Hành Động Mới

Sửa mảng `actions` trong `config.json` hoặc `society-simulator.ts`

### Thêm Nghề Nghiệp

Sửa mảng `occupations` trong `person-generator.ts`

### Thêm Địa Điểm

Sửa mảng `locations` trong `config.json`

### Tùy Chỉnh AI Prompts

Sửa các method `build*Prompt` trong `ai-decision-maker.ts`

## 📈 Kế Hoạch Phát Triển

- [ ] Web interface với visualization
- [ ] Save/load simulation state
- [ ] Multiplayer scenarios
- [ ] Custom event scripting
- [ ] Economic policies simulation
- [ ] Migration between societies
