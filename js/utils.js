// js/utils.js

/**
 * Sanitiza uma string para prevenir ataques XSS (Cross-Site Scripting).
 * Substitui caracteres perigosos por suas entidades HTML seguras.
 * Use esta função sempre que inserir dados de usuários no innerHTML.
 * @param {string} str - A string a ser sanitizada.
 * @returns {string} - A string segura para inserção no DOM.
 */
export function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

/**
 * Redimensiona e comprime uma imagem no cliente (navegador) antes do upload.
 * Transforma ficheiros grandes (5MB+) em ficheiros leves (~50KB-100KB) para poupar Storage/Bandwidth.
 * @param {File} file - O ficheiro de imagem original vindo do <input type="file">
 * @param {number} maxWidth - Largura máxima permitida (padrão 800px)
 * @param {number} maxHeight - Altura máxima permitida (padrão 800px)
 * @param {number} quality - Qualidade da compressão JPEG (0.0 a 1.0, padrão 0.7)
 * @returns {Promise<string>} - Retorna uma Promise que resolve com a string Base64 da imagem.
 */
export function resizeAndCompressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        // Verifica se é imagem
        if (!file.type.match(/image.*/)) {
            return reject(new Error("O ficheiro selecionado não é uma imagem."));
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                // Cálculo das novas dimensões mantendo a proporção (aspect ratio)
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // Cria o canvas para desenhar a imagem redimensionada
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte para Base64 (JPEG comprimido)
                // 'image/jpeg' é mais eficiente para fotos que 'image/png'
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };

            img.onerror = (error) => reject(new Error("Erro ao carregar a imagem para processamento."));
        };

        reader.onerror = (error) => reject(new Error("Erro ao ler o ficheiro."));
    });
}

/**
 * Formata uma data para o padrão PT-BR.
 * Aceita objetos Date, strings ISO ou Timestamps.
 * @param {Date|string|number} dateValue - A data a formatar.
 * @returns {string} - Data formatada (ex: 25/01/2026 14:30) ou mensagem de erro.
 */
export function formatDate(dateValue) {
    if (!dateValue) return 'Data indefinida';
    
    // Tratamento básico para tentar converter strings ou números em Date
    const date = new Date(dateValue);
    
    if (isNaN(date.getTime())) return 'Data inválida';
    
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formata um valor numérico para Moeda BRL (Real Brasileiro).
 * @param {number|string} value - O valor monetário.
 * @returns {string} - Valor formatado (ex: R$ 150,00).
 */
export function formatCurrency(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return 'R$ 0,00';
    
    return num.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });
}