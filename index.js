document.addEventListener("DOMContentLoaded", function () {
    let formTitle = document.getElementById("form-title");
    let extraFields = document.getElementById("extra-fields");
    let submitButton = document.getElementById("submit-button");
    let toggleText = document.getElementById("toggle-text");
    let authForm = document.getElementById("auth-form");

    function toggleForm(event) {
        event.preventDefault();

        if (formTitle.textContent === "Login") {
            formTitle.textContent = "Cadastro";
            extraFields.style.display = "block";
            submitButton.textContent = "Cadastrar";
            toggleText.innerHTML = 'Já tem uma conta? <a href="#" id="toggle-form">Entrar</a>';
        } else {
            formTitle.textContent = "Login";
            extraFields.style.display = "none";
            submitButton.textContent = "Entrar";
            toggleText.innerHTML = 'Não tem uma conta? <a href="#" id="toggle-form">Cadastre-se</a>';
        }
    }

    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "toggle-form") {
            toggleForm(event);
        }
    });

    authForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let email = document.getElementById("login-email").value;
        let senha = document.getElementById("login-password").value;

        if (formTitle.textContent === "Cadastro") {
            let nome = document.getElementById("nome").value;

            let response = await fetch("http://localhost/sorteios/auth.php?action=cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            let data = await response.json();
            alert(data.message);
        } else {
            let response = await fetch("http://localhost/sorteios/auth.php?action=login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            let data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = "/frontend/home.html";  // Redireciona para a home após login
            } else {
                alert(data.message);
            }
        }
    });
});
