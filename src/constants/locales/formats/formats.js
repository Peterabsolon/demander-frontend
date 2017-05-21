const intlData = {
  'en-GB': {
    number: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      },
      percentage: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }
    },
    date: {
      short: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      },
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    },
    time: {
      hhmm: {
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  cs: { // eslint-disable-line
    number: {
      currency: {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0
      },
      percentage: {
        style: 'percent'
      },
      shares: {
        minimumFractionDigits: 2
      }
    },
    date: {
      short: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      },
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    },
    time: {
      hhmm: {
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
}

export default intlData
