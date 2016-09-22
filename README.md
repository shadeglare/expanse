Expanse
===========

[![Version](http://img.shields.io/npm/v/expanse.svg)](https://www.npmjs.org/package/expanse)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![Downloads](http://img.shields.io/npm/dm/expanse.svg)](https://npmjs.org/package/expanse)
[![Downloads](http://img.shields.io/npm/dt/expanse.svg)](https://npmjs.org/package/expanse)

A simple HTML DOM builder based on the native DOM API.
Compatible with TypeScript commonjs module resolution.

Install with npm:

```sh
npm install --save expanse
```

## Usage

Here's an example how to use the library (in TypeScript):

```js
import { h1, div, p, a, input } from "expanse";

window.onload = () => {
    console.log("welcome to expanse");

    let title = div().className("title").text("Value:");
    let value = div().className("value").text("0");
    let click =  e => {
        e.preventDefault();
        alert("click");
    };
    let link = a().attr("href", "#").text("link").on("click", click);
    let data = input().on("input", e => {
        console.log(e.target["value"]);
    });
    let block = div([title, value], link, data).className("block").appendTo(document.body);

    let x = 0;

    console.log(block.css("display"));

    setInterval(() => {
        x++;
        value.text(x.toFixed(0));

        if (x === 10) {
            value.detach();
            title.removeClassName();
            link.off("click", click);
        }
    }, 200);
};
```

## License

[MIT](LICENSE)
