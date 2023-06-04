function LoadFile() {
    var fileName = 'New_Score.txt';
    let emptyScore = new Blob([''], { type: 'text/plain' });

    let formData = new FormData();
    formData.append('file', emptyScore, fileName);

    // Send the file to the server using an HTTP POST request
    fetch('http://localhost:3001/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: 'New_Score.txt',
            context: ''
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
    // Redirect to Translate.html with the filename as a query parameter
    location.href = `translate.html?fileName=${encodeURIComponent(fileName)}`;
});
}
