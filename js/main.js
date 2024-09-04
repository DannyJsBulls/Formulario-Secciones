let currentTab = 0; // Tab actual
showTab(currentTab); // Mostrar la pestaña actual

function showTab(n) {
    // Esta función mostrará la pestaña especificada del formulario
    const tabs = document.getElementsByClassName("tab");
    tabs[n].style.display = "block";

    // Actualizar los botones Anterior/Siguiente
    document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
    document.getElementById("nextBtn").textContent = n === (tabs.length - 1) ? "Registrar" : "Siguiente";

    // Actualizar la barra de progreso
    updateProgress(n);
}

function nextPrev(n) {
    const tabs = document.getElementsByClassName("tab");

    // Salir de la función si algún campo en la pestaña actual no es válido
    if (n === 1 && !validateForm()) return false;

    // Ocultar la pestaña actual
    tabs[currentTab].style.display = "none";

    // Incrementar o disminuir la pestaña actual
    currentTab += n;

    // Si ha llegado al final del formulario
    if (currentTab >= tabs.length) {
        document.getElementById("regForm").submit();
        return false;
    }

    // Mostrar la pestaña correcta
    showTab(currentTab);
}

function validateForm() {
    let valid = true;
    const currentTabFields = document.getElementsByClassName("tab")[currentTab].getElementsByTagName("input");

    for (let field of currentTabFields) {
        if (field.value === "") {
            field.classList.add("invalid");
            valid = false;
        } else {
            field.classList.remove("invalid");
        }
    }

    return valid;
}

function updateProgress(n) {
    const steps = document.getElementsByClassName("step");
    const progress = document.querySelector(".progress");

    // Actualizar la barra de progreso
    progress.style.width = ((n + 1) / steps.length) * 100 + "%";

    // Actualizar las clases de las etapas
    for (let i = 0; i < steps.length; i++) {
        if (i <= n) {
            steps[i].classList.add("active");
        } else {
            steps[i].classList.remove("active");
        }
    }
}
