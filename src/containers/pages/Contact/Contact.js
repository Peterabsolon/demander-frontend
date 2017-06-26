import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ContactPresentation } from 'components/sections/contact'
// import { Section } from 'components/layout'

import style from './contact.styl'

// import { HomePresentation } from 'components/sections/home'
// import { LatestDemands, LatestServices } from 'containers/common'
//
// import { apiCategories } from 'decorators/api'

// Preload categories
// @apiCategories({
//   list: true
// })
export default class Contact extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div>
        <div>
          <ContactPresentation />
          {/* <Section textCenter borderTop>
             <iframe
              id="contact"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5080.834223446336!2d13.424060532953307!3d50.45195699513782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470a1bafcec2e609%3A0xcd78c8e9cfed8498!2sPra%C5%BEsk%C3%A1+5382%2C+430+01+Chomutov!5e0!3m2!1scs!2scz!4v1498458921138"
              width="600"
              height="550"
              frameBorder="0"
              allowFullScreen
              style="border:0"
            />
            <iframe
              className={style.map}
              id="kontakt"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5080.834223446336!2d13.424060532953307!3d50.45195699513782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470a1bafcec2e609%3A0xcd78c8e9cfed8498!2sPra%C5%BEsk%C3%A1+5382%2C+430+01+Chomutov!5e0!3m2!1scs!2scz!4v1498458921138"
              width="100%"
              height="450"
              frameBorder="0"
              allowFullScreen
            />

          </Section>  */}

          <iframe
            className={style.map}
            id="kontakt"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5080.834223446336!2d13.424060532953307!3d50.45195699513782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470a1bafcec2e609%3A0xcd78c8e9cfed8498!2sPra%C5%BEsk%C3%A1+5382%2C+430+01+Chomutov!5e0!3m2!1scs!2scz!4v1498458921138"
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen
          />
          {/* <HomePresentation />
          <LatestDemands />
          <LatestServices /> */}
        </div>
      </div>
    )
  }
}
