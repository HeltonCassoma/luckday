document.addEventListener("DOMContentLoaded", function () {
    let formTitle = document.getElementById("form-title");
    let extraFields = document.getElementById("extra-fields");
    let submitButton = document.getElementById("submit-button");
    let toggleText = document.getElementById("toggle-text");
    let authForm = document.getElementById("auth-form");

    // Função para alternar entre formulário de login e cadastro
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

        // Reatribuir evento ao novo link após troca de HTML
        document.getElementById("toggle-form").addEventListener("click", toggleForm);
    }

    // Iniciar evento na primeira execução
    document.getElementById("toggle-form").addEventListener("click", toggleForm);

    // Processar Cadastro e Login
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        if (formTitle.textContent === "Cadastro") {
            // Verificar se o usuário já está cadastrado
            let storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === email) {
                alert("Este e-mail já está cadastrado.");
                return;
            }

            // CADASTRO: Salvar os dados no localStorage
            let nome = document.getElementById("nome").value;
            let morada = document.getElementById("morada").value;
            let telefone = document.getElementById("telefone").value;
            let nif = document.getElementById("nif").value;
            let dataNascimento = document.getElementById("data_nascimento").value;

            if (email && password) {
                let userData = {
                    nome,
                    email,
                    password,
                    morada,
                    telefone,
                    nif,
                    dataNascimento
                };

                localStorage.setItem("user", JSON.stringify(userData));
                alert("Cadastro realizado com sucesso! Faça login agora.");

                // Alternar para o formulário de login automaticamente
                formTitle.textContent = "Login";
                extraFields.style.display = "none";
                submitButton.textContent = "Entrar";
                toggleText.innerHTML = 'Não tem uma conta? <a href="#" id="toggle-form">Cadastre-se</a>';
                document.getElementById("toggle-form").addEventListener("click", toggleForm);
            } else {
                alert("Preencha todos os campos obrigatórios.");
            }
        } else {
            // LOGIN: Verificar credenciais
            let storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert("Login bem-sucedido! Redirecionando...");
                window.location.href = "home.html"; // Redireciona para a página principal
            } else {
                alert("E-mail ou senha incorretos.");
            }
        }
    });
});
