
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
    id: ToolID.ASANA,
    title: "Asana Advanced",
    description: "Manage complex workflows, timelines, and team dependencies.",
    icon: "🔴",
    color: "bg-rose-500",
    overview: "Asana helps teams orchestrate their work, from daily tasks to strategic initiatives. It excels at showing 'who is doing what by when'.",
    features: [
      "Timeline View (Gantt)",
      "Task Dependencies",
      "Portfolios",
      "Workload Management"
    ],
    comparison: {
      pros: ["Beautiful UI", "Strong timeline/Gantt tools", "Flexible views"],
      cons: ["Expensive for small teams", "Limited free tier", "Too many features for simple tasks"],
      bestFor: "Marketing & Ops teams",
      pricing: "Free to $25+/user"
    },
    lessons: [
      {
        id: "asana-1",
        title: "Task Dependencies",
        content: "In complex projects, one task often depends on another. Asana allows you to mark a task as 'Waiting on' another, preventing bottlenecks before they happen.",
        exercise: {
          type: SimulationType.ASANA_TASK,
          instructions: "Assign a high priority to the pending task."
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
  },
  {
    id: ToolID.MONDAY,
    title: "Monday.com Work OS",
    description: "Highly customizable platform for building your own work operating system.",
    icon: "📅",
    color: "bg-indigo-600",
    overview: "Monday.com is a Work OS that powers teams to run processes, projects, and everyday work their way. It's known for its vibrant UI and powerful automation engine.",
    features: [
      "Vibrant Dashboards",
      "No-Code Automations",
      "Multiple View Types",
      "Resource Management"
    ],
    comparison: {
      pros: ["Vibrant, intuitive UI", "Powerful automations", "Highly customizable"],
      cons: ["Complexity hidden behind UI", "Pricing tiers are strict", "Heavy mobile app"],
      bestFor: "General project management & CRM",
      pricing: "$8 to $16/user (min 3)"
    },
    lessons: [
      {
        id: "monday-1",
        title: "Building Automations",
        content: "Monday.com allows you to say: 'When Status changes to Done, notify Team Lead'. This reduces manual coordination significantly.",
        quiz: {
          question: "What is a major benefit of the Monday.com 'Work OS' approach?",
          options: ["Strict adherence to Waterfall", "Extreme customization of workflows", "Lower cost than pencil and paper", "Built-in hardware support"],
          correctIndex: 1
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
  }
];
