export const map = fields =>
  fields.map(item => ({
    label: item.name,
    value: item.id
  }))
