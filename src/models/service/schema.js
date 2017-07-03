export default function(model) {
  const data = {}

  data.title = model.title
  data.description = model.description
  data.location = model.location
  data.segment_id = model.segment_id.id || model.segment_id

  return data
}
