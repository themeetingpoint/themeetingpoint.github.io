window.APP = {}

;(function () {
  APP.Filterer = function () {
    // DOM
    this.$filter = document.getElementById('insurance-filter')
    this.$people = document.getElementsByClassName('provider-wrap')

    // State
    this.insurance = this.getAllInsurance()

    // Events
    this.$filter.addEventListener('change', this.handleFilterChange.bind(this))

    // Kickoff
    this.render()
  }

  APP.Filterer.prototype.render = function () {
    // Simple alpha sort
    const sorted = Object.keys(this.insurance).sort(function (a, b) {
      if(a < b) { return -1 }
      if(a > b) { return 1 }
      return 0
    })

    // Inject different types of insurance into dropdown
    sorted.forEach(function (value) {
      const text = value + ' (' + this.insurance[value] + ')'
      this.$filter.options.add(new Option(text, value))
    }.bind(this))
  }

  // Show/hide people who match current dropdown value
  APP.Filterer.prototype.handleFilterChange = function (event) {
    for (let i = 0; i < this.$people.length; i++) {
      const $person = this.$people[i]
      const insurance = $person.getAttribute('data-insurance')
      const value = this.$filter.value

      // Show if insurance match, or if we're filtering on all insurance types
      if (insurance.indexOf(value) !== -1 || value.toLowerCase() === 'all') {
        $person.classList.remove('hidden')
      }
      else {
        $person.classList.add('hidden')
      }
    }
  }

  // Return an object with insurance name and number of times it occurs as key/val pairs
  APP.Filterer.prototype.getAllInsurance = function () {
    let allInsurance = []
    for (let i = 0; i < this.$people.length; i++) {
      const personInsurance = this.$people[i].getAttribute('data-insurance').split(',')
      personInsurance.forEach(function (insurance) {
        if (insurance.trim().length) {
          allInsurance.push(insurance.trim())
        }
      })
    }

    return allInsurance.reduce(function (acc, insurance) {
      acc[insurance] = (acc[insurance] || 0) + 1
      return acc
    }, {})
  }
})()

// ;(function () {
//   APP.SomeOtherComponent = function () {
//     console.log('SomeOtherComponent')
//   }
// })()

// Kickoff
// document.addEventListener('DOMContentLoaded', function() {
//   APP.filterer = new APP.Filterer()
// })
