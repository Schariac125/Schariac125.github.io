export type AIToolCategory =
	| "chat"
	| "coding"
	| "image"
	| "audio"
	| "video"
	| "writing"
	| "search"
	| "other";

export type AIToolFrequency =
	| "daily"
	| "weekly"
	| "occasional"
	| "experimental";

export type LocaleString = Partial<
	Record<"en" | "zh_CN" | "zh_TW" | "ja", string>
>;

export function getLocaleString(value: LocaleString, lang: string): string {
	return value[lang as keyof LocaleString] ?? value["en"] ?? "";
}

export interface AITool {
	id: string;
	name: string;
	description: LocaleString;
	icon: string;
	category: AIToolCategory;
	frequency: AIToolFrequency;
	url?: string;
	usage?: LocaleString;
	tags?: string[];
	color?: string;
}

// Replace the examples below with your own AI tools
export const aiToolsData: AITool[] = [
	{
		id: "example-chat",
		name: "DeepSeek",
		description: {
			en: "A conversational AI assistant for writing and reasoning.",
			zh_CN: "用于写作与推理的对话式 AI 助手。",
		},
		icon: "material-symbols:smart-toy",
		category: "chat",
		frequency: "daily",
		url: "https://chat.deepseek.com/",
		usage: {
			en: "Daily: writing, brainstorming",
			zh_CN: "每天：写作、思路梳理",
		},
		tags: ["Chat"],
		color: "#C97758",
	},
	{
		id: "example-chat",
		name: "yuanbao",
		description: {
			en: "A conversational AI assistant for writing and reasoning.",
			zh_CN: "用于写作与推理的对话式 AI 助手。",
		},
		icon: "material-symbols:smart-toy",
		category: "chat",
		frequency: "daily",
		url: "https://yuanbao.tencent.com/chat/",
		usage: {
			en: "Daily: writing, brainstorming",
			zh_CN: "每天：写点文问点普通的小问题什么的",
		},
		tags: ["Chat"],
		color: "#C97758",
	},
	{
		id: "example-coding",
		name: "ChatGPT&CodeX",
		description: {
			en: "An AI-powered code completion and review tool.",
			zh_CN: "AI 驱动的代码补全与 review 工具。",
		},
		icon: "material-symbols:code",
		category: "coding",
		frequency: "weekly",
		url: "https://chatgpt.com/zh-CN/",
		usage: {
			en: "Daily: code review, refactoring",
			zh_CN: "每天：代码 review、重构",
		},
		tags: ["Coding"],
		color: "#10A37F",
	},
	{
		id: "example-image",
		name: "NovelAI",
		description: {
			en: "An AI image generation tool for creating illustrations.",
			zh_CN: "用于生成插图的 AI 图像工具。",
		},
		icon: "material-symbols:image",
		category: "image",
		frequency: "occasional",
		url: "https://novelai.net/image",
		tags: ["Image"],
		color: "#1A73E8",
	},
];
