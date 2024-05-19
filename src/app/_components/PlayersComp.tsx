'use client';

import React from 'react';
import TrashIcon from '~/components/icons/TrashIcon';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export type PlayerType = {
	playerName: string;
	characterName: string;
};

function PlayersComp({
	players,
	setPlayers,
}: {
	players: PlayerType[];
	setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
}) {
	const [playerDetails, setPlayerDetails] = React.useState<PlayerType>({
		playerName: '',
		characterName: '',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlayerDetails((currentDetails) => {
			return { ...currentDetails, [e.target.name]: e.target.value };
		});
	};

	const addPlayer = () => {
		setPlayers((currentPlayers) => {
			return [...currentPlayers, playerDetails];
		});
		setPlayerDetails({ playerName: '', characterName: '' });
	};

	const removePlayer = (idx: number) => {
		setPlayers((currentPlayers) => {
			return currentPlayers.filter((_, index) => index !== idx);
		});
	};

	return (
		<div className="pt-4">
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Players
				</h3>
				<div className="flex justify-between py-4 text-sm font-medium">
					<dt className="text-gray-900">Player Name</dt>
					<dd className="text-gray-900">Character Name</dd>
				</div>
				<div className="border-t border-gray-100">
					<dl className="divide-y divide-gray-900"></dl>
				</div>
				{players.map((player, idx) => (
					<React.Fragment key={`${player.playerName}-${idx}`}>
						<div className="border-t border-gray-100">
							<dl className="divide-y divide-gray-900">
								<div className="flex justify-between py-4 text-sm font-medium">
									<dt className="text-gray-900">
										{player.playerName}
									</dt>
									<dd className="text-gray-900">
										{player.characterName}
									</dd>
									<dd className="text-gray-900">
										<Button
											onClick={() => {
												removePlayer(idx);
											}}
										>
											<TrashIcon />
										</Button>
									</dd>
								</div>
							</dl>
						</div>
					</React.Fragment>
				))}
			</div>
			{/* <ul>
				{players.map((player) => (
					<li key={player.playerName}>
						{player.playerName} - {player.characterName}
					</li>
				))}
			</ul> */}
			<div className="border-t border-gray-100">
				<dl className="divide-y divide-gray-900"></dl>
			</div>
			<div className="flex justify-center space-x-4 py-3">
				<Input
					placeholder="Player Name"
					name="playerName"
					value={playerDetails.playerName}
					onChange={onChange}
					className="text-black"
				/>
				<Input
					placeholder="Character Name"
					name="characterName"
					value={playerDetails.characterName}
					onChange={onChange}
					className="text-black"
				/>
				<Button onClick={addPlayer}>Add Player</Button>
			</div>
		</div>
	);
}

export default PlayersComp;
