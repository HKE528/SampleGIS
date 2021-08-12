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

export {
    allBtnUnactive,
    btnChanger
}