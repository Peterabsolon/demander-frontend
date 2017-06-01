export default function(model) {
  const data = {}

  data.title = model.title
  data.description = model.description
  data.location = model.location
  data.category_id = model.category_id.id || model.category_id
  data.company_id = model.company_id.id || model.company_id

  return data
}
