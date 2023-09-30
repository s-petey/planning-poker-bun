<script lang="ts">
	export let data: {
		room: {
			label: string;
			showVotes: boolean;
		};
		isHost: boolean;
	};

	export let handleResetAll: () => void;
	export let handleToggleVotes: () => void;
	export let onLabelChange: (label: string) => void;

	function handleLabel() {
		onLabelChange(roomLabel);
	}

	let roomLabel = data.room.label;
</script>

{#if data.isHost === true}
	<label class="label" aria-label="Current Room Label">
		<input
			class="input"
			placeholder={data.room.label}
			type="text"
			bind:value={roomLabel}
			name="roomLabel"
		/>
	</label>

	<button on:click={handleLabel} class="btn variant-filled">Update label</button>
{:else}
	<p>Room Label: {data.room.label.length > 0 ? data.room.label : 'No Room Label'}</p>
{/if}

{#if data.isHost === true}
	<div class="flex gap-4">
		<button on:click={handleResetAll} class="btn variant-soft-tertiary">Reset cards</button>

		<button on:click={handleToggleVotes} class="btn variant-soft-tertiary">
			{#if data.room.showVotes}
				Hide Votes
			{:else}
				Show Votes
			{/if}
		</button>

		<a href="/" class="btn bg-secondary-500 variant-soft-tertiary">Change Room</a>
	</div>
{:else}
	<div class="flex gap-4">
		<a href="/" class="btn bg-secondary-500 variant-soft-tertiary">Change Room</a>
	</div>
{/if}
