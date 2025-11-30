document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscricaoForm');
    const outrosCheckbox = document.getElementById('outros');
    const outrosEspecificacao = document.getElementById('outrosEspecificacao');
    const telefoneInput = document.getElementById('telefone');
    const comoConheceuSelect = document.getElementById('comoConheceu');
    const outrosComoConheceu = document.getElementById('outrosComoConheceu');
    const instagramInput = document.getElementById('instagram');
    
    // CONFIGURAÇÃO - EDITE APENAS ESTA LINHA!
    const WHATSAPP_NUMBER = '5579981306793'; // SUBSTITUA pelo SEU número
    
    // Inicialmente ocultar os campos de especificação
    outrosEspecificacao.style.display = 'none';
    outrosComoConheceu.style.display = 'none';
    
    // [MANTENHA TODO O SEU CÓDIGO DE VALIDAÇÃO ORIGINAL AQUI]
    // ... (todas as funções de validação permanecem iguais)
    
    // Função para coletar dados
    function collectFormData() {
        return {
            nomeCompleto: document.getElementById('nomeCompleto').value,
            nomeArtistico: document.getElementById('nomeArtistico').value,
            idade: document.getElementById('idade').value,
            cidadeEstado: document.getElementById('cidadeEstado').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            instagram: document.getElementById('instagram').value,
            videoApresentacao: document.getElementById('videoApresentacao').value,
            generosMusicais: Array.from(document.querySelectorAll('input[name="generoMusical"]:checked'))
                .map(checkbox => checkbox.value)
                .join(', '),
            outrosGenero: outrosCheckbox.checked ? outrosEspecificacao.value : '',
            vertente: document.querySelector('input[name="vertente"]:checked')?.value || '',
            comoConheceu: comoConheceuSelect.value === 'Outros' ? 
                         outrosComoConheceu.value : comoConheceuSelect.value
        };
    }
    
    // Função para abrir WhatsApp - VERSÃO SIMPLES
    function openWhatsAppDirect() {
        const formData = collectFormData();
        
        // Mensagem SIMPLES para teste
        let message = `NOVA INSCRIÇÃO:\n\n`;
        message += `Nome: ${formData.nomeCompleto}\n`;
        message += `Artístico: ${formData.nomeArtistico}\n`;
        message += `Telefone: ${formData.telefone}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Instagram: ${formData.instagram}\n`;
        message += `Cidade: ${formData.cidadeEstado}\n`;
        message += `Idade: ${formData.idade}\n`;
        message += `Gêneros: ${formData.generosMusicais}\n`;
        message += `Vertente: ${formData.vertente}\n`;
        message += `Como conheceu: ${formData.comoConheceu}\n`;
        message += `Vídeo: ${formData.videoApresentacao}`;
        
        // URL do WhatsApp - MÉTODO MAIS CONFIÁVEL
        const url = `https://api.whatsapp.com/send?phone=${5579981306793}&text=${encodeURIComponent(message)}`;
        
        console.log('🔗 URL do WhatsApp:', url); // Para verificar no console
        
        // Tenta abrir de duas formas
        window.open(url, '_blank') || window.location.assign(url);
    }
    
    // ENVIO DO FORMULÁRIO - VERSÃO SUPER SIMPLES
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📝 Formulário submetido...');
        
        if (validateForm()) {
            console.log('✅ Formulário válido!');
            
            // 1. Mostrar mensagem de sucesso
            showSuccessMessage();
            
            // 2. Limpar formulário
            form.reset();
            outrosEspecificacao.style.display = 'none';
            outrosComoConheceu.style.display = 'none';
            
            // 3. Abrir WhatsApp após 1 segundo
            setTimeout(() => {
                console.log('📱 Abrindo WhatsApp...');
                openWhatsAppDirect();
            }, 1000);
            
        } else {
            console.log('❌ Formulário inválido!');
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        // Cria mensagem de sucesso se não existir
        let successDiv = document.getElementById('successMessage');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.id = 'successMessage';
            successDiv.style.cssText = `
                background: #d4edda;
                color: #155724;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
                border: 2px solid #c3e6cb;
                display: none;
            `;
            successDiv.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #155724;">✅ Formulário Enviado com Sucesso!</h3>
                <p style="margin: 0 0 15px 0;">Abrindo WhatsApp...</p>
                <button onclick="window.open('https://api.whatsapp.com/send?phone=${5579981306793}', '_blank')" 
                        style="background: #25D366; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">
                    📱 Abrir WhatsApp Agora
                </button>
            `;
            form.parentNode.insertBefore(successDiv, form.nextSibling);
        }
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// BOTÃO DE TESTE FORA DA FUNÇÃO PRINCIPAL
function testarWhatsApp() {
    const numero = '5579981306793'; // USE SEU NÚMERO AQUI
    const mensagem = 'Teste do formulário - isso funciona!';
    const url = `https://api.whatsapp.com/send?phone=${5579981306793}&text=${encodeURIComponent(mensagem)}`;
    
    console.log('🧪 URL de teste:', url);
    alert('Abrindo WhatsApp para teste...');
    window.open(url, '_blank');
}