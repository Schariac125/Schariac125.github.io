/**
 * Fancybox 语言包加载助手
 * 根据站点或页面语言代码，规范化并动态加载对应的 Fancybox 语言包
 */

export type FancyboxL10n = Record<string, any>;

/**
 * 规范化语言代码为 Fancybox 语言包匹配格式
 */
export function normalizeLangCode(lang: string | null | undefined): string | null {
	if (!lang) return null;
	const normalized = lang.trim().replace(/-/g, "_");
	const lower = normalized.toLowerCase();

	if (
		lower.startsWith("zh_tw") ||
		lower.startsWith("zh_hk") ||
		lower.startsWith("zh_hant")
	) {
		return "zh_TW";
	}
	if (lower.startsWith("zh")) {
		return "zh_CN";
	}
	if (lower.startsWith("ja")) {
		return "ja";
	}
	if (lower.startsWith("de")) {
		return "de";
	}
	if (lower.startsWith("fr")) {
		return "fr";
	}
	if (lower.startsWith("es")) {
		return "es";
	}
	if (lower.startsWith("ru")) {
		return "ru";
	}
	if (lower.startsWith("en")) {
		return null; // Fancybox 默认界面语言即为英文
	}
	return normalized;
}

/**
 * 动态加载对应的 Fancybox 语言包
 */
export async function loadFancyboxL10n(
	lang?: string,
): Promise<FancyboxL10n | null> {
	const targetLang =
		lang || (typeof document !== "undefined" ? document.documentElement.lang : "");
	const langCode = normalizeLangCode(targetLang);

	if (!langCode) {
		return null;
	}

	try {
		const l10nModule = await import(
			/* @vite-ignore */ `@fancyapps/ui/dist/fancybox/l10n/${langCode}.js`
		);
		return l10nModule.default || l10nModule[langCode] || l10nModule;
	} catch {
		// 当对应语言包未提供或动态导入失败时，安全回退到默认语言
		return null;
	}
}
