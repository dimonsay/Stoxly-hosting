<template>
    <div class="about-wrapper">

        <div class="container">
            <div class="flex justify-around">
                <div class="about-info">
                    <div class="block-title left">
                        About Stoxly
                    </div>
                    <div class="block-description left">
                        Stoxly was founded in 2021 with a clear mission: to make global investment opportunities
                        accessible
                        to
                        everyone. Our team of financial experts and technology innovators has developed a platform that
                        simplifies investing while providing professional-grade tools and security.
                        <br /> <br />
                        Today, we serve over 500,000 customers across 30+ countries, offering access to more than 10,000
                        investment instruments. Our users range from first-time investors to seasoned traders, all
                        benefiting
                        from our intuitive platform and educational resources.
                    </div>
                </div>
                <div class="advantages">
                    <div class="right">
                        <div class="about-prev">
                            <div class="security-prev">
                                <div class="advantage flex">
                                    <div class="advantage-logo">
                                        <i class="fa-solid fa-shield"></i>
                                    </div>
                                    <div class="advantage-info">
                                        <div class="advantage-title">Security</div>
                                        <div class="advantage-description">We make security our top priority,
                                            implementing the highest standards to protect your data and assets.</div>
                                    </div>
                                </div>

                                <div class="advantage flex">
                                    <div class="advantage-logo">
                                        <i class="fa-solid fa-globe"></i>
                                    </div>
                                    <div class="advantage-info">
                                        <div class="advantage-title">Accessibility</div>
                                        <div class="advantage-description">We believe everyone deserves access to global
                                            markets regardless of location or investment size.</div>
                                    </div>
                                </div>

                                <div class="advantage flex">
                                    <div class="advantage-logo">
                                        <i class="fa-solid fa-users"></i>
                                    </div>
                                    <div class="advantage-info">
                                        <div class="advantage-title">Community</div>
                                        <div class="advantage-description">We build a supportive community of investors
                                            through education, resources, and responsive support.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.advantages {
    width: 100%;
}

.advantage {
    border: 1px solid #1d283a;
    border-radius: 8px;
    align-items: center;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #161a23;
}

.advantage-logo {
    margin-right: 30px;
    font-size: 40px;
    color: #33c3f0;
}

.advantage-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.advantage-description {
    color: #c3c6cd;
}

.left {
    text-align: left;
}

.block-description {
    width: 60%;
}
</style>