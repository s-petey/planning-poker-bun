<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import colors from 'tailwindcss/colors';
	import { getRandomTailwindColors } from '$lib/tailwindColors';
	import './VotingPieChart.css';

	type Display = {
		cardValue: number;
	};

	export let displays: Display[];

	const conicStops: ConicStop[] = [];
	const votedDisplays = displays.filter((display) => display.cardValue > 0);
	const randomColorIndexes = getRandomTailwindColors(votedDisplays.length);
	const reducedVotes = new Map<number, number>();

	votedDisplays.forEach((display) => {
		const found = reducedVotes.get(display.cardValue);
		const newValue = (found ?? 0) + 1;

		reducedVotes.set(display.cardValue, newValue);
	});

	let percentCounter = 0;

	const randomColorNumbers = [400, 500, 600] as const;

	Array.from(reducedVotes.entries()).map(([value, count], idx) => {
		let percentValue = Math.floor((count / votedDisplays.length) * 100);
		const randomColorNumber =
			randomColorNumbers[Math.floor(Math.random() & randomColorNumbers.length)];

		const color = colors[randomColorIndexes[idx]][randomColorNumber]; // 300 - 600
		conicStops.push({
			label: value.toString(),
			color: color,
			start: percentCounter,
			end: percentCounter + percentValue
		});

		percentCounter += percentValue;
	});
</script>

<section class="w-full md:w-3/4 lg:w-1/2 p-16">
	<ConicGradient
		class="flex flex-column"
		regionCone="border-2 border-primary-500"
		stops={conicStops}
		legend
	/>
</section>
