import { SocietySimulator } from "./society-simulator.js";

// Demo version không sử dụng AI - chỉ để test logic
class DemoSocietyApp {
  private simulator: SocietySimulator;

  constructor() {
    this.simulator = new SocietySimulator();
  }

  async runDemo(): Promise<void> {
    console.log("🎮 CHẠY DEMO HỆ THỐNG GIẢ LẬP XÃ HỘI");
    console.log("=====================================");
    console.log("Demo này chạy logic cơ bản mà không cần Ollama AI");
    console.log("Mỗi người dân sẽ thực hiện hành động ngẫu nhiên");
    console.log("=====================================\n");

    const state = this.simulator.getSocietyState();

    // In thông tin ban đầu
    console.log("👥 DANH SÁCH DÂN CƯ:");
    state.people.forEach((person) => {
      console.log(
        `   ${person.name} (${person.age} tuổi) - ${
          person.occupation || "Không việc làm"
        }`
      );
      console.log(
        `      💰 Tài sản: ${person.wealth} | ❤️ Sức khỏe: ${person.health} | 😊 Hạnh phúc: ${person.happiness}`
      );
    });

    console.log("\n🏘️ CÁC ĐỊA ĐIỂM:");
    state.locations.forEach((location) => {
      const peopleHere = state.people.filter(
        (p) => p.location.name === location.name
      );
      console.log(
        `   ${location.name} (${location.type}) - ${peopleHere.length} người`
      );
    });

    // In thống kê kinh tế
    console.log("\n📊 THỐNG KÊ KINH TẾ:");
    console.log(`   Tài sản trung bình: ${state.economy.averageWealth}`);
    console.log(`   Tỷ lệ thất nghiệp: ${state.economy.unemployment}%`);
    console.log(`   Lạm phát: ${state.economy.inflation}%`);

    console.log(
      '\n🎯 Demo hoàn thành! Để chạy với AI thật, sử dụng "bun run dev"'
    );
  }
}

// Chạy demo
const demo = new DemoSocietyApp();
demo.runDemo().catch(console.error);
