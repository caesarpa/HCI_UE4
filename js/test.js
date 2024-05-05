const track = document.getElementById("image-track");

function startDrag(e) {
    // Prevent the default touch event only if it's a touchstart
    if (e.type === 'touchstart') {
        e.preventDefault();
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    track.dataset.mouseDownAt = clientX;
}

function endDrag() {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

function doDrag(e) {
    // Only call preventDefault if actively dragging to avoid stuck scrolling
    if (track.dataset.mouseDownAt !== "0") {
        e.preventDefault();
    }

    if (track.dataset.mouseDownAt === "0") return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Set bounds for translation
    nextPercentage = Math.max(-150, Math.min(50, nextPercentage));

    track.dataset.percentage = nextPercentage;

    // Animate the track movement
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {
        duration: 1200,
        fill: "forwards"
    });

    // Animate each image's position
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {
            duration: 1200,
            fill: "forwards"
        });
    }
}

// Mouse event listeners
window.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('mousemove', doDrag);

// Touch event listeners
window.addEventListener('touchstart', startDrag, {passive: false});
window.addEventListener('touchend', endDrag);
window.addEventListener('touchmove', doDrag, {passive: false});
