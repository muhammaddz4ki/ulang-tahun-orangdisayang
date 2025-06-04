// main.js

// Fungsi untuk membuat dan menganimasikan hati di latar belakang
function createFallingHearts() {
    const bg = document.getElementById('romantic-bg');
    if (!bg) return;

    const numHearts = 90; // Jumlah hati ditingkatkan dari 30 menjadi 60
    // Variasi warna pink dan putih untuk hati
    const heartColors = ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FFF0F5', '#FFE4E1', '#FFFFFF']; 

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#10084;'; // Karakter hati Unicode (♥)
        heart.style.left = `${Math.random() * 100}vw`; // Posisi horizontal acak
        // Ukuran acak sedikit diperbesar (10px - 30px)
        heart.style.fontSize = `${Math.random() * 20 + 10}px`; 
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)]; // Warna acak
        bg.appendChild(heart);

        animateHeart(heart);
    }
}

function animateHeart(heart) {
    gsap.set(heart, {
        y: -50, // Mulai dari atas layar
        opacity: 0 // Awalnya transparan
    });

    gsap.to(heart, {
        y: '105vh', // Jatuh hingga ke bawah layar
        x: `+=${(Math.random() - 0.5) * 200}`, // Sedikit pergerakan horizontal acak
        opacity: Math.random() * 0.6 + 0.2, // Opacity acak (0.2 - 0.8)
        rotation: `${(Math.random() - 0.5) * 60}`, // Sedikit rotasi acak
        // Durasi jatuh dipercepat (3 - 8 detik)
        duration: Math.random() * 5 + 3, 
        // Delay acak sebelum mulai jatuh sedikit dikurangi
        delay: Math.random() * 4, 
        ease: 'linear',
        onComplete: () => {
            // Setelah selesai, reset posisi hati ke atas dan animasikan lagi (loop)
            gsap.set(heart, {
                y: -50,
                x: `${Math.random() * 100}vw`, // Reset posisi horizontal
                opacity: 0,
                rotation: 0
            });
            animateHeart(heart); // Panggil fungsi lagi untuk loop
        }
    });
}


window.addEventListener('load', () => {
    // SweetAlert untuk menanyakan apakah ingin memutar musik
    Swal.fire({
        title: 'Hai Sayang! Mau ada musik romantis di latar belakang ga?',
        text: "Biar makin spesial gituu.. ",
        icon: 'question', 
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya, mau banget!',
        cancelButtonText: 'Nggak usah deh',
    }).then((result) => {
        if (result.isConfirmed) {
            const song = document.querySelector('.song');
            if (song) {
                song.play().catch(error => {
                    console.warn("Putar otomatis dicegah:", error);
                    Swal.fire(
                        'Musik Diblokir Browser',
                        'Browser kamu mungkin memblokir putar otomatis. Kamu bisa putar manual jika ada kontrolnya, atau nikmati tanpa musik ya! ❤️',
                        'info'
                    );
                });
            }
        }
        // Tampilkan form verifikasi langkah 1
        document.getElementById('step1').style.display = 'block';
        
        // Mulai animasi hati jatuh setelah dialog SweetAlert ditutup
        createFallingHearts(); 
    });
});

// Langkah 1: Verifikasi Nama
document.getElementById('verificationName').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const nameInput = document.getElementById('nameInput').value.trim().toLowerCase(); 
    const errorMessage = document.getElementById('error-message');
    const validNames = ['tanti', 'cantikk', 'ritanti aulia muswara', 'neng', 'tatan', 'sayang', 'cinta', 'cantik']; 

    if (!validNames.includes(nameInput)) {
        errorMessage.style.display = 'block'; 
        return; 
    }

    errorMessage.style.display = 'none'; 
    document.getElementById('step1').style.display = 'none'; 
    document.getElementById('step2').style.display = 'block'; 
});


document.getElementById('verification').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const isPartner = document.getElementById('isPartner').value;

    if (isPartner !== 'yes') {
        Swal.fire({
            title: 'Yahh, bukan pacar Dzaki ya? 😥',
            text: 'Harusnya jawab "Iya dong". Coba lagi dari awal yaa, biar surprise-nya makin berkesan! 😉',
            icon: 'warning',
        }).then(() => {
            document.getElementById('verification').reset();
            document.getElementById('step1').style.display = 'block';
            document.getElementById('step2').style.display = 'none';
        });
        return;
    }

    Swal.fire({
        title: 'Verifikasi Berhasil, Sayangku! 🎉',
        text: 'Selamat menikmati animasi spesial buat kamu! Semoga suka yaa ❤️',
        icon: 'success',
        timer: 2500, 
        showConfirmButton: false
    }).then(() => {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.querySelector('.form-container').style.display = 'none';
        animationTimeline();
    });
});


// linimasa animasi
const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0]; // Elemen h3 kita

    // Untuk hbd-chatbox (biarkan seperti ini kecuali ada masalah spasi juga)
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    // ---- MODIFIKASI UNTUK .wish-hbd AGAR SPASI MUNCUL ----
    const hbdTextContent = hbd.innerHTML; // Ambil teks asli (mis: "SELAMAT ULANG TAHUN, SEGALAKU!")
    let newHbdProcessedHTML = "";
    for (let i = 0; i < hbdTextContent.length; i++) {
        const char = hbdTextContent[i];
        if (char === ' ') {
            newHbdProcessedHTML += '<span>&nbsp;</span>'; // Gunakan &nbsp; untuk spasi agar tetap ada lebar
        } else {
            newHbdProcessedHTML += `<span>${char}</span>`;
        }
    }
    hbd.innerHTML = newHbdProcessedHTML;
    // ---- AKHIR MODIFIKASI UNTUK .wish-hbd ----

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // --- MODIFICATION FOR GIF LOOP ---
    const gifLeft = document.querySelector(".gif-left");
    const gifRight = document.querySelector(".gif-right");
    let gifLoopInterval = null;

    function startGifLoop() {
        if (gifLoopInterval) clearInterval(gifLoopInterval); // Clear existing if any, for restarts
        
        const restartGifs = () => {
            if (gifLeft && gifLeft.parentElement.style.opacity !== '0') gifLeft.src = gifLeft.src; // Check visibility
            if (gifRight && gifRight.parentElement.style.opacity !== '0') gifRight.src = gifRight.src; // Check visibility
        };
        
        // Initial restart, then set interval
        if (gifLeft && gifRight) { // Ensure elements exist
             // Ensure GIFs are visible before restarting
            if (document.querySelector(".four").style.opacity !== '0') {
                restartGifs();
            }
            gifLoopInterval = setInterval(restartGifs, 2500); // Refresh every 2.5 seconds (adjust as needed for your GIFs)
        }
    }

    function stopGifLoop() {
        if (gifLoopInterval) {
            clearInterval(gifLoopInterval);
            gifLoopInterval = null;
        }
    }
    // --- END OF MODIFICATION FOR GIF LOOP ---


    const tl = gsap.timeline(); 

    tl.to(".container", { duration: 0.6, visibility: "visible" })
    .from(".one", { duration: 0.7, opacity: 0, y: 10 })
    .from(".two", { duration: 0.4, opacity: 0, y: 10 })
    .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=3.5")
    .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=1")
    .from(".three", { duration: 0.7, opacity: 0, y: 10 })
    .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=3")
    .from(".four", { 
        duration: 0.7, 
        scale: 0.2, 
        opacity: 0,
        onStart: startGifLoop // Start GIF loop when .four section starts appearing
    })
    .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.04) 
    .to(".fake-btn", { duration: 0.1, backgroundColor: "rgb(232, 90, 112)" }, "+=4") 
    .to(".four", { 
        duration: 0.5, 
        scale: 0.2, 
        opacity: 0, 
        y: -150,
        onStart: stopGifLoop // Stop GIF loop when .four section starts disappearing
    }, "+=1")
    
    .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-3 strong", { duration: 0.5, scale: 1.2, x: 10, backgroundColor: "rgb(232, 90, 112)", color: "#fff" })
    .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
    
    .from(".idea-5", { duration: 0.7, rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
    .to(".idea-5 span", { duration: 0.7, rotation: 360, scale: 1.5, color: "#FF69B4", x: 8 }, "+=1.4") 
    .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0 }, "+=2")
    
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 25, ease: "expo.out" }, 0.2) 
    .staggerTo(".idea-6 span", 0.8, { scale: 0.5, opacity: 0, rotation: -25, ease: "expo.in" }, 0.2, "+=2") 
    
    .addLabel("surpriseEffect", "+=0.5") 

    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000, ease:"power1.out" }, 0.2, "surpriseEffect")
    .from(".profile-picture", { duration: 0.5, scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45, ease: "bounce.out" }, "surpriseEffect")
    .from(".hat", { duration: 0.5, x: -100, y: 350, rotation: -180, opacity: 0, ease: "elastic.out(1,0.3)" }, "surpriseEffect+=0.1") 

    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1, 0.5)" }, 0.1, "surpriseEffect+=0.6") 
    .staggerTo(".wish-hbd span", 0.7, { scale: 1, rotationY: 0, color: "#E85A70", ease: "expo.out" }, 0.1, "surpriseEffect+=1.0") 
    .from(".wish h5", { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg", ease:"power2.out" }, "<") 
    
    .to(".flower-container", { duration: 0.5, opacity: 1, visibility: "visible"}, "+=1") 
    .to(".petal", {
        duration: 1.5,
        scale: 1, 
        stagger: 0.2, 
        ease: "elastic.out(1, 0.7)"
    }, "-=0.2") 
    .to(".flower-center", { duration: 1, scale: 1, ease: "elastic.out(1,0.7)" }, "-=1.2") 

    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 2, repeatDelay: 0.8, ease: "power1.inOut"}, 0.3, "+=1") 
    .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: "-1"}, "-=1") 
    .to(".flower-container", {duration: 1, opacity: 0, scale: 0.5, ease: "power2.in"}, "+=2") 
    
    .staggerFrom(".nine p", 1, { ...ideaTextTrans, ease:"expo.out"}, 0.8, "+=0.5") 
    .to(".last-smile", { duration: 0.5, rotation: 360, scale: 1.3, color: "#FF1493", ease: "elastic.out(1,0.5)" }, "+=1"); 

    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        // Before restarting, ensure any ongoing GIF loop is stopped to prevent multiple intervals.
        stopGifLoop(); 
        tl.restart();
        // Note: startGifLoop will be called again by the timeline if it reaches that point.
    });
}