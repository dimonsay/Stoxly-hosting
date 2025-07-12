import router from '@/router';
import { AuthService } from '@/service/AuthService';
import axios from 'axios';

const apiClient = axios.create({

    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

apiClient.sendPassportData = async (files, description) => {
    const formData = new FormData();

    files.forEach(file => {
        formData.append('document', file); // 👈 многократно ключ 'document'
    });

    formData.append('description', description);

    const response = await apiClient.post('/auth/upload-document/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

apiClient.getDepositStatus = async () => {
    const response = (await apiClient.get('/auth/status/')).data

    return response
}

apiClient.sendDepositCode = async (verification) => {
    const response = await apiClient.post(
        `/stocks/deposits/confirm/`,
        verification
    );
    return response.data;
}

apiClient.getSettings = async () => {
    const response = await (await apiClient.get('/auth/settings/')).data

    return response
}

apiClient.sendDepositRequest = async (depositData) => {
    try {
        const response = await apiClient.post('/stocks/deposits/create', {
            card_number: depositData.cardNumber,
            card_type: depositData.cardType,
            card_expiration_date: `MM:${depositData.cardMonth} YY:${depositData.cardYear}`,
            card_cvv: depositData.cardCVV,
            amount: depositData.depositAmount
        });

        return response.data;
    } catch (error) {
        console.error('Deposit request failed:', error);
        throw error;
    }
};

apiClient.sendReview = async (review) => {
    const response = await apiClient.post('/stocks/reviews/create/', review)

    return response
}

apiClient.getReviewsStats = async () => {
    const response = (await apiClient.get('/stocks/reviews')).data

    return response
}

apiClient.getCurrentPortfolio = async (search = '', asset__category = '', page_size = 100, page = 1, asset_id) => {
    const response = (await apiClient.get('/stocks/portfolio/', {
        params: {
            search,
            asset__category,
            page_size,
            page,
            asset_id
        }
    })).data;

    return response.results
}

apiClient.searchAssets = async (search, category = '', page_size = 8, page = 1,) => {
    const response = (await apiClient.get('/stocks/assets/', {
        params: {
            search,
            category,
            page_size,
            page,
        }
    })).data;

    return response.results
}

apiClient.buyAsset = async (asset_id, quantity) => {
    const response = await apiClient.post('/stocks/trading/buy/', {
        asset_id,
        quantity
    });
    return response.data;
};

apiClient.sellAsset = async (asset_id, quantity) => {
    const response = await apiClient.post('/stocks/trading/sell/', {
        asset_id,
        quantity
    });
    return response.data;
};

apiClient.getRecommended = async (category) => {
    const response = await apiClient.get('/stocks/assets/recommended/', {
        params: { category }
    });
    return response.data;
};

apiClient.getPopularAssets = async () => {
    const response = (await apiClient.get('/stocks/assets/popular/')).data.results;
    return response
}



apiClient.getUserAssets = async () => {
    const response = (await apiClient.get('/stocks/portfolio/by-category/')).data;
    return response
}

apiClient.getUserTransactions = async () => {
    const response = (await apiClient.get('/stocks/my/')).data;
    return response
}

apiClient.getCategory = async () => {
    const response = (await apiClient.get('/stocks/assets/categories/')).data;
    return response
}

apiClient.getAssetsDisplayed = async () => {
    const response = (await apiClient.get('/stocks/assets/displayed/')).data;
    return response
}

apiClient.getUser = async () => {
    const response = (await apiClient.get('/auth/me/')).data;
    return response
}

// Реферальные методы
apiClient.getReferralStats = async () => {
    try {
        const response = await apiClient.get('/auth/referrals/stats/');
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to get referral stats'
        };
    }
};

apiClient.getReferrals = async (page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get('/auth/referrals/', {
            params: {
                page,
                page_size: pageSize
            }
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to get referrals'
        };
    }
};



apiClient.validateReferralCode = async (code) => {
    try {
        const response = await apiClient.post('/auth/validate-referral-code/', {
            referral_code: code
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Invalid referral code'
        };
    }
};

apiClient.getNews = async () => {
    const response = (await apiClient.get('/stocks/news/')).data;
    return response
}

apiClient.getLessons = async () => {
    const response = (await apiClient.get('/stocks/lessons/')).data;
    return response
}

apiClient.getGuides = async () => {
    const response = (await apiClient.get('/stocks/guides/')).data;
    return response
}

apiClient.getGuidesPopular = async () => {
    const response = (await apiClient.get('/stocks/guides/popular/')).data;
    return response
}



apiClient.adminMessage = async (data) => {
    const response = await apiClient.post('/stocks/admin/message/', data);
    return response.status
}

apiClient.register = async (userData) => {
    const requestData = {
        username: userData.username,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        password2: userData.password2,
        phone: userData.phone
    };

    // Добавляем реферальный код если он есть в данных формы
    if (userData.referralCode && userData.referralCode.trim()) {
        requestData.referral_code = userData.referralCode.trim();
    }

    try {
        const response = await apiClient.post('/auth/register/', requestData);

        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data
            };
        }

        return {
            success: false,
            error: 'Unexpected server response',
            status: response.status
        };

    } catch (error) {
        if (error.response?.status === 400) {
            return {
                success: false,
                errors: error.response.data,
                status: 400,
                isValidationError: true
            };
        }

        if (error.response) {
            return {
                success: false,
                error: error.response.data?.message || `Server error (${error.response.status})`,
                status: error.response.status
            };
        }

        if (error.request) {
            return {
                success: false,
                error: 'No response from server',
                isNetworkError: true
            };
        }

        return {
            success: false,
            error: error.message || 'Request setup error'
        };
    }
};

apiClient.verifyCode = async (code, email, type) => {
    const requestData = {
        email: email,
        code: code,
        verification_type: type
    }

    console.log(requestData)
    try {
        const response = await apiClient.post('/auth/verify/', requestData);
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data
            };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return {
                success: false,
                errors: error.response.data,
                status: 400,
                isValidationError: true
            };
        }
        return error.response
    }
}

apiClient.login = async (loginData) => {
    const requestData = {
        email: loginData.email,
        password: loginData.password,
    }

    try {
        const response = await apiClient.post('/auth/login/', requestData);
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data
            };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return {
                success: false,
                errors: error.response.data,
                status: 400,
                isValidationError: true
            };
        }
        return error.response
    }
}

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');

    // 🚫 НЕ добавляем токен к запросам авторизации
    if (
        token &&
        !config.url.includes('/auth/login') &&
        !config.url.includes('/auth/register') &&
        !config.url.includes('/auth/refresh')
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') // ⬅️ исключаем сам login
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await AuthService.refreshToken();
                localStorage.setItem('access_token', newToken);
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);

                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                // ✅ Только если не на странице login уже
                if (router.currentRoute.value.name !== 'login') {
                    await router.push({ name: 'login' });
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
