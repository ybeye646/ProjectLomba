// Initialize Lucide Icons
lucide.createIcons();

// Smooth Scroll Helper
function scrollToAdopt() {
    document.getElementById('simulation').scrollIntoView({ behavior: 'smooth' });
}

// Canvas Simulation Variables
let canvas = document.getElementById('turtleCanvas');
let ctx = canvas.getContext('2d');
let turtleX = 20;
let turtleY = 0;
let progress = 0;
let isReleasing = false;
let animationFrame;

// Start Turtle Release Simulation
function startReleaseProcess() {
    const adopter = document.getElementById('adopterName').value.trim();
    const turtle = document.getElementById('turtleName').value.trim();

    if (!adopter || !turtle) {
        alert('Mohon isi nama kamu dan nama tukikmu terlebih dahulu!');
        return;
    }

    document.getElementById('adoptForm').classList.add('hidden');
    document.getElementById('simulatorContainer').classList.remove('hidden');

    // Resize Canvas dynamically
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    turtleY = canvas.height / 2;
    progress = 0;
    isReleasing = true;

    // Canvas click to boost turtle speed
    canvas.addEventListener('click', boostTurtle);

    runSimulation();
}

function boostTurtle() {
    if (progress < 100) {
        progress += 8;
        if (progress > 100) progress = 100;
    }
}

function runSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sand (Left side)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, 0, canvas.width * 0.7, canvas.height);

    // Draw Ocean (Right side)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(canvas.width * 0.7, 0, canvas.width * 0.3, canvas.height);

    // Draw Shoreline wave effect
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.7, 0);
    ctx.lineTo(canvas.width * 0.7, canvas.height);
    ctx.stroke();

    // Calculate Turtle Position
    progress += 0.25; // Auto move speed
    turtleX = (progress / 100) * (canvas.width - 40);

    // Draw Turtle Icon / Graphics
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(turtleX + 15, turtleY, 12, 0, Math.PI * 2); // Body
    ctx.fill();

    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.arc(turtleX + 25, turtleY, 6, 0, Math.PI * 2); // Head
    ctx.fill();

    // Update Status Label
    const statusText = document.getElementById('simStatus');
    if (progress < 70) {
        statusText.innerText = 'Tukik sedang merayap di pasir Pantai Kili-Kili...';
    } else if (progress < 100) {
        statusText.innerText = 'Tukik mendekati ombak lautan!';
    } else {
        statusText.innerText = 'Tukik berhasil berenang bebas di lautan!';
        finishSimulation();
        return;
    }

    if (isReleasing) {
        animationFrame = requestAnimationFrame(runSimulation);
    }
}

function finishSimulation() {
    isReleasing = false;
    cancelAnimationFrame(animationFrame);

    setTimeout(() => {
        document.getElementById('simulatorContainer').classList.add('hidden');
        document.getElementById('certificate').classList.remove('hidden');

        document.getElementById('certAdopter').innerText = document.getElementById('adopterName').value;
        document.getElementById('certTurtle').innerText = document.getElementById('turtleName').value;
        document.getElementById('certSpecies').innerText = document.getElementById('turtleSpeciesSelect').value;

        document.getElementById('certificate').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Mini Quiz Data (Materi 4 Spesies Penyu)
const quizData = [
    {
        q: "Spesies penyu mana yang paling dominan bertelur di Pantai Kili-Kili?",
        options: ["Penyu Lekang Abu-abu", "Penyu Belimbing", "Penyu Sisik", "Penyu Hijau"],
        answer: 0
    },
    {
        q: "Manakah spesies penyu terbesar di dunia yang karapasnya menyerupai belimbing?",
        options: ["Penyu Hijau", "Penyu Sisik", "Penyu Belimbing", "Penyu Lekang"],
        answer: 2
    },
    {
        q: "Penyu yang memiliki bentuk paruh tajam seperti elang dan bercorak indah adalah...",
        options: ["Penyu Sisik", "Penyu Belimbing", "Penyu Lekang Abu-abu", "Penyu Hijau"],
        answer: 0
    },
    {
        q: "Apa tindakan terbaik jika menemukan penyu bertelur di malam hari?",
        options: ["Nyalakan flash HP untuk foto", "Matikan penerangan & jangan mengganggu", "Mendekati dan memegang penyu", "Beri makan penyu"],
        answer: 1
    }
];

let currentQuiz = 0;

function loadQuiz() {
    const q = quizData[currentQuiz];
    document.getElementById('quizQuestion').innerText = q.q;
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left bg-slate-700/50 hover:bg-slate-700 p-3 rounded-xl text-sm transition border border-slate-600/50";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIdx) {
    const q = quizData[currentQuiz];
    const feedback = document.getElementById('quizFeedback');
    feedback.classList.remove('hidden');

    if (selectedIdx === q.answer) {
        feedback.className = "text-xs font-bold p-3 rounded-xl text-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
        feedback.innerText = "Jawaban Benar! Wawasan ekologimu sangat baik.";
    } else {
        feedback.className = "text-xs font-bold p-3 rounded-xl text-center bg-rose-500/20 text-rose-400 border border-rose-500/30";
        feedback.innerText = "Kurang tepat, coba pelajari lagi ya!";
    }

    setTimeout(() => {
        feedback.classList.add('hidden');
        currentQuiz = (currentQuiz + 1) % quizData.length;
        loadQuiz();
    }, 2000);
}

// Initial Quiz Load
loadQuiz();
