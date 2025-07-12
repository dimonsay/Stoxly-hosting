/**
 * Утилиты для работы со ссылками на торговлю
 */

/**
 * Определяет категорию акции по её символу
 * @param {string} symbol - Символ акции
 * @returns {string|null} Категория акции или null если не определена
 */
export function getAssetCategory(symbol) {
    if (!symbol) return null;

    const symbolUpper = symbol.toUpperCase();

    // Маппинг символов на категории (можно расширить)
    const categoryMap = {
        // Технологии
        'AAPL': 'technology',
        'MSFT': 'technology',
        'GOOGL': 'technology',
        'GOOG': 'technology',
        'META': 'technology',
        'TSLA': 'technology',
        'NVDA': 'technology',
        'AMD': 'technology',
        'INTC': 'technology',
        'NFLX': 'technology',
        'AMZN': 'technology',

        // Финансы
        'JPM': 'finance',
        'BAC': 'finance',
        'WFC': 'finance',
        'GS': 'finance',
        'MS': 'finance',

        // Здравоохранение
        'JNJ': 'healthcare',
        'PFE': 'healthcare',
        'UNH': 'healthcare',
        'ABBV': 'healthcare',
        'MRK': 'healthcare',

        // Потребительские товары
        'PG': 'consumer_goods',
        'KO': 'consumer_goods',
        'PEP': 'consumer_goods',
        'WMT': 'consumer_goods',
        'HD': 'consumer_goods',

        // Энергетика
        'XOM': 'energy',
        'CVX': 'energy',
        'COP': 'energy',

        // Промышленность
        'BA': 'industrial',
        'CAT': 'industrial',
        'MMM': 'industrial',

        // Связь
        'VZ': 'telecommunications',
        'T': 'telecommunications',
        'TMUS': 'telecommunications'
    };

    return categoryMap[symbolUpper] || null;
}

/**
 * Генерирует ссылку на страницу торговли с указанным символом акции
 * @param {string} symbol - Символ акции (например, 'AAPL', 'TSLA')
 * @param {string} action - Действие ('buy' или 'sell'), опционально
 * @param {string} category - Категория акции, опционально
 * @returns {string} URL для перехода на страницу торговли
 */
export function generateTradeLink(symbol, action = null, category = null) {
    if (!symbol) {
        return '/dashboard/trade';
    }

    const params = new URLSearchParams();
    params.append('symbol', symbol.toUpperCase());

    if (action && (action === 'buy' || action === 'sell')) {
        params.append('action', action);
    }

    // Если категория не указана, пытаемся определить её автоматически
    const finalCategory = category || getAssetCategory(symbol);
    if (finalCategory) {
        params.append('category', finalCategory);
    }

    return `/dashboard/trade?${params.toString()}`;
}

/**
 * Генерирует ссылку для покупки конкретной акции
 * @param {string} symbol - Символ акции
 * @param {string} category - Категория акции, опционально
 * @returns {string} URL для покупки
 */
export function generateBuyLink(symbol, category = null) {
    return generateTradeLink(symbol, 'buy', category);
}

/**
 * Генерирует ссылку для продажи конкретной акции
 * @param {string} symbol - Символ акции
 * @param {string} category - Категория акции, опционально
 * @returns {string} URL для продажи
 */
export function generateSellLink(symbol, category = null) {
    return generateTradeLink(symbol, 'sell', category);
}

/**
 * Извлекает параметры из текущего URL
 * @returns {Object} Объект с параметрами symbol, action и category
 */
export function getTradeParamsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        symbol: urlParams.get('symbol'),
        action: urlParams.get('action'),
        category: urlParams.get('category')
    };
} 