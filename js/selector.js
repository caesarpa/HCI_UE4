const track = document.getElementById("image-track");

function startDrag(e) {
    e.preventDefault();  // Consistently prevent default to ensure touch tracking is smooth
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    track.dataset.mouseDownAt = clientX;
}

function endDrag() {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

function doDrag(e) {
    if (track.dataset.mouseDownAt === "0") return;

    e.preventDefault();  // Prevent default behavior during drag to avoid scrolling interference
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -50;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Enforce bounds for translation
    nextPercentage = Math.max(-100, Math.min(0, nextPercentage));

    track.dataset.percentage = nextPercentage;

    // Directly update transform property for immediate feedback
    track.style.transform = `translate(${nextPercentage}%, -50%)`;
    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
}

// Event listeners for mouse
window.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('mousemove', doDrag);

// Event listeners for touch
window.addEventListener('touchstart', startDrag, {passive: false});
window.addEventListener('touchend', endDrag);
window.addEventListener('touchmove', doDrag, {passive: false});