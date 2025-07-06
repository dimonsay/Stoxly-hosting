<template>
    <div class="invest-wrapper">
        <div class="container">
            <h2 class="block-title">Invest in 3 Easy Steps</h2>
            <div class="block-description">
                Starting your investment journey has never been simpler. Take control of your future today.
            </div>
            <div class="flex justify-around steps-wrapper">
                <div class="steps-item step-register">
                    <div class="step-title-wrapper flex reg-color" style="align-items: center;">
                        <div class="step-logo"><i class="fa-solid fa-user-plus"></i></div>
                        <div class="step-title">
                            <div class="step-number">Step 1</div>
                            <div class="step-name">Register</div>
                        </div>
                    </div>
                    <div class="step-description">
                        Create your free account in minutes—just an email and phone number needed.
                    </div>
                </div>
                <div class="steps-item step-deposit">
                    <div class="step-title-wrapper flex deposit-color" style="align-items: center;">
                        <div class="step-logo"><i class="fa-regular fa-credit-card"></i></div>
                        <div class="step-title">
                            <div class="step-number">Step 2</div>
                            <div class="step-name">Deposit</div>
                        </div>
                    </div>
                    <div class="step-description">
                        Add funds easily using credit cards or bank transfers.
                    </div>
                </div>
                <div class="steps-item step-invest">
                    <div class="step-title-wrapper flex invest-color" style="align-items: center;">
                        <div class="step-logo"><i class="fa-solid fa-arrow-trend-up"></i></div>
                        <div class="step-title">
                            <div class="step-number">Step 3</div>
                            <div class="step-name">Invest</div>
                        </div>
                    </div>
                    <div class="step-description invest">
                        Choose from thousands of opportunities and build your portfolio with a few clicks.
                    </div>
                </div>

            </div>
            <div class="invest-btn">
                Become an Investor
            </div>
        </div>
    </div>
</template>

<style scoped>
.invest-btn {
    margin: 0 auto;
    width: 300px;
    text-align: center;
    font-size: 18px;
}

.invest-btn:hover {
    cursor: pointer;
}

.steps-wrapper {
    margin-top: 20px;
    --reg-color: #33c3f0;
    --deposit-color: #6366f1;
    --invest-color: #f97316;
    --border-radius: 8px;
    padding: 40px;
    padding-top: 20px;
}


.step-name {
    font-weight: bold;
}

.step-description {
    padding: 25px;
    min-height: 125px;
    background-color: #161a23;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    font-size: 16px;
}

.reg-color {
    background-color: var(--reg-color);
}

.deposit-color {
    background-color: var(--deposit-color);
}

.invest-color {
    background-color: var(--invest-color);
}

.step-register:hover {
    box-shadow: 0 0 0.6rem var(--reg-color);
}

.step-deposit:hover {
    box-shadow: 0 0 0.6rem var(--deposit-color);
}

.step-invest:hover {
    box-shadow: 0 0 0.6rem var(--invest-color);
}

.steps-item {
    width: 350px;
    border-radius: var(--border-radius);
}

.step-title-wrapper {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    width: 100%;
    padding: 25px;
    font-size: 20px;
}

.step-number {
    font-size: 14px;
}

.step-logo {
    margin-right: 20px;
    font-size: 2.5rem;
}

.invest-wrapper {
    padding: 40px;
}
</style>