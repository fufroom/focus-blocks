const schedule = [
    { start: '09:00 AM', end: '09:45 AM', label: 'Block 1' },
    { start: '10:00 AM', end: '10:45 AM', label: 'Block 2' },
    { start: '11:00 AM', end: '11:45 AM', label: 'Block 3' },
    { start: '11:45 AM', end: '01:00 PM', label: 'LUNCH break' },
    { start: '01:00 PM', end: '01:45 PM', label: 'Block 4' },
    { start: '02:00 PM', end: '02:45 PM', label: 'Block 5' },
    { start: '03:00 PM', end: '03:45 PM', label: 'Block 6' },
    { start: '04:00 PM', end: '04:45 PM', label: 'Block 7' },
    { start: '05:00 PM', end: '05:45 PM', label: 'Block 8' }
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
        blockDiv.classList.add('block'); // Updated to remove reliance on Bootstrap
        blockDiv.setAttribute('data-index', index);

        // Remove AM/PM from start and end times
        const startTime = block.start.replace(/ AM| PM/, '');
        const endTime = block.end.replace(/ AM| PM/, '');

        blockDiv.innerHTML = `
            <div class="card bg-dark border-teal text-white">
                <div class="card-body">
                    <div class="block-title">${block.label}</div>
                    <h5 class="card-title">${startTime} - ${endTime}</h5>
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

// Handle focus/unfocus sounds
document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains('focus-input')) {
        playSound('447910__breviceps__plop');
    }
});

document.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('focus-input')) {
        playSound('448080__breviceps__wet-click');
    }
});

async function showBlockEndModal() {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'block-end-modal');

    try {
        const response = await fetch('./block-end-modal.html');
        if (!response.ok) throw new Error('Modal HTML file not found');
        const modalHTML = await response.text();
        modal.innerHTML = modalHTML;

        document.body.appendChild(modal);

        const music = new Audio('./music/home_is_where_the_heart_is.mp3');
        music.loop = true;
        music.play().catch(err => console.error(`Failed to play music: ${err}`));

        const nextButton = document.getElementById('next-block-button');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                music.pause();
                music.currentTime = 0;
                modal.remove();
            });
        }
    } catch (error) {
        console.error('Error loading modal:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('test-block-end');
    if (testButton) {
        testButton.addEventListener('click', () => {
            showBlockEndModal();
        });
    }
});

function checkBlockEnd() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    schedule.forEach((block, index) => {
        const end = parseTimeToMinutes(block.end);

        if (currentTime === end) {
            showBlockEndModal();
        }
    });
}

// Initialize app
updateTime();
setInterval(updateTime, 1000);
renderSchedule();
setInterval(updateCurrentBlock, 1000);
updateCurrentBlock();
window.addEventListener('DOMContentLoaded', () => {
    playSound('452998__breviceps__blip-wave');
});
setInterval(checkBlockEnd, 1000);
