document.addEventListener('DOMContentLoaded', function() {
        function toggleAvailability(personId) {
            fetch(`/toggle_availability/${personId}`)
                .then(response => response.json())
                .then(data => {
                    const statusSpan = document.getElementById(`status-${personId}`);
                    if (data.available) {
                        statusSpan.textContent = 'Available';
                        statusSpan.className = 'available';
                    } else {
                        statusSpan.textContent = 'Not Available';
                        statusSpan.className = 'not-available';
                    }
                });
        }
    });