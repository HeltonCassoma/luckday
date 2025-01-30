// Inicie o Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    databaseURL: "seu-database-url",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-sender-id",
    appId: "seu-app-id"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos
    const toggleForm = document.getElementById("toggle-form");
    const formTitle = document.getElementById("form-title");
    const extraFields = document.getElementById("extra-fields");
    const submitButton = document.getElementById("submit-button");
    const authForm = document.getElementById("auth-form");

    // Variáveis para controlar o estado do formulário
    let isRegistering = false;

    // Função para alternar entre login e cadastro
    toggleForm.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o link de recarregar a página
        isRegistering = !isRegistering; // Alterna o estado (login/cadastro)

        console.log("Alternando para:", isRegistering ? "Cadastro" : "Login");

        if (isRegistering) {
            formTitle.textContent = "Cadastro";
            submitButton.textContent = "Cadastrar";
            extraFields.style.display = "block"; // Exibe os campos extras de cadastro
        } else {
            formTitle.textContent = "Login";
            submitButton.textContent = "Entrar";
            extraFields.style.display = "none"; // Oculta os campos extras de cadastro
        }
    });

    // Evento para enviar o formulário
    authForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Captura os dados do formulário
        const email = isRegistering ? document.getElementById("cadastro-email").value : document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        console.log("Enviando dados: ", email, password); // Depuração para verificar os dados do formulário

        if (isRegistering) {
            // Ação de cadastro
            console.log("Cadastrando usuário:", email, password);
            
            // Cadastro no Firebase
            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    console.log("Usuário cadastrado:", userCredential.user);
                    // Ações pós-cadastro, como redirecionar ou exibir mensagem
                })
                .catch(error => {
                    console.error("Erro no cadastro:", error.message);
                });
        } else {
            // Ação de login
            console.log("Logando usuário:", email, password);

            // Login no Firebase
            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    console.log("Usuário logado:", userCredential.user);
                    // Ações pós-login, como redirecionar ou exibir mensagem
                })
                .catch(error => {
                    console.error("Erro no login:", error.message);
                });
        }
    });
});
