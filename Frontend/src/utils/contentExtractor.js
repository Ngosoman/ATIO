export const extractPageContent = () => {

    const excludeSelectors = [
        'nav',
        'header',
        'footer',
        'script',
        'style',
        'noscript',
        'iframe',
        '.sidebar',
        '.navigation',
        '.menu',
        'button',
        'input',
        'select',
        'textarea'
    ];


    const contentSelectors = [
        'main',
        'article',
        '[role="main"]',
        '.content',
        '#content'
    ];

    let contentText = '';

    for (const selector of contentSelectors) {
        const mainContent = document.querySelector(selector);
        if (mainContent) {
            contentText = extractTextFromElement(mainContent, excludeSelectors);
            if (contentText.trim().length > 100) {
                return cleanText(contentText);
            }
        }
    }


    const body = document.body;
    if (body) {
        contentText = extractTextFromElement(body, excludeSelectors);
    }

    return cleanText(contentText);
};


const extractTextFromElement = (element, excludeSelectors) => {
    const clone = element.cloneNode(true);


    excludeSelectors.forEach(selector => {
        const elements = clone.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });


    return clone.textContent || clone.innerText || '';
};


const cleanText = (text) => {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '. ')
        .replace(/\.\s*\./g, '.')
        .replace(/[^\S\r\n]+/g, ' ')
        .trim();
};
