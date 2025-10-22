
class contato {
    constructor(nome, sobrenome, email, cpf, telefone, contato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.contato = contato;
    }
}

function Post(form) {
    let data = new contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value,
        form.elements.namedItem("email").value,
        form.elements.namedItem("cpf").value,
        form.elements.namedItem("telefone").value,
        form.elements.namedItem("contato").value
    );

    console.log("Dados enviados:", data); // só pra conferir no console
    return data;
}

function Enviar(event) {
    event.preventDefault(); // impede o envio e recarregamento da página

    const form = document.getElementById("form-contato");
    if (!form) return;

    // Try to get the 'nome' field from the form first (by name), fallback to #nomeid
    let nomeField = form.elements.namedItem('nome') || document.getElementById('nomeid');
    const nomeValue = (nomeField && nomeField.value) ? nomeField.value.trim() : '';

    const ensureMsgDiv = () => {
        let msgDiv = document.getElementById('msg-confirmacao');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'msg-confirmacao';
            msgDiv.style.marginTop = '15px';
            msgDiv.style.fontWeight = 'bold';
            // append near the form
            form.parentNode.appendChild(msgDiv);
        }
        return msgDiv;
    };

    if (nomeValue !== "") {
        Post(form); 
        alert(` Obrigado sr(a) ${nomeValue}, o sistema aceitou sua mensagem com sucesso!`);        
        form.reset(); // limpa os campos
    } else {
        // const msgDiv = ensureMsgDiv();
        // msgDiv.style.color = 'red';
        // msgDiv.textContent = 'Por favor, preencha o campo nome antes de enviar.';
        // // ensure the message is visible to the user
        // msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // // auto-hide after 6s
        // setTimeout(() => { msgDiv.textContent = ''; }, 6000);
    }
}

// Ativa o evento quando o formulário for enviado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato");
    if (form) {
        form.addEventListener("submit", Enviar);
    }
});