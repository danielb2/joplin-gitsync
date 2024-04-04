import joplin from 'api';
import { promises as fs } from 'fs';


joplin.plugins.register({
	onStart: async function() {
		// eslint-disable-next-line no-console
		const profileDir = await joplin.settings.globalValue('profileDir');
		const settingsData = await fs.readFile(`${profileDir}/settings.json`, 'utf8');
		const settings = JSON.parse(settingsData);
		console.info(settings['sync.2.path']);
		console.info('Plugin started!');
	},
});
