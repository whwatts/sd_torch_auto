'use client';
import React, { useEffect } from 'react';
import { PlayerType } from './PlayersComp';
import TrashIcon from '~/components/icons/TrashIcon';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Label } from '~/components/ui/label';
import {
	flickerNotification,
	turnOffTorch,
	turnOnTorch,
} from '../_data/lightControls';
import PauseCircleIcon from '~/components/icons/PauseCircleIcon';

type TorchType = {
	timeRemaining: number;
	player: PlayerType;
	status: 'RUNNING' | 'PAUSED' | 'EXPIRED';
	nextNotificationTime?: number;
};

function TorchesComp({
	players,
}: {
	players: PlayerType[];
}): React.ReactElement {
	const [torches, setTorches] = React.useState<TorchType[]>([]);

	const [torchInput, setTorchInput] = React.useState<{
		playerIdx: string;
		timeRemaining: number;
	}>({ playerIdx: '0', timeRemaining: 60 });

	useEffect(() => {
		const interval = setInterval(() => {
			torches.forEach((torch) => {
				if (torch.status === 'RUNNING' && torch.timeRemaining <= 0) {
					turnOffTorch();
					return;
				}
				if (
					torch.status === 'RUNNING' &&
					torch.timeRemaining === torch.nextNotificationTime
				) {
					flickerNotification();
					return;
				}
			});

			setTorches((currentTorches) => {
				return currentTorches.map((torch) => {
					if (torch.status === 'RUNNING') {
						if (torch.timeRemaining <= 0) {
							return {
								...torch,
								timeRemaining: 0,
								status: 'EXPIRED',
							};
						}

						let notificationTime = torch.nextNotificationTime;

						if (
							torch.timeRemaining === torch.nextNotificationTime
						) {
							notificationTime =
								Math.round(torch.timeRemaining / 1000 / 2) *
								1000;
						}

						console.log('notificationTime', notificationTime);

						return {
							...torch,
							timeRemaining: torch.timeRemaining - 1000,
							nextNotificationTime: notificationTime,
						};
					} else {
						return torch;
					}
				});
			});
		}, 1000);

		return () => clearInterval(interval);
	});

	const removeTorch = (idx: number) => {
		setTorches((currentTorches) => {
			return currentTorches.filter((_, index) => index !== idx);
		});
	};

	const pauseTorch = (idx: number) => {
		setTorches((currentTorches) => {
			return currentTorches.map((torch, index) => {
				if (index === idx) {
					return { ...torch, status: 'PAUSED' };
				}
				return torch;
			});
		});
	};

	const updateTorchInput = (fieldName: string, value: string) => {
		setTorchInput((currentInput) => {
			return { ...currentInput, [fieldName]: value };
		});
	};

	const addTorch = () => {
		const playerIdx = parseInt(torchInput.playerIdx);
		const player = players[playerIdx];
		if (!player) {
			return;
		}
		setTorches((currentTorches) => {
			return [
				...currentTorches,
				{
					timeRemaining: torchInput.timeRemaining * 60 * 1000,
					player: player,
					status: 'RUNNING',
					nextNotificationTime: Math.round(
						(torchInput.timeRemaining * 60 * 1000) / 2,
					),
				},
			];
		});
		turnOnTorch();
	};

	return (
		<div className="pt-4">
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Torches
				</h3>
				<div className="flex justify-between py-4 text-sm font-medium">
					<dt className="text-gray-900">Player Name</dt>
					<dd className="text-gray-900">Time Remaining</dd>
				</div>
				<div className="border-t border-gray-100">
					<dl className="divide-y divide-gray-900"></dl>
				</div>
				{torches.map((torch, idx) => (
					<React.Fragment key={`${torch.player.playerName}-${idx}`}>
						<div className="border-t border-gray-100">
							<dl className="divide-y divide-gray-900">
								<div className="flex justify-between py-4 text-sm font-medium">
									<dt className="text-gray-900">
										{torch.player.playerName}
									</dt>
									<dd className="text-gray-900">
										{torch.timeRemaining > 60 * 1000
											? `${Math.round(
													torch.timeRemaining /
														1000 /
														60,
												)} minutes`
											: `${torch.timeRemaining / 1000} seconds`}
									</dd>
									<dd className="text-gray-900">
										<Button
											onClick={() => {
												removeTorch(idx);
											}}
										>
											<TrashIcon />
										</Button>
									</dd>
									<dd className="text-gray-900">
										<Button
											onClick={() => {
												pauseTorch(idx);
											}}
										>
											<PauseCircleIcon />
										</Button>
									</dd>
								</div>
							</dl>
						</div>
					</React.Fragment>
				))}
			</div>
			<div className="border-t border-gray-100">
				<dl className="divide-y divide-gray-900"></dl>
			</div>
			<div className="flex w-full justify-items-start space-x-4 py-3 align-bottom text-black">
				<div className="mt-auto min-w-40">
					<Label
						htmlFor="playerIdx"
						className="text-grey-900 block text-xs font-medium leading-6"
					>
						Player
					</Label>
					<Select
						value={torchInput.playerIdx.toString()}
						onValueChange={(value) =>
							updateTorchInput('playerIdx', value)
						}
						name="playerIdx"
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a player" />
						</SelectTrigger>
						<SelectContent>
							{players.map((player, idx) => (
								<SelectItem
									key={player.playerName}
									value={idx.toString()}
								>
									{player.playerName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="">
					<Label
						htmlFor="timeRemaining"
						className="text-grey-900 block text-xs font-medium leading-6"
					>
						Torch Length (minutes)
					</Label>
					<div>
						<Input
							placeholder="Torch Length"
							name="timeRemaining"
							value={torchInput.timeRemaining}
							onChange={(e) => {
								updateTorchInput(e.target.name, e.target.value);
							}}
							className="text-black"
						/>
					</div>
				</div>
				<Button onClick={addTorch} className="mt-auto">
					Add Torch
				</Button>
			</div>
		</div>
	);
}

export default TorchesComp;
