# Boilerplate for a technical documentation site using [DocPad](https://github.com/bevry/docpad) & [Bootstrap](http://getbootstrap.com)

## Getting Started

1. [Install DocPad](https://github.com/bevry/docpad)

    ```
    npm i -g docpad
    ```

1. Clone the project, resolve dependencies and run the server

	``` bash
	clone https://github.com/lu22do/docpad-technical-doc-boilerplate.git my-website
	cd my-website
    npm i
	docpad run
	```

1. [Open http://localhost:9778/](http://localhost:9778/)

1. Start hacking away by modifying the `src` directory

## Complexities

This boilerplate solves the following complexities:
* Includes a toc on the right side integrated with bootstrap's spyscroll. To do that, it needed a way to generate the toc independently of the markdown file, which is done by using generator that exports in JSON and behaves the same as the markdown parser in term of slug generation and HTML tag handling.
* Supports dynamic expansion of the toc (for level 3 headers) using a workaround by loading the full toc hidden and then showing it with sub-headers hidden.

## Todo

merge changes e.g. permalinks, positions, slugending
remove opentv stuff e.g. adg

* Fix scroll bar position
* Fix spy scroll position
* Demonstrate split in fragments
* Support scroll of spyscroll (if too big)

## License

MIT
