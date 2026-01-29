
export enum ToolID {
  JIRA = 'jira',
  SLACK = 'slack',
  TWIST = 'twist',
  LARK = 'lark',
  PM = 'project-management',
  TRELLO = 'trello',
  ASANA = 'asana',
  NOTION = 'notion',
  MONDAY = 'monday'
}

export enum SimulationType {
  JIRA_BOARD = 'jira-board',
  SLACK_CHAT = 'slack-chat',
  LARK_CONFIG = 'lark-config',
  METHODOLOGY_PICKER = 'methodology-picker',
  TRELLO_LIST = 'trello-list',
  NOTION_DB = 'notion-db',
  ASANA_TASK = 'asana-task'
}

export interface Exercise {
  type: SimulationType;
  instructions: string;
  initialData?: any;
}

export interface ComparisonInfo {
  pros: string[];
  cons: string[];
  bestFor: string;
  pricing: string;
}

export interface ToolModule {
  id: ToolID;
  title: string;
  description: string;
  icon: string;
  color: string;
  overview: string;
  features: string[];
  lessons: Lesson[];
  comparison?: ComparisonInfo; // Added for comparison view
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz?: Quiz;
  exercise?: Exercise;
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
}
