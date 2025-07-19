
document.getElementById("nav-icon-click").onclick = menuFunction;

function menuFunction() {
    var x = document.getElementById("main-menu");
    console.log(x)
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}