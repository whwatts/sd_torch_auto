'use server';

export const flickerNotification = async () => {
	// Send a notification to the user
	setTimeout(() => {}, 2000);
	console.log('Flicker notification sent');
};

export const turnOffTorch = async () => {
	setTimeout(() => {}, 2000);
	console.log('Torch turned off');
};
