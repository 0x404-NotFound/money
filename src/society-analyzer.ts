import type { Person, SocietyState } from "./types.js";

export class SocietyAnalyzer {
  analyzePersonality(people: Person[]) {
    const traits = [
      "openness",
      "conscientiousness",
      "extraversion",
      "agreeableness",
      "neuroticism",
    ];
    const analysis: any = {};

    traits.forEach((trait) => {
      const values = people.map((p) => (p.personality as any)[trait]);
      analysis[trait] = {
        average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
        min: Math.min(...values),
        max: Math.max(...values),
      };
    });

    return analysis;
  }

  analyzeSkills(people: Person[]) {
    const skills = [
      "creativity",
      "intelligence",
      "charisma",
      "strength",
      "craftsmanship",
      "leadership",
    ];
    const analysis: any = {};

    skills.forEach((skill) => {
      const values = people.map((p) => (p.skills as any)[skill]);
      analysis[skill] = {
        average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
        min: Math.min(...values),
        max: Math.max(...values),
        topPerson: people.find(
          (p) => (p.skills as any)[skill] === Math.max(...values)
        )?.name,
      };
    });

    return analysis;
  }

  analyzeRelationships(people: Person[]) {
    const totalRelationships = people.reduce(
      (sum, p) => sum + p.relationships.length,
      0
    );
    const relationshipTypes = people.flatMap((p) =>
      p.relationships.map((r) => r.type)
    );

    const typeCount: any = {};
    relationshipTypes.forEach((type) => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    const avgStrength =
      people
        .flatMap((p) => p.relationships.map((r) => r.strength))
        .reduce((a, b) => a + b, 0) / totalRelationships || 0;

    return {
      totalRelationships,
      averagePerPerson: Math.round(totalRelationships / people.length),
      averageStrength: Math.round(avgStrength),
      typeDistribution: typeCount,
      mostSocial: people.reduce((prev, current) =>
        prev.relationships.length > current.relationships.length
          ? prev
          : current
      ).name,
      leastSocial: people.reduce((prev, current) =>
        prev.relationships.length < current.relationships.length
          ? prev
          : current
      ).name,
    };
  }

  analyzeWealthDistribution(people: Person[]) {
    const wealth = people.map((p) => p.wealth).sort((a, b) => b - a);
    const total = wealth.reduce((a, b) => a + b, 0);

    // Tính Gini coefficient (đo độ bất bình đẳng)
    let gini = 0;
    for (let i = 0; i < wealth.length; i++) {
      for (let j = 0; j < wealth.length; j++) {
        gini += Math.abs(wealth[i] - wealth[j]);
      }
    }
    gini = gini / (2 * wealth.length * total);

    return {
      richest: people.find((p) => p.wealth === Math.max(...wealth))?.name,
      poorest: people.find((p) => p.wealth === Math.min(...wealth))?.name,
      median: wealth[Math.floor(wealth.length / 2)],
      top10Percent: wealth.slice(0, Math.ceil(wealth.length * 0.1)),
      giniCoefficient: Math.round(gini * 100) / 100,
      wealthGap: Math.max(...wealth) - Math.min(...wealth),
    };
  }

  analyzeAgeDistribution(people: Person[]) {
    const ages = people.map((p) => p.age);
    const ageGroups = {
      children: ages.filter((age) => age < 18).length,
      adults: ages.filter((age) => age >= 18 && age < 65).length,
      elderly: ages.filter((age) => age >= 65).length,
    };

    return {
      averageAge: Math.round(ages.reduce((a, b) => a + b, 0) / ages.length),
      youngest: Math.min(...ages),
      oldest: Math.max(...ages),
      ageGroups,
      dependencyRatio: Math.round(
        ((ageGroups.children + ageGroups.elderly) / ageGroups.adults) * 100
      ),
    };
  }

  analyzeWellbeing(people: Person[]) {
    const health = people.map((p) => p.health);
    const happiness = people.map((p) => p.happiness);
    const energy = people.map((p) => p.energy);

    return {
      health: {
        average: Math.round(health.reduce((a, b) => a + b, 0) / health.length),
        healthiest: people.find((p) => p.health === Math.max(...health))?.name,
        sickest: people.find((p) => p.health === Math.min(...health))?.name,
      },
      happiness: {
        average: Math.round(
          happiness.reduce((a, b) => a + b, 0) / happiness.length
        ),
        happiest: people.find((p) => p.happiness === Math.max(...happiness))
          ?.name,
        saddest: people.find((p) => p.happiness === Math.min(...happiness))
          ?.name,
      },
      energy: {
        average: Math.round(energy.reduce((a, b) => a + b, 0) / energy.length),
        mostEnergetic: people.find((p) => p.energy === Math.max(...energy))
          ?.name,
        mostTired: people.find((p) => p.energy === Math.min(...energy))?.name,
      },
    };
  }

  generateFullReport(societyState: SocietyState): string {
    const { people, time, economy } = societyState;

    const personality = this.analyzePersonality(people);
    const skills = this.analyzeSkills(people);
    const relationships = this.analyzeRelationships(people);
    const wealth = this.analyzeWealthDistribution(people);
    const age = this.analyzeAgeDistribution(people);
    const wellbeing = this.analyzeWellbeing(people);

    return `
╔══════════════════════════════════════════════════════════════╗
║                    BÁO CÁO PHÂN TÍCH XÃ HỘI                 ║
║                  Ngày ${time.day} - Mùa ${time.season}                      ║
╚══════════════════════════════════════════════════════════════╝

📊 TỔNG QUAN
   Dân số: ${people.length} người
   Tuổi trung bình: ${age.averageAge} tuổi
   Tỷ lệ phụ thuộc: ${age.dependencyRatio}%

👥 PHÂN BỐ TUỔI
   Trẻ em (< 18): ${age.ageGroups.children} người
   Người lớn (18-64): ${age.ageGroups.adults} người  
   Người già (≥ 65): ${age.ageGroups.elderly} người

💰 KINH TẾ & TÀI SẢN
   Tài sản trung bình: ${economy.averageWealth}
   Người giàu nhất: ${wealth.richest}
   Người nghèo nhất: ${wealth.poorest}
   Hệ số Gini: ${wealth.giniCoefficient} (0=bình đẳng, 1=bất bình đẳng)
   Thất nghiệp: ${economy.unemployment}%

🧠 TÍNH CÁCH TRUNG BÌNH
   Cởi mở: ${personality.openness.average}/100
   Tận tâm: ${personality.conscientiousness.average}/100
   Hướng ngoại: ${personality.extraversion.average}/100
   Dễ mến: ${personality.agreeableness.average}/100
   Lo lắng: ${personality.neuroticism.average}/100

🎯 KỸ NĂNG NỔI BẬT
   Sáng tạo nhất: ${skills.creativity.topPerson} (${skills.creativity.max}/100)
   Thông minh nhất: ${skills.intelligence.topPerson} (${
      skills.intelligence.max
    }/100)
   Charisma cao nhất: ${skills.charisma.topPerson} (${skills.charisma.max}/100)
   Lãnh đạo tốt nhất: ${skills.leadership.topPerson} (${
      skills.leadership.max
    }/100)

❤️ SỨC KHỎE & HẠNH PHÚC
   Sức khỏe TB: ${wellbeing.health.average}/100
   Người khỏe nhất: ${wellbeing.health.healthiest}
   Hạnh phúc TB: ${wellbeing.happiness.average}/100
   Người vui nhất: ${wellbeing.happiness.happiest}

🤝 MỐI QUAN HỆ XÃ HỘI
   Mối quan hệ TB/người: ${relationships.averagePerPerson}
   Độ bền TB: ${relationships.averageStrength}/100
   Người giao tiếp nhất: ${relationships.mostSocial}
   Người ít giao tiếp nhất: ${relationships.leastSocial}
   
   Phân loại quan hệ:
   ${Object.entries(relationships.typeDistribution)
     .map(([type, count]) => `   ${type}: ${count}`)
     .join("\n")}

═══════════════════════════════════════════════════════════════
`;
  }
}
