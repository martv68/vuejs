function parseNumberInput(input) {
    if (input === null) return null;
    return input
        .trim()
        .split(/\s+/)
        .map(Number)
        .filter(Number.isFinite);
}

function task1() {
    let input = prompt("Введите натуральные числа через пробел:");
    let arr = parseNumberInput(input);
    if (arr === null) return;
    if (arr.length === 0) {
        alert("Пустой ввод");
        return;
    }

    arr.sort((a, b) => a - b);

    alert("Отсортированный список: " + arr.join(" "));
}

function task2() {
    let input = prompt("Введите натуральные числа через пробел:");
    let arr = parseNumberInput(input);
    if (arr === null) return;
    if (arr.length === 0) {
        alert("Пустой ввод");
        return;
    }

    function modFive(numbers) {
        return numbers.map(num => num % 5);
    }

    alert("Остатки: " + modFive(arr).join(" "));
}

function median(...numbers) {
    numbers.sort((a, b) => a - b);

    let mid = Math.floor(numbers.length / 2);

    if (numbers.length % 2 == 0) {
        return (numbers[mid - 1] + numbers[mid]) / 2;
    }
    return numbers[mid];
}

function task3() {
    let input = prompt("Введите числа через пробел:");
    let arr = parseNumberInput(input);
    if (arr === null) return;

    if (arr.length === 0) {
        alert("Пустой ввод");
        return;
    }

    let result1 = median(...arr);

    let result2 = median.apply(null, arr);

    let result3 = median(arr[0], arr[1], arr[2], arr[3], arr[4]);

    alert(
        "Медиана (через распаковку): " + result1 +
        "\nМедиана (через apply): " + result2 +
        "\nМедиана (через запятую по первым 5 числам): " + result3
    );
}

function task4() {
    let str = prompt("Введите строку из скобок:");
    if (str === null) return;
    let stack = [];

    for (let char of str) {
        if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) {
                alert("Неправильная");
                return;
            }
            stack.pop();
        }
    }

    if (stack.length === 0) {
        alert("Правильная");
    } else {
        alert("Неправильная");
    }
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    let copy;

    if (Array.isArray(obj)) {
        copy = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
    } else {
        copy = {};
        for (let key in obj) {
            if (Object.hasOwn(obj, key) 
                && typeof obj[key] !== "function") {
                copy[key] = deepCopy(obj[key]);
            }
        }
    }
    return copy;
}

function task5() {
    let original = {
        a: 1,
        b: { c: 2 },
        d: [1, 2, { e: 3 }],
        method: function () { return; }
    };

    let cloned = deepCopy(original);

    alert("Объект успешно скопирован.");

    console.log("Original:", original);
    console.log("Clone:", cloned);
}
document.getElementById("task1Btn")?.addEventListener("click", task1);
document.getElementById("task2Btn")?.addEventListener("click", task2);
document.getElementById("task3Btn")?.addEventListener("click", task3);
document.getElementById("task4Btn")?.addEventListener("click", task4);
document.getElementById("task5Btn")?.addEventListener("click", task5);
