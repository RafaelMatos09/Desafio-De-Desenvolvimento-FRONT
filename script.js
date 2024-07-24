function showMessage(message, type) {
    const messageDiv = $('#message');
    messageDiv.removeClass().addClass(`alert alert-${type}`).text(message).show();
}

function handleXhrResponse(xhr) {          
    if (xhr.responseJSON) {
        if (typeof xhr.responseJSON === 'object' && xhr.responseJSON.mensagem) {                    
            alert(xhr.responseJSON.mensagem);
        } else {
            alert(JSON.stringify(xhr.responseJSON));
        }
    } else {
        alert(xhr.responseText || 'Erro desconhecido');
    }
}

function registerUser() {            
    const user = {
        nome: $('#firstName').val(),
        sobre_nome: $('#lastName').val(),
        email: $('#email').val(),
        telefone: $('#phone').val(),
        data_nascimento: $('#birthDate').val()
    };
    $.ajax({
        url: 'https://desafio-de-desenvolvimento.onrender.com/usuario', 
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
            console.log('Success:', response);
            showMessage('Usuário cadastrado com sucesso!', 'success');
            listUsers(); 
        },
        error: function(xhr) {                                   
            handleXhrResponse(xhr);                                                        
            showMessage('Erro ao cadastrar usuário.', 'danger');
        }
    });
}

function updateUser() {
    const user = {
        nome: $('#firstName').val(),
        sobre_nome: $('#lastName').val(),
        email: $('#email').val(),
        telefone: $('#phone').val(),
        data_nascimento: $('#birthDate').val()
    };
    const userId = prompt('Digite o ID do usuário para atualizar:');
    $.ajax({
        url: `https://desafio-de-desenvolvimento.onrender.com/usuario/${userId}`, 
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {                    
            showMessage('Usuário atualizado com sucesso!', 'success');
            listUsers();
        },
        error: function(xhr) {                                                       
            handleXhrResponse(xhr);
            showMessage('Erro ao atualizar o usuário.', 'danger');
        }
    });
}

function deleteUser() {
    const userId = prompt('Digite o ID do usuário para deletar:');
    $.ajax({
        url: `https://desafio-de-desenvolvimento.onrender.com/usuario/${userId}`, 
        type: 'DELETE',
        success: function(response) {
            console.log('Success:', response);
            showMessage('Usuário deletado com sucesso!', 'success');
            alert('Usuário deletado com sucesso!');
            listUsers();
        },
        error: function(xhr) {
            handleXhrResponse(xhr);
            showMessage('Erro ao deletar o usuário.', 'danger');
        }
    });
}

function listUsers() {
    $.ajax({
        url: 'https://desafio-de-desenvolvimento.onrender.com/usuario', 
        type: 'GET',
        success: function(users) {                    
            const userTableBody = $('#userTableBody');
            userTableBody.empty();
            users.forEach(user => {
                userTableBody.append(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.sobre_nome}</td>
                        <td>${user.email}</td>
                        <td>${user.telefone}</td>
                        <td>${user.data_nascimento}</td>
                    </tr>
                `);
            });
            showMessage('Lista de usuários carregada com sucesso!', 'success');
        },
        error: function(xhr) {
            handleXhrResponse(xhr);
            showMessage('Erro ao listar usuários.', 'danger');
        }
    });
}

function detailUser() {
    const userId = prompt('Digite o ID do usuário para detalhar:');
    
    $.ajax({
        url: `https://desafio-de-desenvolvimento.onrender.com/usuario/${userId}`, 
        type: 'GET',
        success: function(user) {                    
            console.log(user.nome);
            console.log(user);                                                       
            alert(`Nome: ${user.nome}\nSobrenome: ${user.sobre_nome}\nEmail: ${user.email}\nTelefone: ${user.telefone}\nData de Nascimento: ${user.data_nascimento}`);
            showMessage('Detalhes do usuário carregados com sucesso!', 'success');
        },
        error: function(xhr) {                    
            handleXhrResponse(xhr);
            showMessage('Erro ao detalhar o usuário.', 'danger');
        }
    });
}