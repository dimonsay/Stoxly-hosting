<template>
    <div class="about-wrapper">
        <div class="container">
            <div class="main-wrapper flex justify-between gap-20">
                <div class="story flex-col justify-between gap-5">
                    <div class="about mb-10" >
                    <div class="pageTitle">Our Story</div>
                    <div class="pageDescription flex flex-col grey">
                        Stoxly began with a simple question: Why is investing still so
                        difficult for so many people?
                        Our founders, a team of traders and professionals with years of
                        industry experience, saw firsthand how overwhelming,
                        impersonal, and even discouraging investing platforms could
                        be — especially for those just beginning their journey. The
                        systems were often built for scale, not for clarity. Support was
                        automated. Trust was assumed, not earned.
                        We knew there had to be a better way.
                        So we set out to create a platform that values people over
                        processes. A place where investing is straightforward, support
                        is human, and every user — no matter their level of experience 
                        — is treated with patience, respect, and care.
                        Being a growing company means we can stay close to the
                        people who matter most: our users. We listen. We improve. We
                        build around real needs, not assumptions. And we offer
                        something many large platforms can’t — time, attention, and a
                        genuine sense of community.
                        Our story is still unfolding. And it grows with every new investor
                        who joins us.
                    </div>
                    </div>

                    <div class="values  mb-10">
                    <div class="pageTitle">Our Values</div>
                    <div class="pageDescription flex flex-col grey">
At the heart of Stoxly is a belief that investing should be
human. Not just in how platforms are built, but in how people
are treated.
We start with empathy. We know that each investor brings a
unique story — different goals, different fears, different levels of
knowledge. That’s why we don’t make assumptions. We
explain. We educate. We answer questions with care, and we
never lose sight of the person behind the screen.
We value trust — and we work to earn it every day. We believe
transparency builds strong relationships, so we’re open about
how we operate, what we offer, and how we protect our users.
We also believe in community. Stoxly is more than a service — 
it’s a space where people invest together, learn together, and
support each other. From first-time investors to experienced
traders, everyone has a place here.
And of course, we take security seriously. Behind the scenes,
we use the same protections trusted by financial institutions
around the world — so you can focus on your goals, knowing
your assets and information are safe.
                    </div>
                    </div>

                    <div class="choose  mb-10">
                    <div class="pageTitle">Why Choose Us</div>
                    <div class="pageDescription flex flex-col grey">
There are many platforms that promise access to global
markets. What sets Stoxly apart is the way we bring clarity,
support, and community into that experience.
Our platform was built by professionals with years of real
trading experience — people who understand both the markets
and the mindset of the investor. We've designed every part of
Stoxly to be intuitive, clear, and fair. With zero trading fees, no
hidden charges, and access to thousands of global
instruments, we offer the tools investors need to succeed — 
without unnecessary noise or complication.
But beyond features, we offer something more: a commitment
to real people. We respond to questions personally. We build
based on feedback. We care about your experience, and we
grow with you.
Choosing Stoxly means choosing a platform that puts people
first. Because to us, investing isn’t just about numbers — it’s
about trust, confidence, and being part of something 
                    </div>
                    </div>
                </div>

                <div class="values flex-col flex">
                    <div class="pageTitle">Our Core Values</div>
                    <div class="pageDescription flex flex-col grey">
                        <div class="value">
                            <div class="value-title blue">People First</div>
                            <div class="value-description grey">We put real people at the center of everything we build—
offering support, clarity, and care at every step.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue bold">Trust Through Transparency</div>
                            <div class="value-description grey">We believe in earning trust by being open about how we
operate, how we protect your assets, and how we serve our
users</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Simplicity Without Compromise</div>
                            <div class="value-description grey">We make investing accessible and easy to understand—
without sacrificing quality, performance, or professionalism.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Community-Driven</div>
                            <div class="value-description grey">We’re more than a platform. We’re building a space where
investors grow together—sharing knowledge, support, and
experience.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Education Over Assumption</div>
                            <div class="value-description grey">We guide, explain, and empower. Whether you're a beginner or
experienced, we’re here to help you invest with confidence.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Security by Design</div>
                            <div class="value-description grey">We use industry-leading technology to keep your data and
assets protected—so you can focus on growing your portfolio.</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="journey-wrapper">
                <div class="pageTitle">Our Journey</div>

                <div class="journey flex" style="align-items: center;" v-for="journey in journey">
                    <div class="year">{{ journey.year }}</div>
                    <div class="achievement flex flex-col">
                        <div class="achievement-title" style="font-weight: bold;">{{ journey.achievement }}</div>
                        <div class="achievement-description grey">{{ journey.description }}</div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
.about-wrapper {
    padding: 40px 0;
}

.journey-wrapper {
    padding-bottom: 20px;
}

.journey {
    padding: 10px 0;
}

.year {
    background-color: #33c3f0;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    width: 80px;
    text-align: center;
}

.achievement-title {
    font-size: 1.4rem;
}

.value-title {
    font-weight: bold;
    font-size: 1.4rem;
}

.value {
    margin: 5px 0 !important;
}

.pageDescription {
    max-width: 600px;
}

.pageDescription * {
    margin: 10px 0;
}
</style>

<script setup>


// const journey = reactive([
//     { year: 2018, achievement: 'Company Founded', description: 'Stoxly was established with the mission to make global investments accessible to everyone.' },
//     { year: 2019, achievement: 'First Platform Launch', description: 'Released our first trading platform with support for major global stock markets.' },
//     { year: 2020, achievement: 'Expansion to Crypto & ETFs', description: 'Added support for cryptocurrency trading and expanded our ETF offerings.' },
//     { year: 2021, achievement: 'Global Expansion', description: 'Expanded operations to 30+ countries and added support for 15 languages.' },
// ])

</script>