'use server';

const userName = 'x5nDEcw1eVrRsNd7i41xV9E8R0qM4My5KJHcoUNG';
//const clientkey = '60C7D3CA8C2F7AFA1255145673073181';

const ip = '192.168.0.188';
const url = `https://${ip}/clip/v2`;

const header = {
	'Cache-Control': 'no-cache',
	'hue-application-key': userName,
};

type lightData = {
	data: {
		id: string;
		owner: {
			rtype: string;
		};
	}[];
};

type sceneData = {
	data: {
		id: string;
		metadata: {
			name: string;
		};
	}[];
};

const getLights = async (): Promise<string> => {
	const lights = await fetch(`${url}/resource/grouped_light`, {
		headers: header,
	});

	const lightsJson = (await lights.json()) as lightData;

	const data = lightsJson.data.filter((light) => {
		return light.owner.rtype === 'room';
	});

	if (data.length === 1) {
		const retVal = data[0];
		if (retVal) return retVal.id;
	}

	return 'fucked';
};

const getScene = async (): Promise<string> => {
	const scene = await fetch(`${url}/resource/scene`, { headers: header });
	const sceneJson = (await scene.json()) as sceneData;

	const torchScene = sceneJson.data.filter(
		(scene) => scene.metadata.name === 'Test Scene 1',
	);

	if (torchScene.length === 1) {
		const retVal = torchScene[0];
		if (retVal) return retVal.id;
	}

	return 'fucked';
};

export const flickerNotification = async () => {
	const light = await getLights();
	const scene = await getScene();

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/scene/${scene}`, {
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

export const turnOffTorch = async () => {
	const light = await getLights();

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/grouped_light/${light}`, {
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

	await fetch(`${url}/resource/scene/${scene}`, {
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
