[![CI - test](https://github.com/sculpt0r/vim-browser-extension/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/sculpt0r/vim-browser-extension/actions/workflows/test.yml)

# vim-browser-extension
Browser extension to allow vim keys for text editing.

# why it is different than other vim plugins
Other famous plugins use vim keys to navigate in browser/web page. This plugin allows to use vim keys in text editing inputs!

# enable vim keys
-   `alt` + `v` on windows / linux
-   `Command` + `Control` + `v` on macOS

It is because sometimes you may don't want to `vim-typer` interfere with another vim-like plugin.

Please look at the indicator. When it becomes green: the plugin functions are available.

# supported keys
Currently, `vim-typer` supports:
- `h`,`j`,`k`,`l`
- `e`
- `w` has early support
- more are planned

# Development

work with `src` and `tests` folder. Everything is bundled to the `src_js` directory with rollup `npx rollup --config`
