<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostModal from "../components/blog/PostModal.vue";
import CreatePostForm from "../components/blog/CreatePostForm.vue";

interface BlogPost {
	id: number;
	title: string;
	category: string;
	content: string;
	author: string;
	date: string;
}

const route = useRoute();
const router = useRouter();
const posts = ref<BlogPost[]>([]);
const selectedPost = ref<BlogPost | null>(null);
const showModal = ref(false);
const showCreateForm = ref(false);
const searchTerm = ref("");
const searchCategory = ref("");

// Function to fetch blog posts
const fetchPosts = async () => {
	try {
		const response = await fetch("/blogPosts.json");
		posts.value = await response.json();

		// Check if there's a post ID in the URL query
		const postId = route.query.id;
		if (postId) {
			const foundPost = posts.value.find(post => post.id === Number(postId));
			if (foundPost) {
				selectedPost.value = foundPost;
				showModal.value = true;
			}
		}
	} catch (error) {
		console.error("Error loading blog posts:", error);
	}
};

// Watch for route changes to update the selected post
watch(
	() => route.query.id,
	newId => {
		if (newId) {
			const foundPost = posts.value.find(post => post.id === Number(newId));
			if (foundPost) {
				selectedPost.value = foundPost;
				showModal.value = true;
			}
		} else {
			showModal.value = false;
		}
	}
);

// Function to close the modal
const closeModal = () => {
	showModal.value = false;
	// Remove the id from the URL
	if (route.query.id) {
		router.replace({ query: {} });
	}
};

// Function to add a new post
const addPost = async (newPost: Omit<BlogPost, "id" | "date">) => {
	try {
		// In a real app, we would send this to a server
		// For now, we'll create a new post object with a generated ID and date
		const post: BlogPost = {
			id:
				posts.value.length > 0
					? Math.max(...posts.value.map(p => p.id)) + 1
					: 1,
			title: newPost.title,
			category: newPost.category,
			content: newPost.content,
			author: newPost.author,
			date: new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD
		};

		// Add to our local posts array
		posts.value = [...posts.value, post];

		// Hide the create form
		showCreateForm.value = false;

		alert(
			"Post created successfully! In a real app, this would be saved to the server."
		);
	} catch (error) {
		console.error("Error adding post:", error);
	}
};

// Computed property for filtered posts
const filteredPosts = () => {
	if (!searchTerm.value && !searchCategory.value) return posts.value;

	return posts.value.filter(post => {
		const matchesTitle = post.title
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());
		const matchesCategory =
			!searchCategory.value ||
			post.category.toLowerCase() === searchCategory.value.toLowerCase();
		return matchesTitle && matchesCategory;
	});
};

// Get unique categories for the filter dropdown
const categories = () => {
	const categorySet = new Set(posts.value.map(post => post.category));
	return Array.from(categorySet);
};

onMounted(() => {
	fetchPosts();
});
</script>

<template>
	<div class="posts-page">
		<div class="page-header">
			<h1>Blog Posts</h1>
			<div class="top-controls">
				<button class="create-button" @click="showCreateForm = true">
					Create New Post
				</button>

				<div class="search-controls">
					<input
						v-model="searchTerm"
						type="text"
						placeholder="Search by title..."
						class="search-input"
					/>

					<select v-model="searchCategory" class="category-select">
						<option value="">All Categories</option>
						<option
							v-for="category in categories()"
							:key="category"
							:value="category"
						>
							{{ category }}
						</option>
					</select>
				</div>
			</div>
		</div>

		<div class="posts-container">
			<div v-if="filteredPosts().length === 0" class="no-posts">
				<p>No posts match your search criteria.</p>
			</div>

			<div v-else class="post-grid">
				<div
					v-for="post in filteredPosts()"
					:key="post.id"
					class="post-card"
					@click="
						selectedPost = post;
						showModal = true;
						router.push({ query: { id: post.id } });
					"
				>
					<h2>{{ post.title }}</h2>
					<div class="post-meta">
						<span class="category">{{ post.category }}</span>
						<span class="date">{{ post.date }}</span>
					</div>
					<p class="post-excerpt">{{ post.content.substring(0, 150) }}...</p>
					<div class="post-footer">
						<span class="author">By: {{ post.author }}</span>
						<button class="read-more-btn">Read More</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Router view for nested routes -->
		<router-view />

		<!-- Create Post Form -->
		<div v-if="showCreateForm" class="create-form-overlay">
			<div class="create-form-container">
				<button class="close-button" @click="showCreateForm = false">
					&times;
				</button>
				<h2>Create New Post</h2>
				<CreatePostForm @submit="addPost" @cancel="showCreateForm = false" />
			</div>
		</div>

		<!-- Post Modal using Teleport -->
		<PostModal
			v-if="showModal && selectedPost"
			:post="selectedPost"
			@close="closeModal"
		/>
	</div>
</template>

<style scoped>
.posts-page {
	max-width: 1200px;
	margin: 0 auto;
}

.page-header {
	margin-bottom: 2rem;
}

.page-header h1 {
	margin-bottom: 1.5rem;
}

.top-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-button {
	background-color: #42b883;
	color: white;
	border: none;
	padding: 0.7rem 1.2rem;
	border-radius: 4px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
}

.create-button:hover {
	background-color: #3aa876;
}

.search-controls {
	display: flex;
	gap: 1rem;
}

.search-input {
	padding: 0.7rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	min-width: 250px;
}

.category-select {
	padding: 0.7rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	background-color: white;
}

.post-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 2rem;
}

.post-card {
	background-color: white;
	border-radius: 8px;
	padding: 1.5rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	transition: transform 0.3s, box-shadow 0.3s;
	cursor: pointer;
}

.post-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-card h2 {
	margin-top: 0;
	color: #2c3e50;
	font-size: 1.5rem;
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

.post-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid #eee;
}

.author {
	font-style: italic;
	color: #666;
}

.read-more-btn {
	background-color: transparent;
	color: #42b883;
	border: 1px solid #42b883;
	padding: 0.4rem 0.8rem;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s;
}

.read-more-btn:hover {
	background-color: #42b883;
	color: white;
}

.no-posts {
	text-align: center;
	padding: 3rem;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.create-form-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
}

.create-form-container {
	background-color: white;
	border-radius: 8px;
	padding: 2rem;
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
}

.close-button {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: #666;
}

@media (max-width: 768px) {
	.top-controls {
		flex-direction: column;
		align-items: stretch;
	}

	.search-controls {
		flex-direction: column;
	}

	.post-grid {
		grid-template-columns: 1fr;
	}
}
</style>
