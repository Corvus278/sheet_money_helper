import { botLaunch } from './bot/index';
import { startTest } from './bot/test';
require('dotenv').config();

main();

function main() {
	botLaunch();

	// startTest();
}
