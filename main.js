
// Set max date for date input to today
document.getElementById('lastDonation').max = new Date().toISOString().split('T')[0];

function calculateNextDate() {
    const donationType = document.getElementById('donationType').value;
    const lastDonation = document.getElementById('lastDonation').value;

    if (!lastDonation) {
        alert('Будь ласка, вкажіть дату останньої донації');
        return;
    }

    let waitDays;
    let donationName;

    switch (donationType) {
        case '60':
            waitDays = 60;
            donationName = 'цільної крові';
            break;
        case '14':
            waitDays = 14;
            donationName = 'плазми';
            break;
        case '14-platelets':
            waitDays = 14;
            donationName = 'тромбоцитів';
            break;
        case '120':
            waitDays = 120;
            donationName = 'еритроцитів';
            break;
    }

    const lastDate = new Date(lastDonation);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + waitDays);

    const today = new Date();
    const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));

    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
        'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

    const formattedDate = `${nextDate.getDate()} ${months[nextDate.getMonth()]} ${nextDate.getFullYear()}`;

    document.getElementById('nextDate').textContent = formattedDate;

    let message;
    if (daysUntil <= 0) {
        message = `Чудові новини! Ти вже можеш здати ${donationName} знову. Дякуємо за твою відповідальність! 🎉`;
    } else if (daysUntil <= 7) {
        message = `Залишилось всього ${daysUntil} ${getDaysWord(daysUntil)}! Підготуйся до наступної донації ${donationName}.`;
    } else {
        message = `До наступної донації ${donationName} залишилось ${daysUntil} ${getDaysWord(daysUntil)}. Ми нагадаємо тобі завчасно!`;
    }

    document.getElementById('resultMessage').textContent = message;
    document.getElementById('result').classList.add('show');

    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getDaysWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) {
        return 'день';
    } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
        return 'дні';
    } else {
        return 'днів';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

