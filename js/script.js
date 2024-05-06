function toggleMenu() {
    var drawer = document.getElementById("drawer");
    if (drawer.style.width === '250px') {
        drawer.style.width = '0'; // Close the drawer if it's open
    } else {
        drawer.style.width = '250px'; // Open the drawer if it's closed
    }
}
