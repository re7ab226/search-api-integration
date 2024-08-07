document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const area = document.getElementById('areaInput').value;
    const roomCount = document.getElementById('roomCountInput').value;
    const pricehigh = document.getElementById('pricehigh').value;
    const pricelow = document.getElementById('pricelow').value;



    const queryParams = new URLSearchParams({
        name: name,
        area: area,
        room_count: roomCount,
        price_high:pricehigh,
        price_low:pricelow,
    });

    fetch(`https://api.ejark.sa/api/realestates?${queryParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            // Check if the status is true and data is an array
            if (data.status && Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('result-item');
                    itemDiv.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>Address: ${item.address}</p>
                        <p>Ad Number: ${item.number_ad}</p>
                        <p>Instrument Number: ${item.instrument_number}</p>
                    `;
                    resultsDiv.appendChild(itemDiv);
                });
            } else {
                resultsDiv.textContent = 'No results found';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const resultsDiv = document.getElementById('results');
            resultsDiv.textContent = 'Error fetching data';
        });
});
