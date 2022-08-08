/**
 * @name LastLocation
 * @author Corban-Lee
 * @version 0.0.1
 * @description Better Discord plugin to return the user to the last channel they were in
 */

module.exports = (() => {

    const config = {
        info: {
            name: "LastLocation",
            authors: [{name: "Corban-Lee"}],
            version: "0.0.1",
            description: "Better Discord plugin to return the user to the last channel they were in"
        }
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config; }

        // Meta
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }

        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}

    } : (([Plugin, Api]) => {

        const plugin = (Plugin, Api) => {

            const { DiscordModules } = Api;
            const { NavigationUtils } = DiscordModules;

            return class LastLocation extends Plugin {
                constructor() { super(); }
                
                onStart() {
                    NavigationUtils.transitionTo("984935212632924214");
                }
                onStop() {}

            };

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/