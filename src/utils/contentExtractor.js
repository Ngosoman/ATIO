/**
 * Extract readable text content from the current web page
 * Filters out navigation, headers, footers, and focuses on main content
 */
export const extractPageContent = () => {
    // Elements to exclude from content extraction
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

    // Priority content selectors (semantic HTML)
    const contentSelectors = [
        'main',
        'article',
        '[role="main"]',
        '.content',
        '#content'
    ];

    let contentText = '';

    // Try to find main content area first
    for (const selector of contentSelectors) {
        const mainContent = document.querySelector(selector);
        if (mainContent) {
            contentText = extractTextFromElement(mainContent, excludeSelectors);
            if (contentText.trim().length > 100) {
                return cleanText(contentText);
            }
        }
    }

    // Fallback: extract from body if no main content found
    const body = document.body;
    if (body) {
        contentText = extractTextFromElement(body, excludeSelectors);
    }

    return cleanText(contentText);
};

/**
 * Extract text from a specific element, excluding certain selectors
 */
const extractTextFromElement = (element, excludeSelectors) => {
    const clone = element.cloneNode(true);

    // Remove excluded elements
    excludeSelectors.forEach(selector => {
        const elements = clone.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });

    // Get text content
    return clone.textContent || clone.innerText || '';
};

/**
 * Clean and normalize extracted text
 */
const cleanText = (text) => {
    return text
        .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
        .replace(/\n+/g, '. ')          // Replace newlines with periods
        .replace(/\.\s*\./g, '.')       // Remove duplicate periods
        .replace(/[^\S\r\n]+/g, ' ')    // Normalize whitespace
        .trim();
};
