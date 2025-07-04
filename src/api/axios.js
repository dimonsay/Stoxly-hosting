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

apiClient.getAssetsMain = async () => {
    const response = await apiClient.get('/stocks/displayed/');
    console.log(response)
}

apiClient.getUser = async () => {
    const response = await apiClient.get('/auth/me/');
    console.log(response)
}

apiClient.getNews = async () => {
    const response = (await apiClient.get('/stocks/news/')).data;
    return response
}

apiClient.getLessons = async () => {
    const response = (await apiClient.get('/stocks/lessons/')).data;
    console.log(response)
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
    console.log(data)
}

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
