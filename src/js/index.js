import { db } from "./db.js";

console.log(db.editoriales);
const $d = document;
const selector = (tag, ref = $d) => ref.querySelector(`${tag}`);
const selectorAll = (tag, ref = $d) => ref.querySelectorAll(`${tag}`);
const themeBtn = selector("[theme-btn]");
const pageBody = selector("body");

const menuBtns = selectorAll("[menu-btn]");
const submenuBtns = selectorAll("[submenu-btn]");
const sectionWindows = selectorAll("[window]");
const sectionSubindows = selectorAll("[subwindow]");

const dialogWindow = selector("dialog");
const menuActionBtns = selectorAll("[action-menu]");
const serachResult = selector('[selector="search_result"]');
const itemCardTemplate = selector("[template-ref='item_card']").content;
const editionCardTemplate = selector("[template-ref='edition_card']").content;
const editionPillTemplate = selector("[template-ref='edition_pill']").content;
const resultEditionsContainer = selector('[cards-container="results_editions"]');
const resultitemsContainer = selector('[cards-container="results_items"]');
const searchInput = selector('[selector="search_input"]');
const searchBtn = selector("[search-btn]");

const noImgLink = "./src/img/no_img.jpg";
const noEditionData = {
    name: "Indefinida",
    edition: "Indefinida",
    image: noImgLink,
    description: "Indefinida",
    code: "000000",
};
const html5QrCode = new Html5Qrcode("reader");

const scannerConfig = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.RSS_14,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.RSS_EXPANDED,
    ],
};
const deleteChildElements = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const sanitizeInput = (inputValue) => {
    const div = document.createElement("div");
    div.textContent = inputValue;
    return div.innerHTML;
};
const resetWindows = () => {
    menuBtns.forEach((btn) => btn.setAttribute("btn-active", "false"));
    sectionWindows.forEach((window) => {
        window.setAttribute("show", "false");
        window.setAttribute("visible", "false");
    });
    if (html5QrCode.isScanning === true) {
        html5QrCode.stop();
    }
};
const resetSubwindows = () => {
    submenuBtns.forEach((btn) => btn.setAttribute("btn-active", "false"));
    sectionSubindows.forEach((subwindow) => {
        subwindow.setAttribute("show", "false");
        subwindow.setAttribute("visible", "false");
    });
};
const showItemData = (editorialName, item) => {
    console.log(item);
    const windowTarget = selector('[window="item"]');
    const cardsContainer = selector("[cards-container='item_editions']");
    selector("[selector='name']", windowTarget).textContent = item.name;
    const counter = selector("[selector='count']", windowTarget);
    deleteChildElements(cardsContainer);
    let count = 0;
    item.editions.forEach((edition) => {
        count++;
        console.log(edition);
        createEditionCard(editorialName, edition, item.name, cardsContainer);
    });
    counter.textContent = count;
};
const showEditionData = (editorialName, itemName, data) => {
    resetWindows();
    const resultWindow = selector('[window="edition"]');
    resultWindow.setAttribute("show", "true");
    setTimeout(() => {
        resultWindow.setAttribute("visible", "true");
    }, 100);
    const name = selector('[result="name"]');
    const description = selector('[result="description"]');
    const image = selector('[result="image"]');
    const edition = selector('[result="edition"]');
    const editorial = selector('[result="editorial"]');
    const code = selector('[result="code"]');
    name.textContent = itemName;
    description.textContent = data.description;
    edition.textContent = data.edition;
    code.textContent = data.code;
    image.src = data.image;
    editorial.textContent = editorialName;
};
const onScanSuccess = (decodedText, decodedResult) => {
    console.log(decodedText);

    let itemSearched;
    /* selector("selector='scan_'").textContent = `${decodedText}`; */
    console.log(`Code matched = ${decodedText}`, decodedResult);
    db.editoriales.forEach((editorial) => {
        editorial.items.forEach((item) => {
            item.editions.forEach((edition) => {
                if (edition.code === decodedText) {
                    console.log(edition);
                    showEditionData(editorial.name, item.name, edition);
                    console.log(edition.code, decodedText);
                    console.log(edition);
                    console.log("existe");
                } else {
                    console.log("existe");
                }
            });
        });
    });
};

const changeTheme = () => {
    const state = pageBody.getAttribute("color-scheme");
    selectorAll(`[theme-icon]`).forEach((icon) => {
        icon.getAttribute("theme-icon") === state ? icon.setAttribute("show", "false") : icon.setAttribute("show", "true");
    });
    pageBody.setAttribute("color-scheme", pageBody.getAttribute("color-scheme") === "dark" ? "light" : "dark");
};

const windowActions = (target, state, container) => {
    console.log(target, state, container);
    const targetWindow = selector(`[${target}="${container}"]`);
    console.log(targetWindow);
    switch (state) {
        case "true":
            targetWindow.setAttribute("visible", "false");
            setTimeout(() => {
                targetWindow.setAttribute("show", "false");
            }, 500);
            break;
        case "false":
            targetWindow.setAttribute("show", "true");
            setTimeout(() => {
                targetWindow.setAttribute("visible", "true");
            }, 100);
            break;
    }
};
submenuBtns.forEach((submenuBtn) => {
    submenuBtn.addEventListener("click", () => {
        const target = submenuBtn.getAttribute("submenu-btn");
        const currentState = submenuBtn.getAttribute("btn-active");
        if (currentState !== "true") {
            resetSubwindows();
            windowActions("subwindow", currentState, target);
            submenuBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
        }
    });
});
menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        const target = menuBtn.getAttribute("menu-btn");
        const currentState = menuBtn.getAttribute("btn-active");
        if (currentState !== "true") {
            resetWindows();

            if (target === "scan") {
                html5QrCode.start({ facingMode: "environment" }, scannerConfig, onScanSuccess);
            }

            windowActions("window", currentState, target);
            menuBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
        }
    });
});

menuActionBtns.forEach((menuActionBtn) => {
    menuActionBtn.addEventListener("click", () => {
        const currentState = menuActionBtn.getAttribute("btn-active");
        const target = menuActionBtn.getAttribute("action-menu");
        const targetMenu = selector(`[menu-container="${target}"]`);
        switch (currentState) {
            case "true":
                targetMenu.setAttribute("visible", "false");
                setTimeout(() => {
                    targetMenu.setAttribute("show", "false");
                }, 500);
                break;
            case "false":
                targetMenu.setAttribute("show", "true");
                setTimeout(() => {
                    targetMenu.setAttribute("visible", "true");
                }, 100);
                break;
        }
        menuActionBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
    });
});

const createEditionCard = (editorialName, data, itemName, container) => {
    /* console.log(data); */
    const newEdition = editionCardTemplate.cloneNode(true);
    const card = selector('[selector="card"]', newEdition);
    const edition = selector('[selector="edition"]', newEdition);
    const code = selector('[selector="code"]', newEdition);
    const name = selector('[selector="name"]', newEdition);
    const description = selector('[selector="description"]', newEdition);
    const image = selector('[selector="image"]', newEdition);
    const btn = selector(".btn", newEdition);
    const editorialImage = selector('[selector="editorial_image"]', newEdition);
    code.textContent = data.code;
    edition.textContent = data.edition;
    name.textContent = itemName;
    description.textContent = data.description;
    /* console.log(data.image); */
    image.src = data.image === "" ? noImgLink : data.image;
    container.appendChild(newEdition);
    btn.addEventListener("click", () => {
        console.log("click edition");
        showEditionData(editorialName, itemName, data);
    });
};

const createItemCard = (editorialName, item) => {
    const createEditionPill = (ed, container) => {
        const newEdition = editionPillTemplate.cloneNode(true);
        const name = selector('[selector="name"]', newEdition);
        const edition = selector('[selector="edition"]', newEdition);
        const image = selector('[selector="image"]', newEdition);

        console.log(ed);
        image.src = ed.image === "" ? noImgLink : ed.image;

        name.textContent = ed.description;
        edition.textContent = ed.edition;
        container.appendChild(newEdition);
    };
    const newItem = itemCardTemplate.cloneNode(true);
    const card = selector("[card]", newItem);
    const count = selector('[selector="count"]', newItem);
    const name = selector('[selector="name"]', newItem);
    const pillsContainer = selector(".pills_container", newItem);
    const button = selector("button", newItem);
    name.textContent = item.name;
    let thisCount = 0;
    resultitemsContainer.appendChild(newItem);
    console.log(pillsContainer);
    if (item.editions.length >= 3) {
        for (let count = 0; count <= 2; count++) {
            createEditionPill(item.editions[count], pillsContainer, item);
        }
    } else {
        for (let count = 0; count <= item.editions.length - 1; count++) {
            createEditionPill(item.editions[count], pillsContainer, item);
        }
    }

    item.editions.forEach((edition) => {
        thisCount++;
    });
    count.textContent = thisCount;
    button.addEventListener("click", () => {
        resetWindows();
        const target = button.getAttribute("show");
        windowActions("window", "false", target);
        showItemData(editorialName, item);
    });
};
const setSearchStartCards = () => {
    db.editoriales[0].items[0].editions[0];
    const editorial = db.editoriales[0];
    const item = editorial.items[0];
    const edition = item.editions[0];
    showEditionData(item.name, edition);
};
/* setSearchStartCards(); */

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchText = sanitizeInput(searchInput.value.toLowerCase().trim());
    if (!searchText || searchText === "") {
        dialogWindow.setAttribute("accent", "bad");
        selector("[dialog-ref='title']").textContent = "Busqueda Vacia";
        selector("[dialog-ref='description']").textContent = "Necesitas mínimo 3 caracteres para recibir respuestas de búsqueda";
        dialogWindow.showModal();
    } else if (searchText.length <= 2) {
        dialogWindow.setAttribute("accent", "bad");
        selector("[dialog-ref='title']").textContent = "Menos del mínimo";
        selector("[dialog-ref='description']").textContent = "Necesitas mínimo 3 caracteres para recibir respuestas de búsqueda";
        dialogWindow.showModal();
    } else {
        console.log(searchText);
        resetWindows();
        windowActions("window", "false", "search");
        searchBtn.setAttribute("btn-active", "true");
        let itemsCount = 0;
        let editionsCount = 0;
        searchInput.value = null;
        deleteChildElements(resultEditionsContainer);
        deleteChildElements(resultitemsContainer);

        db.editoriales.forEach((editorial) => {
            editorial.items.forEach((item) => {
                if (item.name.toLowerCase().includes(searchText)) {
                    createItemCard(editorial.name, item);
                    itemsCount++;
                }
            });
            editorial.items.forEach((item) => {
                item.editions.forEach((edition) => {
                    if (edition.description.toLowerCase().includes(searchText)) {
                        console.log(searchText, edition.description.toLowerCase());

                        createEditionCard(editorial.name, edition, item.name, resultEditionsContainer);
                        editionsCount++;
                    }
                });
            });
        });

        selector('[count="items"]', selector("[submenu-btn='results_items']")).textContent = itemsCount;
        selector('[count="editions"]', selector("[submenu-btn='results_editions']")).textContent = editionsCount;
    }
});

themeBtn.addEventListener("click", changeTheme);
selector("[close-modal-btn]").addEventListener("click", () => {
    selector(`[close-modal-window]`).close();
});
