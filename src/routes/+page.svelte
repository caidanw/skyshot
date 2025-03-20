<script>
	import FriendCard from "$lib/components/FriendCard.svelte";
	import BorderlessCard from "$lib/components/BorderlessCard.svelte";

	let cards = [
		{
			id: 2,
			name: "Jamie Chen",
			photographer: "John Doe",
			photo_url: "https://picsum.photos/id/64/300/400.webp?blur",
			location: "San Francisco, CA",
			timestamp: "2023-04-01T12:00:00Z",
		},
	];
</script>

<div class="card-grid">
	{#each cards as card (card.id)}
		<FriendCard {card} />
		<BorderlessCard {card} />
	{/each}
</div>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 20px;
	}
</style>
