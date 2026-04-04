// --- BAGIAN SLIDER (HANYA JALAN JIKA ADA SLIDE) ---
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
    if (!slides || slides.length === 0 || !slides[i]) return;
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

if (slides.length > 0) {
    showSlide(index);
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 5000);
}

const nextBtn = document.querySelector(".next");
if (nextBtn && slides.length > 0) {
    nextBtn.onclick = () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    };
}

const prevBtn = document.querySelector(".prev");
if (prevBtn && slides.length > 0) {
    prevBtn.onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    };
}


document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#nav-list");
    const dropdowns = document.querySelectorAll(".dropdown");

    // 1. Toggle Menu Utama (Hamburger)
    if (toggle && nav) {
        toggle.onclick = (e) => {
            e.stopPropagation();
            const isActive = nav.classList.toggle("active");
            toggle.innerHTML = isActive ? "✖" : "☰";
        };
    }

    // 2. Klik Dropdown (Berlaku di Desktop & Mobile)
    dropdowns.forEach(drop => {
        const btn = drop.querySelector('.dropbtn');
        
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                const isAlreadyActive = parent.classList.contains('active');

                // Tutup dropdown lain yang mungkin lagi kebuka
                dropdowns.forEach(d => {
                    if (d !== parent) d.classList.remove('active');
                });

                // Toggle dropdown yang diklik
                parent.classList.toggle('active');
            });
        }
    });

    // 3. Klik di luar area navbar bakal nutup semua
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            if (nav) nav.classList.remove('active');
            if (toggle) toggle.innerHTML = "☰";
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});



function jalankanCari(event) {
    event.preventDefault(); 
    const input = document.getElementById('search-input');
    if (!input) return false;

    const kataKunci = input.value.toLowerCase().trim();
    if (kataKunci === "") return false;

    const kado = '?q=' + encodeURIComponent(kataKunci);

    // 1. CEK KHUSUS OPERASIONAL (Gaji Marbot, Listrik, Kebersihan, dll)
    if (['operasional', 'listrik', 'marbot', 'kebersihan', 'air', 'pemeliharaan', 'perawatan', 'lampu', 'kipas'].some(key => kataKunci.includes(key))) {
        window.location.href = '/donasioperasional/' + kado;
    } 
    // 2. CEK KHUSUS SEMBAKO (Pangan, Beras, Paket Sembako)
    else if (['sembako', 'pangan', 'beras', 'minyak', 'gula', 'makan', 'sembilan bahan pokok'].some(key => kataKunci.includes(key))) {
        window.location.href = '/donasisembako/' + kado;
    } 
    // 3. CEK KHUSUS SOSIAL (Yatim, Santunan, Baksos, Musibah)
    else if (['sosial', 'santunan', 'yatim', 'piatu', 'baksos', 'bencana', 'donasi sosial', 'bantuan'].some(key => kataKunci.includes(key))) {
        window.location.href = '/donasisosial/' + kado;
    }
    // 4. KATEGORI LAIN (Sama kayak codingan lama lu)
    else if (['infaq', 'donasi', 'sedekah', 'zakat', 'nyumbang', 'sumbangan', 'amal', 'jariyah', 'transfer', 'rekening', 'bsi', 'bca'].some(key => kataKunci.includes(key))) {
        window.location.href = '/infaq/' + kado;
    } 
    else if (['ramadhan', 'puasa', 'proposal', 'romadon', 'romadhon', 'teraweh', 'terawih', 'tarawih', 'takjil', 'bukber', 'buka puasa', 'sahur', 'imsakiyah', 'itikaf'].some(key => kataKunci.includes(key))) {
        window.location.href = '/ramadhan/' + kado;
    } 
    else if (['hasil', 'hasil infaq'].some(key => kataKunci.includes(key))) {
        window.location.href = '/hasildonasi/' + kado;   
    } 
    else if (['kajian', 'ustadz', 'dakwah', 'tabligh', 'ceramah', 'ilmu', 'tafsir', 'hadits', 'fiqih', 'rutin', 'ngaji', 'murottal', 'ustad'].some(key => kataKunci.includes(key))) {
        window.location.href = '/kajian/' + kado;
    }
    else if (['berita', 'info', 'artikel', 'pengumuman', 'kabar', 'warta', 'update', 'kegiatan', 'event', 'masjid hari ini', 'seputar masjid'].some(key => kataKunci.includes(key))) {
        window.location.href = '/berita/' + kado;
    }
    else if (['renovasi', 'pembangunan', 'bangun', 'semen', 'batu bata', 'perbaikan', 'tukang', 'kubah', 'pagar', 'keramik', 'cat', 'proyek', 'perluasan', 'fondasi', 'material', 'rab', 'renov'].some(key => kataKunci.includes(key))) {
        window.location.href = '/programrenovasi/' + kado;
    }
    else if (['dokumentasi', 'dalemnya', 'suasana', 'kondisi', 'pict', 'picture', 'fotomasjidnya', 'galerinya', 'galeri', 'foto'].some(key => kataKunci.includes(key))) {
        window.location.href = '/galerimasjid/' + kado;
    }
    else if (['kontak', 'lokasi', 'lokasinya', 'tempat', 'lokasi masjid', 'masjid', 'masjidnya'].some(key => kataKunci.includes(key))) {
        window.location.href = '/kontak/' + kado;
    } 
    else if (['laporan', 'keuangan', 'kas', 'rekap', 'transparansi', 'audit'].some(key => kataKunci.includes(key))) {
    window.location.href = '/laporan-keuangan/' + kado;
}
    else {
        window.location.href = '/search/' + kado;
    }
    return false;
}
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);

    const date = new Date();
    // Update Teks Tanggal
    const dateEl = document.getElementById('today-date');
    if(dateEl) {
        dateEl.innerText = date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    // Fetch API Jadwal Sholat (ID Kota 1225 = Bekasi)
    fetch(`https://api.myquran.com/v2/sholat/jadwal/1225/${y}/${m}/${d}`)
    .then(res => res.json())
    .then(data => {
        if(data.status && data.data) {
            const j = data.data.jadwal;
            
            // Simpan mapping ID untuk teks dan kartu
            const times = [
                { cardId: 'card-subuh', textId: 'subuh', t: j.subuh },
                { cardId: 'card-syuruq', textId: 'syuruq', t: j.terbit },
                { cardId: 'card-dzuhur', textId: 'dzuhur', t: j.dzuhur },
                { cardId: 'card-ashar', textId: 'ashar', t: j.ashar },
                { cardId: 'card-maghrib', textId: 'maghrib', t: j.maghrib },
                { cardId: 'card-isya', textId: 'isya', t: j.isya }
            ];

            // 1. Render teks jam sholat ke HTML
            times.forEach(item => {
                const el = document.getElementById(item.textId);
                if(el) el.innerText = item.t;
            });

            // 2. Fungsi Logika Warna Ijo (Highlight)
            const updateHighlight = () => {
                const now = new Date();
                const nowMin = (now.getHours() * 60) + now.getMinutes();

                const toMin = (str) => {
                    const [h, min] = str.split(':').map(Number);
                    return (h * 60) + min;
                };

                // Hapus semua class ijo dulu
                times.forEach(item => {
                    const card = document.getElementById(item.cardId);
                    if(card) card.classList.remove('active-prayer');
                });

                // Cari jadwal pertama yang waktunya LEBIH BESAR dari sekarang
                let targetCardId = "";
                for (let i = 0; i < times.length; i++) {
                    if (toMin(times[i].t) > nowMin) {
                        targetCardId = times[i].cardId;
                        break; 
                    }
                }

                // Jika sudah lewat Isya (gak ketemu target), balik ke Subuh
                if (!targetCardId) {
                    targetCardId = 'card-subuh';
                }

                // Pasang class ijo ke kartu yang terpilih
                const activeCard = document.getElementById(targetCardId);
                if(activeCard) activeCard.classList.add('active-prayer');
            };

            updateHighlight();
            setInterval(updateHighlight, 30000); // Cek tiap 30 detik
        }
    })
    .catch(err => console.error("Gagal ambil data jadwal sholat:", err));
});

function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const n = new Date();
    // Format jam:menit:detik (HH:mm:ss)
    el.textContent = n.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    }).replace(/\./g, ':');
}
// Fungsi Munculin Tombol Pas Scroll
window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

// Fungsi Klik Balik Ke Atas
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Biar naiknya halus, gak jepret
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Angka awal biar gak kelihatan 0 banget (opsional)
    const baseView = 158; 
    
    // Ambil data view dari memori browser
    let currentViews = localStorage.getItem("pama_report_views");

    if (!currentViews) {
        // Kalau user baru pertama liat, kasih angka dasar
        currentViews = baseView;
    } else {
        // Kalau sudah pernah liat, tambah 1 tiap refresh/kunjungan
        currentViews = parseInt(currentViews) + 1;
    }

    // Simpan lagi ke memori browser
    localStorage.setItem("pama_report_views", currentViews);

    // Tampilin ke layar dengan efek ngetik dikit
    document.getElementById("view-count").innerText = currentViews.toLocaleString('id-ID');
});
function handleVideoPortal(container) {
    const video = container.querySelector('video');
    
    if (video.paused) {
        video.play();
        container.classList.add('v-playing'); // Aktifkan mode "Lagi Putar"
        video.controls = true; // Munculkan kontrol asli (Timeline, Fullscreen, dll)
    } else {
        // Kalau video lagi diputar, biarkan kontrol asli browser yang bekerja.
        // Fungsi ini cuma buat "Start" pertama kali aja biar gak bentrok.
    }
}

// Tambahan: Kalau user pause lewat kontrol asli, tombol play tengah muncul lagi
document.querySelectorAll('.media-video-container video').forEach(video => {
    video.addEventListener('pause', () => {
        video.parentElement.classList.remove('v-playing');
        video.controls = false; // Sembunyiin kontrol biar rapi pas pause
    });
    
    video.addEventListener('play', () => {
        video.parentElement.classList.add('v-playing');
        video.controls = true;
    });
});

// Ambil URL halaman saat ini secara otomatis
const currentUrl = window.location.href;
const pageTitle = document.title;

// Fungsi Share WhatsApp
function shareWA() {
    const url = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
    window.open(url, '_blank');
}

// Fungsi Share Facebook
function shareFB() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
}

// Fungsi Share Threads
function shareThreads() {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
    window.open(url, '_blank');
}

// Fungsi Salin Link (Instagram & Umum)
function copyToClipboard(type) {
    navigator.clipboard.writeText(currentUrl).then(() => {
        if (type === 'ig') {
            alert("Link berhasil disalin! Silakan tempel di Story atau Bio Instagram.");
        } else {
            alert("Link berita sudah disalin!");
        }
    }).catch(err => {
        console.error('Gagal salin link: ', err);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // 1. Cari semua gambar di dalam tag <article>
    const articleImages = document.querySelectorAll('article img');
    
    articleImages.forEach(img => {
        // Kasih kursor pointer biar user tau ini bisa diklik
        img.style.cursor = 'zoom-in';
        
        // Efek hover dikit biar makin cakep
        img.style.transition = 'opacity 0.3s ease';
        img.onmouseover = () => img.style.opacity = '0.9';
        img.onmouseout = () => img.style.opacity = '1';

        // Fungsi Klik/Tap
        img.addEventListener('click', function() {
            const imageUrl = this.src;
            // Buka di tab baru (Paling aman buat HP & Desktop)
            window.open(imageUrl, '_blank');
        });
    });
});

function shareKonten(tipe, idTarget) {
    // Sekarang link-nya otomatis ngikutin ID kartu yang diklik
    const linkTujuan = window.location.origin + window.location.pathname + "#" + idTarget;
    
    let textToCopy = linkTujuan;
    let alertMsg = "Link berhasil disalin!";

    if (tipe === 'ig') {
        textToCopy = "Yuk hadir di Kajian Masjid Al-Amanah! 🌙✨ Cek detailnya di sini: " + linkTujuan;
        alertMsg = "Teks undangan Instagram berhasil disalin!";
    }

    // Eksekusi Salin
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(alertMsg);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            // Biar gak loncat ke link utama kalau ada submenu
            this.classList.toggle('active');
        }
    });
});