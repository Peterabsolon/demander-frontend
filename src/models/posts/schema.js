export default function(model) {
  const data = {}

  data.author = model.author
  data.title = model.title
  data.contentUrl = model.contentUrl
  data.imageUrl = model.imageUrl

  data.postTypeId = 'article'

  data.cities = model.cities || []
  data.tags = model.tags || []

  return data
}
