import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue")
	},
	{
		path: "/posts",
		name: "Posts",
		// Use lazy loading for the Posts page
		component: () => import("../views/Posts.vue"),
		children: [
			{
				path: "food",
				name: "FoodPosts",
				component: () => import("../views/subRoutes/FoodPosts.vue")
			},
			{
				path: "tech",
				name: "TechPosts",
				component: () => import("../views/subRoutes/TechPosts.vue")
			},
			{
				path: "design",
				name: "DesignPosts",
				component: () => import("../views/subRoutes/DesignPosts.vue")
			}
		]
	},
	{
		path: "/about",
		name: "About",
		// Use lazy loading for the About page
		component: () => import("../views/About.vue")
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
