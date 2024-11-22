const schedule = [
    { start: '09:00 AM', end: '09:45 AM', label: 'BLK1' },
    { start: '10:00 AM', end: '10:45 AM', label: 'BLK2' },
    { start: '11:00 AM', end: '11:45 AM', label: 'BLK3' },
    { start: '11:45 AM', end: '01:00 PM', label: 'LUNCH break' },
    { start: '01:00 PM', end: '01:45 PM', label: 'BLK4' },
    { start: '02:00 PM', end: '02:45 PM', label: 'BLK5' },
    { start: '03:00 PM', end: '03:45 PM', label: 'BLK6' },
    { start: '04:00 PM', end: '04:45 PM', label: 'BLK7' },
    { start: '05:00 PM', end: '05:45 PM', label: 'BLK8' }
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
    container.innerHTML = ''; // Clear any existing content to prevent duplication
    schedule.forEach((block, index) => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('col-md-4', 'block'); // 3 across with Bootstrap
        blockDiv.setAttribute('data-index', index);
        blockDiv.innerHTML = `
            <div class="card bg-dark border-teal text-white">
                <div class="card-body">
                    <h5 class="card-title">${block.start} - ${block.end}</h5>
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
        const start = parseTimeToMinutes(schedule[index].start);
        const end = parseTimeToMinutes(schedule[index].end);
        const cardTitle = block.querySelector('.card-title');

        if (currentTime >= start && currentTime < end) {
            block.classList.add('active');
            cardTitle.innerHTML = `${schedule[index].start} - ${schedule[index].end} <span style="color: lime;">(Current Block)</span>`;
        } else {
            block.classList.remove('active');
            cardTitle.innerHTML = `${schedule[index].start} - ${schedule[index].end}`;
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
