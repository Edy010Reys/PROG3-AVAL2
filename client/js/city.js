const input = document.querySelector('#input input')
const cards = document.querySelector('#cards')
const votes = document.querySelector('#votes')

input.addEventListener('input', async () => {
  let search = {city: input.value}
  if (search.city.length > 2) {
    let data = await postRole(search)
    cards.innerHTML = ''
    votes.innerHTML = ''
    data.map((elem) => {
      cards.insertAdjacentHTML('afterbegin',
      `<ul>
        <li id="card">
            <h3>${elem.nome}</h3>
            <p>Cargo: ${elem.cargo}</p>
            <p>Votos recebido em ${elem.cidade}: ${elem.votacao}</p>
            <p>Status: ${elem.status}</p>
        </li>
      </ul>`)
      votes.innerHTML = `<h3>Quantidade total de votos no município de ${elem.cidade}: ${elem.votesOfCity}</h3>`
    })
  }
  if (input.value == '') {
    cards.innerHTML = ''
    votes.innerHTML = ''
  }
})

async function postRole(search) {
  return await fetch('http://localhost:3000/municipio', {
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
