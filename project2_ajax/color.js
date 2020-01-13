const colorBtn = document.querySelector("#colorBtn");

colorBtn.addEventListener("click", changeColor);

function changeColor() {
    const body = document.body;
    const aLinks = document.querySelectorAll("a");
    const btnName = colorBtn.innerHTML;
    if (btnName === "night") {
        colorBtn.innerHTML = "day";
    } else {
        colorBtn.innerHTML = "night";
    }
    body.classList.toggle("night");
    aLinks.forEach(ele => ele.classList.toggle("night"));
}
