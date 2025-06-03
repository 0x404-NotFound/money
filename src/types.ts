// Định nghĩa các kiểu dữ liệu cho hệ thống

export interface Person {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  personality: PersonalityTraits;
  skills: Skills;
  relationships: Relationship[];
  health: number; // 0-100
  happiness: number; // 0-100
  energy: number; // 0-100
  wealth: number;
  occupation?: string;
  location: Location;
  memories: Memory[];
  goals: Goal[];
}

export interface PersonalityTraits {
  openness: number; // 0-100
  conscientiousness: number; // 0-100
  extraversion: number; // 0-100
  agreeableness: number; // 0-100
  neuroticism: number; // 0-100
}

export interface Skills {
  creativity: number; // 0-100
  intelligence: number; // 0-100
  charisma: number; // 0-100
  strength: number; // 0-100
  craftsmanship: number; // 0-100
  leadership: number; // 0-100
}

export interface Relationship {
  personId: string;
  type: "friend" | "family" | "romantic" | "colleague" | "enemy";
  strength: number; // 0-100
  history: RelationshipEvent[];
}

export interface RelationshipEvent {
  type: string;
  description: string;
  impact: number;
  timestamp: Date;
}

export interface Location {
  x: number;
  y: number;
  name: string;
  type: "home" | "work" | "public" | "commercial";
}

export interface Memory {
  id: string;
  description: string;
  emotionalImpact: number;
  timestamp: Date;
  participants: string[];
}

export interface Goal {
  id: string;
  description: string;
  priority: number; // 0-100
  progress: number; // 0-100
  deadline?: Date;
}

export interface ActionResult {
  success: boolean;
  description: string;
  effects: Effect[];
  newMemories?: Memory[];
}

export interface Effect {
  type: "health" | "happiness" | "energy" | "wealth" | "skill" | "relationship";
  target: string; // person ID hoặc skill name
  change: number;
  description: string;
}

export interface SocietyState {
  people: Person[];
  locations: Location[];
  events: SocialEvent[];
  time: {
    day: number;
    hour: number;
    season: "spring" | "summer" | "autumn" | "winter";
  };
  economy: {
    averageWealth: number;
    unemployment: number;
    inflation: number;
  };
}

export interface SocialEvent {
  id: string;
  type: string;
  description: string;
  participants: string[];
  location: Location;
  timestamp: Date;
  impact: Effect[];
}

export interface AIDecisionContext {
  person: Person;
  availableActions: string[];
  nearbyPeople: Person[];
  currentLocation: Location;
  societyState: SocietyState;
  recentEvents: SocialEvent[];
}
