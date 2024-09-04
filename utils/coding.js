export function encode(value) {
    if (!value) return;

    Buffer.from(value).toString("hex");
}

export function decode(value) {
    if (!value) return;

    return Buffer.from(value, "hex").toString();
}
