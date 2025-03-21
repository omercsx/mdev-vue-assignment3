<script setup lang="ts">
import { onBeforeUnmount } from "vue";

interface BlogPost {
	id: number;
	title: string;
	category: string;
	content: string;
	author: string;
	date: string;
}

const props = defineProps<{
	post: BlogPost;
}>();

const emit = defineEmits<{
	close: [];
}>();

// Close modal when Escape key is pressed
const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		emit("close");
	}
};

// Add event listener for Escape key
document.addEventListener("keydown", handleKeyDown);

// Clean up event listener when component is unmounted (lifecycle hook)
onBeforeUnmount(() => {
	document.removeEventListener("keydown", handleKeyDown);
	console.log("PostModal component will be unmounted, event listener removed");
});
</script>

<template>
	<!-- Use Teleport to render the modal outside of the parent component hierarchy -->
	<Teleport to="body">
		<div class="modal-overlay" @click.self="emit('close')">
			<div class="modal-container">
				<button class="close-button" @click="emit('close')">&times;</button>

				<div class="modal-content">
					<h2>{{ post.title }}</h2>

					<div class="post-meta">
						<div class="meta-item">
							<strong>Author:</strong> {{ post.author }}
						</div>
						<div class="meta-item"><strong>Date:</strong> {{ post.date }}</div>
						<div class="meta-item">
							<strong>Category:</strong>
							<span class="category-tag">{{ post.category }}</span>
						</div>
					</div>

					<div class="post-content">
						<p>{{ post.content }}</p>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-container {
	background-color: white;
	border-radius: 8px;
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
	animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
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
	z-index: 10;
}

.modal-content {
	padding: 2rem;
}

.modal-content h2 {
	margin-top: 0;
	color: #2c3e50;
	font-size: 1.8rem;
	margin-bottom: 1.5rem;
}

.post-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid #eee;
}

.meta-item {
	font-size: 0.9rem;
	color: #666;
}

.category-tag {
	background-color: #e1f5ee;
	color: #42b883;
	padding: 0.2rem 0.6rem;
	border-radius: 20px;
	font-weight: bold;
}

.post-content {
	line-height: 1.6;
}

.post-content p {
	margin-bottom: 1.5rem;
}
</style>
