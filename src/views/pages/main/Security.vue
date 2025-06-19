<template>
    <div class="security-block-wrapper">
        <div class="container">
            <div class="block-title">Your Security Is Our Priority</div>
            <div class="block-description">
                We implement industry-leading security measures to ensure your investments
                and personal data remain protected.
            </div>
            <div class="security-levels-wrapper flex justify-around">
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-shield"></i>
                    </div>
                    <div class="security-title">Bank-Level Security</div>
                    <div class="security-description">256-bit encryption and multi-factor authentication keep your data
                        and investments secure at all times.</div>
                </div>
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-suitcase"></i>
                    </div>
                    <div class="security-title">Regulatory Compliance</div>
                    <div class="security-description">Licensed and regulated in major jurisdictions worldwide, ensuring
                        adherence to financial regulations.</div>
                </div>
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <div class="security-title">Asset Protection</div>
                    <div class="security-description">Investments are held in segregated accounts, protected up to
                        $500,000 through our insurance policy.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.security-levels-wrapper {
    margin-top: 40px;
}

.security-logo {
    font-size: 50px;
    color: #33c3f0;
}

.security-level {
    text-align: center;
    padding: 30px;
    width: 25%;
    border-radius: 20px;
    background-color: #161a23;
}

.security-level * {
    margin-top: 10px;
}

.security-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.security-description {
    font-size: 16px;
    color: #c4c9ce;
}
</style>