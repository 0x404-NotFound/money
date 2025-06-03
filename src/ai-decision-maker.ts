import { Ollama } from "ollama";
import type {
  Person,
  AIDecisionContext,
  ActionResult,
  SocietyState,
} from "./types.js";

export class AIDecisionMaker {
  private ollama: Ollama;
  private model: string;

  constructor(model: string = "deepseek-r1:1.5b") {
    this.ollama = new Ollama();
    this.model = model;
  }

  async makeDecision(context: AIDecisionContext): Promise<string> {
    const prompt = this.buildDecisionPrompt(context);

    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return this.parseDecision(response.response);
    } catch (error) {
      console.error("Lỗi khi gọi Ollama:", error);
      // Fallback to random decision
      return this.getRandomAction(context.availableActions);
    }
  }

  async evaluateActionResult(
    person: Person,
    action: string,
    context: AIDecisionContext
  ): Promise<ActionResult> {
    const prompt = this.buildActionEvaluationPrompt(person, action, context);

    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return this.parseActionResult(response.response, person, action);
    } catch (error) {
      console.error("Lỗi khi đánh giá hành động:", error);
      return this.getDefaultActionResult(action);
    }
  }

  async generateSocialEvent(societyState: SocietyState): Promise<string> {
    const prompt = this.buildEventGenerationPrompt(societyState);

    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return response.response;
    } catch (error) {
      console.error("Lỗi khi tạo sự kiện xã hội:", error);
      return "Một ngày bình thường trôi qua trong xã hội.";
    }
  }

  private buildDecisionPrompt(context: AIDecisionContext): string {
    const {
      person,
      availableActions,
      nearbyPeople,
      currentLocation,
      societyState,
    } = context;

    return `
Bạn là ${person.name}, một người ${person.age} tuổi với tính cách:
- Cởi mở: ${person.personality.openness}/100
- Tận tâm: ${person.personality.conscientiousness}/100  
- Hướng ngoại: ${person.personality.extraversion}/100
- Dễ mến: ${person.personality.agreeableness}/100
- Lo lắng: ${person.personality.neuroticism}/100

Kỹ năng của bạn:
- Sáng tạo: ${person.skills.creativity}/100
- Thông minh: ${person.skills.intelligence}/100
- Charisma: ${person.skills.charisma}/100
- Sức mạnh: ${person.skills.strength}/100
- Thủ công: ${person.skills.craftsmanship}/100
- Lãnh đạo: ${person.skills.leadership}/100

Trạng thái hiện tại:
- Sức khỏe: ${person.health}/100
- Hạnh phúc: ${person.happiness}/100
- Năng lượng: ${person.energy}/100
- Tài sản: ${person.wealth}
- Vị trí: ${currentLocation.name} (${currentLocation.type})

Người xung quanh: ${nearbyPeople.map((p) => p.name).join(", ")}

Mục tiêu của bạn: ${person.goals.map((g) => g.description).join(", ")}

Hành động có thể thực hiện: ${availableActions.join(", ")}

Thời gian: Ngày ${societyState.time.day}, giờ ${societyState.time.hour}, mùa ${
      societyState.time.season
    }

Dựa trên tính cách, kỹ năng, trạng thái và hoàn cảnh hiện tại, hãy chọn MỘT hành động phù hợp nhất. 
Chỉ trả về tên hành động, không giải thích.
`;
  }

  private buildActionEvaluationPrompt(
    person: Person,
    action: string,
    context: AIDecisionContext
  ): string {
    return `
${person.name} đã thực hiện hành động: "${action}"

Tình huống:
- Vị trí: ${context.currentLocation.name} (${context.currentLocation.type})
- Người xung quanh: ${context.nearbyPeople.map((p) => p.name).join(", ")}
- Thời gian: Ngày ${context.societyState.time.day}, giờ ${
      context.societyState.time.hour
    }

Tính cách của ${person.name}:
- Cởi mở: ${person.personality.openness}/100
- Tận tâm: ${person.personality.conscientiousness}/100
- Hướng ngoại: ${person.personality.extraversion}/100
- Dễ mến: ${person.personality.agreeableness}/100
- Lo lắng: ${person.personality.neuroticism}/100

Hãy mô tả kết quả của hành động này theo định dạng JSON:
{
  "success": true/false,
  "description": "Mô tả chi tiết điều gì đã xảy ra",
  "healthChange": số từ -20 đến 20,
  "happinessChange": số từ -20 đến 20,
  "energyChange": số từ -20 đến 20,
  "wealthChange": số từ -100 đến 100,
  "skillChanges": {"tên_kỹ_năng": thay_đổi},
  "relationshipChanges": [{"personId": "id", "change": số}]
}

Chỉ trả về JSON, không có text khác.
`;
  }

  private buildEventGenerationPrompt(societyState: SocietyState): string {
    return `
Tình trạng xã hội hiện tại:
- Ngày ${societyState.time.day}, mùa ${societyState.time.season}
- Tài sản trung bình: ${societyState.economy.averageWealth}
- Tỷ lệ thất nghiệp: ${societyState.economy.unemployment}%
- Lạm phát: ${societyState.economy.inflation}%
- Số dân: ${societyState.people.length}

Sự kiện gần đây: ${societyState.events
      .slice(-3)
      .map((e) => e.description)
      .join(", ")}

Hãy tạo ra một sự kiện xã hội ngẫu nhiên phù hợp với tình trạng hiện tại. 
Sự kiện có thể là: lễ hội, thảm họa tự nhiên, phát minh mới, thay đổi chính sách, tin đồn, v.v.
Mô tả ngắn gọn trong 1-2 câu.
`;
  }

  private parseDecision(response: string): string {
    // Lấy hành động từ response, loại bỏ explanation
    const lines = response.trim().split("\n");
    return lines[0].trim();
  }

  private parseActionResult(
    response: string,
    person: Person,
    action: string
  ): ActionResult {
    try {
      // Tìm JSON trong response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);

        return {
          success: result.success || true,
          description: result.description || `${person.name} đã ${action}`,
          effects: this.convertToEffects(result, person.id),
          newMemories: [
            {
              id: `mem_${Date.now()}`,
              description: result.description || `Tôi đã ${action}`,
              emotionalImpact: (result.happinessChange || 0) / 10,
              timestamp: new Date(),
              participants: [person.id],
            },
          ],
        };
      }
    } catch (error) {
      console.error("Lỗi parse JSON:", error);
    }

    return this.getDefaultActionResult(action);
  }

  private convertToEffects(result: any, personId: string): any[] {
    const effects = [];

    if (result.healthChange) {
      effects.push({
        type: "health",
        target: personId,
        change: result.healthChange,
        description: `Sức khỏe ${
          result.healthChange > 0 ? "tăng" : "giảm"
        } ${Math.abs(result.healthChange)}`,
      });
    }

    if (result.happinessChange) {
      effects.push({
        type: "happiness",
        target: personId,
        change: result.happinessChange,
        description: `Hạnh phúc ${
          result.happinessChange > 0 ? "tăng" : "giảm"
        } ${Math.abs(result.happinessChange)}`,
      });
    }

    if (result.energyChange) {
      effects.push({
        type: "energy",
        target: personId,
        change: result.energyChange,
        description: `Năng lượng ${
          result.energyChange > 0 ? "tăng" : "giảm"
        } ${Math.abs(result.energyChange)}`,
      });
    }

    if (result.wealthChange) {
      effects.push({
        type: "wealth",
        target: personId,
        change: result.wealthChange,
        description: `Tài sản ${
          result.wealthChange > 0 ? "tăng" : "giảm"
        } ${Math.abs(result.wealthChange)}`,
      });
    }

    return effects;
  }

  private getRandomAction(actions: string[]): string {
    return actions[Math.floor(Math.random() * actions.length)];
  }

  private getDefaultActionResult(action: string): ActionResult {
    return {
      success: true,
      description: `Đã thực hiện ${action}`,
      effects: [
        {
          type: "energy",
          target: "",
          change: -5,
          description: "Mệt mỏi nhẹ",
        },
      ],
    };
  }
}
