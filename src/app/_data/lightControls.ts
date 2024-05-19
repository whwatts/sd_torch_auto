'use server';

const userName = 'x5nDEcw1eVrRsNd7i41xV9E8R0qM4My5KJHcoUNG';
const clientkey = '60C7D3CA8C2F7AFA1255145673073181';

const ip = '192.168.0.188';
const url = `https://${ip}/clip/v2`;

const header = {
	'Cache-Control': 'no-cache',
	'hue-application-key': userName,
};

const getLights = async (): Promise<string> => {
	const lights = await fetch(`${url}/resource/grouped_light`, {
		headers: header,
	});
	const lightsJson = await lights.json();

	const data = lightsJson.data.filter((light: any) => {
		return light.owner.rtype === 'room';
	});

	if (data.length === 1) {
		return data[0].id;
	}

	return 'fucked';
};

const getScene = async (): Promise<string> => {
	const scene = await fetch(`${url}/resource/scene`, { headers: header });
	const sceneJson = await scene.json();

	const torchScene = sceneJson.data.filter(
		(scene: any) => scene.metadata.name === 'Test Scene 1',
	);

	return torchScene.id;
};

export const flickerNotification = async () => {
	const light = await getLights();
	const scene = await getScene();

	fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: false,
			},
		}),
	});

	await new Promise((resolve) => setTimeout(resolve, 500));

	fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: true,
			},
		}),
	});

	await new Promise((resolve) => setTimeout(resolve, 250));

	fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: false,
			},
		}),
	});

	await new Promise((resolve) => setTimeout(resolve, 500));

	fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: true,
			},
		}),
	});

	fetch(`${url}/resource/scene/${scene}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			target: {
				rid: light,
				rtype: 'grouped_light',
			},
			action: {
				on: {
					on: true,
				},
			},
		}),
	});

	console.log('Flicker notification sent');
};

export const turnOffTorch = async () => {
	const light = await getLights();

	const turnOff = fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: false,
			},
		}),
	});
};

export const turnOnTorch = async () => {
	const light = await getLights();
	const scene = await getScene();

	console.log('light', light);

	const turnOn = await fetch(`${url}/resource/grouped_light/${light}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			on: {
				on: true,
			},
		}),
	});

	const setScene = fetch(`${url}/resource/scene/${scene}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...header,
		},
		body: JSON.stringify({
			target: {
				rid: light,
				rtype: 'grouped_light',
			},
			action: {
				on: {
					on: true,
				},
			},
		}),
	});
};
