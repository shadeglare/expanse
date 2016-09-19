export function isUndefined(value: any): value is undefined {
    return typeof(value) === typeof(undefined);
}

export function isString(value: any): value is string {
    return typeof(value) === "string";
}
