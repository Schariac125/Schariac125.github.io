// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Schariac125",
		imgurl: "https://s3.bmp.ovh/2026/09/03/FzwKhxj1.jpg",
		desc: "我想原地tp",
		siteurl: "https://schariac125.github.io/",
		tags: ["me"],
	},
	{
		id: 2,
		title: "ShaddockNH3",
		imgurl: "https://s3.bmp.ovh/imgs/2025/11/02/d24e9c2f0d294cdd.jpg",
		desc: "Just a humble and obscure soul, dreaming of ascending to prominence while journeying along the path.",
		siteurl: "https://blog.attilio.cc/",
		tags: ["friend"],
	},
	{
		id: 3,
		title: "155TuT",
		imgurl: "https://s3.bmp.ovh/imgs/2025/11/02/d7c4c50cb906eb42.jpg",
		desc: "Verweile doch, du bist so schön!",
		siteurl: "https://155tut.github.io/",
		tags: ["friend"],
	},
	{
		id: 4,
		title: "Cai",
		imgurl: "https://s3.bmp.ovh/2026/08/06/EOEKAPim.jpg",
		desc: "blog.terraria.ink",
		siteurl: "https://blog.terraria.ink/",
		tags: ["friend"],
	},
	{
		id: 5,
		title: "Penty-d",
		imgurl: "https://s3.bmp.ovh/2026/03/02/11iaPaZq.jpg",
		desc: "blog.penty.top",
		siteurl: "https://blog.penty.top/",
		tags: ["friend"],
	},
	{
		id: 6,
		title: "大雁向南飞",
		imgurl: "https://s3.bmp.ovh/2026/08/06/TbiczfZd.jpg",
		desc: "当伪物有了超越真物的意志时，它便超越了真物。",
		siteurl: "https://dayanxiangnanfei.top/",
		tags: ["friend"],
	},
	{
		id: 7,
		title: "Bread",
		imgurl: "https://s3.bmp.ovh/2026/08/24/puF1Etq8.jpg",
		desc: "南梁来咯",
		siteurl: "https://breadtut.me/",
		tags: ["friend"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
