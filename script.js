const monthYearElement = document.getElementById('month-year');
const calendarDaysElement = document.getElementById('calendar-days');

// Função para criar o calendário
function createCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Definir o mês e ano
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Limpar os dias anteriores
    calendarDaysElement.innerHTML = '';

    // Preencher os dias do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        calendarDaysElement.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        // Destacar o dia atual
        if (day === currentDay) {
            dayDiv.classList.add('current-day');
        }

        calendarDaysElement.appendChild(dayDiv);
    }
}

// Criar o calendário ao carregar a página
createCalendar();
