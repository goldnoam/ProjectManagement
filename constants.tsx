import { ToolID, ToolModule, SimulationType } from './types';

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: "PM Mastery",
    search: "Search tools, terms, or concepts...",
    bookmarks: "Bookmarks",
    lessons: "Lessons",
    comparison: "Tool Comparison",
    clear: "Clear",
    export: "Export",
    feedback: "Send Feedback",
    theme_dark: "Dark",
    theme_bright: "Bright",
    theme_colorful: "Colorful",
    size_small: "S",
    size_medium: "M",
    size_large: "L",
  },
  he: {
    title: "מאסטרי PM",
    search: "חפש כלים, מונחים או מושגים...",
    bookmarks: "סימניות",
    lessons: "שיעורים",
    comparison: "השוואת כלים",
    clear: "נקה",
    export: "ייצא",
    feedback: "שלח משוב",
    theme_dark: "כהה",
    theme_bright: "בהיר",
    theme_colorful: "צבעוני",
    size_small: "ק'",
    size_medium: "ב'",
    size_large: "ג'",
  },
  zh: {
    title: "项目管理大师",
    search: "搜索工具、术语或概念...",
    bookmarks: "书签",
    lessons: "课程",
    comparison: "工具比较",
    clear: "清除",
    export: "导出",
    feedback: "发送反馈",
    theme_dark: "暗色",
    theme_bright: "亮色",
    theme_colorful: "彩色",
    size_small: "小",
    size_medium: "中",
    size_large: "大",
  },
  hi: { title: "पीएम माסטरी", search: "खोजें...", bookmarks: "बुकमार्क", lessons: "पाठ", feedback: "प्रतिक्रिया भेजें" },
  de: { title: "PM Meisterschaft", search: "Suche...", bookmarks: "Lesezeichen", lessons: "Lektionen", feedback: "Feedback senden" },
  es: { title: "Maestría PM", search: "Buscar...", bookmarks: "Marcadores", lessons: "Lecciones", feedback: "Enviar comentarios" },
  fr: { title: "Maîtrise PM", search: "Rechercher...", bookmarks: "Signets", lessons: "Leçons", feedback: "Envoyer des commentaires" },
};

export const TOOLS_DATA: ToolModule[] = [
  {
    id: ToolID.PM,
    title: "Project Management Core",
    description: "Master the fundamentals of Agile, Waterfall, Scrum, and Kanban.",
    icon: "📋",
    color: "bg-emerald-500",
    overview: "Project management is the key to delivering results. Learn why Agile beats Waterfall in most tech environments.",
    features: ["Agile Frameworks", "Sprint Planning", "Risk Management"],
    lessons: [
      {
        id: "pm-1",
        title: "Introduction to Agile",
        content: "Agile is iterative and incremental. It focuses on customer feedback and rapid releases.",
        quiz: {
          question: "What is a core Agile value?",
          options: ["Following a plan", "Customer collaboration", "Rigid processes", "Documentation over software"],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: ToolID.JIRA,
    title: "Jira Mastery",
    description: "Master Atlassian's powerhouse for agile teams.",
    icon: "🏗️",
    color: "bg-blue-600",
    overview: "Jira is the industry standard for issue tracking and sprint management.",
    features: ["Backlog Grooming", "Kanban Boards", "Epic Management"],
    comparison: {
      pros: ["Powerful reporting", "Custom workflows", "Deep enterprise support"],
      cons: ["Steep learning curve", "Complex configuration"],
      bestFor: "Software Development Teams",
      pricing: "Free to $15/user"
    },
    lessons: [
      {
        id: "jira-1",
        title: "Building a Backlog",
        content: "A backlog is a prioritized list of work. In Jira, you create issues and rank them by importance.",
        exercise: {
          type: SimulationType.JIRA_BOARD,
          instructions: "Move a task from 'To Do' to 'Done' to understand the transition flow."
        }
      }
    ]
  },
  {
    id: ToolID.SLACK,
    title: "Slack for Teams",
    description: "The digital HQ for all your team communication.",
    icon: "#️⃣",
    color: "bg-purple-500",
    overview: "Slack replaces email with organized channels and real-time huddles.",
    features: ["Public Channels", "Direct Messages", "Apps & Integrations"],
    comparison: {
      pros: ["Real-time speed", "Massive app ecosystem", "Fun to use"],
      cons: ["Notification overload", "History limits on free plan"],
      bestFor: "Fast-moving startups & remote teams",
      pricing: "Free to $12.50/user"
    },
    lessons: [
      {
        id: "slack-1",
        title: "Channel Etiquette",
        content: "Channels keep topics focused. Learn when to use @here vs @channel.",
        exercise: {
          type: SimulationType.SLACK_CHAT,
          instructions: "Send a status update in the simulated channel to finish."
        }
      }
    ]
  },
  {
    id: ToolID.TWIST,
    title: "Twist Communication",
    description: "Asynchronous communication for more focused work.",
    icon: "🌀",
    color: "bg-indigo-600",
    overview: "Twist is built for teams that prioritize focused work over real-time chatter.",
    features: ["Threaded conversations", "No presence indicators", "Deep work focus"],
    comparison: {
      pros: ["Reduces stress", "Information is easy to find", "Better for async teams"],
      cons: ["Not for urgent chat", "Smaller ecosystem than Slack"],
      bestFor: "Remote teams working across time zones",
      pricing: "Free to $8/user"
    },
    lessons: [
      {
        id: "twist-1",
        title: "The Power of Threads",
        content: "Threads keep conversations organized. Unlike Slack where things get buried, Twist ensures every topic has its place.",
        quiz: {
          question: "Why does Twist avoid 'green dots' (presence indicators)?",
          options: ["To save battery", "To reduce the pressure to respond immediately", "Because it is technically difficult", "To keep users offline"],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: ToolID.LARK,
    title: "Lark Suite",
    description: "The all-in-one workspace for modern collaboration.",
    icon: "🕊️",
    color: "bg-cyan-500",
    overview: "Lark combines chat, calendar, documents, and meetings in a single unified app.",
    features: ["Built-in Document editing", "Auto-translation", "Integrated approval flows"],
    comparison: {
      pros: ["Feature-rich all-in-one", "Excellent free tier", "Smooth integration"],
      cons: ["UI can feel cluttered", "Less flexible than best-of-breed"],
      bestFor: "Global teams looking for a single tool solution",
      pricing: "Free to $12/user"
    },
    lessons: [
      {
        id: "lark-1",
        title: "Automated Workflows",
        content: "Lark allows you to trigger approvals and notifications directly from within your documents and chat.",
        exercise: {
          type: SimulationType.LARK_CONFIG,
          instructions: "Update the configuration to notify the team when a document is shared."
        }
      }
    ]
  },
  {
    id: ToolID.TRELLO,
    title: "Trello Visuals",
    description: "Lightweight, card-based task management for everyone.",
    icon: "🖼️",
    color: "bg-blue-400",
    overview: "Trello is simple, visual, and effective for projects that don't need heavy Jira workflows.",
    features: ["Butler Automation", "Power-ups", "Drag-and-drop boards"],
    comparison: {
      pros: ["Instant learning", "Very visual", "Great mobile app"],
      cons: ["Limited for complex projects", "No native Gantt view"],
      bestFor: "Marketing, small teams, personal projects",
      pricing: "Free to $17.50/user"
    },
    lessons: [
      {
        id: "trello-1",
        title: "Board Foundations",
        content: "Trello uses a card-based system inspired by Kanban physical boards.",
        exercise: {
          type: SimulationType.TRELLO_LIST,
          instructions: "Drag a card to the final list to archive it."
        }
      }
    ]
  }
];