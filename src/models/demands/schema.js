export default function(model) {
  const data = {}

  data.title = model.title
  data.category_id = model.category_id.id || model.category_id
  // TODO
  data.company_id = 1
  data.goal = model.goal
  data.input = model.input
  data.output = model.output
  data.timeplan = model.timeplan
  data.budget = model.budget
  data.description = model.description
  data.responsible_person = model.responsible_person

  return data
}
