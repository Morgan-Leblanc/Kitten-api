const cardTemplate = `
<div class="card">
  <div class="card-header">
    #NAME
    <i class="fas #SEX"></i>
  </div>
  <div class="card-body">
    <h5 class="card-title">#RACE / #COLOR</h5>
    <p class="card-text">Naissance : #DATEOFBIRTH</p>
    #BUTTON
  </div>
</div>
`;

$.get('http://localhost:3500/kittens', function (kittensCollection) {
  kittensCollection.forEach(kitten => {
    createCard(kitten)
  })

  listenToCLick()

});

function createCard(kitten) {
  let template = cardTemplate
    .replace('#NAME', kitten.name)
    .replace('#RACE', kitten.race)
    .replace('#COLOR', kitten.color)
    .replace('#DATEOFBIRTH', kitten.dateOfBirth)
    ;

  if (!kitten.adopt) {
    template = template.replace('#BUTTON', `<a href="#"  data-id="${kitten.id}"class="btn btn-primary">Adopter</a>`)
  } else {
    template = template.replace('#BUTTON', '<span class="badge badge-sucess">Adopté!</span>')
  }



  if (kitten.sex) {
    template = template.replace('#SEX', 'fa-mars')
  } else {
    template = template.replace('#SEX', 'fa-venus')
  }

  $('.container').append(template);
}

const listenToCLick = () => {
  $('.btn').on('click', function (e) {
    e.preventDefault()

    const id = $(this).data('id')
    const url = `http://localhost:3500/kittens/${id}/adopt`
    const button = $(this)
    const parent = button.parent()

    $.get(url, function () {
      button.remove() 
      parent.append('<span class="badge badge-sucess">Adopté!</span>')
    })
  })
}
