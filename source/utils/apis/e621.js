import E621APIRAW from './e621.raw.node.cjs';
import environment_variables from './../environment_variables.js';
const { E621API } = E621APIRAW; // Because CommonJS Module

const e621 = new E621API(
	environment_variables.E621_USER_AGENT ?? 'Furry Database Backup Tool (created by idem)',
	environment_variables.E621_USER_NAME,
	environment_variables.E621_API_KEY
);

export default e621;
