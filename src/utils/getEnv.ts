export const getEnv = (envName: string): string => {
	const env = process.env[envName];

	if (!env) {
		throw Error(`Env ${envName} not found!`);
	} else {
		return env;
	}
};
