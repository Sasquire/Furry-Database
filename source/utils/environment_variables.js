import dotenv from 'dotenv';

class EnvironmentVariables {
	static variables = {};

	static get all () {
		if (Object.keys(EnvironmentVariables.variables).length === 0) {
			dotenv.config({
				path: '/source/secrets.env', // TODO make this work in a not-docker environment
				processEnv: EnvironmentVariables.variables
			});
		}

		return EnvironmentVariables.variables;
	}
}

export default EnvironmentVariables.all;
