let form = document.getElementById('submitForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //Refresh default prevented

    const formData = new FormData(form); 

    await fetch('http://localhost:3000/item', {
        method: 'POST',
        body: formData
    });
});


let refresh = document.getElementById('refresh'); //Tag element og refresh
let list = document.getElementById('list');

refresh.addEventListener('click', async () => {
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Category</th>
        <th>Image</th>
    </tr>
    `;

    await fetch('http://localhost:3000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
    })
});