document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Função para criar o calendário
    function createCalendar(month, year) {
        const calendarDays = document.querySelector('.calendar-days');
        calendarDays.innerHTML = '';

        // Obter o primeiro dia e o número de dias do mês
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let dayCount = 1;

        // Preencher os dias do calendário
        for (let i = 0; i < firstDay; i++) { 
            // Adiciona espaços vazios antes do primeiro dia do mês (mas não exibe cartões vazios)
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            calendarDays.appendChild(emptyDiv);
        }

        // Preencher os dias do mês
        for (let i = 0; i < daysInMonth; i++) { 
            const dayDiv = document.createElement('div');
            dayDiv.textContent = dayCount;

            const currentDate = new Date();

            // Destacar o dia atual
            if (dayCount === currentDate.getDate() &&
                month === currentDate.getMonth() &&
                year === currentDate.getFullYear()) {
                dayDiv.classList.add('current-day');
            }

            // Identificar sábados e domingos
            const dayOfWeek = new Date(year, month, dayCount).getDay();
            if (dayOfWeek === 0) {
                dayDiv.classList.add('sunday'); // Domingo
            } else if (dayOfWeek === 6) {
                dayDiv.classList.add('saturday'); // Sábado
            }

            calendarDays.appendChild(dayDiv);
            dayCount++;
        }
    }

    // Exibir o mês e o ano no topo do calendário
    function updateMonthYear(month, year) {
        const monthYear = document.querySelector('.month-year');
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        monthYear.textContent = `${monthNames[month]} ${year}`;
    }

    // Inicializar o calendário
    updateMonthYear(currentMonth, currentYear);
    createCalendar(currentMonth, currentYear);

    // Função que verifica se o dia mudou e recria o calendário
    function checkForDateChange() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const storedDay = parseInt(localStorage.getItem('currentDay'), 10);

        if (currentDay !== storedDay || currentMonth !== currentDate.getMonth() || currentYear !== currentDate.getFullYear()) {
            createCalendar(currentDate.getMonth(), currentDate.getFullYear()); // Recriar o calendário quando o dia mudar
            updateMonthYear(currentDate.getMonth(), currentDate.getFullYear()); // Atualiza o mês e ano
            localStorage.setItem('currentDay', currentDay); // Atualizar o valor armazenado
        }
    }

    // Armazenar o dia atual
    localStorage.setItem('currentDay', currentDate.getDate());

    // Verificar se o dia mudou a cada 60 segundos (1 minuto)
    setInterval(checkForDateChange, 60000);
});
