// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNqUV8TmCLS143Rs-Qr-L7Tf_QixNSjeU",
    authDomain: "luckday-7f40b.firebaseapp.com",
    databaseURL: "https://luckday-7f40b-default-rtdb.firebaseio.com",
    projectId: "luckday-7f40b",
    storageBucket: "luckday-7f40b.firebasestorage.app",
    messagingSenderId: "496121680703",
    appId: "1:496121680703:web:af86c842d2b463b90f798a",
    measurementId: "G-0C74SLVF8J"
  };
  
  // Inicializando o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(); // Realtime Database
  
  // Função para adicionar dados ao Firebase
  function adicionarUsuario(nome, email, morada, telefone, nif, dataNascimento) {
    const usuarioRef = database.ref('usuarios'); // Referência para a tabela de usuários
  
    // Adicionando os dados
    usuarioRef.push({
      nome: nome,
      email: email,
      morada: morada,
      telefone: telefone,
      nif: nif,
      data_nascimento: dataNascimento
    }).then(() => {
      alert("Usuário cadastrado com sucesso!");
    }).catch(error => {
      console.error("Erro ao cadastrar usuário: ", error);
    });
  }
  
  // Lidar com o envio do formulário
  document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    authForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const morada = document.getElementById('morada').value;
      const telefone = document.getElementById('telefone').value;
      const nif = document.getElementById('nif').value;
      const dataNascimento = document.getElementById('data_nascimento').value;
  
      // Chamar a função para adicionar o usuário ao Firebase
      adicionarUsuario(nome, email, morada, telefone, nif, dataNascimento);
    });
  });
  