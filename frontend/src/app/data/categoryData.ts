// app/data/categoryData.ts
export interface CategoryItem {
  title: string;
  description: string;
  img: string;
}

export const categoryData: CategoryItem[] = [
  {
    title: "Intuitive Interface",
    description:
      "Clean, minimal design that puts powerful AI tools at your fingertips.",
    img: "https://placehold.co/400x250/444/ffffff?text=Intuitive+Interface",
  },
  {
    title: "Lightning Fast",
    description:
      "Process thousands of tasks simultaneously with sub-second response times.",
    img: "https://placehold.co/400x250/444/ffffff?text=Lightning+Fast",
  },
  {
    title: "Mobile Ready",
    description:
      "Manage your AI agents from anywhere with our responsive mobile experience.",
    img: "https://placehold.co/400x250/444/ffffff?text=Mobile+Ready",
  },
];
