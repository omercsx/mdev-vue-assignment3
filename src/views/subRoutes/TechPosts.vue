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

const techPosts = ref<BlogPost[]>([]);

onMounted(async () => {
	try {
		const response = await fetch("/blogPosts.json");
		const data = await response.json();
		// Filter posts by category (including both Technology and Programming)
		techPosts.value = data.filter(
			(post: BlogPost) =>
				post.category.toLowerCase() === "technology" ||
				post.category.toLowerCase() === "programming"
		);
	} catch (error) {
		console.error("Error loading tech posts:", error);
	}
});
</script>

<template>
	<div class="tech-posts">
		<h2 class="subroute-title">Technology & Programming Posts</h2>

		<div v-if="techPosts.length === 0" class="no-posts">
			<p>No technology-related posts found. Why not create one?</p>
		</div>

		<div v-else class="post-list">
			<div v-for="post in techPosts" :key="post.id" class="post-item">
				<h3>{{ post.title }}</h3>
				<div class="post-meta">
					<span class="category">{{ post.category }}</span>
					<span class="date">{{ post.date }}</span>
				</div>
				<p class="post-excerpt">{{ post.content.substring(0, 100) }}...</p>
				<div class="author">By: {{ post.author }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.tech-posts {
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
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;
}

.post-item {
	padding: 1.5rem;
	border: 1px solid #eee;
	border-radius: 4px;
	transition: all 0.3s;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.post-item:hover {
	transform: translateY(-5px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-item h3 {
	margin-top: 0;
	color: #2c3e50;
	margin-bottom: 0.5rem;
}

.post-meta {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	color: #666;
}

.category {
	background-color: #e1f5ee;
	color: #42b883;
	padding: 0.2rem 0.6rem;
	border-radius: 20px;
	font-weight: bold;
}

.post-excerpt {
	color: #666;
	line-height: 1.5;
	margin-bottom: 1rem;
	flex: 1;
}

.author {
	font-style: italic;
	color: #666;
	font-size: 0.9rem;
	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid #eee;
}
</style>
