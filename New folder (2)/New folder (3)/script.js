function showSection(sectionId) {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    document.getElementById(sectionId).classList.remove('hidden');

    let navItems = document.querySelectorAll("nav ul li");
    navItems.forEach(item => item.classList.remove("active"));
    
    document.querySelector(`nav ul li[onclick="showSection('${sectionId}')"]`).classList.add("active");
}
function navigateTo(page) {
    window.location.href = page;
}

// Page 1 - Load saved addresses
document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('address-list');
    if (list) {
        const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        list.innerHTML = addresses.map(a => `<li>${a.fullAddress}, ${a.landmark} - ${a.phone}</li>`).join('');
    }
});

// Page 2 - Get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        alert("Geolocation is not supported.");
    }
}

function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    document.getElementById("location-info").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
    document.getElementById("proceed-btn").style.display = "block";
}

// Page 3 - Fetch Address Suggestions
async function fetchSuggestions() {
    let query = document.getElementById("address-input").value;
    if (query.length < 3) return;
    
    let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    let data = await response.json();
    
    let suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = data.map(item => `<li onclick="selectSuggestion('${item.display_name}')">${item.display_name}</li>`).join('');
}

function selectSuggestion(address) {
    document.getElementById("address-input").value = address;
    document.getElementById("suggestions").innerHTML = "";
}

// Page 4 - Save Address
function saveAddress() {
    let address = {
        fullAddress: document.getElementById("full-address").value,
        landmark: document.getElementById("landmark").value,
        phone: document.getElementById("phone").value
    };
    
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    
    alert("Address Saved!");
    navigateTo('index.html');
}
document.addEventListener("DOMContentLoaded", function () {
    const deleteButton = document.querySelector(".delete-btn");
    const popup = document.getElementById("popup");
    const closeBtn = document.querySelector(".close");
    const confirmDelete = document.querySelector(".confirm-delete");

    // Show popup when clicking "Delete My Account"
    deleteButton.addEventListener("click", function () {
        popup.classList.remove("hidden");
    });

    // Close popup when clicking "X"
    closeBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
    });

    // Confirm account deletion
    confirmDelete.addEventListener("click", function () {
        const reason = document.getElementById("reason").value;
        console.log("Account deletion reason:", reason);

        // Simulating account deletion process
        alert("Your account has been deleted successfully.");
        localStorage.clear(); // Clear user data
        sessionStorage.clear();
        window.location.href = "login.html"; // Redirect to login page
    });
});
