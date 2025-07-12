import DashboardLayout from '@/layout/DashboardLayout.vue';
import landingPage from '@/layout/landingPage.vue';
import { AuthService } from '@/service/AuthService';
import Community from '@/views/dashboard-pages/Community.vue';
import Dashboard from '@/views/dashboard-pages/Dashboard.vue';
import Portfolio from '@/views/dashboard-pages/Portfolio.vue';
import Profile from '@/views/dashboard-pages/Profile.vue';
import Referrals from '@/views/dashboard-pages/Referrals.vue';
import Trade from '@/views/dashboard-pages/Trade.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/dashboard/trade',
                name: 'trade',
                component: Trade
            },
            {
                path: '/dashboard/portfolio',
                name: 'portfolio',
                component: Portfolio
            },
            {
                path: '/dashboard/referrals',
                name: 'referrals',
                component: Referrals
            },
            {
                path: '/dashboard/community',
                name: 'community',
                component: Community
            },
        ]
    },

    {
        path: '/',
        component: landingPage,
        children: [
            {
                path: '/',
                name: 'main',
                component: () => import('@/views/pages/Main.vue')
            },
            {
                path: '/apps/mail',

                component: () => import('@/views/apps/mail/Index.vue'),
                children: [
                    {
                        path: '/apps/mail/inbox',
                        name: 'mail-inbox',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/compose',
                        name: 'mail-compose',
                        component: () => import('@/views/apps/mail/ComposeNew.vue')
                    },
                    {
                        path: '/apps/mail/detail/:id',
                        name: 'mail-detail',
                        component: () => import('@/views/apps/mail/Detail.vue')
                    },
                    {
                        path: '/apps/mail/starred',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/spam',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/important',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/sent',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/archived',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    },
                    {
                        path: '/apps/mail/trash',
                        component: () => import('@/views/apps/mail/MailTypes.vue')
                    }
                ]
            },
            {
                path: '/uikit/formlayout',
                name: 'formlayout',
                meta: {
                    breadcrumb: ['UI Kit', 'Form Layout']
                },
                component: () => import('@/views/uikit/FormLayoutDoc.vue')
            },
            {
                path: '/uikit/input',
                name: 'input',
                meta: {
                    breadcrumb: ['UI Kit', 'Input']
                },
                component: () => import('@/views/uikit/InputDoc.vue')
            },
            {
                path: '/uikit/button',
                name: 'button',
                meta: {
                    breadcrumb: ['UI Kit', 'Button']
                },
                component: () => import('@/views/uikit/ButtonDoc.vue')
            },
            {
                path: '/uikit/table',
                name: 'table',
                meta: {
                    breadcrumb: ['UI Kit', 'Table']
                },
                component: () => import('@/views/uikit/TableDoc.vue')
            },
            {
                path: '/uikit/list',
                name: 'list',
                meta: {
                    breadcrumb: ['UI Kit', 'List']
                },
                component: () => import('@/views/uikit/ListDoc.vue')
            },
            {
                path: '/uikit/tree',
                name: 'tree',
                meta: {
                    breadcrumb: ['UI Kit', 'Tree']
                },
                component: () => import('@/views/uikit/TreeDoc.vue')
            },
            {
                path: '/uikit/panel',
                name: 'panel',
                meta: {
                    breadcrumb: ['UI Kit', 'Panel']
                },
                component: () => import('@/views/uikit/PanelsDoc.vue')
            },

            {
                path: '/uikit/overlay',
                name: 'overlay',
                meta: {
                    breadcrumb: ['UI Kit', 'Overlay']
                },
                component: () => import('@/views/uikit/OverlayDoc.vue')
            },
            {
                path: '/uikit/media',
                name: 'media',
                meta: {
                    breadcrumb: ['UI Kit', 'Media']
                },
                component: () => import('@/views/uikit/MediaDoc.vue')
            },
            {
                path: '/uikit/menu',
                meta: {
                    breadcrumb: ['UI Kit', 'Menu']
                },
                component: () => import('@/views/uikit/MenuDoc.vue')
            },
            {
                path: '/uikit/message',
                name: 'message',
                meta: {
                    breadcrumb: ['UI Kit', 'Message']
                },
                component: () => import('@/views/uikit/MessagesDoc.vue')
            },
            {
                path: '/uikit/file',
                name: 'file',
                meta: {
                    breadcrumb: ['UI Kit', 'File']
                },
                component: () => import('@/views/uikit/FileDoc.vue')
            },
            {
                path: '/uikit/charts',
                name: 'charts',
                meta: {
                    breadcrumb: ['UI Kit', 'Charts']
                },
                component: () => import('@/views/uikit/ChartDoc.vue')
            },
            {
                path: '/uikit/timeline',
                name: 'timeline',
                component: () => import('@/views/uikit/TimelineDoc.vue')
            },
            {
                path: '/uikit/misc',
                name: 'misc',
                meta: {
                    breadcrumb: ['UI Kit', 'Misc']
                },
                component: () => import('@/views/uikit/MiscDoc.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                meta: {
                    breadcrumb: ['Prime Blocks', 'Free Blocks']
                },
                component: () => import('@/views/utilities/Blocks.vue')
            },
            {
                path: '/pages/empty',
                name: 'empty',
                component: () => import('@/views/pages/Empty.vue')
            },
            {
                path: '/pages/crud',
                name: 'crud',
                component: () => import('@/views/pages/Crud.vue')
            },
            {
                path: '/ecommerce/product-overview',
                name: 'product-overview',
                meta: {
                    breadcrumb: ['E-Commerce', 'Product Overview']
                },
                component: () => import('@/views/e-commerce/ProductOverview.vue')
            },
            {
                path: '/ecommerce/product-list',
                name: 'product-list',
                meta: {
                    breadcrumb: ['E-Commerce', 'Product List']
                },
                component: () => import('@/views/e-commerce/ProductList.vue')
            },
            {
                path: '/ecommerce/new-product',
                name: 'new-product',
                meta: {
                    breadcrumb: ['E-Commerce', 'New Product']
                },
                component: () => import('@/views/e-commerce/NewProduct.vue')
            },
            {
                path: '/ecommerce/shopping-cart',
                name: 'shopping-cart',
                meta: {
                    breadcrumb: ['E-Commerce', 'Shopping Cart']
                },
                component: () => import('@/views/e-commerce/ShoppingCart.vue')
            },
            {
                path: '/ecommerce/checkout-form',
                name: 'checkout-form',
                meta: {
                    breadcrumb: ['E-Commerce', 'Checkout Form']
                },
                component: () => import('@/views/e-commerce/CheckoutForm.vue')
            },
            {
                path: '/ecommerce/order-history',
                name: 'order-history',
                meta: {
                    breadcrumb: ['E-Commerce', 'Order History']
                },
                component: () => import('@/views/e-commerce/OrderHistory.vue')
            },
            {
                path: '/ecommerce/order-summary',
                name: 'order-summary',
                meta: {
                    breadcrumb: ['E-Commerce', 'Order Summary']
                },
                component: () => import('@/views/e-commerce/OrderSummary.vue')
            },

            {
                path: '/profile/create',
                name: 'user-create',
                meta: {
                    breadcrumb: ['User Management', 'Create']
                },
                component: () => import('@/views/user-management/UserCreate.vue')
            },
            {
                path: '/profile/list',
                name: 'user-list',
                meta: {
                    breadcrumb: ['User Management', 'List']
                },
                component: () => import('@/views/user-management/UserList.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('@/views/utilities/Documentation.vue')
            },
            {
                path: '/about',
                name: 'about',
                meta: {
                    breadcrumb: ['Pages', 'About']
                },
                component: () => import('@/views/pages/AboutUs.vue')
            },
            {
                path: '/market-news',
                name: 'market-news',
                meta: {
                    breadcrumb: ['Pages', 'MarketNews']
                },
                component: () => import('@/views/pages/MarketNews.vue')
            },
            {
                path: '/pages/contact',
                name: 'contact',
                component: () => import('@/views/pages/ContactUs.vue')
            },
            {
                path: '/pages/faq',
                name: 'faq',
                meta: {
                    breadcrumb: ['Pages', 'FAQ']
                },
                component: () => import('@/views/pages/Faq.vue')
            },
            {
                path: '/help',
                name: 'help',
                component: () => import('@/views/pages/Help.vue')
            },
            {
                path: '/guides',
                name: 'guides',
                component: () => import('@/views/pages/Guides.vue')
            },
            {
                path: '/guides/:id',
                name: 'GuideDetails',
                component: () => import('@/views/uikit/GuideComponent.vue'),
                props: true
            },
            {
                path: '/learn/:id',
                name: 'LessonDetails',
                component: () => import('@/views/uikit/LearnComponent.vue'),
                props: true
            },
            {
                path: '/market-news/:id',
                name: 'NewsDetails',
                component: () => import('@/views/uikit/NewsComponent.vue'),
                props: true
            },
            {
                path: '/pages/invoice',
                name: 'invoice',
                component: () => import('@/views/pages/Invoice.vue')
            },
            {
                path: '/markets',
                name: 'markets',
                component: () => import('@/views/pages/Markets.vue')
            },
            {
                path: '/learn',
                name: 'learn',
                component: () => import('@/views/pages/Learn.vue')
            },
            {
                path: '/terms-of-service',
                name: 'terms',
                component: () => import('@/views/pages/Terms.vue')
            },
            {
                path: '/risk-disclosure',
                name: 'risk',
                component: () => import('@/views/pages/Risk.vue')
            }
        ]
    },
    {
        path: '/user',
        name: 'me',
        component: () => import('@/views/pages/Me.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('@/views/pages/Landing.vue')
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },

    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/AccessDenied.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue')
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import('@/views/pages/auth/Register.vue')
    },
    {
        path: '/auth/forgotpassword',
        name: 'forgotpassword',
        component: () => import('@/views/pages/auth/ForgotPassword.vue')
    },
    {
        path: '/auth/newpassword',
        name: 'newpassword',
        component: () => import('@/views/pages/auth/NewPassword.vue')
    },
    {
        path: '/auth/verification',
        name: 'verification',
        component: () => import('@/views/pages/auth/Verification.vue')
    },
    {
        path: '/auth/lockscreen',
        name: 'lockscreen',
        component: () => import('@/views/pages/auth/LockScreen.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});


function isTokenValid(token) {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (e) {
        return false;
    }
}

router.beforeEach(async (to, from, next) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const isAccessValid = isTokenValid(accessToken);

    // Страницы, где логин не нужен
    const authPages = ['login', 'register', 'verification'];

    // Если access-token валиден
    if (isAccessValid) {
        if (authPages.includes(to.name)) {
            return next({ name: 'dashboard' });
        }
        return next();
    }

    if (!isAccessValid && refreshToken) {
        try {
            const newAccess = await AuthService.refreshToken();
            localStorage.setItem('access_token', newAccess);

            if (authPages.includes(to.name)) {
                return next({ name: 'dashboard' });
            }

            return next(); // ✅ Пускаем дальше — токен обновлён
        } catch (e) {
            // ❌ Refresh тоже не сработал — удаляем токены и редиректим
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return next({ name: 'login' });
        }
    }

    // Если ни access, ни refresh — отправляем на login
    if (to.meta.requiresAuth) {
        return next({ name: 'login' });
    }

    return next();
});


export default router;
