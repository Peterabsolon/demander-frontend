export default function(model) {
  const data = {}

  data.title = model.title
  data.categories = model.categories.map(category => category.id)
  data.goal = model.goal
  data.input = model.input
  data.output = model.output
  data.timeplan = model.timeplan
  data.budget = model.budget
  data.description = model.description
  data.responsible_person = model.responsible_person

  return data
}
