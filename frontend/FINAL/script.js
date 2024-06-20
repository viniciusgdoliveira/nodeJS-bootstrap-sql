async function enviar_lei() {
    const id_abrangencia = document.getElementById('id_abrangencia').value;
    const id_ramodireito = document.getElementById('id_ramodireito').value;
    const nome_proposta = document.getElementById('nome_proposta').value;
    const exposicao_motivos = document.getElementById('exposicao_motivos').value;
    const texto_lei = document.getElementById('texto_lei').value;
    const abrangencia = {
        'municipal': 1,
        'estadual': 2,
        'federal': 3
    }[id_abrangencia];
    const ramodireito = {
        'processual': 1,
        'administrativo': 2,
        'constitucional': 3,
        'consumidor': 4,
        'ambiental': 5,
        'tributaria': 6,
        'civil': 7,
        'penal': 8
    }[id_ramodireito];

    const formData = {
        id_abrangencia: abrangencia,
        id_ramodireito: ramodireito,
        nome_proposta: nome_proposta,
        exposicao_motivos: exposicao_motivos,
        texto_lei: texto_lei
    };
    let method = "POST";

    fetch('http://localhost:3000/lei', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Refresh the data after successful submission
            carregarDados();
            // Clear the form after successful submission
            limpar();
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
        
}
async function atualizar() {
    const id = document.getElementById('id').value;
    const id_abrangencia = document.getElementById('id_abrangencia').value;
    const id_ramodireito = document.getElementById('id_ramodireito').value;
    const nome_proposta = document.getElementById('nome_proposta').value;
    const exposicao_motivos = document.getElementById('exposicao_motivos').value;
    const texto_lei = document.getElementById('texto_lei').value;
    const abrangencia = {
        'municipal': 1,
        'estadual': 2,
        'federal': 3
    }[id_abrangencia];
    const ramodireito = {
        'processual': 1,
        'administrativo': 2,
        'constitucional': 3,
        'consumidor': 4,
        'ambiental': 5,
        'tributaria': 6,
        'civil': 7,
        'penal': 8
    }[id_ramodireito];

    const formData = {
        id_abrangencia: abrangencia,
        id_ramodireito: ramodireito,
        nome_proposta: nome_proposta,
        exposicao_motivos: exposicao_motivos,
        texto_lei: texto_lei
    };

   
    fetch(`http://localhost:3000/lei/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        
}

function limpar_form() {
    document.getElementById('formulario_lei').reset();
}

async function carregarDados() {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    try {
        const response = await fetch('http://localhost:3000/lei');
        const result = await response.json();
        result.forEach(element => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${element.id}</td>
                <td>${element.id_abrangencia}</td>
                <td>${element.id_ramodireito}</td>
                <td>${element.nome_proposta}</td>
                <td>${element.exposicao_motivos}</td>
                <td>${element.texto_lei}</td>
                <td>
                    <div class="btn-group">
                    <button class="button"onclick="selecionar(${element.id});">Alterar</button>
                        <button class="button" onclick="excluir(${element.id});">Excluir</button>
                    </div>
                </td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function excluir(id_selecionada) {
    let data = { id: id_selecionada };
    try {
        const response = await fetch(`http://localhost:3000/lei/${id_selecionada}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        carregarDados();
        limpar();
    } catch (error) {
        console.error("Error:", error);
    }
}

function limpar() {
    document.getElementById('id_abrangencia').value = "";
    document.getElementById('id_ramodireito').value = "";
    document.getElementById('nome_proposta').value = "";
    document.getElementById('exposicao_motivos').value = "";
    document.getElementById('texto_lei').value = "";
}
async function selecionar(id_selecionada) {
    document.getElementById('id').value = id_selecionada;

    try {
        const response = await fetch(`http://localhost:3000/lei/${id_selecionada}`, {
            method: "GET",
            dataType: "json"
        });
        const result = await response.json();

        document.getElementById('id_abrangencia').value = mapIdToDropdownValue(result[0].id_abrangencia, 'id_abrangencia');
        document.getElementById('id_ramodireito').value = mapIdToDropdownValue(result[0].id_ramodireito, 'id_ramodireito');
        document.getElementById('nome_proposta').value = result[0].nome_proposta;
        document.getElementById('exposicao_motivos').value = result[0].exposicao_motivos;
        document.getElementById('texto_lei').value = result[0].texto_lei;
    } catch (error) {
        alert("Error: " + error);
    }
}
function mapIdToDropdownValue(id, dropdownId) {
    if (dropdownId === 'id_abrangencia') {
        switch (id) {
            case 1:
                return 'municipal';
            case 2:
                return 'estadual';
            case 3:
                return 'federal';
            default:
                return 'municipal'; 
        }
    } else if (dropdownId === 'id_ramodireito') {

        switch (id) {
            case 1:
                return 'processual';
            case 2:
                return 'administrativo';
            case 3:
                return 'constitucional';
            case 4:
                return 'consumidor';  
            case 5:
                return 'ambiental';
            case 6:
                return 'tributaria';
            case 7:
                return 'civil';
            case 8:
                return 'penal';  
          
            default:
                return 'processual'; 
        }
    }

    return ''; 
}

