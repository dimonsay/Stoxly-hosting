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

apiClient.register = async (userData) => {
    const requestData = {
        username: userData.username,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        password2: userData.password2
    };

    try {
        const response = await apiClient.post('/auth/register/', requestData);
        // Нормальный успешный ответ
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data
            };
        }

        // Нестандартный успешный статус без данных
        return {
            success: false,
            error: 'Unexpected server response',
            status: response.status
        };

    } catch (error) {
        // Обработка ошибок валидации (400 Bad Request)
        if (error.response?.status === 400) {
            return {
                success: false,
                errors: error.response.data,
                status: 400,
                isValidationError: true
            };
        }

        // Обработка других HTTP ошибок
        if (error.response) {
            return {
                success: false,
                error: error.response.data?.message || `Server error (${error.response.status})`,
                status: error.response.status
            };
        }

        // Ошибки сети
        if (error.request) {
            return {
                success: false,
                error: 'No response from server',
                isNetworkError: true
            };
        }

        // Ошибки настройки запроса
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

apiClient.getMe = async () => {
    try {
        const response = await apiClient.get('auth/users/me/'); // Убрал requestData - GET запросы обычно не имеют тела

        if (response.status === 200) { // Точно проверяем успешный статус
            return {
                success: true,
                data: response.data
            };
        }

        // Обрабатываем другие статусы
        return {
            success: false,
            status: response.status,
            data: response.data
        };

    } catch (error) {
        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                errors: error.response.data,
                isValidationError: error.response.status === 400
            };
        }

        // Обработка ошибок без ответа (сеть, отменённые запросы)
        return {
            success: false,
            error: error.message,
            isNetworkError: true
        };
    }
};


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) return Promise.reject(error);
            isRefreshing = true;

            try {
                console.log('Попытка обновления токена...');
                await AuthService.refreshToken();
                originalRequest._retry = true;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена:', refreshError);
                localStorage.removeItem('access_token');
                await router.push('/auth/login');
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
