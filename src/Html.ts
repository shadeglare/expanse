import { isUndefined, isString } from "./Utils";

export interface ITag {
    native: HTMLElement;

    text(): string;
    text(value: string): this;

    val(): string;
    val(value: string | number): this;

    css(): CSSStyleDeclaration;
    css(name: string): string;
    css(name: string, value: string | number): this;
    css(properties: { [key: string]: string | number }): this;

    class(): string;
    class(name: string): this;
    removeClass(): this;

    attr(name: string): string;
    attr(name: string, value: string): this;
    attr(properties: { [key: string]: string }): this;
    removeAttr(name: string): this;

    append(...args: any[]): this;
    appendTo(target: Element): this;
    appendTo(target: ITag): this;
    detach(): this;

    on(event: string, callback: (e: Event) => any): this;
    off(event: string, callback?: (e: Event) => any): this;
}

class Tag implements ITag {
    constructor(private name: string, private namespace?: string) {
        this.element = !!namespace ?
            <HTMLElement>document.createElementNS(namespace, name) :
            document.createElement(this.name);
    }

    public get native() { return this.element; }

    public text(): string;
    public text(value: string): this;
    public text(value?: string): this | string {
        if (isUndefined(value)) {
            return this.element.textContent;
        } else {
            this.element.textContent = value;
            return this;
        }
    }

    public val(): string;
    public val(value: string | number): this;
    public val(value?: string | number): string | this {
        if (isUndefined(value)) {
            return (<HTMLInputElement>this.element).value;
        } else {
            (<HTMLInputElement>this.element).value = isString(value) ? value : value.toString();
            return this;
        }
    }

    public css(): CSSStyleDeclaration;
    public css(name: string): string;
    public css(name: string, value: string | number): this;
    public css(properties: { [key: string]: string | number }): this;
    public css(
        nameOrProperties?: string | { [key: string]: string | number },
        value?: string | number
    ): CSSStyleDeclaration | string | this {
        if (isUndefined(nameOrProperties)) {
            return window.getComputedStyle(this.element);
        } else {
            if (isString(nameOrProperties)) {
                if (isUndefined(value)) {
                    return window.getComputedStyle(this.element)[nameOrProperties];
                } else {
                    this.element.style[nameOrProperties] = isString(value) ? value : value.toString();
                    return this;
                }
            } else {
                Object.keys(nameOrProperties).forEach(x => this.css(x, nameOrProperties[x]));
                return this;
            }
        }
    }

    public class(): string;
    public class(value: string): this;
    public class(value?: string): this | string {
        if (isUndefined(value)) {
            return this.element.className;
        } else {
            this.element.className = value;
            return this;
        }
    }

    public removeClass() {
        this.removeAttr("class");
        return this;
    }

    public attr(name: string): string;
    public attr(name: string, value: string): this;
    public attr(properties: { [key: string]: string }): this;
    public attr(
        nameOrProperties?: string | { [key: string]: string },
        value?: string
    ): this | string {
        if (isUndefined(value)) {
            return this.element.getAttribute(name);
        } else {
            if (isString(nameOrProperties)) {
                this.element.setAttribute(name, value);
            } else {
                Object.keys(nameOrProperties).forEach(x => this.attr(x, nameOrProperties[x]));
            }
            return this;

        }
    }

    public removeAttr(name: string): this {
        this.element.removeAttribute(name);
        return this;
    }

    public append(...args: any[]): this {
        for (let x of args) {
            if (Array.isArray(x)) {
                this.append(...x);
            } else if (x instanceof Tag) {
                x.appendTo(this.element);
            } else {
                let data = isString(x) ? x : x.toString();
                let node = document.createTextNode(data);
                this.element.appendChild(node);
            }
        }
        return this;
    }

    public appendTo(target: Element): this;
    public appendTo(target: Tag): this;
    public appendTo(target: Element | Tag) {
        if (target instanceof Tag) {
            target.element.appendChild(this.element);
        } else {
            target.appendChild(this.element);
        }
        return this;
    }

    public detach(): this {
        let parent = this.element.parentNode;
        if (parent) {
            parent.removeChild(this.element);
        }
        return this;
    }

    public on(event: string, callback: (e: Event) => any): this {
        this.element.addEventListener(event, callback);
        this.eventListeners[event] = this.eventListeners[event] || [];
        this.eventListeners[event].push(callback);
        return this;
    }

    public off(event: string, callback?: (e: Event) => any): this {
        let callbacks = this.removeEventListeners(event, callback);
        callbacks.forEach(x => this.element.removeEventListener(event, x));
        return this;
    }

    private removeEventListeners(event: string, callback?: (e: Event) => any) {
        let callbacks = this.eventListeners[event] || [];
        if (isUndefined(callback)) {
            this.eventListeners[event] = [];
            return callbacks;
        } else {
            let index = callbacks.indexOf(callback);
            if (index !== -1) {
                return callbacks.splice(index, 1);
            } else {
                return [];
            }
        }
    }

    private element: HTMLElement = null;
    private eventListeners: { [event: string]: ((e: Event) => any)[] } = {};
}

export const tag = (name: string, namespace?: string) => (...args: any[]): ITag => {
    let instance = new Tag(name, namespace);
    return instance.append(...args);
};

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export const h1 = tag("h1");
export const h2 = tag("h2");
export const h3 = tag("h3");
export const h4 = tag("h4");
export const h5 = tag("h5");
export const h6 = tag("h6");
export const p = tag("p");
export const div = tag("div");
export const span = tag("span");
export const link = tag("link");
export const a = tag("a");
export const img = tag("img");
export const input = tag("input");
export const option = tag("option");
export const textarea = tag("textarea");
export const button = tag("button");
export const form = tag("form");
export const table = tag("table");
export const thead = tag("thead");
export const tbody = tag("tbody");
export const tfoot = tag("tfoot");
export const tr = tag("tr");
export const th = tag("th");
export const td = tag("td");
export const title = tag("title");
export const time = tag("time");
export const ul = tag("ul");
export const li = tag("li");
export const ol = tag("ol");
