<template>
    <div class="help-wrapper">
        <div class="container">
            <div class="tiles-wrapper">
                <div class="page-tile tile-hover">
                    <i class="pi pi-question-circle tile-logo"></i>
                    <div class="tile-title">Frequently Asked Questions</div>
                    <div class="tile-description">Find answers to common questions about our platform, investments, and
                        account management.</div>
                    <div class="learn-more flex" style="align-items: center; color: #33c3f0;">
                        <div class="text" style="margin-right: 10px;">Learn more</div>
                        <i class="pi pi-arrow-right"></i>
                    </div>
                </div>
                <div class="page-tile tile-hover">
                    <i class="pi pi-book tile-logo"></i>
                    <div class="tile-title">Frequently Asked Questions</div>
                    <div class="tile-description">Find answers to common questions about our platform, investments, and
                        account management.</div>
                    <div class="learn-more flex" style="align-items: center; color: #33c3f0;">
                        <div class="text" style="margin-right: 10px;">Learn more</div>
                        <i class="pi pi-arrow-right"></i>
                    </div>
                </div>
                <div class="page-tile tile-hover">
                    <i class="fa-solid fa-user-graduate tile-logo"></i>
                    <div class="tile-title">Frequently Asked Questions</div>
                    <div class="tile-description">Find answers to common questions about our platform, investments, and
                        account management.</div>
                    <div class="learn-more flex" style="align-items: center; color: #33c3f0;">
                        <div class="text" style="margin-right: 10px;">Learn more</div>
                        <i class="pi pi-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div class="request-question-wrapper flex justify-between">
                <div class="request-wrapper " style="width: 40%;">
                    <div class="pageTitle">Send Us a Request</div>

                    <div class="page-tile tile-hover req-form">
                        <div class="form-container text-left" style="width: 100%; min-width: 270px;">
                            <IconField>
                                <Select v-model="formData.issue" type="text" autocomplete="off"
                                    placeholder="Select a category" class="block mb-5"
                                    @blur="validateName(formData.issue, 'first')" :options="issues"
                                    :class="{ 'error-border': errors.issue }"
                                    style="width: 100%; min-width: 270px; padding: 0px;" />
                            </IconField>

                            <IconField>
                                <InputText v-model="formData.subject" type="text" autocomplete="off"
                                    placeholder="Subject" class="block mb-5" :class="{ 'error-border': errors.subject }"
                                    @blur="validateName(formData.subject, 'last')"
                                    style="width: 100%; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <Textarea v-model="formData.message" type="text" autocomplete="off"
                                    placeholder="Describe your problem" class="block mb-5"
                                    @blur="validateUsername(formData.message)"
                                    :class="{ 'error-border': errors.message }"
                                    style="width: 100%; min-width: 270px; min-height: 200px;" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-envelope" />
                                <InputText v-model="formData.email" type="mail" autocomplete="off" placeholder="Email"
                                    class="block mb-5" :class="{ 'error-border': errors.email }"
                                    @blur="validateEmail(formData.email)" style="width: 100%; min-width: 270px" />
                            </IconField>

                            <div class="mt-2 flex flex-wrap hidden">
                                <Checkbox type="checkbox" id="confirmed" :binary="true" class="mr-2" />
                                <label for="confirmed" class="text-surface-900 dark:text-surface-0 font-medium mr-2">I
                                    have
                                    read the</label>
                                <a class="text-surface-600 dark:text-surface-200 hover:text-primary cursor-pointer">Terms
                                    and Conditions</a>
                            </div>
                        </div>

                        <div class="button-container mt-6 text-left" style="width: 100%; min-width: 270px">
                            <div class="buttons flex items-center gap-4">
                                <Button type="button" @click="submit()" severity="info" class="block"
                                    style="width: 100%; margin-bottom: 32px">Submit</Button>
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
import { reactive, ref } from 'vue';

const faqs = reactive([
    { question: 'How do I create an account?', answer: 'Creating an account is simple. Click the Invest button, fill in your personal details,verify your email, and complete the identity verification process to start investing.' },
    { question: 'What payment methods are accepted?', answer: 'We accept bank transfers, credit/debit cards, and various electronic payment methods depending on your region. All transactions are secure and encrypted.' },
    { question: 'How long does it take to process withdrawals?', answer: 'Most withdrawal requests are processed within 1-3 business days, depending on your payment method and bank processing times.' },
    { question: 'Is my investment protected?', answer: 'Yes, we implement bank-level security measures and segregated accounts. Additionally, investments are protected up to $500,000 through our insurance policy.' },
    { question: 'What are the fees for trading?', answer: 'Our fee structure is transparent with no hidden costs. We offer competitive rates based on your account level and trading volume. View our full fee schedule in your account dashboard.' },
])

const issues = ref([
    'Option',
    'Option',
    'Option',
    'Option',
    'Option',
    'Option',
]);

const errors = reactive({
    subject: false,
    issue: false,
    email: false,
    message: false
})

const formData = reactive({
    subject: '',
    issue: '',
    email: '',
    message: ''
})

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
</style>