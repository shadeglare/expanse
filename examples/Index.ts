import { h1, div, a, input } from "./../src/Html";

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