import React, { Component } from 'react'
require('http://demander.cz/css/live/demo.css')

export default class Timeline extends Component {
  render() {
    return (
      <section id="cd-timeline" className="cd-container">

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-picture">
            {/* <img src="img/cd-icon-picture.svg" alt="Picture" /> */}
          </div>
          <div className="cd-timeline-content">
            <h2>Ocenění</h2>
            <p>
              Získali jsme ocenění za nejrychlejší 4G LTE síť od serveru DSL.cz za rok 2016. Průměrná rychlost stoupla na 30,3 Mb/s, což je 15% nárůst oproti roku 2015.
            </p>
            <a
              href="http://www.dsl.cz/clanky/rychlosti-mobilniho-internetu-na-dsl-cz-v-roce-2016"
              className="cd-read-more"
            >
              Číst více
            </a>
            <span className="cd-date">Jan 14</span>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-movie">
            {/* <img src="img/cd-icon-movie.svg" alt="Movie" /> */}
          </div>

          <div className="cd-timeline-content">
            <h2>Vítezství</h2>
            <p>
              Stali jsme se absolutními vítězi 14. ročníku soutěže WebTop100, která vyhlašuje nejlepší internetové projekty. Naše stránky získaly hlavní ocenění Firemní web roku 2015 a na prvním místě jsme se umístili i v kategorii Telekomunikace.
            </p>
            <a
              href="https://vysledky.webtop100.cz/2015/"
              className="cd-read-more"
            >
              WebTop100
            </a>
            <span className="cd-date">Jan 18</span>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-picture">
            {/* <img src="img/cd-icon-picture.svg" alt="Picture" /> */}
          </div>

          <div className="cd-timeline-content">
            {/* <h2>Title of section 3</h2> */}
            <p>
              Prostřednictvím LTE roamingu jsme začali nabízet připojení k LTE našim zákazníkům i v zahraničí, stejně tak cizincům v České republice.
            </p>
            {/* <a href="#0" className="cd-read-more">Read more</a> */}
            <span className="cd-date">2014</span>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-location">
            {/* <img src="img/cd-icon-location.svg" alt="Location" /> */}
          </div>

          <div className="cd-timeline-content">
            {/* <h2>Title of section 4</h2> */}
            <p>
              Představili jsme Turbo Internet a plány na pokrytí rychlým mobilním internetem pro rok 2014.
            </p>
            {/* <a href="#0" className="cd-read-more">Read more</a> */}
            <span className="cd-date">2013</span>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-location">
            {/* <img src="img/cd-icon-location.svg" alt="Location" /> */}
          </div>

          <div className="cd-timeline-content">
            <h2 />
            <p>
              Jako první operátor na českém trhu účtujeme hovory našich zákazníků již od počátku po sekundách.
            </p>
            {/* <a href="#0" className="cd-read-more">Read more</a> */}
            <span className="cd-date">2012</span>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-movie">
            {/* <img src="img/cd-icon-movie.svg" alt="Movie" /> */}
          </div>

          <div className="cd-timeline-content">
            <h2 />
            <p>
              Ve více než 40 městech jsme spustili nejvýkonnější 3G technologii s názvem HSPA+ DC.
            </p>
            <span className="cd-date">2012</span>
          </div>
        </div>
      </section>
    )
  }
}
