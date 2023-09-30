<script lang="ts">
	import { app } from '$lib';
	import Card from '@components/Card.svelte';
	import DisplayHeading from '@components/DisplayHeading.svelte';
	import VotingPieChart from '@components/VotingPieChart.svelte';
	import VotingResults from '@components/VotingResults.svelte';

	export let data;

	const roomConnection = app.socket.subscribe({
		$query: {
			displayId: data.currentDisplay.name,
			roomId: data.room.id
		}
	});

	const cards = [1, 2, 3, 5, 8, 13, 21, 34, 55];
	let currentDisplay = data.currentDisplay;
	let room = data.room;

	roomConnection.subscribe((message) => {
		const updatedDisplay = message.data.displays.find(
			(display) => display.name === data.currentDisplay.name
		);

		if (typeof updatedDisplay !== 'undefined') {
			currentDisplay = updatedDisplay;
		}

		room = message.data;
	});

	function handleReset() {
		roomConnection.send({
			type: 'UPDATE_DISPLAY',
			value: {
				cardValue: 0,
				displayId: currentDisplay.name,
				roomId: room.id
			}
		});
	}

	function handleSelect(num: number) {
		roomConnection.send({
			type: 'UPDATE_DISPLAY',
			value: {
				cardValue: num,
				displayId: currentDisplay.name,
				roomId: room.id
			}
		});
	}

	function handleResetAll() {
		roomConnection.send({
			type: 'RESET_ROOM_CARDS',
			value: true
		});
	}

	function handleToggleVotes() {
		roomConnection.send({
			type: 'SHOW_VOTES',
			value: !room.showVotes
		});
	}

	function onLabelChange(label: string) {
		roomConnection.send({
			type: 'UPDATE_LABEL',
			value: label
		});
	}
</script>

<noscript>Javascript is required to run this part of the application.</noscript>

<h2>{room.name}</h2>

<DisplayHeading
	data={{
		room: room,
		isHost: currentDisplay.isHost
	}}
	{handleResetAll}
	{handleToggleVotes}
	{onLabelChange}
/>

{#key currentDisplay}
	<button
		class="btn variant-filled-primary"
		disabled={currentDisplay.cardValue === 0}
		on:click={handleReset}
	>
		Reset Selection
	</button>

	<section class="grid gap-4 grid-cols-3">
		{#each cards as card}
			<Card clickAction={handleSelect} number={card} selectedNumber={currentDisplay.cardValue} />
		{/each}
	</section>
{/key}

{#key room.displays}
	{#if room.showVotes}
		<VotingResults displays={room.displays} />
	{/if}

	{#if room.showVotes && Array.isArray(room.displays)}
		<VotingPieChart displays={room.displays} />
	{/if}
{/key}
