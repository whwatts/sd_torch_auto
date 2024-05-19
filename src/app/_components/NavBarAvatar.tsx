'use client';

import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from '~/components/ui/dropdown-menu';
import React from 'react';
import { signOut } from 'next-auth/react';

function NavBarAvatar({ username }: { username: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="images/torch.jpg" alt="Torch" />
					<AvatarFallback>{username ?? 'Torch'}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Settings</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => signOut()}>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default NavBarAvatar;
