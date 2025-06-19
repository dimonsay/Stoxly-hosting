<template>
    <div class="footer-wrapper">
        <div class="container">

            <footer>
                <div class="footer-content flex justify-between">
                    <div class="contacts-wrapper">
                        <div class="contacts-title footer-title">Stoxly</div>
                        <div class="contacts-description">Making global investments<br />
                            accessible to everyone through
                            <br /> our
                            secure and intuitive platform.
                        </div>
                        <div class="contacts-email-wrapper flex center">
                            <div class="contacts-icon">
                                <i class="fa-regular fa-envelope"></i>
                            </div>
                            <div class="contacts-email">contact@stoxly.com</div>
                        </div>
                        <div class="contacts-phone-wrapper flex center">
                            <div class="contacts-icon">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="contacts-phone">+1 (555) 123-4567</div>
                        </div>
                        <div class="contacts-phone-wrapper flex center">
                            <div class="contacts-icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div class="contacts-phone">New York, NY, USA</div>
                        </div>
                    </div>

                    <div class="quick-links-wrapper">
                        <div class="quick-links-title footer-title">Quick Links</div>
                        <div class="footer-nav-item" @click="goTo('main')">Home</div>
                        <div class="footer-nav-item" @click="goTo('markets')">Markets</div>
                        <div class="footer-nav-item" @click="goTo('help')">Help Center</div>
                        <div class="footer-nav-item" @click="goTo('about')">About Us</div>
                    </div>
                    <div class="resources-wrapper">
                        <div class="quick-links-title footer-title">Resources</div>
                        <div class="footer-nav-item" @click="goTo('market-news')">Market News</div>
                        <div class="footer-nav-item" @click="goTo('guides')">Investment Guides</div>
                        <div class="footer-nav-item" @click="goTo('learn')">Learn</div>
                    </div>
                    <div class="legal-wrapper">
                        <div class="quick-links-title footer-title">Legal</div>
                        <div class="footer-nav-item" @click="goTo('terms')">Terms of Service</div>
                        <div class="footer-nav-item" @click="goTo('risk')">Risk Disclosure</div>
                    </div>
                </div>
                <div class="line"></div>

                <div class="rights-wrapper">
                    <div class="rights-content" style="text-align: center;">
                        <div class="rights-title">© 2025 Stoxly. All rights reserved.</div>
                        <div class="right-description">Investing involves risk.
                            This material does not constitute an investment advice.</div>
                    </div>
                </div>
            </footer>
        </div>

    </div>
</template>

<script setup>
import router from '@/router';

function goTo(name) {
    router.push({
        name: name,
    })
}
</script>

<style scoped>
.rights-content * {
    margin-top: 10px;
}

.rights-content {
    color: #9ca3af;
}

.rights-title {
    font-size: 16px;
}

.rights-description {
    font-size: 14px;
}

.line {
    margin: 2rem 0;
    width: 100%;
    height: 1px;
    background-color: #1d283a;
}

.contacts-title {
    color: #33c3f0;
    font-weight: bold;
}

.contacts-icon {
    color: #33c3f0;
    font-size: 1.5rem;
    margin-right: 10px !important;
    text-align: left;
    width: fit-content;
    width: 30px;
}

.center {
    align-items: center;
}

.footer-title {
    font-weight: bold;
    font-size: 1.4rem;
}

.footer-nav-item {
    font-size: 16px;
    margin: 5px 0;
}

.contacts-wrapper * {
    margin: 5px 0;
}

.footer-nav-item:hover {
    color: #33c3f0;
    cursor: pointer;
}

footer {
    padding: 5% 0;
}
</style>