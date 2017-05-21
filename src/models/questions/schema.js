export default function(model) {
  const data = {}

  data.author = model.author
  data.title = model.title
  data.text = model.text
  data.effect = model.effect
  data.effectNote = model.effectNote
  data.availableFrom = new Date().toISOString()
  data.availableTo = model.availableTo

  data.cities = model.cities || []
  data.tags = model.tags || []

  // lol
  data.questionTypeId = 'single'
  data.questionOptions = [
    { title: 'Ano' },
    { title: 'Nie' },
    { title: 'Neviem' }
  ]

  return data
}
