import type { Person, PersonalityTraits, Skills, Location } from "./types.js";

export class PersonGenerator {
  private vietnameseNames = {
    male: [
      "Minh",
      "Hoàng",
      "Nam",
      "Anh",
      "Đức",
      "Tuấn",
      "Hùng",
      "Quang",
      "Thắng",
      "Khôi",
      "Việt",
      "Phong",
      "Tâm",
      "Long",
      "Hải",
      "Bình",
      "Thành",
      "Duy",
      "Hưng",
      "Tùng",
    ],
    female: [
      "Linh",
      "Hương",
      "Mai",
      "Lan",
      "Hồng",
      "Thảo",
      "Nga",
      "Hà",
      "Trang",
      "Vy",
      "Nhung",
      "Phương",
      "Thu",
      "Hoa",
      "My",
      "Thanh",
      "Yến",
      "Diệu",
      "Anh",
      "Xuân",
    ],
    surnames: [
      "Nguyễn",
      "Trần",
      "Lê",
      "Phạm",
      "Hoàng",
      "Huỳnh",
      "Phan",
      "Vũ",
      "Võ",
      "Đặng",
      "Bùi",
      "Đỗ",
      "Hồ",
      "Ngô",
      "Dương",
      "Lý",
      "Đinh",
      "Tô",
      "Cao",
      "Lâm",
    ],
  };

  private occupations = [
    "Giáo viên",
    "Bác sĩ",
    "Kỹ sư",
    "Nông dân",
    "Thợ may",
    "Đầu bếp",
    "Nghệ sĩ",
    "Nhạc sĩ",
    "Thương gia",
    "Thợ xây",
    "Thợ gỗ",
    "Học sinh",
    "Sinh viên",
    "Hưu trí",
    "Thợ săn",
    "Người bán hàng",
    "Quản lý",
    "Thư ký",
    "Tài xế",
    "Bảo vệ",
  ];

  generatePerson(id: string, locations: Location[]): Person {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const firstName = this.getRandomFromArray(this.vietnameseNames[gender]);
    const surname = this.getRandomFromArray(this.vietnameseNames.surnames);
    const name = `${surname} ${firstName}`;

    const age = this.generateAge();
    const occupation =
      age >= 18 && age <= 65
        ? this.getRandomFromArray(this.occupations)
        : undefined;

    return {
      id,
      name,
      age,
      gender,
      personality: this.generatePersonality(),
      skills: this.generateSkills(),
      relationships: [],
      health: this.randomBetween(60, 100),
      happiness: this.randomBetween(40, 80),
      energy: this.randomBetween(50, 100),
      wealth: this.generateWealth(age, occupation),
      occupation,
      location: this.getRandomFromArray(locations),
      memories: [],
      goals: this.generateGoals(),
    };
  }

  generateMultiplePeople(count: number, locations: Location[]): Person[] {
    const people: Person[] = [];

    for (let i = 0; i < count; i++) {
      const person = this.generatePerson(`person_${i + 1}`, locations);
      people.push(person);
    }

    // Tạo các mối quan hệ ngẫu nhiên
    this.generateRelationships(people);

    return people;
  }

  private generateAge(): number {
    // Phân phối tuổi realistic
    const rand = Math.random();
    if (rand < 0.15) return this.randomBetween(5, 17); // Trẻ em
    if (rand < 0.6) return this.randomBetween(18, 45); // Người trưởng thành
    if (rand < 0.85) return this.randomBetween(46, 65); // Trung niên
    return this.randomBetween(66, 85); // Người già
  }

  private generatePersonality(): PersonalityTraits {
    return {
      openness: this.randomBetween(20, 80),
      conscientiousness: this.randomBetween(20, 80),
      extraversion: this.randomBetween(20, 80),
      agreeableness: this.randomBetween(30, 90),
      neuroticism: this.randomBetween(10, 70),
    };
  }

  private generateSkills(): Skills {
    return {
      creativity: this.randomBetween(10, 90),
      intelligence: this.randomBetween(20, 90),
      charisma: this.randomBetween(10, 90),
      strength: this.randomBetween(20, 80),
      craftsmanship: this.randomBetween(10, 90),
      leadership: this.randomBetween(10, 80),
    };
  }

  private generateWealth(age: number, occupation?: string): number {
    let baseWealth = 0;

    // Wealth dựa trên tuổi
    if (age < 18) baseWealth = this.randomBetween(0, 50);
    else if (age < 30) baseWealth = this.randomBetween(100, 1000);
    else if (age < 50) baseWealth = this.randomBetween(500, 5000);
    else if (age < 65) baseWealth = this.randomBetween(1000, 10000);
    else baseWealth = this.randomBetween(500, 3000);

    // Điều chỉnh theo nghề nghiệp
    if (occupation) {
      const wealthMultipliers: { [key: string]: number } = {
        "Bác sĩ": 2.5,
        "Kỹ sư": 2.0,
        "Quản lý": 2.2,
        "Thương gia": 3.0,
        "Giáo viên": 1.2,
        "Nông dân": 0.8,
        "Thợ may": 0.9,
        "Học sinh": 0.1,
        "Sinh viên": 0.3,
      };

      const multiplier = wealthMultipliers[occupation] || 1.0;
      baseWealth *= multiplier;
    }

    return Math.round(baseWealth);
  }

  private generateGoals(): any[] {
    const possibleGoals = [
      "Kiếm thêm tiền",
      "Cải thiện sức khỏe",
      "Tìm tình yêu",
      "Học kỹ năng mới",
      "Xây dựng ngôi nhà",
      "Du lịch",
      "Giúp đỡ gia đình",
      "Thăng tiến trong công việc",
      "Kết bạn mới",
      "Tận hưởng cuộc sống",
    ];

    const numGoals = this.randomBetween(1, 3);
    const selectedGoals = [];

    for (let i = 0; i < numGoals; i++) {
      const goal = this.getRandomFromArray(possibleGoals);
      selectedGoals.push({
        id: `goal_${Date.now()}_${i}`,
        description: goal,
        priority: this.randomBetween(30, 90),
        progress: this.randomBetween(0, 30),
      });
    }

    return selectedGoals;
  }

  private generateRelationships(people: Person[]): void {
    for (const person of people) {
      const numRelationships = this.randomBetween(
        0,
        Math.min(5, people.length - 1)
      );
      const otherPeople = people.filter((p) => p.id !== person.id);

      for (let i = 0; i < numRelationships; i++) {
        const other = this.getRandomFromArray(otherPeople);
        if (!person.relationships.find((r) => r.personId === other.id)) {
          const relationshipType = this.getRandomFromArray([
            "friend",
            "family",
            "colleague",
            "romantic",
          ]);

          person.relationships.push({
            personId: other.id,
            type: relationshipType as any,
            strength: this.randomBetween(30, 80),
            history: [],
          });

          // Tạo mối quan hệ ngược lại
          if (!other.relationships.find((r) => r.personId === person.id)) {
            other.relationships.push({
              personId: person.id,
              type: relationshipType as any,
              strength: this.randomBetween(30, 80),
              history: [],
            });
          }
        }
      }
    }
  }

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
