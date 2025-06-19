<template>
    <Title title="Terms of Service" description="Please read these terms carefully before using the Stoxly platform"
        class="block" />

    <div class="terms-content-wrapper block">
        <div class="container">
            <div class="terms-wrapper">
                <div class="term" v-for="(term, index) in terms">
                    <div class="term-title">{{ index + 1 }}. {{ term.title }}</div>
                    <div class="term-description">{{ term.description }}</div>
                    <div class="term-list-wrapper" v-if="term.list">
                        <ul class="term-list" v-for="list in term.list">
                            <li>{{ list }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="last-update grey" style="margin-top: 20px;">Last update : {{ lastUpdate }}</div>
        </div>
    </div>

</template>

<script setup>
import { reactive } from 'vue';
import Title from '../uikit/Title.vue';

const lastUpdate = "May 17, 2025";

const terms = reactive([
    { title: 'Introduction', description: 'These Terms of Service ("Terms") govern your access to and use of the Stoxly platform, including our website, mobile applications, and all related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.' },
    { title: 'Eligibility', description: 'To use our Services, you must be at least 18 years old and capable of forming a binding contract with Stoxly. If you are accessing our Services on behalf of a business or other legal entity, you represent that you have the authority to bind that entity to these Terms.' },
    { title: 'Account Registration', description: 'When you register for an account with Stoxly, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.' },
    {
        title: 'Investment Services', description: 'Stoxly provides access to various investment opportunities across global markets. By using our investment services, you acknowledge that:', list: [
            "All investments carry risk, including the potential loss of principal",
            "Past performance is not indicative of future results",
            "Stoxly does not guarantee any investment outcomes",
            "You should carefully consider your investment objectives, risk tolerance, and financial situation before investing",
            "You are solely responsible for your investment decisions",
        ]
    },
    { title: 'Fees and Charges', description: 'Stoxly charges fees for certain services as outlined in our Fee Schedule, which is incorporated into these Terms by reference. We reserve the right to modify our fees at any time with reasonable notice to users.' },
    { title: 'Privacy', description: 'Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you consent to our collection and use of your data as described in our Privacy Policy.' },
    { title: 'Intellectual Property', description: 'All content, features, and functionality available through our Services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by Stoxly or our licensors and are protected by copyright, trademark, and other intellectual property laws.' },
    {
        title: 'Prohibited Activities', description: 'When using our Services, you agree not to:', list: [
            "Violate any applicable laws or regulations",
            "Engage in market manipulation or other fraudulent activities",
            "Use our Services for money laundering or terrorist financing",
            "Attempt to access unauthorized areas of our systems",
            "Upload or transmit viruses, malware, or other malicious code",
            "Interfere with or disrupt the integrity of our Services",
        ]

    },
    { title: 'Termination', description: 'We may suspend or terminate your access to our Services at any time, for any reason, without notice. Upon termination, your right to use our Services will immediately cease.' },
    { title: 'Disclaimer of Warranties', description: 'Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.' },
    { title: 'Limitation of Liability', description: 'In no event shall Stoxly or our affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our Services.' },
    { title: 'Governing Law', description: 'These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.' },
    { title: 'Changes to Terms', description: 'We may modify these Terms at any time. If we make material changes, we will notify you through our Services or by other means. Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms.' },
    { title: 'Contact Us', description: 'If you have any questions about these Terms, please contact us at legal@stoxly.com.' },
])

</script>

<style scoped>
.term {
    padding: 10px 0;
}

.term-title {
    font-weight: bold;
    font-size: 1.4rem;
}

.term-description {
    font-size: 1.1rem;
}

.term-list {
    list-style: inside;
}

.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>