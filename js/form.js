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

function Enviar(event) {
    event.preventDefault(); // impede o envio e recarregamento da página

    const form = document.getElementById("form-contato");
    if (!form) return;
    let nomeField = form.elements.namedItem("nome");
    const nomeValue = (nomeField && nomeField.value) ? nomeField.value.trim() : '';

    // --- garantir elementos de mensagem: frase (acima) e balão (abaixo da frase) ---
    let phrase = document.getElementById('msg-frase');
    if (!phrase) {
        phrase = document.createElement('div');
        phrase.id = 'msg-frase';
        phrase.className = 'msg-frase';
        form.parentNode.insertBefore(phrase, form);
    }

    let balloon = document.getElementById('msg-balao');
    if (!balloon) {
        balloon = document.createElement('div');
        balloon.id = 'msg-balao';
        balloon.className = 'msg-balao';

        const textDiv = document.createElement('div');
        textDiv.className = 'msg-text';
        balloon.appendChild(textDiv);

        const okBtn = document.createElement('button');
        okBtn.type = 'button';
        okBtn.className = 'msg-ok';
        okBtn.textContent = 'OK';
        okBtn.addEventListener('click', () => {
            balloon.style.display = 'none';
        });
        balloon.appendChild(okBtn);

        form.parentNode.insertBefore(balloon, form);
    } else {
        // garantir posição e visibilidade
        form.parentNode.insertBefore(balloon, form);
        balloon.style.display = '';
    }

    const textDiv = balloon.querySelector('.msg-text');

    if (nomeValue !== "") {
        const enviado = Post(form);

        // frase simples acima do formulário
        phrase.textContent = `Obrigado(a) ${nomeValue}, sua mensagem foi recebida com sucesso.`;

        // preencher balão (aparece abaixo da frase)
        if (textDiv) {
            textDiv.innerHTML = '';
            const mainText = document.createElement('div');
            mainText.textContent = 'Detalhes do envio:';
            mainText.style.fontWeight = '700';
            textDiv.appendChild(mainText);

            const resumo = document.createElement('div');
            resumo.className = 'msg-resumo';
            resumo.textContent = `Enviado: ${enviado.email} • Preferência: ${enviado.contato || '-'}.`;
            textDiv.appendChild(resumo);
        }

        // auto-hide do balão após 6s
        if (balloon._hideTimer) clearTimeout(balloon._hideTimer);
        balloon._hideTimer = setTimeout(() => { balloon.style.display = 'none'; }, 6000);

        form.reset(); // limpa os campos

    } else {
        // mostrar erro na frase
        phrase.textContent = 'Por favor, preencha o campo nome antes de enviar.';
        phrase.style.color = 'red';
        phrase.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { phrase.textContent = ''; phrase.style.color = ''; }, 6000);
    }
}



    function bloquear(check){
        const btnLGPD = document.getElementById("btnLGPD");

        if (check.checked) {
            btnLGPD.disabled = false;
            btnLGPD.classList.remove("desabilitado");
        } else {
            btnLGPD.disabled = true;
            btnLGPD.classList.add("desabilitado");
            
        }
    }

// Ativa o evento quando o formulário for enviado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato");
    if (form) {
        form.addEventListener("submit", Enviar);
    }
});