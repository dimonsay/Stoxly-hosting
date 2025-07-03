<template>
    <div class="main-block-wrapper">
        <div class="container">
            <div class="main-block flex justify-between">
                <div class="text-block">
                    <div class="main-block-title">
                        Invest<br />
                        Without <br />
                        Borders <br />
                    </div>
                    <div class="main-block-description">
                        Discover how easy it is to grow your wealth, even if you're new to investing. Start today and take control of your financial future.
                    </div>

                    <div class="buttons-wrapper">
                        <div class="get-started-btn btn flex invest-btn"
                            style="text-align: center; align-items: center;">
                            <div class="button-title">Get started</div>
                            <div class="arrow-btn-icon">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="portfolio-wrapper">
                    <div class="portfolio">
                        <div class="portfolio-value flex justify-between">
                            <div class="value">
                                <div class="portfolio-value-title">Portfolio value</div>
                                <div class="portfolio-value-number">$24,568.80</div>
                            </div>
                            <div class="portfolio-profit">+5.23%</div>
                        </div>
                        <div class="portfoilo-trend">
                            <div class="trend"></div>
                            <div class="monthes flex justify-between">
                                <div class="month">Jan</div>
                                <div class="month">Feb</div>
                                <div class="month">Mar</div>
                                <div class="month">Apr</div>
                                <div class="month">May</div>
                                <div class="month">Jun</div>
                            </div>
                        </div>
                        <div class="main-stocks flex justify-between">
                            <div class="block">
                                <div class="stock-trend">
                                    <div class="stock-title">AAPL</div>
                                    <div class="stock-price">$183.26</div>
                                </div>
                                <div class="stock-trend">
                                    <div class="stock-title">MSFT</div>
                                    <div class="stock-price">$183.26</div>
                                </div>
                            </div>
                            <div class="block">
                                <div class="stock-trend">
                                    <div class="stock-title">AMZN</div>
                                    <div class="stock-price">$183.26</div>
                                </div>
                                <div class="stock-trend">
                                    <div class="stock-title">TSLA</div>
                                    <div class="stock-price">$183.26</div>
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
.main-stocks {
    width: 100%;
    margin-top: 10px;
}

.invest-btn {
    padding: 15px 30px !important;
}

.invest-btn:hover {
    cursor: pointer !important;
}

.stock-trend {
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid #3d4553;
    width: 200px;
    border-radius: 6px;
    background: linear-gradient(to right, #262f3d 100%, #283340 0%);
}

.portfolio-value-title {
    font-size: 1.2rem;
}

.portfolio-value-number {
    font-size: 1.4rem;
}

.portfolio {
    padding: 40px;
    background-color: #1d2837;
    width: 550px;
    border-radius: 30px;
    box-shadow: 0 0 1rem #33c3f0;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.trend {
    height: 200px;
    background-color: rgba(0, 128, 0, 0.562);
    margin-bottom: 10px;
    border-radius: 10px;
}

.portfolio-profit {
    border-radius: 12px;
    padding: 4px 12px;
    background-color: rgba(0, 128, 0, 0.384);
    border: 1px solid green;
}

.portfolio-title {
    font-size: 1.2rem;
    color: #dedfe0;
}

.portfolio-value {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.text-block {
    width: 40%;
}

.buttons-wrapper {
    margin-top: 40px;
}

.get-started-btn {
    align-items: center;
    width: fit-content;
}

.button-title {
    margin-right: 10px;
}

.main-block {
    padding: 40px;
}

.main-block-title {
    font-weight: bold;
    font-size: 4rem;
}

.main-block-description {
    color: #dedfe0;
    font-size: 1.4rem;
}
</style>

<script setup>

</script>