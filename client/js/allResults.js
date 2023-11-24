const select = document.querySelector('#input select')
const cards = document.querySelector('#cards')

select.addEventListener('input', async () => {
  let search = {status: select.value}
  let data = await postNameCadidante(search)
  cards.innerHTML = ''
  data.map((elem) => {
    cards.insertAdjacentHTML('afterbegin',
      `<ul id="card">
          <li>
              <h3>${elem.nome}</h3>
              <p>Cargo: ${elem.cargo}</p>
              <p>Votos recebidos: ${elem.votos}</p>
              <p>Status: ${elem.status}</p>
          </li>
      </ul>`);
  })
})

async function postNameCadidante(search) {
  return await fetch('http://localhost:3000/resultadogeral', {
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