function allBtnUnactive(btnList) {
    btnList.forEach(it => {
        it.classList.remove("active");
    });
}

function btnChanger(btnList, curBtn) {
    btnList.forEach(it => {
        if (it != curBtn) it.classList.remove("active");
    });

    curBtn.classList.toggle("active")
}

function setBtnsEventHandeler(list, handler) {
    list.forEach(it => {
        it.addEventListener("click", handler);
    })
}

export {
    allBtnUnactive,
    btnChanger,
    setBtnsEventHandeler
}