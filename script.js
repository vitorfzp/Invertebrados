document.addEventListener('DOMContentLoaded', function() {

    // Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Animação de hover (efeito de 'levantar' a caixa)
    // O CSS já lida com a maior parte do hover, mas podemos adicionar classes se quisermos mais controle
    // Por enquanto, o hover principal é via CSS para simplicidade.

    // Animação de entrada ao rolar a página (Scroll Animation)
    const timelineContainers = document.querySelectorAll('.timeline-container');

    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.2 // O elemento é considerado visível quando 20% dele está na tela
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para de observar depois que a animação ocorreu uma vez
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    timelineContainers.forEach(container => {
        scrollObserver.observe(container);
    });

});