<template>
    <div class="security-block-wrapper">
        <div class="container">
            <div class="block-title">Your Safety Comes First</div>
            <div class="block-description">
                We use the strongest security measures to protect your money and personal info—so you can invest with peace of mind.
            </div>
            <div class="security-levels-wrapper flex justify-around">
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-shield"></i>
                    </div>
                    <div class="security-title">Bank-Level Protection</div>
                    <div class="security-description">Your data and investments are shielded by 256-bit encryption and multi-factor authentication, the same trusted tech banks rely on.</div>
                </div>
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-suitcase"></i>
                    </div>
                    <div class="security-title">Fully Licensed and Regulated</div>
                    <div class="security-description">We operate under strict financial laws worldwide, giving you
the confidence your investments are handled responsibly.</div>
                </div>
                <div class="security-level">
                    <div class="security-logo">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <div class="security-title">Your Assets Are Protected</div>
                    <div class="security-description">Your funds are held securely in separate accounts and
protected by comprehensive insurance — ensuring your peace
of mind every step of the way.</div>
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