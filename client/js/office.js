const select = document.querySelector('#input select')
const cards = document.querySelector('#cards')

select.addEventListener('input', async () => {
  let search = { role: select.value }
  let data = await postRole(search)
  cards.innerHTML = ''
  data.map((elem) => {
    cards.insertAdjacentHTML('afterbegin',
        `<ul id="card">
            <li>
                <h3>${elem.nome}</h3>
                <p>Cargo: ${elem.cargo}</p>
                <p>Votos recebido: ${elem.votacao}</p>
                <p>Status: ${elem.status}</p>
            </li>
        </ul>`);
    })
})

async function postRole(search) {
  return await fetch('http://localhost:3000/cargo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(search)
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}