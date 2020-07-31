const buttonSearch = document.querySelector("#page-home main a");

const modal = document.querySelector("#modal");

const closeModal = document.querySelector("#modal .header a");

// Outra possibilidade, utilizando o toggle
// const handleModal = () => modal.classList.toggle("hide");
buttonSearch.addEventListener("click", () => {
    // handleModal()
    modal.classList.remove("hide");
})

closeModal.addEventListener("click", () => {
    // handleModal()
    modal.classList.add("hide");
})