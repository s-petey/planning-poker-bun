<script lang="ts">
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';

	import GitSvg from '@components/GitSvg.svelte';
</script>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">{' '}</svelte:fragment>

			<h1 class="h1 text-center"><a href="/">Planning Poker</a></h1>

			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->
	<section class="mt-4 grid gap-4 grid-cols-1 justify-items-center text-center">
		<slot />
	</section>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<div class="py-4">
			<hr />
		</div>

		<footer class="grid gap-4 grid-cols-1 justify-items-center text-center mb-4">
			<p>
				© {new Date().getFullYear()} Sam Peterson. All rights reserved.
			</p>
			<p>
				<a
					class="cursor-pointer badge-icon variant-soft-primary w-8 h-8"
					href="https://github.com/s-petey"
					target="_blank"
					rel="noopener noreferrer"
				>
					<GitSvg
						data={{
							class: 'w-6 h-6'
						}}
					/>
				</a>
			</p>
			<p>
				<a href="/about">About</a>
			</p>
		</footer>
	</svelte:fragment>
</AppShell>
