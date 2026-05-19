// MANIIFEST Fan Page - Random Background Changer (Rastgele Arkaplan Değiştirici)

const changeBackground = () => {
    // Sayfanın body elementini hedef alıyoruz (index.html'deki <body id="page-body">)
    const body = document.getElementById('page-body');
    
    // ⚠️ ÖNEMLİ: Bu değeri, pictures/backgrounds/ klasörünüzdeki toplam resim sayısına (örn: bg1.jpg'den bg7.jpg'ye kadar 7 resim varsa 7) göre güncelleyin.
    const numImages = 7; 

    // 1 ile numImages arasında rastgele bir tam sayı üretir.
    const randomIndex = Math.floor(Math.random() * numImages) + 1;
    
    // Oluşturulan rastgele indeksi kullanarak resim URL'sini hazırlar.
    // Örn: randomIndex 4 ise, URL: pictures/backgrounds/bg4.jpg olur.
    const imageUrl = `pictures/backgrounds/bg${randomIndex}.jpg`;

    // body elementine rastgele arkaplan resmini CSS kuralı olarak atar.
    body.style.backgroundImage = `url(${imageUrl})`;
}

// Sayfa yüklendiğinde (tüm kaynaklar dahil) arkaplanı değiştirme fonksiyonunu çalıştırır.
window.addEventListener('load', changeBackground);
// Veya sadece DOM yüklendiğinde de çalışabilir (daha erken tetiklenir):
// document.addEventListener('DOMContentLoaded', changeBackground);