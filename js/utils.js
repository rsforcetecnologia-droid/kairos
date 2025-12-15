// js/utils.js

/**
 * Sanitiza uma string para prevenir ataques XSS (Cross-Site Scripting).
 * Substitui caracteres perigosos por suas entidades HTML seguras.
 * Use esta função sempre que inserir dados de usuários no innerHTML.
 * * @param {string} str - A string a ser sanitizada.
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