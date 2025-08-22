function searchCustomers() {
    fetch('/api/customers')
        .then(r => r.json())
        .then(data => {
            let html = '<table><tr><th>ID</th><th>Name</th><th>Email</th></tr>';
            data.data.forEach(c => {
                html += `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td></tr>`;
            });
            html += '</table>';
            document.getElementById('results').innerHTML = html;
        });
}
window.onload = searchCustomers;
