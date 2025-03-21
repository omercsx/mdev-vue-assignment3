<script setup lang="ts">
import { ref } from "vue";

interface PostFormData {
	title: string;
	category: string;
	content: string;
	author: string;
}

const formData = ref<PostFormData>({
	title: "",
	category: "",
	content: "",
	author: ""
});

const categories = [
	"Technology",
	"Design",
	"Programming",
	"Food",
	"Travel",
	"Lifestyle",
	"Business"
];

const emit = defineEmits<{
	submit: [newPost: PostFormData];
	cancel: [];
}>();

const submitForm = () => {
	// Basic validation
	if (
		!formData.value.title ||
		!formData.value.category ||
		!formData.value.content ||
		!formData.value.author
	) {
		alert("Please fill out all fields");
		return;
	}

	// Emit the form data
	emit("submit", { ...formData.value });

	// Reset the form
	formData.value = {
		title: "",
		category: "",
		content: "",
		author: ""
	};
};
</script>

<template>
	<form @submit.prevent="submitForm" class="create-post-form">
		<div class="form-group">
			<label for="title">Title</label>
			<input
				type="text"
				id="title"
				v-model="formData.title"
				placeholder="Enter post title"
				required
			/>
		</div>

		<div class="form-group">
			<label for="author">Author</label>
			<input
				type="text"
				id="author"
				v-model="formData.author"
				placeholder="Enter your name"
				required
			/>
		</div>

		<div class="form-group">
			<label for="category">Category</label>
			<select id="category" v-model="formData.category" required>
				<option value="" disabled>Select a category</option>
				<option
					v-for="category in categories"
					:key="category"
					:value="category"
				>
					{{ category }}
				</option>
			</select>
		</div>

		<div class="form-group">
			<label for="content">Content</label>
			<textarea
				id="content"
				v-model="formData.content"
				placeholder="Write your blog post content here..."
				rows="8"
				required
			></textarea>
		</div>

		<div class="form-actions">
			<button type="button" class="cancel-button" @click="emit('cancel')">
				Cancel
			</button>
			<button type="submit" class="submit-button">Create Post</button>
		</div>
	</form>
</template>

<style scoped>
.create-post-form {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.form-group label {
	font-weight: bold;
	color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
	padding: 0.8rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-family: inherit;
	font-size: 1rem;
}

.form-group textarea {
	resize: vertical;
	min-height: 150px;
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 1rem;
}

.cancel-button {
	padding: 0.8rem 1.5rem;
	background-color: #f1f1f1;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	color: #666;
}

.submit-button {
	padding: 0.8rem 1.5rem;
	background-color: #42b883;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
}

.cancel-button:hover {
	background-color: #e5e5e5;
}

.submit-button:hover {
	background-color: #3aa876;
}
</style>
