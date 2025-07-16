<template>
    <div class="help-wrapper">
        <div class="container">
            <div class="request-question-wrapper flex justify-between">
                <div class="request-wrapper" style="width: 40%">
                    <div class="pageTitle">Send Us a Request</div>

                    <div class="page-tile tile-hover req-form">
                        <div class="form-container text-left" style="width: 100%; min-width: 270px">
                            <IconField>
                                <Select v-model="formData.issue" type="text" autocomplete="off"
                                    placeholder="Select a category" class="block mb-5"
                                    @blur="validateIssue(formData.issue, 'first')" :options="issues"
                                    :class="{ 'error-border': errors.issue }"
                                    style="width: 100%; min-width: 270px; padding: 0px" />
                            </IconField>

                            <IconField>
                                <InputText v-model="formData.subject" type="text" autocomplete="off"
                                    @blur="validateSubject(formData.subject)" placeholder="Subject" class="block mb-5"
                                    :class="{ 'error-border': errors.subject }" style="width: 100%; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <Textarea v-model="formData.message" type="text" autocomplete="off"
                                    placeholder="Describe your problem" class="block mb-5"
                                    @blur="validateMessage(formData.message)"
                                    :class="{ 'error-border': errors.message }"
                                    style="width: 100%; min-width: 270px; min-height: 200px" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-envelope" />
                                <InputText v-model="formData.email" type="mail" autocomplete="off" placeholder="Email"
                                    class="block mb-5" :class="{ 'error-border': errors.email }"
                                    @blur="validateEmail(formData.email)" style="width: 100%; min-width: 270px" />
                            </IconField>


                        </div>

                        <div class="button-container text-left" style="width: 100%; min-width: 270px">
                            <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                                {{ serverError }}
                            </div>
                            <div class="buttons flex items-center gap-4">
                                <Button type="button" @click="submit()" severity="info" class="block"
                                    style="width: 100%;">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="faq-wrapper">
                    <div class="pageTitle">Frequently Asked Questions</div>

                    <div class="faq page-tile tile-hover" v-for="faq in faqs">
                        <div class="faq-question">{{ faq.question }}</div>
                        <div class="faq-answer grey">{{ faq.answer }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import { reactive, ref } from 'vue';

const faqs = reactive([
    { question: 'How do I create an account?', answer: 'It’s easy! Click the Invest button, enter your details, verify your email, and you’ll be ready to start investing in no time.' },
    { question: 'What payment methods are accepted?', answer: 'We accept bank transfers and credit or debit card payments. All transactions are fully secure and encrypted.' },
    { question: 'How long does it take to process withdrawals?', answer: 'Most withdrawals are processed within 1–2 business days, depending on your bank and payment method.' },
    { question: 'Is my investment protected?', answer: 'Absolutely. We use bank-level security and keep your funds in separate accounts, backed by comprehensive insurance for your peace of mind.' },
    { question: 'What are the fees for trading?', answer: 'We charge zero fees on trades — no hidden costs, no surprises. You can check your account dashboard anytime for full details.' }
]);

const issues = ref([
    'Deposit',
    'Withdrawal',
    'Account',
    'Investing',
    'Promotions & Referral',
    'KYC',
    'Technical Issues/ Bugs',
    'Other Questions'
]);

const errors = reactive({
    subject: false,
    issue: false,
    email: false,
    message: false
});

const formData = reactive({
    subject: '',
    issue: '',
    message: '',
    email: ''
});

const serverError = ref('');

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = true;
    } else {
        errors.email = false;
    }
}

function validateIssue() {
    if (!formData.issue) {
        errors.issue = true;
    } else {
        errors.issue = false;
    }
}

function validateSubject() {
    if (!formData.subject || formData.subject.length < 3) {
        errors.subject = true;
    } else {
        errors.subject = false;
    }
}

function validateMessage() {
    if (!formData.message || formData.message.length < 3) {
        errors.message = true;
    } else {
        errors.message = false;
    }
}

async function submit() {
    validateIssue();
    validateSubject();
    validateMessage();
    validateEmail();

    serverError.value = '';
    const hasError = Object.values(errors).some((error) => error);
    if (hasError) {
        console.warn('Form error');
        return;
    }
    else if (!hasError) {
        const data = {
            title: formData.subject,
            description: formData.message,
            category: formData.issue,
            email: formData.email,
        };

        try {
            const response = await apiClient.adminMessage(data)
            if (response == 201) {
                formData.subject = ''
                formData.issue = ''
                formData.message = ''
                formData.email = ''
            } else {
                serverError.value = response?.error || response?.message || 'Ошибка отправки сообщения';
            }
        } catch (err) {
            serverError.value = err.response?.data?.error || err.response?.data?.message || err.message || 'Ошибка отправки сообщения';
        }
    }
}
</script>

<style scoped>
.faq {
    display: block !important;
    max-width: 600px;
    min-height: 100px !important;
    margin-bottom: 30px;
}

.faq-answer {
    margin-top: 10px;
    font-size: 1rem;
}

.faq-question {
    font-weight: bold;
    font-size: 1.4rem;
}

.request-question-wrapper {
    padding: 40px 0;
}

.req-form:hover {
    border: 1px solid transparent !important;
    outline: none !important;
    transition: none;
}

.button {
    background-color: #33c3f0 !important;
    font-weight: bold;
    color: white;
}

.form-container {
    width: 100% !important;
}

.tile-title {
    font-weight: bold;
    font-size: 1.8rem;
}

.tile-description {
    font-size: 1.25rem;
}

.tile-logo {
    color: #33c3f0;
    font-size: 1.8rem;
}

.learn-more:hover {
    cursor: pointer;
}

.page-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 200px;
}

.tiles-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px 0;
}

.error-border {
    border: 1px solid red !important;
}

@media (max-width: 768px) {
    .request-question-wrapper {
        padding-top: 10px;
        flex-direction: column !important;
        gap: 32px;
        align-items: stretch !important;
    }

    .request-wrapper {
        width: 100% !important;
        margin-bottom: 24px;
    }

    .faq-wrapper {
        width: 100% !important;
        margin-top: 0;
    }

    .faq {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        margin-bottom: 20px;
    }
}
</style>
