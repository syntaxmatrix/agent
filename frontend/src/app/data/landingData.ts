// app/data/landingData.ts
export interface HeroData {
  title: string;
  highlight: string;
  description: string;
  buttons: { text: string; type: "primary" | "secondary" }[];
  images: { workflow: string; code: string };
  stats: { value: string; label: string }[];
}

export interface FeatureItem {
  title: string;
  description: string;
  iconBg: string;
}

export interface LandingData {
  hero: HeroData;
  features: FeatureItem[];
}

export const landingData: LandingData = {
  hero: {
    title: "Build Smarter AI Agents",
    highlight: "Faster Than Ever",
    description:
      "Deploy autonomous AI agents that learn, adapt, and execute tasks without supervision. Transform your workflow in minutes, not months.",
    buttons: [
      { text: "Start Building Free", type: "primary" },
      { text: "Watch Github", type: "secondary" },
    ],
    images: {
      workflow: "https://placehold.co/400x250/333/ffffff?text=AI+Agent+Workflow",
      code: "https://placehold.co/400x250/222/ffffff?text=AI+Code+Generation",
    },
    stats: [
      { value: "2,847", label: "Active Agents" },
      { value: "1.2M+", label: "Tasks Completed" },
      { value: "99.7%", label: "Success Rate" },
    ],
  },
  features: [
    {
      title: "No-Code Agent Builder",
      description:
        "Create sophisticated AI agents without writing a single line of code. Drag, drop, deploy.",
      iconBg: "bg-blue-600",
    },
    {
      title: "Real-Time Learning",
      description:
        "Agents adapt and improve from every interaction, getting smarter over time.",
      iconBg: "bg-cyan-500",
    },
    {
      title: "Multi-Platform Integration",
      description:
        "Connect with 500+ tools and platforms seamlessly. No complex setup required.",
      iconBg: "bg-indigo-600",
    },
  ],
};
