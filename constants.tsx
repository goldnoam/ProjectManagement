import React from 'react';
import { ToolID, ToolModule, SimulationType } from './types';

export const TOOLS_DATA: ToolModule[] = [
  {
    id: ToolID.PM,
    title: "Project Management Core",
    description: "Master the fundamentals of Agile, Waterfall, Scrum, and Kanban.",
    icon: "📋",
    color: "bg-emerald-500",
    overview: "Project management is the practice of initiating, planning, executing, controlling, and closing the work of a team to achieve specific goals. This module covers the core philosophies that drive modern industry standards.",
    features: [
      "Agile Frameworks",
      "Resource Allocation",
      "Risk Management",
      "Sprint Planning"
    ],
    lessons: [
      {
        id: "pm-1",
        title: "Agile vs. Waterfall",
        content: "Agile is an iterative approach to project management and software development that helps teams deliver value to their customers faster and with fewer headaches. Waterfall is a linear project management approach where stakeholder and customer requirements are gathered at the beginning of the project, and then a sequential project plan is created.",
        quiz: {
          question: "Which methodology is best for projects with evolving requirements?",
          options: ["Waterfall", "Agile", "Fixed-Scope", "Sequential"],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: ToolID.JIRA,
    title: "Jira Mastery",
    description: "Learn issue tracking, sprints, and agile boards.",
    icon: "🏗️",
    color: "bg-blue-600",
    overview: "Jira is the #1 software development tool used by agile teams. It allows you to plan, track, and release world-class software while providing deep insights into team performance.",
    features: [
      "Customizable Workflows",
      "Backlog Management",
      "Deep Reporting",
      "Security & Compliance"
    ],
    comparison: {
      pros: ["Powerful reporting", "Scales with large teams", "Native Agile support"],
      cons: ["Steep learning curve", "Complex setup", "Can feel slow/clunky"],
      bestFor: "Software development & Agile teams",
      pricing: "Free to $15/user"
    },
    lessons: [
      {
        id: "jira-1",
        title: "Understanding Boards",
        content: "In Jira, boards allow you to visualize your workflow and track the progress of your team's work. You can drag and drop issues between columns to update their status instantly.",
        exercise: {
          type: SimulationType.JIRA_BOARD,
          instructions: "Move a task from 'To Do' to 'Done' to complete the simulation."
        }
      }
    ]
  },
  {
    id: ToolID.SLACK,
    title: "Slack Collaboration",
    description: "Efficient synchronous and asynchronous team communication.",
    icon: "#️⃣",
    color: "bg-purple-500",
    overview: "Slack brings the right people, information, and tools together to get work done. From Fortune 100 companies to corner markets, millions of people around the world use Slack to connect their teams.",
    features: [
      "Real-time Messaging",
      "Third-party Integrations",
      "Voice & Video Huddles",
      "Workflow Builder"
    ],
    comparison: {
      pros: ["Industry standard", "Deep ecosystem of apps", "Reliable real-time sync"],
      cons: ["Can be distracting", "Hard to find old threads", "Expensive"],
      bestFor: "Real-time communication",
      pricing: "Free to $12.50/user"
    },
    lessons: [
      {
        id: "slack-1",
        title: "Channel Communication",
        content: "Slack channels are organized spaces for everyone and everything you need to work. In this exercise, practice sending a professional status update to a hypothetical channel.",
        exercise: {
          type: SimulationType.SLACK_CHAT,
          instructions: "Draft and send a professional status update of at least 10 characters."
        }
      }
    ]
  },
  {
    id: ToolID.TWIST,
    title: "Twist: Async Focus",
    description: "Learn thread-based communication for deep work.",
    icon: "🌪️",
    color: "bg-indigo-400",
    overview: "Twist is built for teams who believe there’s more to work than keeping up with real-time chat. It prioritizes asynchronous collaboration, keeping conversations organized in threads.",
    features: [
      "Threaded Conversations",
      "Deep Focus Modes",
      "No Presence Indicators",
      "Structured Inbox"
    ],
    comparison: {
      pros: ["Less distracting", "Better history lookup", "Lower fatigue"],
      cons: ["Slow for urgent needs", "Niche user base", "Simple integrations"],
      bestFor: "Remote & Async teams",
      pricing: "Free to $8/user"
    },
    lessons: [
      {
        id: "twist-1",
        title: "Threaded Discussions",
        content: "Unlike traditional chat, Twist uses threads to separate topics. This prevents one conversation from drowning out another and allows users to respond when they are ready, not when they are interrupted.",
        quiz: {
          question: "What is the primary benefit of threaded messaging in Twist?",
          options: ["Real-time response tracking", "Reducing notification chaos", "Infinite scrolling", "Automated GIF replies"],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: ToolID.LARK,
    title: "Lark (Feishu) Suite",
    description: "Master the all-in-one suite for modern enterprise collaboration.",
    icon: "🦜",
    color: "bg-sky-500",
    overview: "Lark combines messaging, calendar, docs, and project management in one seamless platform. It’s designed to be a true 'Work OS' that handles everything from chat to bitable databases.",
    features: [
      "Smart Calendars",
      "Bitable Databases",
      "Minutes Meeting AI",
      "Integrated Docs"
    ],
    comparison: {
      pros: ["All-in-one value", "Amazing mobile app", "Powerful translation"],
      cons: ["Steep UI learning curve", "Notification heavy", "Complex permissioning"],
      bestFor: "Agile enterprises & Startups",
      pricing: "Free to $12/user"
    },
    lessons: [
      {
        id: "lark-1",
        title: "Bitable Automations",
        content: "Lark's Bitable is a no-code database similar to Airtable. You can configure webhooks and automated triggers to notify teams when new records are added.",
        exercise: {
          type: SimulationType.LARK_CONFIG,
          instructions: "Configure the automation script to set the action to 'notify_team'."
        }
      }
    ]
  },
  {
    id: ToolID.TRELLO,
    title: "Trello Fundamentals",
    description: "Visual task management using the simple card-based Kanban system.",
    icon: "🖼️",
    color: "bg-blue-400",
    overview: "Trello is the ultimate visual tool for organizing your work and life. It's famous for its Boards, Lists, and Cards which provide a bird's-eye view of project status.",
    features: [
      "Power-Ups (Integrations)",
      "Butler Automations",
      "Advanced Checklists",
      "Label Systems"
    ],
    comparison: {
      pros: ["Incredibly simple", "Visual & tactile", "Extensive power-ups"],
      cons: ["Lacks advanced reporting", "No native Gantt view", "Can get messy"],
      bestFor: "Visual task tracking & small projects",
      pricing: "Free to $17.50/user"
    },
    lessons: [
      {
        id: "trello-1",
        title: "The List Workflow",
        content: "Trello's power lies in its simplicity. A typical workflow involves 'To Do', 'Doing', and 'Done' lists. You move cards across these lists as work progresses.",
        exercise: {
          type: SimulationType.TRELLO_LIST,
          instructions: "Archive a card by moving it to the 'Done' list."
        }
      }
    ]
  },
  {
    id: ToolID.NOTION,
    title: "Notion for Teams",
    description: "Combine docs, databases, and project management in one place.",
    icon: "📝",
    color: "bg-slate-700",
    overview: "Notion is an all-in-one workspace where you can write, plan, collaborate, and get organized. It replaces several tools by combining wikis with powerful databases.",
    features: [
      "Relational Databases",
      "Custom Templates",
      "Synced Blocks",
      "Notion AI Assistant"
    ],
    comparison: {
      pros: ["Extremely flexible", "All-in-one (Docs + DB)", "Clean aesthetics"],
      cons: ["Search can be slow", "Requires time to build", "No dedicated time-tracking"],
      bestFor: "Wikis, knowledge bases & flexible PM",
      pricing: "Free to $15/user"
    },
    lessons: [
      {
        id: "notion-1",
        title: "Database Properties",
        content: "Notion databases aren't just tables. You can add properties like 'Select', 'Multi-select', 'Date', and 'Person' to track complex project metadata.",
        exercise: {
          type: SimulationType.NOTION_DB,
          instructions: "Update the status property of the database record to 'Launch'."
        }
      }
    ]
  }
];
