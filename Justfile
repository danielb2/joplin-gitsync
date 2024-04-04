# run the dev version of joplin
run:
    npm run dist && /Applications/Joplin.app/Contents/MacOS/Joplin --env dev

# run the dev version of joplin with the dev tools open
debug:
    npm run dist && /Applications/Joplin.app/Contents/MacOS/Joplin --env dev --open-dev-tools --debug --log-level debug

# update the generator and update the joplin plugin
update:
    npm install -g yo generator-joplin
    npm run update

# publish the plugin to npm
publish:
    npm publish
