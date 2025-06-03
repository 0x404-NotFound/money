import { SocietySimulator } from "./society-simulator.js";

class SocietyApp {
  private simulator: SocietySimulator;

  constructor() {
    this.simulator = new SocietySimulator();
  }

  async start(): Promise<void> {
    console.log("🌟 CHÀO MỪNG ĐẾN VỚI HỆ THỐNG GIẢ LẬP XÃ HỘI AI 🌟");
    console.log("================================================");
    console.log(
      "Hệ thống sử dụng Ollama AI để mô phỏng hành vi của từng cá nhân"
    );
    console.log("Mỗi người dân có tính cách, kỹ năng và mục tiêu riêng");
    console.log("Họ sẽ tự do hành động và xã hội sẽ phát triển tự nhiên");
    console.log("================================================\n");

    // Kiểm tra Ollama
    console.log("🔍 Đang kiểm tra kết nối Ollama...");
    try {
      // Khởi động simulation
      await this.simulator.startSimulation();
    } catch (error) {
      console.error("❌ Lỗi khi chạy simulation:", error);
      console.log("\n📋 Hướng dẫn khắc phục:");
      console.log("1. Cài đặt Ollama: https://ollama.ai/");
      console.log("2. Chạy: ollama run llama3.2");
      console.log("3. Đảm bảo Ollama server đang chạy trên port 11434");
    }
  }

  stop(): void {
    this.simulator.stopSimulation();
  }
}

// Khởi chạy ứng dụng
const app = new SocietyApp();

// Xử lý signal để dừng gracefully
process.on("SIGINT", () => {
  console.log("\n👋 Đang dừng hệ thống...");
  app.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n👋 Đang dừng hệ thống...");
  app.stop();
  process.exit(0);
});

// Bắt đầu
app.start().catch((error) => {
  console.error("❌ Lỗi khởi động:", error);
  process.exit(1);
});
