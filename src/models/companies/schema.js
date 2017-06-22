export default function(model) {
  const data = {}

  data.company_name = model.company_name
  data.category_id = model.category_id.id || model.category_id
  data.web_url = model.web_url
  data.logo_url = model.logo_url
  data.slogan = model.slogan
  data.company_description = model.company_description
  data.contact_telephone = model.contact_telephone
  data.contact_email = model.contact_email
  data.company_address = model.company_address
  data.contact_person = model.contact_person
  data.fb_url = model.fb_url
  data.linkedin_url = model.linkedin_url
  data.twitter_url = model.twitter_url

  return data
}
