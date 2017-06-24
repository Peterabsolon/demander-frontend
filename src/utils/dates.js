import moment from 'moment'

export const formatDate = date => moment(date).format('DD.MM.YYYY')

export const formatFromNow = date => moment(date).fromNow()
