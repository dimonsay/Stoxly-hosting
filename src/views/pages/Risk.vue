<template>
    <Title title="Risk Disclosure"
        description="Important information about the risks associated with investment activities" class="block" />

    <div class="risk-content-wrapper block">
        <div class="container">
            <div class="risk-wrapper">
                <div class="main-risks-wrapper mb20">
                    <div class="risks-title">General Investment Risks</div>
                    <div class="risk-grid">
                        <div class="main-risk page-tile flex flex-col" v-for="risk in mainRisks">
                            <div class="risk-title">{{ risk.title }}</div>
                            <div class="risk-description grey">{{ risk.description }}...</div>
                        </div>
                    </div>
                </div>

                <div class="specific-risks-wrapper mb20">
                    <div class="risks-title">Specific Investment Risks</div>
                    <div class="risk-grid">
                        <div class="main-risk page-tile" v-for="risk in specificRisks">
                            <div class="risk-title">{{ risk.title }}</div>
                            <div class="list-wrapper">
                                <div class="list-element flex" style="align-items: center;" v-for="list in risk.list">
                                    <i class="pi pi-circle-fill blue"></i>
                                    <div>{{ list }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="considerations-wrapper grid mb20">
                    <div class="risks-title">Important Considerations</div>
                    <div class="risk-grid">
                        <div class="main-risk page-tile flex flex-col" v-for="risk in consideration">
                            <div class="risk-title">{{ risk.title }}</div>
                            <div class="risk-description grey"> {{ risk.description }}</div>
                        </div>
                    </div>
                </div>

                <div class="managment-wrapper mb20">
                    <div class="risks-title">Risk Management</div>
                    <div class="main-risk page-tile">
                        <div class="list-wrapper">
                            <div class="list-title">Stoxly encourages all users to:</div>
                            <div class="list-element flex" style="align-items: center;" v-for="list in riskManagement">
                                <i class="pi pi-circle-fill blue"></i>
                                <div>{{ list }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page-tile update grey">
                    <div class="update-text">This risk disclosure statement is not exhaustive and does not disclose all
                        risks associated with investing. You should carefully consider whether trading or investing is
                        suitable for you in light of your financial resources, experience, and objectives. If you have
                        any questions, please contact support@stoxly.com.</div>
                    <div class="last-update" style="margin-top: 10px;">Last update: {{ lastUpdate }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { reactive } from 'vue';
import Title from '../uikit/Title.vue';

const lastUpdate = "May 17, 2025"

const mainRisks = reactive([
    { title: 'Market Risk', description: 'The market value of securities may decline, sometimes rapidly or unpredictably, due to general market' },
    { title: 'Liquidity Risk', description: 'Liquidity risk exists when particular investments are difficult to purchase or sell. Certain investments may be subject to' },
    { title: 'Credit Risk', description: 'Credit risk is the risk that an issuer or counterparty will be unable or unwilling to meet a commitment that it has entered int' },
    { title: 'Currency Risk', description: 'Investments in foreign securities involve currency risk. The value of foreign investments may be affected by changes ' },
    { title: 'Inflation Risk', description: 'Inflation risk is the risk that the purchasing power of your investment returns will be less than expected due to a general' },
])

const specificRisks = reactive([
    {
        title: 'Stocks/Equities', list: [
            "Dividend risk: Dividends may be reduced or eliminated at the discretion of the company",
            "Volatility: Stock prices can fluctuate rapidly over short time periods",
            "Company-specific risk: Events affecting a specific company can impact the value of its stock",
        ]
    },
    {
        title: 'Exchange-Traded Funds (ETFs)', list: [
            "Tracking error: An ETF may not perfectly track its underlying index",
            "Premium/discount risk: An ETF may trade above or below its net asset value",
            "Concentration risk: Sector or themed ETFs may be less diversified",
        ]
    },
    {
        title: 'Cryptocurrencies', list: [
            "Extreme volatility: Prices can fluctuate dramatically in short periods",
            "Regulatory uncertainty: Regulations governing cryptocurrencies are evolving and vary by jurisdiction",
            "Security risks: Digital assets are susceptible to hacking and theft",
            "Limited history: Many cryptocurrencies have a limited operating history",
        ]
    },
])

const consideration = reactive([
    { title: 'Diversification', description: 'Diversification does not ensure a profit or guarantee against loss in a declining market. It is a technique that helps manage investment risk by spreading investments across various asset classes, industries, or geographic regions.' },
    { title: 'Past Performance', description: 'Past performance is not indicative of future results. The value of investments and income from them can fluctuate and go down as well as up, and you may not get back the amount originally invested.' },
    { title: 'Long-Term Investment', description: 'Investing should be viewed as a long-term commitment. Short-term trading involves additional risks and may not be suitable for all investors.' }
])

const riskManagement = reactive([
    "Define your investment objectives and time horizon",
    "Understand your risk tolerance before investing",
    "Consider diversifying your portfolio across different asset classes",
    "Only invest funds that you can afford to lose",
    "Regularly review and rebalance your portfolio",
    "Consult with a financial advisor for personalized advice",
])
</script>

<style scoped>
.list-element {
    padding: 5px 0;
}

.page-tile {
    font-size: 1.1rem;
}

.list-title {
    margin-bottom: 10px;
}

.risk-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
}



.list-wrapper .pi {
    font-size: .4rem;
    margin-right: 10px;
}


.mb20 {
    margin-bottom: 20px;
}

.risk-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 2fr);
}

.risks-title {
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 10px;
}

.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>