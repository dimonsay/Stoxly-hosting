/**
 * Утилиты для работы с реферальными кодами
 */

/**
 * Извлекает реферальный код из URL
 * @param {string} url - URL для парсинга (по умолчанию текущий URL)
 * @returns {string|null} - Реферальный код или null
 */
export function extractReferralCodeFromURL(url = window.location.href) {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('ref');
    } catch (error) {
        console.error('Error extracting referral code from URL:', error);
        return null;
    }
}

/**
 * Валидирует реферальный код
 * @param {string} code - Реферальный код для валидации
 * @returns {boolean} - true если код валиден
 */
export function validateReferralCode(code) {
    if (!code || typeof code !== 'string') {
        return false;
    }

    // Проверяем, что код содержит только буквы, цифры и дефисы, длиной от 3 до 20 символов
    const referralCodeRegex = /^[a-zA-Z0-9-]{3,20}$/;
    return referralCodeRegex.test(code.trim());
}

/**
 * Создает реферальную ссылку
 * @param {string} baseUrl - Базовая ссылка
 * @param {string} referralCode - Реферальный код
 * @returns {string} - Полная реферальная ссылка
 */
export function createReferralLink(baseUrl, referralCode) {
    if (!validateReferralCode(referralCode)) {
        throw new Error('Invalid referral code format');
    }

    const url = new URL(baseUrl);
    url.searchParams.set('ref', referralCode);
    return url.toString();
}

/**
 * Сохраняет реферальный код в localStorage
 * @param {string} code - Реферальный код
 */
export function saveReferralCode(code) {
    if (validateReferralCode(code)) {
        localStorage.setItem('referral_code', code);
    }
}

/**
 * Получает сохраненный реферальный код из localStorage
 * @returns {string|null} - Сохраненный реферальный код или null
 */
export function getSavedReferralCode() {
    return localStorage.getItem('referral_code');
}

/**
 * Очищает сохраненный реферальный код
 */
export function clearSavedReferralCode() {
    localStorage.removeItem('referral_code');
}

/**
 * Проверяет, есть ли реферальный код в URL или localStorage
 * @returns {string|null} - Реферальный код или null
 */
export function getCurrentReferralCode() {
    // Сначала проверяем URL
    const urlCode = extractReferralCodeFromURL();
    if (urlCode && validateReferralCode(urlCode)) {
        return urlCode;
    }

    // Затем проверяем localStorage
    const savedCode = getSavedReferralCode();
    if (savedCode && validateReferralCode(savedCode)) {
        return savedCode;
    }

    return null;
} 