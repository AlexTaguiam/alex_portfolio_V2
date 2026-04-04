// Starfield Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 800; // Number of stars
const speed = 0.5;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            z: Math.random() * canvas.width // Depth for parallax
        });
    }
}

function updateAndDraw() {
    // Clear the canvas with a transparent fill to allow CSS background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and move stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        // Move star closer
        star.z -= speed;

        // If star goes past viewer, reset it
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        }

        // Calculate perspective
        let sx = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
        let sy = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;

        // Scale size based on depth
        let size = star.size * (canvas.width / star.z);

        // Only draw if within bounds
        if (sx > 0 && sx < canvas.width && sy > 0 && sy < canvas.height) {
            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            // Add a little glow
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'white';
            ctx.fill();
        }
    }

    requestAnimationFrame(updateAndDraw);
}

// Initialize
window.addEventListener('resize', () => {
    resize();
    createStars();
});

resize();
createStars();
updateAndDraw();

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger-menu');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.style.display = 'flex';
            // Wait for next frame to apply transition
            requestAnimationFrame(() => {
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            });
        } else {
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (!mobileMenu.classList.contains('open')) {
                    mobileMenu.style.display = 'none';
                }
            }, 300); // matches css transition
        }
    });
}

// --- Orbiting Skills Logic ---
const orbitContainer = document.getElementById('orbit-container');

if (orbitContainer) {
    const iconSVGs = {
        html: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/></svg>',
            color: '#E34F26'
        },
        css: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/></svg>',
            color: '#1572B6'
        },
        javascript: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><rect width="24" height="24" fill="#F7DF1E"/><path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/></svg>',
            color: '#F7DF1E'
        },
        react: {
            svg: '<svg viewBox="0 0 24 24" fill="none" class="skill-icon-svg"><g stroke="#61DAFB" stroke-width="1" fill="none"><circle cx="12" cy="12" r="2.05" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="11" ry="4.2"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/></g></svg>',
            color: '#61DAFB'
        },
        node: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/></svg>',
            color: '#339933'
        },
        tailwind: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/></svg>',
            color: '#06B6D4'
        },
        mongodb: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>',
            color: '#47A248'
        },
        express: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/></svg>',
            color: '#FFFFFF'
        },
        postgresql: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/></svg>',
            color: '#4169E1'
        },
        mysql: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"/></svg>',
            color: '#4479A1'
        },
        dotnet: {
            svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="skill-icon-svg"><path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.829 0 0 1-.869.829.868.829 0 0 1-.868-.83.868.829 0 0 1 .868-.828.868.829 0 0 1 .869.829Z"/></svg>',
            color: '#512BD4'
        }
    };

    const orbitConfigs = [
        { radius: 80, glowColor: 'cyan', delay: 0 },
        { radius: 135, glowColor: 'purple', delay: 1.5 },
        { radius: 195, glowColor: 'cyan', delay: 3.0 }
    ];

    const glowColors = {
        cyan: { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.3)' },
        purple: { primary: 'rgba(147, 51, 234, 0.4)', secondary: 'rgba(147, 51, 234, 0.2)', border: 'rgba(147, 51, 234, 0.3)' }
    };

    const skillsConfig = [
        // Inner Ring
        { id: 'html', orbitRadius: 80, size: 36, speed: 1.2, iconType: 'html', phaseShift: 0, label: 'HTML5' },
        { id: 'css', orbitRadius: 80, size: 38, speed: 1.2, iconType: 'css', phaseShift: (2 * Math.PI) / 3, label: 'CSS3' },
        { id: 'javascript', orbitRadius: 80, size: 36, speed: 1.2, iconType: 'javascript', phaseShift: (4 * Math.PI) / 3, label: 'JavaScript' },

        // Middle Ring
        { id: 'react', orbitRadius: 135, size: 45, speed: -0.8, iconType: 'react', phaseShift: 0, label: 'React' },
        { id: 'express', orbitRadius: 135, size: 40, speed: -0.8, iconType: 'express', phaseShift: Math.PI / 2, label: 'Express.js' },
        { id: 'node', orbitRadius: 135, size: 42, speed: -0.8, iconType: 'node', phaseShift: Math.PI, label: 'Node.js' },
        { id: 'tailwind', orbitRadius: 135, size: 38, speed: -0.8, iconType: 'tailwind', phaseShift: (3 * Math.PI) / 2, label: 'Tailwind CSS' },

        // Outer Ring
        { id: 'mongodb', orbitRadius: 195, size: 45, speed: 0.5, iconType: 'mongodb', phaseShift: Math.PI / 4, label: 'MongoDB' },
        { id: 'mysql', orbitRadius: 195, size: 45, speed: 0.5, iconType: 'mysql', phaseShift: (3 * Math.PI) / 4, label: 'MySQL' },
        { id: 'postgresql', orbitRadius: 195, size: 42, speed: 0.5, iconType: 'postgresql', phaseShift: (5 * Math.PI) / 4, label: 'PostgreSQL' },
        { id: 'dotnet', orbitRadius: 195, size: 45, speed: 0.5, iconType: 'dotnet', phaseShift: (7 * Math.PI) / 4, label: 'VB.NET' },
    ];

    // Build Rings
    orbitConfigs.forEach(conf => {
        const ring = document.createElement('div');
        ring.className = 'orbit-ring';
        ring.style.width = `${conf.radius * 2}px`;
        ring.style.height = `${conf.radius * 2}px`;
        ring.style.animationDelay = `${conf.delay}s`;

        const colors = glowColors[conf.glowColor];
        ring.style.background = `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`;
        ring.style.boxShadow = `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`;

        const border = document.createElement('div');
        border.className = 'orbit-ring-static';
        border.style.border = `1px solid ${colors.border}`;
        border.style.boxShadow = `inset 0 0 20px ${colors.secondary}`;

        ring.appendChild(border);
        orbitContainer.appendChild(ring);
    });

    // Build Nodes
    const skillElements = [];
    skillsConfig.forEach(conf => {
        const node = document.createElement('div');
        node.className = 'skill-node';
        node.style.width = `${conf.size}px`;
        node.style.height = `${conf.size}px`;

        const inner = document.createElement('div');
        inner.className = 'skill-node-inner';
        const iconData = iconSVGs[conf.iconType];
        inner.innerHTML = iconData.svg;

        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = conf.label;
        inner.appendChild(tooltip);

        // Hover events
        node.addEventListener('mouseenter', () => {
            node.classList.add('skill-node-hovered');
            inner.style.boxShadow = `0 0 30px ${iconData.color}40, 0 0 60px ${iconData.color}20`;
        });
        node.addEventListener('mouseleave', () => {
            node.classList.remove('skill-node-hovered');
            inner.style.boxShadow = `0 10px 15px -3px rgba(0,0,0,0.1)`;
        });

        node.appendChild(inner);
        orbitContainer.appendChild(node);
        skillElements.push({ el: node, conf: conf });
    });

    // Animation Loop
    let orbitTime = 0;
    let isOrbitPaused = false;
    let lastOrbitTime = performance.now();

    orbitContainer.addEventListener('mouseenter', () => isOrbitPaused = true);
    orbitContainer.addEventListener('mouseleave', () => isOrbitPaused = false);

    function animateOrbit(currentTime) {
        const deltaTime = (currentTime - lastOrbitTime) / 1000;
        lastOrbitTime = currentTime;

        if (!isOrbitPaused) {
            orbitTime += deltaTime;
        }

        skillElements.forEach(item => {
            const { el, conf } = item;
            const angle = orbitTime * conf.speed + conf.phaseShift;
            const x = Math.cos(angle) * conf.orbitRadius;
            const y = Math.sin(angle) * conf.orbitRadius;
            el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        });

        requestAnimationFrame(animateOrbit);
    }

    requestAnimationFrame(animateOrbit);
}

// // --- Tubes Cursor Logic ---
// const tubesCanvas = document.getElementById('tubes-cursor');
// if (tubesCanvas) {
//     const randomColors = (count) => {
//         return new Array(count)
//             .fill(0)
//             .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
//     };

//     let tubesApp = null;

//     // Initialize the TubesCursor after a short delay
//     setTimeout(() => {
//         import('./tubes.min.js')
//             .then(module => {
//                 const TubesCursor = module.default;
//                 tubesApp = TubesCursor(tubesCanvas, {
//                     sleepRadiusX: 50,
//                     sleepRadiusY: 50,
//                     sleepTimeCoefX: 0.001,
//                     sleepTimeCoefY: 0.001,
//                     tubes: {
//                         size: 0.25,   // thinner tubes
//                         radius: 0.25, // smaller radius
//                         colors: ["#5e72e4", "#8965e0", "#f5365c"],
//                         lights: {
//                             intensity: 120, // slightly dimmer glow
//                             colors: ["#00e0ff", "#8b31ff", "#f4d03f", "#11cdef"]
//                         }
//                     }
//                 });

//                 // Adjust camera to zoom out slightly
//                 if (tubesApp.camera) {
//                     tubesApp.camera.position.z *= 1.5;
//                 }
//             })
//             .catch(err => console.error("Failed to load TubesCursor module:", err));
//     }, 100);

//     // Global click listener to change colors
//     document.body.addEventListener('click', (e) => {
//         // Prevent changing colors if they clicked a button or link
//         if (e.target.closest('a') || e.target.closest('button')) return;

//         if (tubesApp) {
//             const newTubeColors = randomColors(3);
//             const newLightColors = randomColors(4);
//             tubesApp.tubes.setColors(newTubeColors);
//             tubesApp.tubes.setLightsColors(newLightColors);
//         }
//     });
// }

// if (tubesApp.camera) {
//     tubesApp.camera.position.z *= 2;
// }

// ===================================================
// JOURNEY TIMELINE — Scroll Progress Line + Card Fade-in
// ===================================================
(function initJourneyTimeline() {
    const journeySection = document.getElementById('journey');
    const progressEl = document.getElementById('timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!journeySection || !progressEl || timelineItems.length === 0) return;

    // ---  1. Scroll-tracking progress line  ---
    function updateProgress() {
        const rect = journeySection.getBoundingClientRect();
        const sectionH = journeySection.offsetHeight;
        const viewportH = window.innerHeight;

        // How far the user has scrolled INTO the section (0 → sectionH)
        const scrolled = Math.max(0, -rect.top); // px past the section's top
        const fillable = sectionH - viewportH;    // scrollable range within section

        const pct = fillable > 0
            ? Math.min(100, (scrolled / fillable) * 100)
            : 100;

        progressEl.style.height = pct + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // initialise on load

    // ---  2. IntersectionObserver — staggered card fade-ins  ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, {
        threshold: 0.15 // trigger when 15% of the card is visible
    });

    timelineItems.forEach((item, idx) => {
        // Apply a staggered delay so cards cascade nicely
        item.style.transitionDelay = `${idx * 0.08}s`;
        observer.observe(item);
    });
})();

// ===================================================
// FOOTER — TextHoverEffect (vanilla JS port)
// ===================================================
(function initFooterHoverEffect() {
    // --- Copyright year ---
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Cursor-tracking radial gradient reveal ---
    const svg        = document.getElementById('footer-hover-svg');
    const revealGrad = document.getElementById('footerRevealMask');
    const outline    = document.getElementById('footer-text-outline');

    if (!svg || !revealGrad || !outline) return;

    // Lerp for smooth cursor tracking
    let targetCx = 50, targetCy = 50;  // percentages
    let currentCx = 50, currentCy = 50;
    let rafId = null;
    let isHovered = false;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
        currentCx = lerp(currentCx, targetCx, 0.12);
        currentCy = lerp(currentCy, targetCy, 0.12);

        // Update the SVG radialGradient centre
        revealGrad.setAttribute('cx', currentCx + '%');
        revealGrad.setAttribute('cy', currentCy + '%');

        rafId = requestAnimationFrame(tick);
    }

    svg.addEventListener('mouseenter', () => {
        isHovered = true;
        outline.style.opacity = '0.7';
        if (!rafId) rafId = requestAnimationFrame(tick);
    });

    svg.addEventListener('mouseleave', () => {
        isHovered = false;
        outline.style.opacity = '0';
        // Keep animating until cursor animation settles, then stop
        setTimeout(() => {
            if (!isHovered) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }, 600);
    });

    svg.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        targetCx = ((e.clientX - rect.left) / rect.width)  * 100;
        targetCy = ((e.clientY - rect.top)  / rect.height) * 100;
    });
})();