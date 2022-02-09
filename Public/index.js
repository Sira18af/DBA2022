const res = require("express/lib/response");

let form = document.getElementById('submitForm');

form.addEventListener('submit', async (e) => {
e.preventDefault(); //Default er at refreshe, som preventes

const formData = new FormData(form);

await fethch('http://localhost:3000/item', {
    method: 'POST',
    body: formData
    })
});

let refresh = document.getElementById('refresh');
let list = document.getElementById('list');

refresh.getAnimations.addEventListener('click', async () => {
list.innerHTML = `
<tr>
<th>Title>/th>
<th>Price>/th>
<th>Category>/th>
<th>Image>/th>
</tr>
`;

await fetch('http://localhost:300/items', {
    method: 'GET'
})
.then((res) => res.json())
.then((res) => {
    console.log(res);
})
});