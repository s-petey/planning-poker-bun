<script lang="ts">
	export let displays: { name: string }[];
	export let roomName: string;
</script>

<section class="w-full text-center">
	{#if displays.length > 0}
		<h4>Current displays in room: {roomName}</h4>
		<ul class="list grid grid-flow-col gap-2 justify-items-center">
			{#each displays as display}
				<li><p class="badge variant-filled">{display.name}</p></li>
			{/each}
		</ul>
	{:else}
		<h4>There are no displays currently in {roomName}</h4>
	{/if}
</section>
