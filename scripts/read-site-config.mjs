/**
 * 站点配置取值助手（供 Node 脚本使用）
 *
 * 这些脚本直接由 node 运行，无法 import TypeScript 配置，沿用既有的正则读取
 * 方式。src/config/overrides/siteConfig.ts 由 sync-content 从内容仓库同步而来，
 * 存在时优先命中，读不到再回退 src/config/siteConfig.ts 里的上游默认值。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

const SOURCE_PATHS = [
	path.join(rootDir, "src/config/overrides/siteConfig.ts"),
	path.join(rootDir, "src/config/siteConfig.ts"),
];

let cachedSources = null;

function readSources() {
	if (!cachedSources) {
		cachedSources = SOURCE_PATHS.filter((source) => fs.existsSync(source)).map(
			(source) => fs.readFileSync(source, "utf-8"),
		);
	}
	return cachedSources;
}

/**
 * 按「覆盖 → 默认」的顺序返回第一个命中的捕获组，都没命中返回 null。
 */
export function matchSiteConfig(pattern) {
	for (const content of readSources()) {
		const match = content.match(pattern);
		if (match) {
			return match[1];
		}
	}
	return null;
}
