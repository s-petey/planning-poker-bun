import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Comp from './DisplayHeading.svelte';

describe('Component: Card', () => {
	test('non host displays room label and proper button', () => {
		render(Comp, {
			data: {
				isHost: false,
				room: {
					id: 'my-test-room',
					label: 'test label',
					name: 'test name',
					showVotes: false
				}
			}
		});

		expect(screen.getByText('Room Label: test label')).toBeInTheDocument();

		const changeRoomLink = screen.getByRole('link', { name: /change room/i });
		expect(changeRoomLink).toBeInTheDocument();
		expect(changeRoomLink).not.toBeDisabled();
	});

	test('host displays proper buttons', () => {
		render(Comp, {
			data: {
				isHost: true,
				room: {
					id: 'my-test-room',
					label: 'test label',
					name: 'test name',
					showVotes: false
				}
			}
		});

		const labelInput = screen.getByRole('textbox', { name: /current room label/i });
		const updateLabelButton = screen.getByRole('button', { name: /update label/i });
		const resetCardsButton = screen.getByRole('button', { name: /reset cards/i });
		const changeRoomLink = screen.getByRole('link', { name: /change room/i });

		expect(labelInput).toBeInTheDocument();
		expect(labelInput).toHaveValue('test label');
		expect(updateLabelButton).toBeInTheDocument();
		expect(updateLabelButton).not.toBeDisabled();
		expect(resetCardsButton).toBeInTheDocument();
		expect(resetCardsButton).not.toBeDisabled();
		expect(changeRoomLink).toBeInTheDocument();
		expect(changeRoomLink).not.toBeDisabled();
	});
});
