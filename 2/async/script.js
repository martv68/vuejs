function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

let activeModalResolver = null;
let cachedImageUrls = null;
let cachedImageUrlsPromise = null;

function closeInputModal(overlay, result) {
    if (!activeModalResolver) {
        return;
    }

    const resolver = activeModalResolver;
    activeModalResolver = null;
    overlay.style.display = "none";
    resolver(result);
}

function bindInputModalEvents(overlay) {
    const input = overlay.querySelector("#input-modal-field");
    const okBtn = overlay.querySelector("#input-modal-ok");
    const cancelBtn = overlay.querySelector("#input-modal-cancel");

    okBtn.addEventListener("click", () => {
        closeInputModal(overlay, { cancelled: false, value: input.value });
    });

    cancelBtn.addEventListener("click", () => {
        closeInputModal(overlay, { cancelled: true, value: null });
    });
}

function ensureInputModal() {
    if (document.getElementById("input-modal-overlay")) {
        return;
    }

    const style = document.createElement("style");
    style.textContent = `
        #input-modal-overlay {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.2);
        }
        #input-modal-box {
            padding: 12px;
            background: #fff;
        }
        #input-modal-title {
            margin: 0 0 8px;
        }
        #input-modal-field {
            width: 100%;
            margin: 0 0 8px;
            box-sizing: border-box;
        }
        #input-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }
        .task-block {
            margin-top: 16px;
            padding: 12px;
            border: 1px solid #d0d0d0;
        }
        .task-block h3 {
            margin: 0 0 12px;
        }
        .task-images {
            display: flex;
            flex-wrap: wrap;
        }
    `;

    const overlay = document.createElement("div");
    overlay.id = "input-modal-overlay";
    overlay.innerHTML = `
        <div id="input-modal-box">
            <h2 id="input-modal-title"></h2>
            <input id="input-modal-field" type="text" />
            <div id="input-modal-actions">
                <button id="input-modal-cancel" type="button">Cancel</button>
                <button id="input-modal-ok" type="button">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.head.appendChild(style);
    bindInputModalEvents(overlay);
}

function showInputModal(title, placeholder) {
    ensureInputModal();

    const overlay = document.getElementById("input-modal-overlay");
    const titleEl = document.getElementById("input-modal-title");
    const input = document.getElementById("input-modal-field");

    titleEl.textContent = title;
    input.value = "";
    input.placeholder = placeholder || "";
    overlay.style.display = "flex";

    setTimeout(() => {
        input.focus();
    }, 0);

    return new Promise((resolve) => {
        activeModalResolver = resolve;
    });
}

async function collectInputs(label, placeholder) {
    const values = [];

    for (let i = 0; i < 5; i++) {
        const result = await showInputModal(`Введите ${label} ${i + 1} из 5`, placeholder);

        if (result.cancelled) {
            return null;
        }

        values.push(result.value);
    }

    return values;
}

async function getImageUrls() {
    if (cachedImageUrls !== null) {
        return cachedImageUrls;
    }

    if (!cachedImageUrlsPromise) {
        cachedImageUrlsPromise = collectInputs("URL картинки", "https://...");
    }

    cachedImageUrls = await cachedImageUrlsPromise;
    return cachedImageUrls;
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            img.style.maxWidth = "180px";
            img.style.maxHeight = "180px";
            img.style.objectFit = "contain";
            img.style.margin = "6px";
            resolve(img);
        };
        img.onerror = () => reject(new Error("Can't load image"));
        img.src = url;
    });
}

function createErrorParagraph() {
    const p = document.createElement("p");
    p.textContent = "Can't load image";
    return p;
}

function getTaskContainer(id, title) {
    let block = document.getElementById(id);

    if (!block) {
        block = document.createElement("section");
        block.id = id;
        block.className = "task-block";
        block.innerHTML = `
            <h3>${title}</h3>
            <div class="task-images"></div>
        `;
        document.getElementById("output").appendChild(block);
    }

    return block.querySelector(".task-images");
}

function resetTaskBlocks() {
    clearOutput();
    getTaskContainer("task2-block", "Задание 2. Promise по порядку");
    getTaskContainer("task3-block", "Задание 3. Promise без порядка");
    getTaskContainer("task4-ordered-block", "Задание 4. async/await по порядку");
    getTaskContainer("task4-unordered-block", "Задание 4. async/await без порядка");
}

function showVisitCountOnLoad() {
    const count = Number(localStorage.getItem("page_load_count") || 0) + 1;
    localStorage.setItem("page_load_count", count);
    alert(`Вы загрузили/обновили эту страницу ${count} раз(а).`);
}

function task1() {
    const count = localStorage.getItem("page_load_count") || 0;
    alert(`Текущее количество загрузок страницы: ${count}`);
}

function task2() {
    const output = getTaskContainer("task2-block", "Задание 2. Promise по порядку");

    getImageUrls().then((urls) => {
        if (urls === null) {
            return;
        }

        output.innerHTML = "";

        Promise.all(
            urls.map((url) => loadImage(url).catch(() => createErrorParagraph()))
        ).then((elements) => {
            elements.forEach((element) => output.appendChild(element));
        });
    });
}

function task3() {
    const output = getTaskContainer("task3-block", "Задание 3. Promise без порядка");

    getImageUrls().then((urls) => {
        if (urls === null) {
            return;
        }

        output.innerHTML = "";

        urls.forEach((url) => {
            loadImage(url)
                .then((img) => output.appendChild(img))
                .catch(() => output.appendChild(createErrorParagraph()));
        });
    });
}

async function task4_ordered() {
    const output = getTaskContainer("task4-ordered-block", "Задание 4. async/await по порядку");
    const urls = await getImageUrls();

    if (urls === null) {
        return;
    }

    output.innerHTML = "";

    for (const url of urls) {
        try {
            const img = await loadImage(url);
            output.appendChild(img);
        } catch {
            output.appendChild(createErrorParagraph());
        }
    }
}

async function task4_unordered() {
    const output = getTaskContainer("task4-unordered-block", "Задание 4. async/await без порядка");
    const urls = await getImageUrls();

    if (urls === null) {
        return;
    }

    output.innerHTML = "";

    urls.forEach(async (url) => {
        try {
            const img = await loadImage(url);
            output.appendChild(img);
        } catch {
            output.appendChild(createErrorParagraph());
        }
    });
}

async function checkIp(ip) {
    const response = await fetch(`https://geoiplookup.io/api/${ip}`);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return response.json();
}

async function task5() {
    const blockedCountries = [
        "Russia",
        "Belarus",
        "Afghanistan",
        "China",
        "Venezuela",
        "Iran"
    ];

    const ips = await collectInputs("IP-адрес", "8.8.8.8");

    if (ips === null) {
        return;
    }

    try {
        const results = await Promise.all(ips.map((ip) => checkIp(ip)));
        const hasBlocked = results.some((item) =>
            blockedCountries.includes(item.country_name)
        );

        if (hasBlocked) {
            alert("Our services are not available in your country");
        } else {
            alert("Welcome to our website!");
        }
    } catch (error) {
        alert("Ошибка при проверке IP-адресов.");
        console.error(error);
    }
}

async function startImageTasks() {
    resetTaskBlocks();

    const urls = await getImageUrls();
    if (urls === null) {
        return;
    }

    task2();
    task3();
    task4_ordered();
    task4_unordered();
}

window.onload = () => {
    showVisitCountOnLoad();
    startImageTasks();
};
