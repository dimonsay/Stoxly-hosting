import apiClient from '@/api/axios';

export class AuthService {
    static async login(email, password) {
        try {
            const response = await apiClient.post('/auth/login', { email, password });

            if (response.status !== 200) {
                throw new Error('Ошибка авторизации');
            }

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Ошибка авторизации';
            throw new Error(errorMessage);
        }
    }

    static async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('Refresh token не найден');
        }

        try {
            const response = await apiClient.post('/auth/refresh/', {
                refresh: refreshToken
            });

            if (response.status === 200 && response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                return response.data.access;
            } else {
                throw new Error('Не удалось обновить токен');
            }
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            throw error;
        }
    }


    static async logout() {
        try {
            await apiClient.post('/auth/logout');
            localStorage.removeItem('access_token');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    }

    static async verifyOtp(otp_code, temp_token) {
        try {
            const response = await apiClient.post('/auth/2fa/verify', {
                otp_code,
                temp_token,
            });

            if (response.status !== 200) {
                throw new Error('Ошибка подтверждения 2FA');
            }

            localStorage.setItem('access_token', response.data.access_token);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Ошибка 2FA';
            throw new Error(errorMessage);
        }
    }
}
