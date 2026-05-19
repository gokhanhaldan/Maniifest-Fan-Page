// MANIIFEST Fan Page Script - Profesyonel ve Eksiksiz Versiyon (v4.0)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Manifest Fan Page Initialized - Full Feature Set");

    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const body = document.body;
    
    // Yeni Eklenen Elementler
    const audio = document.getElementById('background-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const extraMenuBtn = document.getElementById('extra-menu-btn');
    const extraMenuDropdown = document.getElementById('extra-menu-dropdown');
    
    let isAudioPlaying = false;

    // --- TEMEL NAVİGASYON FONKSİYONLARI ---

    // 1. Navbar Scroll Efekti
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }
    };

    // Burger Menü Açma/Kapama
    const toggleNav = () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        extraMenuDropdown.classList.remove('show-dropdown'); // Burger açılırken sağ menüyü kapat
        
        // Mobil menüdeyken body scroll'unu engelle
        if (navLinks.classList.contains('nav-active')) {
             body.style.overflow = 'hidden';
        } else {
             body.style.overflow = '';
        }
    };

    burger.addEventListener('click', toggleNav);
    window.addEventListener("scroll", handleScroll);

    // 2. Smooth Scroll ve Menüyü Kapatma (Mobil)
    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Eğer mobil menü açıksa, kapat
            if (navLinks.classList.contains('nav-active')) {
                toggleNav();
            }

            // Eğer ekstra menü açıksa, kapat
            if (extraMenuDropdown && extraMenuDropdown.classList.contains('show-dropdown')) {
                extraMenuDropdown.classList.remove('show-dropdown');
            }

            // Hedefe kaydırma
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                }
            }
        });
    });

    // --- YENİ EKLENEN FONKSİYONLAR ---

    // A) Müzik Kontrolü (Auto-Play/Play-Pause)
    if (audio && playPauseBtn) {
        const updatePlayButton = () => {
             playPauseBtn.innerHTML = isAudioPlaying 
                ? `Müziği Durdur <i class="fas fa-pause"></i>` 
                : `Müziği Başlat <i class="fas fa-play"></i>`;
        };

        playPauseBtn.addEventListener('click', () => {
            if (isAudioPlaying) {
                audio.pause();
                isAudioPlaying = false;
            } else {
                // Tarayıcı kısıtlamasını aşmak için play() sözü (promise) kullanılır
                audio.play().then(() => {
                    isAudioPlaying = true;
                }).catch(error => {
                    console.error("Müzik çalınamadı (Tarayıcı Auto-play engeli):", error);
                    // Hata durumunda butonu güncelle
                    playPauseBtn.innerHTML = `Müzik Hata <i class="fas fa-exclamation-triangle"></i>`;
                });
            }
            updatePlayButton();
        });
        updatePlayButton(); // Sayfa yüklendiğinde butonu doğru göster
    }


    // B) Sağ Üst Dropdown Menü Kontrolü
    if (extraMenuBtn && extraMenuDropdown) {
        extraMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Butona tıklanıldığında sayfanın başka bir yerine tıklama olayını engelle
            extraMenuDropdown.classList.toggle('show-dropdown');
            navLinks.classList.remove('nav-active'); // Ekstra menü açılırken mobil menüyü kapat
            burger.classList.remove('toggle');
        });

        // Sayfanın herhangi bir yerine tıklanınca menüyü kapat
        document.addEventListener('click', (e) => {
            // Eğer tıklanan yer menünün veya butonun içinde değilse kapat
            if (e.target.closest('.right-menu-container') === null && 
                e.target.closest('.nav-links') === null) {
                extraMenuDropdown.classList.remove('show-dropdown');
            }
        });
    }


    // --- MEVCUT GELİŞMİŞ FONKSİYONLAR ---

    // 3. Üye Kartları Dinamik Renk Set etme
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        const color = card.getAttribute('data-member-color');
        if (color) {
            card.style.setProperty('--member-color', color);
        }
    });

    // 4. Galeri Lightbox Sistemi (CSS'i style.css'e taşınmıştır)
    const galleryItems = document.querySelectorAll('.grid-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;

            // Modal oluştur
            const modal = document.createElement('div');
            modal.classList.add('lightbox-modal');
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', imgAlt);
            
            modal.innerHTML = `
                <span class="close-btn" role="button" aria-label="Kapat">×</span>
                <img src="${imgSrc}" alt="${imgAlt}">
            `;
            
            body.appendChild(modal);
            modal.style.display = 'flex';
            body.style.overflow = 'hidden'; // Sayfa kaydırmayı engelle

            // Modal'ı kapatma işlevi
            const closeModal = () => {
                // Modal hâlâ sayfadaysa (birden fazla ESC basılmasını engeller)
                if (modal.parentNode === body) {
                    modal.remove();
                    body.style.overflow = '';
                }
            };

            // Kapatma düğmesi veya dış alana tıklanınca kapat
            modal.querySelector('.close-btn').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('lightbox-modal')) {
                    closeModal();
                }
            });
            // ESC tuşuyla kapatma
            document.addEventListener('keydown', function handler(e) {
                if (e.key === "Escape") {
                    closeModal();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });

    // 5. Lightbox CSS'i kaldırıldı. Lightbox stilini style.css'e eklemeniz gerekmektedir.
    // Lütfen aşağıdaki CSS kurallarını 'css/style.css' dosyanıza eklediğinizden emin olun:
    /*
    .lightbox-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.95);
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .lightbox-modal img {
        max-width: 90%;
        max-height: 90%;
        display: block;
        border-radius: 10px;
        animation: zoom-in 0.3s ease-out;
    }
    .close-btn {
        position: absolute;
        top: 20px;
        right: 35px;
        color: #fff;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
        cursor: pointer;
        z-index: 2001;
    }
    .close-btn:hover,
    .close-btn:focus {
        color: var(--color-primary);
        text-decoration: none;
        cursor: pointer;
    }
    @keyframes zoom-in {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    */
});