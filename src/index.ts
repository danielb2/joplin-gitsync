import joplin from 'api';
import { ToolbarButtonLocation, SettingItemType, ModelType } from 'api/types';
import { promises as fs } from 'fs';
import git from 'isomorphic-git'
// import * as git from 'isomorphic-git'

// useful links
// https://github.com/isomorphic-git/isomorphic-git
const internals = {
	registerSettings: null,
	cloneOrPullRepo: null,
	settings: null,
};

internals.cloneOrPullRepo = async function() {
	const syncDir =  internals.settings['sync.2.path'];
	if (!syncDir) {
		return
	}
	await git.clone({
		fs: fs,
		http: require('isomorphic-git/http/node'),
		dir: syncDir,
		url: await joplin.settings.value('gitRepo'),
		ref: await joplin.settings.value('branch'),
		depth: 1,
		singleBranch: true
	})
	console.info('cloned repo');
}

internals.registerSettings = async function() {

	await joplin.settings.registerSection('GitSync', {
		label: 'GitSync',
		iconName: 'fas fa-calendar-day',
	});


	await joplin.settings.registerSettings({
		'gitRepo': {
			value: '',
			type: SettingItemType.String,
			section: 'GitSync',
			public: true,
			label: 'git repo',
			description: 'can be a local or remote git repo'
		},
		'branch': {
			value: 'main',
			type: SettingItemType.String,
			section: 'GitSync',
			public: true,
			label: 'branch',
			description: 'branch to use. default is main'
		},
	});
};

joplin.plugins.register({
	onStart: async function() {

		await internals.registerSettings();
		// eslint-disable-next-line no-console
		const profileDir = await joplin.settings.globalValue('profileDir');
		const settingsData = await fs.readFile(`${profileDir}/settings.json`, 'utf8');
		internals.settings = JSON.parse(settingsData);
		await internals.cloneOrPullRepo();
		console.info(internals.settings['sync.2.path']);
		console.info('Plugin started!');
	},
});
