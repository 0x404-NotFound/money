import { SocietySimulator } from "./society-simulator.js";
import { SocietyAnalyzer } from "./society-analyzer.js";

export class InteractiveCLI {
  private simulator: SocietySimulator;
  private analyzer: SocietyAnalyzer;
  private isRunning: boolean = false;

  constructor() {
    this.simulator = new SocietySimulator();
    this.analyzer = new SocietyAnalyzer();
  }

  async start(): Promise<void> {
    console.log("🌟 HỆ THỐNG GIẢ LẬP XÃ HỘI TƯƠNG TÁC 🌟");
    console.log("=====================================");
    this.showMenu();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (key) => {
      this.handleInput(key.toString());
    });
  }

  private showMenu(): void {
    console.log("\n📋 MENU ĐIỀU KHIỂN:");
    console.log("  [1] Bắt đầu simulation");
    console.log("  [2] Dừng simulation");
    console.log("  [3] Xem thống kê chi tiết");
    console.log("  [4] Xem thông tin người dân");
    console.log("  [5] Xem danh sách địa điểm");
    console.log("  [6] Xem sự kiện gần đây");
    console.log("  [7] Tạo báo cáo phân tích");
    console.log("  [8] Thêm người dân mới");
    console.log("  [h] Hiển thị menu này");
    console.log("  [q] Thoát");
    console.log("\nNhấn phím để chọn...");
  }

  private async handleInput(key: string): Promise<void> {
    switch (key.toLowerCase()) {
      case "1":
        await this.startSimulation();
        break;
      case "2":
        this.stopSimulation();
        break;
      case "3":
        this.showDetailedStats();
        break;
      case "4":
        this.showPeopleInfo();
        break;
      case "5":
        this.showLocations();
        break;
      case "6":
        this.showRecentEvents();
        break;
      case "7":
        this.generateAnalysisReport();
        break;
      case "8":
        this.addNewPerson();
        break;
      case "h":
        this.showMenu();
        break;
      case "q":
      case "\u0003": // Ctrl+C
        this.exit();
        break;
      default:
        console.log(`Phím không hợp lệ: ${key}. Nhấn 'h' để xem menu.`);
    }
  }

  private async startSimulation(): Promise<void> {
    if (this.isRunning) {
      console.log("⚠️ Simulation đang chạy rồi!");
      return;
    }

    console.log("🚀 Bắt đầu simulation...");
    this.isRunning = true;

    // Chạy simulation trong background
    this.runSimulationLoop();
  }

  private stopSimulation(): void {
    if (!this.isRunning) {
      console.log("⚠️ Simulation chưa chạy!");
      return;
    }

    console.log("⏹️ Dừng simulation...");
    this.isRunning = false;
    this.simulator.stopSimulation();
  }

  private async runSimulationLoop(): Promise<void> {
    let stepCount = 0;
    while (this.isRunning) {
      try {
        // Thực hiện một bước simulation
        await this.simulateOneStep();
        stepCount++;

        // Hiển thị thống kê mỗi 5 bước
        if (stepCount % 5 === 0) {
          this.showQuickStats();
        }

        // Delay 3 giây
        await this.sleep(3000);
      } catch (error) {
        console.error("❌ Lỗi trong simulation:", error);
        this.isRunning = false;
      }
    }
  }

  private async simulateOneStep(): Promise<void> {
    // Simplified simulation step - không cần Ollama
    const state = this.simulator.getSocietyState();

    console.log(`\n⏰ Ngày ${state.time.day}, giờ ${state.time.hour}:00`);

    // Mỗi người thực hiện một hành động ngẫu nhiên
    const actions = [
      "Làm việc",
      "Nghỉ ngơi",
      "Ăn uống",
      "Giao tiếp",
      "Học tập",
      "Tập thể dục",
      "Mua sắm",
      "Chơi game",
      "Đọc sách",
    ];

    state.people.forEach((person) => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      console.log(`👤 ${person.name}: ${action}`);

      // Apply random effects
      person.energy = Math.max(
        0,
        Math.min(100, person.energy + (Math.random() - 0.5) * 10)
      );
      person.happiness = Math.max(
        0,
        Math.min(100, person.happiness + (Math.random() - 0.5) * 5)
      );
    });

    // Advance time
    state.time.hour += 1;
    if (state.time.hour >= 24) {
      state.time.hour = 0;
      state.time.day += 1;
    }
  }

  private showDetailedStats(): void {
    const state = this.simulator.getSocietyState();

    console.log("\n📊 THỐNG KÊ CHI TIẾT:");
    console.log(
      `⏰ Thời gian: Ngày ${state.time.day}, giờ ${state.time.hour}, mùa ${state.time.season}`
    );
    console.log(`👥 Dân số: ${state.people.length}`);
    console.log(`💰 Tài sản TB: ${state.economy.averageWealth}`);
    console.log(`📈 Thất nghiệp: ${state.economy.unemployment}%`);
    console.log(`📊 Lạm phát: ${state.economy.inflation}%`);

    const avgHealth = Math.round(
      state.people.reduce((sum, p) => sum + p.health, 0) / state.people.length
    );
    const avgHappiness = Math.round(
      state.people.reduce((sum, p) => sum + p.happiness, 0) /
        state.people.length
    );
    const avgEnergy = Math.round(
      state.people.reduce((sum, p) => sum + p.energy, 0) / state.people.length
    );

    console.log(`❤️ Sức khỏe TB: ${avgHealth}/100`);
    console.log(`😊 Hạnh phúc TB: ${avgHappiness}/100`);
    console.log(`⚡ Năng lượng TB: ${avgEnergy}/100`);
  }

  private showQuickStats(): void {
    const state = this.simulator.getSocietyState();
    const avgHappiness = Math.round(
      state.people.reduce((sum, p) => sum + p.happiness, 0) /
        state.people.length
    );
    const avgEnergy = Math.round(
      state.people.reduce((sum, p) => sum + p.energy, 0) / state.people.length
    );

    console.log(
      `📊 Hạnh phúc: ${avgHappiness}/100 | Năng lượng: ${avgEnergy}/100`
    );
  }

  private showPeopleInfo(): void {
    const state = this.simulator.getSocietyState();

    console.log("\n👥 THÔNG TIN NGƯỜI DÂN:");
    state.people.forEach((person, index) => {
      console.log(`${index + 1}. ${person.name} (${person.age} tuổi)`);
      console.log(`   Nghề: ${person.occupation || "Không có"}`);
      console.log(`   Vị trí: ${person.location.name}`);
      console.log(
        `   💰${person.wealth} ❤️${person.health} 😊${person.happiness} ⚡${person.energy}`
      );
      console.log(`   Mối quan hệ: ${person.relationships.length}`);
    });
  }

  private showLocations(): void {
    const state = this.simulator.getSocietyState();

    console.log("\n🏘️ DANH SÁCH ĐỊA ĐIỂM:");
    state.locations.forEach((location) => {
      const peopleHere = state.people.filter(
        (p) => p.location.name === location.name
      );
      console.log(`📍 ${location.name} (${location.type})`);
      console.log(`   Tọa độ: (${location.x}, ${location.y})`);
      console.log(`   Người hiện tại: ${peopleHere.length}`);
      if (peopleHere.length > 0) {
        console.log(`   ${peopleHere.map((p) => p.name).join(", ")}`);
      }
    });
  }

  private showRecentEvents(): void {
    const state = this.simulator.getSocietyState();

    console.log("\n📰 SỰ KIỆN GÀN ĐÂY:");
    const recentEvents = state.events.slice(-10);

    if (recentEvents.length === 0) {
      console.log("   Chưa có sự kiện nào.");
      return;
    }

    recentEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.description}`);
      console.log(`   Thời gian: ${event.timestamp.toLocaleString()}`);
      console.log(`   Địa điểm: ${event.location.name}`);
      console.log(`   Tham gia: ${event.participants.length} người`);
    });
  }

  private generateAnalysisReport(): void {
    const state = this.simulator.getSocietyState();
    const report = this.analyzer.generateFullReport(state);

    console.log(report);
  }

  private addNewPerson(): void {
    console.log("\n➕ THÊM NGƯỜI DÂN MỚI");
    console.log("Tính năng này sẽ được triển khai trong phiên bản tiếp theo.");
    // TODO: Implement person creation interface
  }

  private exit(): void {
    console.log("\n👋 Cảm ơn bạn đã sử dụng hệ thống giả lập xã hội!");
    this.isRunning = false;
    process.exit(0);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
