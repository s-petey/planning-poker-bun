import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Comp from './Card.svelte';

describe('Component: Card', () => {
	test('shows number in cards button', () => {
		render(Comp, { number: 1, selectedNumber: undefined });
		const cardButton = screen.getByRole('button', { name: '1' });
		expect(cardButton).toBeInTheDocument();
		expect(cardButton).not.toBeDisabled();
	});

	test.each([
		[1, 1],
		[1, 2]
	])('button is disabled when number and selected number are the same', (a, b) => {
		render(Comp, { number: a, selectedNumber: b });
		const cardButton = screen.getByRole('button', { name: a.toString() });
		expect(cardButton).toBeTruthy();
		expect(cardButton).toBeDisabled();
	});
});
