let form = document.getElementById('submitForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //Refresh default prevented

    const formData = new FormData(form); 

    await fetch('http://localhost:3000/item', {
        method: 'POST',
        body: formData
    });
});