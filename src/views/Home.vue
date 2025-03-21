<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface BlogPost {
	id: number;
	title: string;
	category: string;
	content: string;
	author: string;
	date: string;
}

const featuredPosts = ref<BlogPost[]>([]);
const router = useRouter();

onMounted(async () => {
	try {
		const response = await fetch("/blogPosts.json");
		const data = await response.json();
		// Get the 2 most recent posts as featured
		featuredPosts.value = data.slice(0, 2);
	} catch (error) {
		console.error("Error loading blog posts:", error);
	}
});
</script>

<template>
	<div class="home">
		<section class="hero">
			<div class="hero-content">
				<h1>Welcome to Vue Blog</h1>
				<p>Discover the latest insights, tutorials, and tech news</p>
				<router-link to="/posts" class="cta-button"
					>Browse All Posts</router-link
				>
			</div>
		</section>

		<section class="featured-posts">
			<h2>Featured Posts</h2>
			<div class="post-grid">
				<div v-for="post in featuredPosts" :key="post.id" class="post-card">
					<h3>{{ post.title }}</h3>
					<div class="post-meta">
						<span class="category">{{ post.category }}</span>
						<span class="date">{{ post.date }}</span>
					</div>
					<p class="post-excerpt">{{ post.content.substring(0, 100) }}...</p>
					<router-link :to="`/posts?id=${post.id}`" class="read-more"
						>Read More</router-link
					>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.home {
	display: flex;
	flex-direction: column;
	gap: 3rem;
}

.hero {
	background: linear-gradient(135deg, #42b883, #35495e);
	color: white;
	padding: 4rem 2rem;
	border-radius: 8px;
	text-align: center;
}

.hero-content {
	max-width: 800px;
	margin: 0 auto;
}

.hero h1 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
}

.hero p {
	font-size: 1.2rem;
	margin-bottom: 2rem;
	opacity: 0.9;
}

.cta-button {
	display: inline-block;
	background-color: white;
	color: #42b883;
	padding: 0.8rem 1.5rem;
	border-radius: 4px;
	font-weight: bold;
	text-decoration: none;
	transition: all 0.3s;
}

.cta-button:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.featured-posts {
	padding: 1rem 0;
}

.featured-posts h2 {
	text-align: center;
	margin-bottom: 2rem;
	position: relative;
}

.featured-posts h2::after {
	content: "";
	position: absolute;
	bottom: -10px;
	left: 50%;
	transform: translateX(-50%);
	width: 50px;
	height: 3px;
	background-color: #42b883;
}

.post-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
}

.post-card {
	background-color: white;
	border-radius: 8px;
	padding: 1.5rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
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

.category {
	background-color: #e1f5ee;
	color: #42b883;
	padding: 0.2rem 0.6rem;
	border-radius: 20px;
	font-weight: bold;
}

.post-excerpt {
	color: #666;
	margin-bottom: 1rem;
	line-height: 1.5;
}

.read-more {
	display: inline-block;
	color: #42b883;
	font-weight: bold;
	text-decoration: none;
}

.read-more:hover {
	text-decoration: underline;
}
</style>
