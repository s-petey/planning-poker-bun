<script lang="ts">
	export let vote: { name: string; value: number };

	const voteMessage = vote.value === 0 ? vote.name : `${vote.name}: ${vote.value}`;
</script>

<p aria-label={vote.value > 0 ? 'VoteItem' : 'NonVoteItem'}>
	{voteMessage}
</p>
