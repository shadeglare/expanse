import { h1, div, a, input } from "./../src/Html";

window.onload = () => {
    console.log("welcome to expanse");

    let title = div().class("title").text("Value:");
    let value = div().class("value");
    let click =  e => {
        e.preventDefault();
        alert("click");
    };
    let link = a().attr("href", "#").text("link").on("click", click);
    let data = input().on("input", e => {
        console.log(e.target["value"]);
    }).val(0);
    let block = div([title, value], link, data).class("block").appendTo(document.body);

    let x = 0;

    console.log(block.css("display"));

    setInterval(() => {
        x++;
        value.text(x.toFixed(0));

        if (x === 10) {
            value.detach();
            title.removeClass();
            link.off("click", click);
        }
    }, 200);
};
