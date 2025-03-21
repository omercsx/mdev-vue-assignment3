<script setup lang="ts">
import { ref, onMounted } from "vue";

interface BlogPost {
	id: number;
	title: string;
	category: string;
	content: string;
	author: string;
	date: string;
}

const foodPosts = ref<BlogPost[]>([]);

onMounted(async () => {
	try {
		const response = await fetch("/blogPosts.json");
		const data = await response.json();
		// Filter posts by category
		foodPosts.value = data.filter(
			(post: BlogPost) => post.category.toLowerCase() === "food"
		);
	} catch (error) {
		console.error("Error loading food posts:", error);
	}
});
</script>

<template>
	<div class="food-posts">
		<h2 class="subroute-title">Food Blog Posts</h2>

		<div v-if="foodPosts.length === 0" class="no-posts">
			<p>No food-related posts found. Why not create one?</p>
		</div>

		<div v-else class="post-list">
			<div v-for="post in foodPosts" :key="post.id" class="post-item">
				<h3>{{ post.title }}</h3>
				<div class="post-meta">
					<span class="author">By: {{ post.author }}</span>
					<span class="date">{{ post.date }}</span>
				</div>
				<p class="post-excerpt">{{ post.content.substring(0, 100) }}...</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.food-posts {
	margin-top: 2rem;
	padding: 2rem;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.subroute-title {
	color: #42b883;
	margin-top: 0;
	margin-bottom: 2rem;
	position: relative;
}

.subroute-title::after {
	content: "";
	position: absolute;
	bottom: -8px;
	left: 0;
	width: 50px;
	height: 3px;
	background-color: #42b883;
}

.no-posts {
	text-align: center;
	padding: 2rem;
	background-color: #f9f9f9;
	border-radius: 4px;
}

.post-list {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.post-item {
	padding: 1.5rem;
	border: 1px solid #eee;
	border-radius: 4px;
	transition: all 0.3s;
}

.post-item:hover {
	transform: translateX(5px);
	border-left: 3px solid #42b883;
}

.post-item h3 {
	margin-top: 0;
	color: #2c3e50;
}

.post-meta {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	color: #666;
}

.post-excerpt {
	color: #666;
	line-height: 1.5;
}
</style>
