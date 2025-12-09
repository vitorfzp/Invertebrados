document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFEITO SPOTLIGHT (A Lanterna do Batiscafo) ---
    const cursor = document.querySelector('.cursor-light');
    
    document.addEventListener('mousemove', (e) => {
        // Move o gradiente para seguir o mouse
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // --- 2. ENGINE DE ANIMAÇÃO DE ROLAGEM (Intersection Observer) ---
    const cards = document.querySelectorAll('.timeline-container');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Adiciona uma pequena animação de entrada transformando o Y
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.transform = 'translateY(50px)'; // Estado inicial
        observer.observe(card);
    });

    // --- 3. LÓGICA DO FLIP 3D ---
    const flipCards = document.querySelectorAll('.card-3d');
    
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove a classe de todos os outros para focar em um só (opcional)
            flipCards.forEach(c => {
                if(c !== card) c.classList.remove('flipped');
            });
            // Alterna o atual
            card.classList.toggle('flipped');
        });
    });

    // --- 4. ENGINE DO QUIZ GAMIFICADO ---
    const questions = [
        {
            question: "Qual destes animais NÃO possui cérebro ou órgãos?",
            answers: [
                { text: "Polvo", correct: false },
                { text: "Esponja (Porífero)", correct: true },
                { text: "Caranguejo", correct: false },
                { text: "Lombria", correct: false }
            ]
        },
        {
            question: "Qual característica define os Artrópodes?",
            answers: [
                { text: "Corpo mole", correct: false },
                { text: "Esqueleto interno calcário", correct: false },
                { text: "Exoesqueleto de Quitina e patas articuladas", correct: true },
                { text: "Células urticantes", correct: false }
            ]
        },
        {
            question: "Quem são os parentes evolutivos mais próximos dos vertebrados?",
            answers: [
                { text: "Equinodermos (Estrelas-do-mar)", correct: true },
                { text: "Moluscos", correct: false },
                { text: "Anelídeos", correct: false },
                { text: "Cnidários", correct: false }
            ]
        },
        {
            question: "Qual animal possui maior capacidade de regeneração?",
            answers: [
                { text: "Lula", correct: false },
                { text: "Planária (Platelminto)", correct: true },
                { text: "Siri", correct: false },
                { text: "Água-viva", correct: false }
            ]
        }
    ];

    const questionContainer = document.getElementById('question-box');
    const answerButtonsElement = document.getElementById('options-box');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const scoreBox = document.getElementById('score-box');

    let currentQuestionIndex = 0;
    let score = 0;

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.classList.add('hidden');
        restartButton.classList.add('hidden');
        scoreBox.classList.add('hidden');
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionContainer.innerText = question.question;
        answerButtonsElement.innerHTML = ''; // Limpa botões antigos
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn-option');
            button.dataset.correct = answer.correct;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === "true";
        
        if(correct) score++;

        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === "true");
            button.disabled = true; // Trava os botões
        });

        if (questions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hidden');
        } else {
            showScore();
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showScore() {
        scoreBox.innerHTML = `<h3>Missão Cumprida!</h3><p>Sua pontuação: ${score} de ${questions.length}</p>`;
        scoreBox.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
    });

    restartButton.addEventListener('click', startGame);

    // Inicia o quiz
    startGame();

    // Atualiza ano footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});