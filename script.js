// ========== DATA PRODUK ==========
const products = [
    { name: "Higgs Games Island", desc: "TopUp & Jual Koin Higgs", price: "Mulai Rp65.000", features: ["🔥 100M → Rp65K", "⭐ 500M → Rp310K", "💎 1B → Rp600K"], badge: "HOT", icon: "fab fa-fort-awesome" },
    { name: "Bos Domino", desc: "Beli & Jual Chip Bos Domino", price: "Mulai Rp70.000", features: ["📦 1B → Rp70K", "💎 10B → Rp330K", "🏆 50B → Rp640K"], badge: "POPULER", icon: "fas fa-crown" },
    { name: "Royal Domino", desc: "Beli & Jual Chip Royal Domino", price: "Mulai Rp40.000", features: ["500M → Rp40K", "1B → Rp75K", "2B → Rp180K"], badge: "BEST", icon: "fas fa-chess-queen" },
    { name: "Berfist", desc: "Beli & Jual Koin Berfist", price: "Mulai Rp35.000", features: ["500M → Rp35K", "1B → Rp65K", "5B → Rp315K"], badge: "NEW", icon: "fas fa-fist-raised" }
];

// ========== ORDER FUNCTION (PANGGIL APK CUSTOMER) ==========
function orderNow(productName) {
    const message = `Halo Admin LLC Store, saya ingin melakukan TRANSAKSI (BELI/JUAL) untuk: ${productName}. Mohon bantuannya. Terima kasih!`;
    
    // 🔥🔥🔥 UTAMA: PANGGIL APK CUSTOMER 🔥🔥🔥
    if (window.Android && window.Android.sendMessageToAdmin) {
        window.Android.sendMessageToAdmin(message);
    } 
    // FALLBACK: Jika dibuka di browser biasa (bukan dalam APK)
    else {
        window.open(`https://wa.me/6285823710815?text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Fungsi untuk scroll ke section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// ========== RENDER PRODUCTS ==========
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <i class="${product.icon}"></i>
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <p class="product-desc">${product.desc}</p>
                <ul class="product-features">
                    ${product.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" onclick="orderNow('${product.name}')">
                    <i class="fas fa-comment-dots"></i> Chat via APK
                </button>
            </div>
        </div>
    `).join('');
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== CLOSE MOBILE MENU ON CLICK ==========
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== FLOATING CHAT BUTTON ==========
const chatFloat = document.querySelector('.chat-float');
if (chatFloat) {
    chatFloat.addEventListener('click', () => {
        orderNow('Semua Produk');
    });
}

// ========== HERO BUTTON ==========
const heroBtn = document.querySelector('.hero-buttons .btn-primary');
if (heroBtn) {
    heroBtn.addEventListener('click', () => {
        orderNow('Semua Produk');
    });
}

// ========== LOAD PRODUCTS ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});