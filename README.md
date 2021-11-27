[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fsculpt0r%2Fvim-browser-extension%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/sculpt0r/vim-browser-extension/master)

# vim-browser-extension
Browser extension to allow vim keys for text editing.

# why it is different than other vim plugins
Other famous plugins use vim keys to navigate in browser / web page. This plugin allows to use vim keys in text editing inputs!

# enable vim keys
Plugins functionality can be toggled with special key combination:
- `alt` + `v` on windows / linux
- `right option` + `left cmd` on macOS

It is because, sometimes you may don't want to `vim-typer` interferre with other vim like plugins.

Please look at the indicator. When it becomes green: the plugin functions are available.

# supported keys
Currently `vim-typer` supports:
- `h`,`j`,`k`,`l`
- `e` has early support
- more are planned

Please, report any malfunctions to the bug@vim-typer.com

# Development

work with `src` and `tests` folder. Everything is bundled to the `src_js` directory with rollup `npx rollup --config`
