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

                switch(donationType) {
                    case '60': waitDays = 60; donationName = 'цільної крові'; break;
                    case '14': waitDays = 14; donationName = 'плазми'; break;
                    case '14-platelets': waitDays = 14; donationName = 'тромбоцитів'; break;
                    case '120': waitDays = 120; donationName = 'еритроцитів'; break;
                }

                const lastDate = new Date(lastDonation);
                const nextDate = new Date(lastDate);
                nextDate.setDate(nextDate.getDate() + waitDays);

                const today = new Date();
                // Використовуємо Math.max(0, ...), щоб не було від'ємних днів у тексті
                const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));

                const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 
                                'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
                
                const formattedDate = `${nextDate.getDate()} ${months[nextDate.getMonth()]} ${nextDate.getFullYear()}`;

                // Заповнюємо дані
                document.getElementById('nextDate').textContent = formattedDate;

                let message;
                if (daysUntil <= 0) {
                    message = `Чудові новини! Ти вже можеш здати ${donationName} знову. 🎉`;
                } else {
                    const daysWord = getDaysWord(daysUntil);
                    message = daysUntil <= 7 
                        ? `Залишилось всього ${daysUntil} ${daysWord}! Підготуйся до донації ${donationName}.`
                        : `До наступної донації ${donationName} залишилось ${daysUntil} ${daysWord}.`;
                }

                document.getElementById('resultMessage').textContent = message;
                
                // --- ПЛАВНИЙ ПЕРЕХІД ТА ПОКАЗ ---
                const resultDiv = document.getElementById('result');
                
                // 1. Робимо блок видимим (якщо він був display: none)
                resultDiv.style.display = 'block'; 
                
                // 2. Використовуємо requestAnimationFrame для плавності
                // Це гарантує, що браузер встигне "побачити" блок перед скролом
                requestAnimationFrame(() => {
                    resultDiv.classList.add('show');
                    resultDiv.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' // 'start' краще фокусує погляд на початку результату
                    });
                });

                // Налаштовуємо кнопку календаря
                const calendarBtn = document.getElementById('addToCalendarBtn');
                if (calendarBtn) {
                    calendarBtn.onclick = () => addToGoogleCalendar(nextDate, donationName);
                }
            }

            // Функція для Google Календаря
            function addToGoogleCalendar(date, typeName) {
                const startDate = new Date(date);
                startDate.setHours(9, 0, 0);
                const endDate = new Date(startDate);
                endDate.setHours(10, 0, 0);

                const formatDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
                
                const title = encodeURIComponent(`Донація ${typeName}`);
                const details = encodeURIComponent(`Час рятувати життя! Твій запланований візит для здачі ${typeName}.`);
                const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;

                const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&sf=true&output=xml`;
                window.open(googleUrl, '_blank');
            }

            function getDaysWord(days) {
                const absDays = Math.abs(days);
                if (absDays % 10 === 1 && absDays % 100 !== 11) return 'день';
                if ([2, 3, 4].includes(absDays % 10) && ![12, 13, 14].includes(absDays % 100)) return 'дні';
                return 'днів';
            }

            // Універсальний плавний скрол для всіх якірних посилань