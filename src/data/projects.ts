// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "Federstift",
		title: "Federstift",
		description:
			"An AI-powered writing tool for long-form novels. A setting library, style library, and deep RAG retrieval work together to ensure consistency in the setting of long-form narratives;",
		image: "",
		category: "other",
		techStack: ["TypeScript", "RAG", "mult-agent"],
		status: "completed",
		sourceCode: "https://github.com/Schariac125/Federstift",
		visitUrl: "",
		startDate: "2026-07-11",
		endDate: "2024-08-01",
		featured: true,
		tags: ["Agent", "AI", "Open Source"],
	},
	{
		id: "Prism",
		title: "Prism",
		description:
			"Prism is a minimal, lightweight, script-driven visual novel engine prototype.",
		image: "",
		category: "other",
		techStack: ["TypeScript", "vite"],
		status: "completed",
		sourceCode: "https://github.com/Schariac125/Prism",
		startDate: "2026-07-22",
		endDate: "2026-07-28",
		tags: ["Tool"],
		showImage: false,
	},
	{
		id: "Away",
		title: "Away",
		description:
			"Algorithm Notes Repository",
		image: "",
		category: "other",
		techStack: ["C++"],
		status: "completed",
		sourceCode: "https://github.com/Schariac125/Away",
		startDate: "2025-03-01",
		endDate: "2025-12-01",
		tags: ["C++", "Algorithm", "DS"],
		showImage: false,
	},
	{
		id: "DouyinDemo",
		title: "DouyinDemo",
		description:
			"A Golang backend development practice project",
		image: "",
		category: "web",
		techStack: ["Golang", "Mysql", "Redis","Docker"],
		status: "completed",
		sourceCode: "https://github.com/Schariac125/DouyinDemo",
		visitUrl: "",
		startDate: "2026-07-17",
		endDate: "2025-07-22",
		tags: ["Backend", "Go"],
		showImage: false,
	},
	{
		id: "Tiktok FastAPI",
		title: "Tiktok FastAPI",
		description:
			"非常猎奇搞笑的一个 Py 后端项目，PyGo 创始人",
		image: "",
		category: "web",
		techStack: ["Python", "Mysql"],
		status: "completed",
		sourceCode: "https://github.com/Schariac125/Tiktok-fastapi",
		visitUrl: "",
		startDate: "2026-08-31",
		endDate: "2025-09-01",
		tags: ["Python","fastapi","Backend", "Go(存疑)"],
		showImage: false,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
