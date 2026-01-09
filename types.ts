
export enum AppView {
  CHAT = 'CHAT',
  CHARTER = 'CHARTER',
  STAKEHOLDERS = 'STAKEHOLDERS',
}

export enum PMModule {
  INITIATION = 'INITIATION',
  STAKEHOLDERS = 'STAKEHOLDERS',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ProjectCharter {
  projectName: string;
  businessNeed: string;
  objectives: string[];
  scope: string[];
  successCriteria: string[];
  risks: string[];
  assumptions: string[];
  constraints: string[];
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  interest: number; // 1-10
  influence: number; // 1-10
  category: 'Internal' | 'External';
  expectations: string;
  strategy: string;
}

export interface ProjectState {
  currentCharter: ProjectCharter | null;
  stakeholders: Stakeholder[];
  messages: ChatMessage[];
}
