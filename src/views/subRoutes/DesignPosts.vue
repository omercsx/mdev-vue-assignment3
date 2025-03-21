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

const designPosts = ref<BlogPost[]>([]);

onMounted(async () => {
	try {
		const response = await fetch("/blogPosts.json");
		const data = await response.json();
		// Filter posts by category
		designPosts.value = data.filter(
			(post: BlogPost) => post.category.toLowerCase() === "design"
		);
	} catch (error) {
		console.error("Error loading design posts:", error);
	}
});
</script>

<template>
	<div class="design-posts">
		<h2 class="subroute-title">Design Posts</h2>

		<div v-if="designPosts.length === 0" class="no-posts">
			<p>No design-related posts found. Why not create one?</p>
		</div>

		<div v-else class="post-grid">
			<div v-for="post in designPosts" :key="post.id" class="post-card">
				<div class="post-header">
					<h3>{{ post.title }}</h3>
					<span class="date">{{ post.date }}</span>
				</div>
				<p class="post-excerpt">{{ post.content.substring(0, 120) }}...</p>
				<div class="post-footer">
					<span class="author">By: {{ post.author }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.design-posts {
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
	text-align: center;
	position: relative;
}

.subroute-title::after {
	content: "";
	position: absolute;
	bottom: -8px;
	left: 50%;
	transform: translateX(-50%);
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

.post-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
}

.post-card {
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #f9f9f9;
}

.post-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.post-header {
	background-color: #42b883;
	color: white;
	padding: 1.5rem;
	position: relative;
}

.post-header h3 {
	margin: 0;
	margin-bottom: 0.5rem;
	font-size: 1.3rem;
}

.date {
	font-size: 0.8rem;
	opacity: 0.8;
}

.post-excerpt {
	padding: 1.5rem;
	flex: 1;
	color: #555;
	line-height: 1.6;
}

.post-footer {
	padding: 1rem 1.5rem;
	background-color: #f2f2f2;
	font-style: italic;
	color: #666;
	font-size: 0.9rem;
}
</style>
