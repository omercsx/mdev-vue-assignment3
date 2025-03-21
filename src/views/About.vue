<script setup lang="ts">
// This component uses lazy loading
import { onBeforeUnmount } from "vue";

// Example of using onBeforeUnmount lifecycle hook
onBeforeUnmount(() => {
	console.log("About page component will be unmounted");
	// Free up resources if needed
});
</script>

<template>
	<div class="about">
		<section class="about-header">
			<h1>About Vue Blog</h1>
			<p class="tagline">A modern blog platform built with Vue 3</p>
		</section>

		<section class="about-content">
			<div class="mission">
				<h2>Our Mission</h2>
				<p>
					Vue Blog is dedicated to sharing knowledge, insights, and the latest
					developments in web development, design, and technology. We aim to
					provide high-quality, accessible content that helps developers of all
					skill levels improve their craft and stay up-to-date with the rapidly
					evolving world of web technologies.
				</p>
			</div>

			<div class="team">
				<h2>Our Team</h2>
				<div class="team-members">
					<div class="team-member">
						<div class="avatar">JD</div>
						<h3>Jane Doe</h3>
						<p class="role">Founder & Lead Developer</p>
						<p class="bio">
							Jane is a full-stack developer with over 10 years of experience in
							web development. She specializes in Vue.js and modern JavaScript
							frameworks.
						</p>
					</div>
					<div class="team-member">
						<div class="avatar">JS</div>
						<h3>John Smith</h3>
						<p class="role">UX Designer</p>
						<p class="bio">
							John brings years of design experience to the team, ensuring that
							Vue Blog not only functions well but looks great and provides an
							excellent user experience.
						</p>
					</div>
					<div class="team-member">
						<div class="avatar">AJ</div>
						<h3>Alex Johnson</h3>
						<p class="role">Content Manager</p>
						<p class="bio">
							Alex curates content for Vue Blog, ensuring that our articles are
							informative, relevant, and accessible to developers at all skill
							levels.
						</p>
					</div>
				</div>
			</div>

			<div class="contact">
				<h2>Get in Touch</h2>
				<p>
					Have a question, suggestion, or want to contribute to Vue Blog? We'd
					love to hear from you!
				</p>
				<a href="mailto:contact@vueblog.com" class="contact-button"
					>Contact Us</a
				>
			</div>
		</section>
	</div>
</template>

<style scoped>
.about {
	max-width: 1000px;
	margin: 0 auto;
}

.about-header {
	text-align: center;
	margin-bottom: 3rem;
}

.about-header h1 {
	font-size: 2.5rem;
	color: #2c3e50;
	margin-bottom: 0.5rem;
}

.tagline {
	font-size: 1.2rem;
	color: #666;
}

.about-content {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

.mission,
.team,
.contact {
	background-color: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.mission h2,
.team h2,
.contact h2 {
	color: #42b883;
	margin-top: 0;
	margin-bottom: 1.5rem;
	position: relative;
}

.mission h2::after,
.team h2::after,
.contact h2::after {
	content: "";
	position: absolute;
	bottom: -8px;
	left: 0;
	width: 50px;
	height: 3px;
	background-color: #42b883;
}

.mission p,
.contact p {
	line-height: 1.6;
	color: #444;
}

.team-members {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2rem;
	margin-top: 2rem;
}

.team-member {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.avatar {
	width: 80px;
	height: 80px;
	background-color: #42b883;
	color: white;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
}

.team-member h3 {
	margin: 0;
	color: #2c3e50;
}

.role {
	color: #42b883;
	font-weight: bold;
	margin: 0.3rem 0 1rem;
}

.bio {
	font-size: 0.9rem;
	color: #666;
	line-height: 1.5;
}

.contact {
	text-align: center;
}

.contact-button {
	display: inline-block;
	background-color: #42b883;
	color: white;
	padding: 0.8rem 1.5rem;
	border-radius: 4px;
	font-weight: bold;
	text-decoration: none;
	margin-top: 1.5rem;
	transition: all 0.3s;
}

.contact-button:hover {
	background-color: #3aa876;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
	.team-members {
		grid-template-columns: 1fr;
	}
}
</style>
