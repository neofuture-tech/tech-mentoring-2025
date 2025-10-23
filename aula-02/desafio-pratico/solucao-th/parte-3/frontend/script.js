// acessa o html pelo document, sabendo que esse arquivo já foi declarado no html
document.addEventListener('DOMContentLoaded', () => {                                       //carrega o código do js no momento em que o html termina de carregar
    
    const tabelaCorpo = document.getElementById('lista-empresas-corpo');                    //pegamos várias caixas do html definidos pelo ID

    const modal = document.getElementById('modal-edicao');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const formEditar = document.getElementById('form-editar-empresa');
    const inputEditId = document.getElementById('edit-empresa-id');
    const inputEditNome = document.getElementById('edit-nome-empresa');
    const inputEditFuncionarios = document.getElementById('edit-qtd-funcionarios');
    const form = document.getElementById('form-adicionar-empresa');
    const inputNome = document.getElementById('nome-empresa');
    const inputFuncionarios = document.getElementById('qtd-funcionarios');

    const apiUrl = 'http://localhost:3000/api/empresas';                                    // define a URL base da nossa API (onde o backend está rodando)

    // adiciona um "ouvinte" para o evento de "submit" do formulário (C do CRUD)
    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();                                                            // prevenir o comportamento padrão do formulário (que é recarregar a página)

        const nome = inputNome.value;                                                       // pega os valores dos inputs
        const funcionarios = inputFuncionarios.value;

        if (!nome || !funcionarios) {                                                       // se não tiver vazio
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaEmpresa = {                                                               // monta o objeto para enviar à API 
            nome: nome,
            funcionarios: parseInt(funcionarios)
        };

        try {                        
            const response = await fetch(apiUrl, {                                          // envia a requisição POST para a API usando fetch()
                method: 'POST',                                                             // o método HTTP
                headers: {
                    'Content-Type': 'application/json',                                     // avisa que estamos enviando JSON
                },
                body: JSON.stringify(novaEmpresa)                                           // converte nosso objeto JS em string JSON
            });

            if (response.status === 201) {                                                  // se deu tudo certo, apagamos a lista e recarregamos a página para atualizar
                inputNome.value = '';
                inputFuncionarios.value = '';

                await carregarEmpresas();

            } else {
                alert('Erro ao adicionar empresa.');
            }
        } catch (error) {                                                                   // lida com erros de rede
            console.error('Erro ao enviar dados:', error);
            alert('Erro de conexão. Verifique se a API está rodando.');
        }
    }); 

    // DELETE (D do CRUD) e início UPDATE (U do CRUD)
    tabelaCorpo.addEventListener('click', async (evento) => {                               // trackeia os eventos que ousuário fe no html, procurando um click

        if (evento.target.classList.contains('btn-deletar')) {                              // se a ação feita tiver sido deletar
            const confirmar = confirm('Tem certeza que deseja deletar esta empresa?');      // pedimos a confirmação
            if (confirmar) {
                const id = evento.target.dataset.id;                                        // pega o id
                try {
                    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });  // tentamos deletar
                    if (response.status === 204) {
                        await carregarEmpresas();
                    } else {
                        alert('Erro ao deletar empresa.');
                    }
                } catch (error) {
                    console.error('Erro ao deletar:', error);
                    alert('Erro de conexão. Verifique se a API está rodando.');             // se não funcionar, deleta
                }
            }
        }

        if (evento.target.classList.contains('btn-editar')) {                               // se selecionar o botão de editar
            const id = evento.target.dataset.id;

            const linha = evento.target.closest('tr');                                      // pegamos o tr mais perto(os dados atuais da linha)

            const nomeAtual = linha.children[0].textContent;                                // pega o texto da primeira célula <td> e da segunda <td>
            const funcionariosAtual = linha.children[1].textContent;

            inputEditId.value = id;                                                         // preenche os campos invisíveis do modal
            inputEditNome.value = nomeAtual;
            inputEditFuncionarios.value = funcionariosAtual;

            modal.style.display = 'flex';                                                   // muda o modal para fazer a tela de edição aparecer
        }
    });
    
    // continuação do UPDATE
    btnFecharModal.addEventListener('click', () => {                                        // após abrir, se clicar em fechar ele vira none de novo
        modal.style.display = 'none';
    });

    
    modal.addEventListener('click', (evento) => {                                           // fecha o modal se clicar fora dele
        if (evento.target === modal) {
            modal.style.display = 'none';
        }
    });

    formEditar.addEventListener('submit', async (evento) => {                               // se ele der o submit com a caixa de edição aberta
        evento.preventDefault();

        const id = inputEditId.value;                                                       // pega os dados do formulário do modal
        const nome = inputEditNome.value;
        const funcionarios = inputEditFuncionarios.value;

        const empresaAtualizada = {                                                         // passa os dados para jogar para json
            nome: nome,
            funcionarios: parseInt(funcionarios)
        };

        try {
            const response = await fetch(`${apiUrl}/${id}`, {                               // faz a requisição PUT para a API
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empresaAtualizada)
            });

            if (response.status === 200) {                                                  // se deu certo, esconde o modal
                modal.style.display = 'none';
                await carregarEmpresas();                                                   // recarrega
            } else {
                alert('Erro ao atualizar empresa.');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro de conexão. Verifique se a API está rodando.');
        }
    });

    // READ (R do CRUD)
    async function carregarEmpresas() {
        try {
            const response = await fetch(apiUrl);                                           // faz a conexão e pega o json 
            const empresas = await response.json();

            tabelaCorpo.innerHTML = '';                                                     // limpa a tabela

            empresas.forEach(empresa => {
                const linha = document.createElement('tr');                                 // cria a tabela

                const celulaNome = document.createElement('td');
                celulaNome.textContent = empresa.nome;

                const celulaFuncionarios = document.createElement('td');
                celulaFuncionarios.textContent = empresa.funcionarios;

                const celulaAcoes = document.createElement('td');                           // cria a outra coluna de ações

                const btnEditar = document.createElement('button');                         // cria o botão de edição
                btnEditar.textContent = 'Editar';
                btnEditar.className = 'btn btn-editar';
                
                btnEditar.dataset.id = empresa.id;                                          // adicionamos um 'data-id' para saber qual empresa editar

                const btnDeletar = document.createElement('button');                        // cria o botão de deletar
                btnDeletar.textContent = 'Deletar';
                btnDeletar.className = 'btn btn-deletar';
            
                btnDeletar.dataset.id = empresa.id;

                celulaAcoes.appendChild(btnEditar);                                         // adiciona os botões à célula de Ações
                celulaAcoes.appendChild(btnDeletar);

                
                linha.appendChild(celulaNome);                                              // adiciona todas as células à linha
                linha.appendChild(celulaFuncionarios);
                linha.appendChild(celulaAcoes); 

                tabelaCorpo.appendChild(linha);
            });

        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
            tabelaCorpo.innerHTML = '<tr><td colspan="3">Erro ao carregar dados. Tente novamente.</td></tr>';
        }
    }    // chama a função para carregar os dados assim que a página abre

    
    carregarEmpresas();

});