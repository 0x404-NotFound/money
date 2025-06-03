import type {
  Person,
  SocietyState,
  Location,
  ActionResult,
  SocialEvent,
  AIDecisionContext,
  Effect,
} from "./types.js";
import { PersonGenerator } from "./person-generator.js";
import { AIDecisionMaker } from "./ai-decision-maker.js";

export class SocietySimulator {
  private state: SocietyState;
  private personGenerator: PersonGenerator;
  private aiDecisionMaker: AIDecisionMaker;
  private availableActions: string[];
  private isRunning: boolean = false;

  constructor() {
    this.personGenerator = new PersonGenerator();
    this.aiDecisionMaker = new AIDecisionMaker();
    this.availableActions = [
      "Làm việc",
      "Nghỉ ngơi",
      "Ăn uống",
      "Giao tiếp với người khác",
      "Học tập",
      "Tập thể dục",
      "Đi mua sắm",
      "Chơi game",
      "Đọc sách",
      "Nấu ăn",
      "Dọn dẹp nhà cửa",
      "Đi dạo",
      "Thăm bạn bè",
      "Hẹn hò",
      "Tham gia sự kiện cộng đồng",
      "Khởi nghiệp",
      "Đầu tư",
      "Giúp đỡ người khác",
      "Sáng tạo nghệ thuật",
      "Du lịch",
    ];

    this.state = this.initializeSociety();
  }

  private initializeSociety(): SocietyState {
    // Tạo các địa điểm
    const locations: Location[] = [
      { x: 0, y: 0, name: "Trung tâm thành phố", type: "public" },
      { x: 1, y: 0, name: "Khu dân cư A", type: "home" },
      { x: -1, y: 0, name: "Khu dân cư B", type: "home" },
      { x: 0, y: 1, name: "Khu công nghiệp", type: "work" },
      { x: 0, y: -1, name: "Chợ trung tâm", type: "commercial" },
      { x: 2, y: 0, name: "Trường học", type: "public" },
      { x: -2, y: 0, name: "Bệnh viện", type: "public" },
      { x: 1, y: 1, name: "Công viên", type: "public" },
      { x: -1, y: -1, name: "Quán cà phê", type: "commercial" },
      { x: 2, y: 1, name: "Nhà thờ", type: "public" },
    ];

    // Tạo dân số ban đầu
    const people = this.personGenerator.generateMultiplePeople(20, locations);

    return {
      people,
      locations,
      events: [],
      time: {
        day: 1,
        hour: 8,
        season: "spring",
      },
      economy: {
        averageWealth: this.calculateAverageWealth(people),
        unemployment: this.calculateUnemployment(people),
        inflation: 2.5,
      },
    };
  }

  async startSimulation(): Promise<void> {
    this.isRunning = true;
    console.log("🌍 Bắt đầu mô phỏng xã hội...");
    this.printSocietyStats();

    while (this.isRunning) {
      await this.simulateTimeStep();
      await this.sleep(2000); // Delay 2 giây giữa các bước
    }
  }

  stopSimulation(): void {
    this.isRunning = false;
    console.log("⏹️ Dừng mô phỏng xã hội.");
  }

  private async simulateTimeStep(): Promise<void> {
    console.log(
      `\n⏰ Ngày ${this.state.time.day}, giờ ${this.state.time.hour}:00 - Mùa ${this.state.time.season}`
    );

    // Mỗi người thực hiện một hành động
    const actions = await Promise.all(
      this.state.people.map((person) => this.simulatePersonAction(person))
    );

    // Xử lý kết quả các hành động
    for (const actionResult of actions) {
      if (actionResult) {
        this.applyActionEffects(actionResult);
      }
    }

    // Tạo sự kiện xã hội ngẫu nhiên
    if (Math.random() < 0.3) {
      // 30% chance mỗi time step
      await this.generateSocialEvent();
    }

    // Cập nhật thời gian
    this.advanceTime();

    // Cập nhật kinh tế
    this.updateEconomy();

    // In thống kê mỗi vài time step
    if (this.state.time.hour % 4 === 0) {
      this.printSocietyStats();
    }
  }

  private async simulatePersonAction(
    person: Person
  ): Promise<ActionResult | null> {
    try {
      // Tạo context cho AI
      const context: AIDecisionContext = {
        person,
        availableActions: this.getAvailableActionsForPerson(person),
        nearbyPeople: this.getNearbyPeople(person),
        currentLocation: person.location,
        societyState: this.state,
        recentEvents: this.state.events.slice(-5),
      };

      // AI quyết định hành động
      const chosenAction = await this.aiDecisionMaker.makeDecision(context);

      // AI đánh giá kết quả
      const actionResult = await this.aiDecisionMaker.evaluateActionResult(
        person,
        chosenAction,
        context
      );

      console.log(
        `👤 ${person.name}: ${chosenAction} - ${actionResult.description}`
      );

      return actionResult;
    } catch (error) {
      console.error(`Lỗi khi mô phỏng hành động của ${person.name}:`, error);
      return null;
    }
  }

  private getAvailableActionsForPerson(person: Person): string[] {
    const actions = [...this.availableActions];

    // Thêm hành động dựa trên tuổi
    if (person.age < 18) {
      actions.push("Chơi với bạn", "Học bài");
    } else {
      actions.push("Uống rượu", "Lái xe");
    }

    // Thêm hành động dựa trên nghề nghiệp
    if (person.occupation) {
      actions.push(`Thực hiện công việc ${person.occupation}`);
    }

    // Thêm hành động dựa trên vị trí
    if (person.location.type === "commercial") {
      actions.push("Mua sắm", "Bán hàng");
    } else if (person.location.type === "public") {
      actions.push("Tham gia hoạt động cộng đồng");
    }

    return actions;
  }

  private getNearbyPeople(person: Person): Person[] {
    return this.state.people.filter(
      (p) =>
        p.id !== person.id &&
        p.location.x === person.location.x &&
        p.location.y === person.location.y
    );
  }

  private applyActionEffects(actionResult: ActionResult): void {
    for (const effect of actionResult.effects) {
      const person = this.state.people.find((p) => p.id === effect.target);
      if (!person) continue;

      switch (effect.type) {
        case "health":
          person.health = Math.max(
            0,
            Math.min(100, person.health + effect.change)
          );
          break;
        case "happiness":
          person.happiness = Math.max(
            0,
            Math.min(100, person.happiness + effect.change)
          );
          break;
        case "energy":
          person.energy = Math.max(
            0,
            Math.min(100, person.energy + effect.change)
          );
          break;
        case "wealth":
          person.wealth = Math.max(0, person.wealth + effect.change);
          break;
        case "skill":
          // Effect.target chứa tên skill trong trường hợp này
          const skillName = effect.target as keyof typeof person.skills;
          if (skillName in person.skills) {
            (person.skills as any)[skillName] = Math.max(
              0,
              Math.min(100, (person.skills as any)[skillName] + effect.change)
            );
          }
          break;
      }
    }

    // Thêm memories nếu có
    if (actionResult.newMemories) {
      for (const memory of actionResult.newMemories) {
        const person = this.state.people.find(
          (p) => p.id === memory.participants[0]
        );
        if (person) {
          person.memories.push(memory);
          // Giữ chỉ 20 memories gần nhất
          if (person.memories.length > 20) {
            person.memories = person.memories.slice(-20);
          }
        }
      }
    }
  }

  private async generateSocialEvent(): Promise<void> {
    try {
      const eventDescription = await this.aiDecisionMaker.generateSocialEvent(
        this.state
      );

      const socialEvent: SocialEvent = {
        id: `event_${Date.now()}`,
        type: "random",
        description: eventDescription,
        participants: this.state.people
          .slice(0, Math.floor(Math.random() * 5) + 1)
          .map((p) => p.id),
        location:
          this.state.locations[
            Math.floor(Math.random() * this.state.locations.length)
          ],
        timestamp: new Date(),
        impact: [], // Có thể thêm effects cho events
      };

      this.state.events.push(socialEvent);
      console.log(`📰 Sự kiện xã hội: ${eventDescription}`);

      // Giữ chỉ 50 events gần nhất
      if (this.state.events.length > 50) {
        this.state.events = this.state.events.slice(-50);
      }
    } catch (error) {
      console.error("Lỗi khi tạo sự kiện xã hội:", error);
    }
  }

  private advanceTime(): void {
    this.state.time.hour += 1;

    if (this.state.time.hour >= 24) {
      this.state.time.hour = 0;
      this.state.time.day += 1;

      // Thay đổi mùa mỗi 90 ngày
      if (this.state.time.day % 90 === 0) {
        const seasons = ["spring", "summer", "autumn", "winter"] as const;
        const currentIndex = seasons.indexOf(this.state.time.season);
        this.state.time.season = seasons[(currentIndex + 1) % 4];
      }
    }

    // Regenerate energy mỗi sáng
    if (this.state.time.hour === 6) {
      for (const person of this.state.people) {
        person.energy = Math.min(100, person.energy + 30);
      }
    }
  }

  private updateEconomy(): void {
    this.state.economy.averageWealth = this.calculateAverageWealth(
      this.state.people
    );
    this.state.economy.unemployment = this.calculateUnemployment(
      this.state.people
    );

    // Random inflation changes
    if (Math.random() < 0.1) {
      this.state.economy.inflation += (Math.random() - 0.5) * 0.5;
      this.state.economy.inflation = Math.max(
        0,
        Math.min(20, this.state.economy.inflation)
      );
    }
  }

  private calculateAverageWealth(people: Person[]): number {
    const totalWealth = people.reduce((sum, person) => sum + person.wealth, 0);
    return Math.round(totalWealth / people.length);
  }

  private calculateUnemployment(people: Person[]): number {
    const workingAge = people.filter((p) => p.age >= 18 && p.age <= 65);
    const unemployed = workingAge.filter((p) => !p.occupation);
    return Math.round((unemployed.length / workingAge.length) * 100);
  }

  private printSocietyStats(): void {
    console.log("\n📊 THỐNG KÊ XÃ HỘI:");
    console.log(`👥 Dân số: ${this.state.people.length}`);
    console.log(`💰 Tài sản TB: ${this.state.economy.averageWealth}`);
    console.log(`📈 Thất nghiệp: ${this.state.economy.unemployment}%`);
    console.log(`📊 Lạm phát: ${this.state.economy.inflation.toFixed(1)}%`);

    // Thống kê sức khỏe và hạnh phúc
    const avgHealth = Math.round(
      this.state.people.reduce((sum, p) => sum + p.health, 0) /
        this.state.people.length
    );
    const avgHappiness = Math.round(
      this.state.people.reduce((sum, p) => sum + p.happiness, 0) /
        this.state.people.length
    );

    console.log(`❤️ Sức khỏe TB: ${avgHealth}/100`);
    console.log(`😊 Hạnh phúc TB: ${avgHappiness}/100`);
  }

  getSocietyState(): SocietyState {
    return this.state;
  }

  getPerson(id: string): Person | undefined {
    return this.state.people.find((p) => p.id === id);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
