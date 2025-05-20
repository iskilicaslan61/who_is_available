<script>
        function toggleAvailability(personId) {
            fetch(`/toggle_availability/${personId}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                let statusSpan = document.getElementById(`status-${personId}`);
                if (data.new_status) {
                    statusSpan.className = 'available';
                    statusSpan.textContent = 'Available';
                } else {
                    statusSpan.className = 'not-available';
                    statusSpan.textContent = 'Not Available';
                }
            })
            .catch(error => {
                console.error("Error toggling availability:", error);
            })
        }
    </script>