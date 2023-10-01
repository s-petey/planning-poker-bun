import type { DefaultColors } from 'tailwindcss/types/generated/colors';

export const tailwindColors: readonly (keyof DefaultColors)[] = [
	'slate',
	'red',
	'orange',
	'amber',
  'lime',
  'emerald',
  'cyan',
  'sky',
  'purple',
  'pink'
] as const;

export function getRandomTailwindColors(count: number) {
	const shuffled = Array.from(tailwindColors).sort(() => 0.5 - Math.random());

	return shuffled.slice(0, count);
}
