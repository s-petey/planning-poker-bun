<script lang="ts">
	import VoteItem from './VoteItem.svelte';

	export let displays: {
		name: string;
		cardValue: number;
	}[];

	let votes: { name: string; value: number }[];
	$: votes = displays.map((display) => ({
		name: display.name,
		value: display.cardValue
	}));

	$: votedItems = votes.filter((vote) => vote.value > 0);
	$: notVotedItems = votes.filter((vote) => vote.value <= 0);
</script>

<h3>Room voting results:</h3>

<h4 class="text-primary-500">
	{votedItems.length} of {votes.length} voted
</h4>

<div class="flex flex-row justify-evenly w-full">
	<section class="p-4 border-solid border border-success-500 rounded text-success-500">
		<h5 class="VotedLabel">Voted</h5>
		<div class="p-4 flex flex-row gap-4 flex-wrap justify-center">
			{#each votedItems as vote}
				<VoteItem {vote} />
			{/each}
		</div>
	</section>

	<section class="p-4 border-solid border border-error-500 rounded text-error-500">
		<h5 class="NotVotedLabel">Not Voted</h5>
		<div class="p-4 flex flex-row gap-4 flex-wrap justify-center">
			{#each notVotedItems as notVoted}
				<VoteItem vote={notVoted} />
			{/each}
		</div>
	</section>
</div>
