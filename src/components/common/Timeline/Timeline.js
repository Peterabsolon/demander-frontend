import React, { Component } from 'react'
import cx from 'classnames'
import style from './timeline.styl'

export default class Timeline extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <section
          id={style.cdTimeline}
          className={cx('textCenter', style.cdContainer)}
          style={{ margin: '0 auto' }}
        >
          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdPicture].join(' ')}>
              {/* <img src="img/cd-icon-picture.svg" alt="Picture" /> */}
            </div>
            <div className={style.cdTimelineContent}>
              <h2>Ocenění</h2>
              <p>
                Získali jsme ocenění za nejrychlejší 4G LTE síť od serveru DSL.cz za rok 2016. Průměrná rychlost stoupla na 30,3 Mb/s, což je 15% nárůst oproti roku 2015.
              </p>
              <a
                href="http://www.dsl.cz/clanky/rychlosti-mobilniho-internetu-na-dsl-cz-v-roce-2016"
                className={style.cdReadMore}
              >
                Číst více
              </a>
              <span className={style.cdDate}>Jan 14</span>
            </div>
          </div>

          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdMovie].join(' ')}>
              {/* <img src="img/cd-icon-movie.svg" alt="Movie" /> */}
            </div>

            <div className={style.cdTimelineContent}>
              <h2>Vítezství</h2>
              <p>
                Stali jsme se absolutními vítězi 14. ročníku soutěže WebTop100, která vyhlašuje nejlepší internetové projekty. Naše stránky získaly hlavní ocenění Firemní web roku 2015 a na prvním místě jsme se umístili i v kategorii Telekomunikace.
              </p>
              <a
                href="https://vysledky.webtop100.cz/2015/"
                className={style.cdReadMore}
              >
                WebTop100
              </a>
              <span className={style.cdDate}>Jan 18</span>
            </div>
          </div>

          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdPicture].join(' ')}>
              {/* <img src="img/cd-icon-picture.svg" alt="Picture" /> */}
            </div>

            <div className={style.cdTimelineContent}>
              {/* <h2>Title of section 3</h2> */}
              <p>
                Prostřednictvím LTE roamingu jsme začali nabízet připojení k LTE našim zákazníkům i v zahraničí, stejně tak cizincům v České republice.
              </p>
              {/* <a href="#0" className={style.cd-read-more}>Read more</a> */}
              <span className={style.cdDate}>2014</span>
            </div>
          </div>

          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdLocation].join(' ')}>
              {/* <img src="img/cd-icon-location.svg" alt="Location" /> */}
            </div>

            <div className={style.cdTimelineContent}>
              {/* <h2>Title of section 4</h2> */}
              <p>
                Představili jsme Turbo Internet a plány na pokrytí rychlým mobilním internetem pro rok 2014.
              </p>
              {/* <a href="#0" className="cd-read-more}>Read more</a> */}
              <span className={style.cdDate}>2013</span>
            </div>
          </div>

          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdLocation].join(' ')}>
              {/* <img src="img/cd-icon-location.svg" alt="Location" /> */}
            </div>

            <div className={style.cdTimelineContent}>
              <h2 />
              <p>
                Jako první operátor na českém trhu účtujeme hovory našich zákazníků již od počátku po sekundách.
              </p>
              {/* <a href="#0" className={style.cd-read-more}>Read more</a> */}
              <span className={style.cdDate}>2012</span>
            </div>
          </div>

          <div className={style.cdTimelineBlock}>
            <div className={[style.cdTimelineImg, style.cdMovie].join(' ')}>
              {/* <img src="img/cd-icon-movie.svg" alt="Movie" /> */}
            </div>

            <div className={style.cdTimelineContent}>
              <h2 />
              <p>
                Ve více než 40 městech jsme spustili nejvýkonnější 3G technologii s názvem HSPA+ DC.
              </p>
              <span className={style.cdDate}>2012</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
