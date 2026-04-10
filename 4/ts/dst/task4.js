"use strict";
function distance(a, b, c, d) {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
    }
    if (typeof a === "object" && typeof b === "object") {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    throw new Error("Неверные аргументы функции distance");
}
const dist1 = distance(0, 0, 3, 4);
const dist2 = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
console.log(`Distance 1: ${dist1}`);
console.log(`Distance 2: ${dist2}`);
