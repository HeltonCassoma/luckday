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
    }

    // Usar delegação de eventos para garantir que o link "toggle-form" sempre funcione
    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "toggle-form") {
            toggleForm(event);
        }
    });

    // Processar Cadastro e Login
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();

        try {
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;

            console.log("Email inserido:", email);
            console.log("Senha inserida:", password);

            if (formTitle.textContent === "Cadastro") {
                // Verificar se o usuário já está cadastrado
                let users = JSON.parse(localStorage.getItem("users")) || [];
                let userExists = users.some(user => user.email === email);

                if (userExists) {
                    alert("Este e-mail já está cadastrado.");
                    return;
                }

                // CADASTRO: Salvar os dados no localStorage
                let nome = document.getElementById("nome").value;
                let morada = document.getElementById("morada").value;
                let telefone = document.getElementById("telefone").value;
                let nif = document.getElementById("nif").value;
                let dataNascimento = document.getElementById("data_nascimento").value;

                if (email && password && nome && morada && telefone && nif && dataNascimento) {
                    let userData = {
                        nome,
                        email,
                        password,
                        morada,
                        telefone,
                        nif,
                        dataNascimento
                    };

                    users.push(userData);
                    localStorage.setItem("users", JSON.stringify(users));
                    console.log("Usuário cadastrado:", userData);
                    alert("Cadastro realizado com sucesso! Faça login agora.");

                    // Alternar para o formulário de login automaticamente
                    formTitle.textContent = "Login";
                    extraFields.style.display = "none";
                    submitButton.textContent = "Entrar";
                    toggleText.innerHTML = 'Não tem uma conta? <a href="#" id="toggle-form">Cadastre-se</a>';
                } else {
                    alert("Preencha todos os campos obrigatórios.");
                }
            } else {
                // LOGIN: Verificar credenciais
                let users = JSON.parse(localStorage.getItem("users")) || [];
                console.log("Usuários armazenados:", users);

                let user = users.find(user => user.email === email && user.password === password);
                console.log("Usuário encontrado:", user);

                if (user) {
                    // Salvar flag de autenticação no sessionStorage
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("loggedUser", JSON.stringify(user));

                    alert("Login bem-sucedido! Redirecionando...");
                    window.location.href = "home.html"; // Redireciona para a página principal
                } else {
                    alert("E-mail ou senha incorretos.");
                }
            }
        } catch (error) {
            console.error("Erro durante o processamento do formulário:", error);
            alert("Ocorreu um erro, por favor tente novamente.");
        }
    });

    // Verificar se o usuário está logado ao carregar a página
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        // Se estiver logado, redirecionar para a página principal
        window.location.href = "home.html";
    } else {
        // Caso contrário, exibir o formulário de login
        formTitle.textContent = "Login";
        extraFields.style.display = "none";
        submitButton.textContent = "Entrar";
        toggleText.innerHTML = 'Não tem uma conta? <a href="#" id="toggle-form">Cadastre-se</a>';
    }
});
