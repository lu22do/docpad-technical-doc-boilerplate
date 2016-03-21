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

* Finding a toc generator that exports in JSON (to create the scrollspy toc) and behaves the same as the markdown parser in term of slug generation and HTML tag handling.
* Support dynamic expansion of toc with a somewhat ugly workaround by loading the full toc hidden and then showing it with sub-headers hidden.

## Todo

* Fix scroll bar position
* Fix spy scroll position
* Demonstrate split in fragments
* Support scroll of spyscroll (if too big)

## License

MIT
