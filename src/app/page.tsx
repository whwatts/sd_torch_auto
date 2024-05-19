'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import PlayersComp, { PlayerType } from './_components/PlayersComp';
import React from 'react';
import TorchesComp from './_components/TorchesComp';

export default function HomePage() {
	const [players, setPlayers] = React.useState<PlayerType[]>([]);

	return (
		<main className="m-4  justify-center rounded-xl bg-slate-400 p-2">
			<div className="flex w-full justify-center p-4">
				<h1 className="text-2xl font-bold text-white">
					Welcome To the Shadowdark Torch Manager
				</h1>
			</div>
			<div className="mx-auto flex w-[75%] justify-center p-4">
				<Tabs defaultValue="torches" className="w-full">
					<TabsList>
						<TabsTrigger value="torches">Torches</TabsTrigger>
						<TabsTrigger value="players">Players</TabsTrigger>
					</TabsList>
					<TabsContent value="torches">
						<div className="mx-auto">
							<TorchesComp players={players} />
						</div>
					</TabsContent>

					<TabsContent value="players">
						<div className="mx-auto">
							<PlayersComp
								players={players}
								setPlayers={setPlayers}
							/>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
