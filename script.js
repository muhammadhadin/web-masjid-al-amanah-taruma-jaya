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

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav-list");

if (toggle && nav) {
    toggle.onclick = () => {
        nav.classList.toggle("active");
        toggle.innerHTML = nav.classList.contains("active") ? "✖" : "☰";
    };
}

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
    const checkElement = document.getElementById("subuh");
    if (!checkElement) return; 

    const date = new Date();
    
    // TAMPILKAN TANGGAL INDONESIA
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('today-date').innerText = date.toLocaleDateString('id-ID', options);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    fetch(`https://api.myquran.com/v2/sholat/jadwal/1225/${y}/${m}/${d}`)
    .then(res => res.json())
    .then(data => {
        if(data.status && data.data) {
            const j = data.data.jadwal;
            document.getElementById("subuh").innerText = j.subuh;
            document.getElementById("syuruq").innerText = j.terbit;
            document.getElementById("dzuhur").innerText = j.dzuhur;
            document.getElementById("ashar").innerText = j.ashar;
            document.getElementById("maghrib").innerText = j.maghrib;
            document.getElementById("isya").innerText = j.isya;

            // Jalankan highlight setelah data API masuk
            highlightNextPrayer(j);
        }
    })
    .catch(err => console.log("API Error"));
});

function highlightNextPrayer(jadwal) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Mapping ID kartu dan waktu dari API
    const times = [
        { id: 'card-subuh', time: jadwal.subuh },
        { id: 'card-syuruq', time: jadwal.terbit },
        { id: 'card-dzuhur', time: jadwal.dzuhur },
        { id: 'card-ashar', time: jadwal.ashar },
        { id: 'card-maghrib', time: jadwal.maghrib },
        { id: 'card-isya', time: jadwal.isya }
    ];

    // Hapus semua class highlight dulu
    times.forEach(t => document.getElementById(t.id).classList.remove('next-prayer'));

    // Cari jadwal selanjutnya
    let found = false;
    for (let t of times) {
        const [h, m] = t.time.split(':');
        const prayerTime = parseInt(h) * 60 + parseInt(m);

        if (prayerTime > currentTime) {
            document.getElementById(t.id).classList.add('next-prayer');
            found = true;
            break; 
        }
    }

    // Jika sudah lewat Isya, highlight Subuh (buat besok)
    if (!found) {
        document.getElementById('card-subuh').classList.add('next-prayer');
    }
}

function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const n = new Date();
    el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`;
}
setInterval(updateClock, 1000);
updateClock();

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