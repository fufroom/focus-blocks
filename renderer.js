const schedule = [
    { time: '09:00 AM - 09:45 AM', label: 'BLK1' },
    { time: '10:00 AM - 10:45 AM', label: 'BLK2' },
    { time: '11:00 AM - 11:45 AM', label: 'BLK3' },
    { time: '11:45 AM - 01:00 PM', label: 'LUNCH break' },
    { time: '01:00 PM - 01:45 PM', label: 'BLK4' },
    { time: '02:00 PM - 02:45 PM', label: 'BLK5' },
    { time: '03:00 PM - 03:45 PM', label: 'BLK6' },
    { time: '04:00 PM - 04:45 PM', label: 'BLK7' },
    { time: '05:00 PM - 05:45 PM', label: 'BLK8' }
];

function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-time').innerText = formattedTime;
}

function parseTimeToMinutes(time) {
    const [hours, minutes, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    const isPM = period === 'PM';
    const hourInMinutes = (parseInt(hours) % 12 + (isPM ? 12 : 0)) * 60;
    return hourInMinutes + parseInt(minutes);
}

function renderSchedule() {
    const container = document.getElementById('schedule');
    schedule.forEach((block, index) => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('col-md-4', 'block'); // 3 across with Bootstrap
        blockDiv.setAttribute('data-index', index);
        blockDiv.innerHTML = `
            <div class="card bg-dark border-teal text-white">
                <div class="card-body">
                    <h5 class="card-title">${block.time}</h5>
                    <p>${block.label}</p>
                    <input type="text" class="form-control focus-input" placeholder="Focus on...">
                </div>
            </div>
        `;
        container.appendChild(blockDiv);
    });
}

function updateCurrentBlock() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    document.querySelectorAll('.block').forEach((block, index) => {
        const [start, end] = schedule[index].time.split('-').map(t => t.trim()).map(parseTimeToMinutes);

        if (currentTime >= start && currentTime < end) {
            block.classList.add('active');
        } else {
            block.classList.remove('active');
        }
    });
}

function playSound(type) {
    const audio = new Audio(`./sounds/${type}.wav`);
    audio.play().catch((err) => console.error(`Failed to play sound: ${err}`));
}

// Initialize app
updateTime();
setInterval(updateTime, 1000);
renderSchedule();
setInterval(updateCurrentBlock, 1000);
updateCurrentBlock();
playSound('startup');
