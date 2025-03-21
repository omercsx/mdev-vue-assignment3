<script setup lang="ts">
// No components needed at the root level
</script>

<template>
	<div class="app-container">
		<header>
			<h1>Vue Blog</h1>
			<nav>
				<router-link to="/">Home</router-link>
				<router-link to="/posts">Posts</router-link>
				<router-link to="/about">About</router-link>
			</nav>
		</header>
		<main>
			<router-view />
		</main>
		<footer>
			<p>&copy; 2025 Vue Blog by Omer Cagri Sayir. All rights reserved.</p>
		</footer>
	</div>
</template>

<style>
body {
	margin: 0;
	font-family: "Arial", sans-serif;
	background-color: #f5f5f5;
	color: #333;
}

.app-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

header {
	background-color: #42b883;
	color: white;
	padding: 1rem;
	text-align: center;
}

header h1 {
	margin: 0;
	font-size: 2rem;
}

nav {
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	margin-top: 1rem;
}

nav a {
	color: white;
	text-decoration: none;
	font-weight: bold;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	transition: background-color 0.3s;
}

nav a:hover {
	background-color: rgba(255, 255, 255, 0.2);
}

nav a.router-link-active {
	background-color: rgba(255, 255, 255, 0.3);
}

main {
	flex: 1;
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;
	box-sizing: border-box;
}

footer {
	background-color: #34495e;
	color: white;
	text-align: center;
	padding: 1rem;
	margin-top: auto;
}
</style>
