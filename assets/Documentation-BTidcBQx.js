import{_ as s,c as i,e as a,b as t,a as o}from"./index-BnF8l7AT.js";const n={},l={class:"card"};function d(r,e){return o(),i("div",l,e[0]||(e[0]=[a(`<div class="font-semibold text-2xl mb-4" data-v-76f4817f>Documentation</div><div class="font-semibold text-xl mb-4" data-v-76f4817f>Get Started</div><p class="text-lg mb-4" data-v-76f4817f> Atlantis is an application template and is based on <a href="https://github.com/vuejs/create-vue" class="font-medium text-primary hover:underline" data-v-76f4817f>create-vue</a>, the recommended way to start a Vite-powered Vue projects. </p><p class="text-lg mb-4" data-v-76f4817f>To get started, extract the contents of the zip file, cd to the directory and install the dependencies with npm, yarn or pnpm.</p><pre class="app-code" data-v-76f4817f><code data-v-76f4817f>npm install
npm run dev</code></pre><p class="text-lg mb-4" data-v-76f4817f>Navigate to <i class="bg-highlight px-2 py-1 rounded-border not-italic text-base" data-v-76f4817f>http://localhost:5173/</i> to view the application in your local environment.</p><div class="font-semibold text-xl mb-4" data-v-76f4817f>Structure</div><p class="text-lg mb-4" data-v-76f4817f>Atlantis consists of a couple folders, demos and layout have been separated so that you can easily remove what is not necessary for your application like the demos.</p><ul class="leading-normal list-disc pl-8 text-lg mb-4" data-v-76f4817f><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>src/layout</span>: Main layout files, needs to be present.</li><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>src/views</span>: Demo pages like Dashboard.</li><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>public/demo</span>: Publicly accessible assets used in demos</li><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>public/layout</span>: Publicly accessible assets used in layout</li><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>src/assets/demo</span>: Styles used in demos</li><li data-v-76f4817f><span class="text-primary font-medium" data-v-76f4817f>src/assets/layout</span>: Styles of the main layout</li></ul><div class="font-semibold text-xl my-4" data-v-76f4817f>Layout Composable</div><p class="text-lg mb-4" data-v-76f4817f> The <span class="bg-highlight px-2 py-1 rounded-border not-italic text-base" data-v-76f4817f>src/layout/composables/layout.js</span> is a composable that manages the layout state changes including dark mode, PrimeVue theme, menu modes and states. Use this composable to change the initial configuration and handle changes reactively. </p><pre class="app-code" data-v-76f4817f><code data-v-76f4817f>&lt;script setup&gt;
import { useLayout } from &#39;@/layout/composables/layout&#39;;

const { setMenuMode, toggleDarkMode } = useLayout();
    setMenuMode(&#39;slim&#39;);       // change to slim mode
    toggleDarkMode();          // change color scheme
&lt;/script&gt;
</code></pre><div class="font-semibold text-xl mb-4" data-v-76f4817f>Menu</div><p class="text-lg mb-4" data-v-76f4817f> Main menu is defined at <span class="bg-highlight px-2 py-1 rounded-border not-italic text-base" data-v-76f4817f>src/layout/AppMenu.vue</span> file. Update the <i class="bg-highlight px-2 py-1 rounded-border not-italic text-base" data-v-76f4817f>model</i> property to define your own menu items. </p><pre class="app-code" data-v-76f4817f><code data-v-76f4817f>const model = ref([
{
    label: &#39;Dashboards&#39;,
    icon: &#39;pi pi-home&#39;,
    items: [
        {
            label: &#39;E-Commerce&#39;,
            icon: &#39;pi pi-fw pi-home&#39;,
            to: &#39;/&#39;
        },
        {
            label: &#39;Banking&#39;,
            icon: &#39;pi pi-fw pi-image&#39;,
            to: &#39;/dashboard-banking&#39;
        }
    ]
},
//...
</code></pre><div class="font-semibold text-xl mb-4" data-v-76f4817f>Breadcrumb</div><p class="text-lg mb-4" data-v-76f4817f> Breadcrumb component at the topbar section is dynamic and retrieves the path information from the router using the <span class="text-primary font-medium" data-v-76f4817f>meta.breadcrumb</span> property. </p><pre class="app-code" data-v-76f4817f><code data-v-76f4817f>{
    path: &#39;/uikit/formlayout&#39;,
    name: &#39;formlayout&#39;,
    meta: {
        breadcrumb: [&#39;UI Kit&#39;, &#39;Form Layout&#39;]
    },
    component: () =&gt; import(&#39;@/views/uikit/FormLayout.vue&#39;)
},</code></pre><div class="font-semibold text-xl mb-4" data-v-76f4817f>Learn More</div><p class="text-lg mb-4" data-v-76f4817f>To learn more about how PrimeVue templates are implemented, visit the Sakai open source repository, Atlantis utilizes a similar structure as Sakai.</p>`,20),t("div",{class:"video-container mb-4"},[t("iframe",{class:"video",width:"560",height:"315",src:"https://www.youtube.com/embed/Ni_Yecfxv_g?si=11QMilH9sf06Xwi5",frameborder:"0",allowfullscreen:""})],-1),a('<div class="font-semibold text-xl mb-4" data-v-76f4817f>Tailwind CSS</div><p class="text-lg mb-4" data-v-76f4817f>The demo pages are developed using Tailwind CSS along with tailwind-primeui plugin, whereas the core application shell mainly uses custom CSS.</p><div class="font-semibold text-xl mb-4" data-v-76f4817f>Variables</div><p class="text-lg mb-4" data-v-76f4817f> CSS variables used in the template derive their values from the PrimeVue styled mode presets, use the files under <span class="bg-highlight px-2 py-1 rounded-border not-italic text-base" data-v-76f4817f>src/assets/layout/_variables.scss</span> to customize according to your requirements. </p>',4)]))}const p=s(n,[["render",d],["__scopeId","data-v-76f4817f"]]);export{p as default};
