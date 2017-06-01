import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Paragraph } from 'components/misc'
import { Section } from 'components/layout'
// import { FeatureItem } from './__elements__'

import style from './contact-presentation.styl'
import cx from 'classnames'

// react tabs import
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export default class ContactPresentation extends Component {
  static propTypes = {
    something: PropTypes.any,
  }

  render() {
    return (
      <div>
        <Section gutters className={style.nobottomborder}>
          <h2 className={cx('title', [style.customtitle])}>
            Kontakt
          </h2>
          <Paragraph primary center noMargin>
            Společnost Demander s.r.o., IČO 98798776, DIČ CZ98798776 sídlící na Pařížské 89, Praha 1, 100 00.
          </Paragraph>

        </Section>

        <Section>
          <div className="features-4">

            <div className="row">

              <div
                className={cx('col-md-4', 'col-md-offset-2', [style.floatleft])}
              >
                <div className={style.info}>
                  {/* <div className="icon icon-info"> */}
                  <div className={cx('icon', 'icon-info', [style.icons])}>
                    <i className="material-icons">place</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Adresa
                    </h4>
                    <br /><br />
                    <h4>Demander s.r.o.</h4>
                    <h4>IČO 98798776</h4>
                    <h4>DIČ CZ98798776</h4>
                    <h4>Pařížská 89</h4>
                    <h4>100 00, Praha 1</h4>

                  </div>
                </div>

                {/* <div className={style.info}>
                  <div className="icon icon-danger">
                  <div className={cx('icon', 'icon-danger', [style.icons])}>
                    <i className="material-icons">business</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Vlastní profil
                    </h4>
                    <p>
                      Výhodou vlastního profilu na Demander.cz je, že funguje jako nástroj pro propagaci firmy ale zároveň se veřejnost i potenciální zákazník dozví něco víc o vašich aktivitách a portfoliu.
                      {' '}
                    </p>
                  </div>
                </div> */}
              </div>

              <div
                className={cx('col-md-4', 'col-md-offset-1', [style.floatleft])}
              >
                <div className={style.info}>
                  {/* <div className="icon icon-info"> */}
                  <div className={cx('icon', 'icon-info', [style.icons])}>
                    <i className="material-icons">phone</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Kontakty
                    </h4>
                    <br /><br />
                    <h4>Tel. č.: 876 876 543</h4>
                    <h4>Email: demander@demander.cz</h4>
                    <h4>Fb: fb.com/#demandercz</h4>

                  </div>
                </div>

                {/* <div className={style.info}>
                  <div className="icon icon-danger">
                  <div className={cx('icon', 'icon-danger', [style.icons])}>
                    <i className="material-icons">business</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Vlastní profil
                    </h4>
                    <p>
                      Výhodou vlastního profilu na Demander.cz je, že funguje jako nástroj pro propagaci firmy ale zároveň se veřejnost i potenciální zákazník dozví něco víc o vašich aktivitách a portfoliu.
                      {' '}
                    </p>
                  </div>
                </div> */}
              </div>

              <div className={cx('col-md-3', [style.floatleft])}>
                {/* <div className={style.info}>
                  {/* <div className="icon icon-info">
                  <div className={cx('icon', 'icon-info', [style.icons])}>
                    <i className="material-icons">content_paste</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Zadávání poptávek
                    </h4>
                    <p>
                      Sháníte dodavatele spojovacího materiálu? Nebo sháníte autobusovou dopravu, která převeze vaše zaměstnance na plánovaný teambuilding? Ať už sháníte cokoliv, na Demander.cz to můžete jednoduše poptat.
                    </p>
                  </div>
                </div> */}

                {/* <div className={style.info}>
                  <div className="icon icon-danger">
                  <div className={cx('icon', 'icon-danger', [style.icons])}>
                    <i className="material-icons">business</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Vlastní profil
                    </h4>
                    <p>
                      Výhodou vlastního profilu na Demander.cz je, že funguje jako nástroj pro propagaci firmy ale zároveň se veřejnost i potenciální zákazník dozví něco víc o vašich aktivitách a portfoliu.
                      {' '}
                    </p>
                  </div>
                </div> */}
              </div>

              {/* <div className="col-md-4"> */}
              {/* <div
                className={cx('col-md-4', [style.floatleft], [style.logotile])}
              >
                <div className="phone-container">
                  <img
                    src={require('assets/img/logo-primary.svg')}
                    width="800px"
                    mode="fit"
                    alt="Demander"
                  />
                </div>
              </div> */}

              {/* <div className="col-md-3"> */}
              <div className={cx('col-md-3', [style.floatleft])}>
                {/* <div className={style.info}>
                  {/* <div className="icon icon-primary">
                  <div className={cx('icon', 'icon-primary', [style.icons])}>
                    <i className="material-icons">notifications</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Reakce na poptávky
                    </h4>
                    <p>
                      Pokud někdo zrovna poptává produkt či službu, kterou nabízíte i vy, systém vás na to jednoduše upozorní a vy můžete využít nové obchodní příležitosti.
                    </p>
                  </div>
                </div> */}

                {/* <div className={style.info}>
                  {/* <div className="icon icon-success">
                  <div className={cx('icon', 'icon-success', [style.icons])}>
                    <i className="material-icons">message</i>
                  </div>
                  <div className="description">
                    <h4 className={cx('info-title', [style.violet])}>
                      Komunikační kanál
                    </h4>
                    <p>
                      Nemusíte nutně předávat vaše kontaktní údaje, můžete využít chat v&nbsp;rámci aplikace a vyřešit všechno na Demander.cz.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

          </div>
        </Section>
        {/* <Section gutters className={style.textdivider}>
          <Paragraph primary center noMargin>
            Demander je nový digitální svět, který spojuje podnikatele a firmy v&nbsp;České republice, pomáhá jim a přibližuje lidem jejich aktivity. V&nbsp;České republice existuje přeci mnoho firem a podnikatelů, za kterými stojí zajímavý příběh a může to být třeba i ten Váš!
          </Paragraph>

        </Section>

        <Section gutters className={style.nobottomborder2}>
          <h2 className={cx('title', [style.customtitle])}>
            Všechno do 10 minut
          </h2>
          <Paragraph primary center noMargin>
            Zaregistrujte se a staňte se do 10 minut součástí moderního digitáního tržiště firem v ČR.
          </Paragraph>

        </Section> */}

        {/* <Section gutters maxWidth={1100} contentClassName={style.features}>

          <FeatureItem
            icon="perm_identity"
            title="1. Vytvořte si uživatelský účet"
            content="Registrací na Demander.cz získáváte přístup do moderního digitálnícho tržiště firem."
            button={<Button to="/registrace" label="Vyvořit účet" />}
          />
          <FeatureItem
            icon="business"
            title="2. Zaregistrujte svoji firmu"
            content="Vytvořte profil svojí firmy, služby které nabízíte a poptávejte nové dodavatele."
            button={
              <Button to="/dodavatele/vytvorit" label="Registrovat firmu" />
            }
          />
          <FeatureItem
            primary
            icon="touch_app"
            title="3. Vyberte dodavatele"
            content="Vyberte si z reakcí dodavatelů tu nejvhodnější a úšetřete tak peníze a čas."
            button={<Button to="/dodavatele" label="Seznam dodavatelů" />}
          />
        </Section> */}

        <Section gutters className={style.textdividerblue}>
          <Paragraph primary center noMargin>
            Kontaktujte nás telefonicky, emailem nebo nás navštivte osobne na adrese Horoměřická&nbsp;98,&nbsp;Praha&nbsp;4,&nbsp;148 00.
          </Paragraph>

        </Section>

        {/* <Section gutters maxWidth={1100} contentClassName={style.features}>

          <FeatureItem
            icon="settings"
            title="KEBEK PTC"
            content="Od Demanderu jsem čekal rychlé dohledání dodavatele, protože můj původní neměl dostupné výrobní kapacity. Díky parametrům editoru jsem velice lehko profiltroval nezajímavé dodavatele a do 2 dnů našel vhodného dodavatele."
            // button={
            //   <Button to="/dodavatele/vytvorit" label="Registrovat firmu" />
            // }
          />
          <FeatureItem
            primary
            icon="build"
            title="HOPE-P"
            content="Při výběru dodavatele jsme byli schopni ještě před samotným osobním setkáním odhadnout firmu podle jejího profilu na webu. To nám značně ušetřilo čas."
            // button={<Button to="/dodavatele" label="Seznam dodavatelů" />}
          />
          <FeatureItem
            icon="laptop"
            title="PARCO Consulting"
            content="V katalogu dodavatelů jsme na záakladě referencí odhadli vhodné dodavatele s vysokou úspěšností."
            // button={<Button to="/registrace" label="Vyvořit účet" />}
          />
        </Section> */}

        {/* <Section gutters contentClassName={style.sectionAlpha}>
          <div className={style.sectionContent}>
            <div className={style.text}>
              <Title h2 className="base-margin--half">
                Firemní stránka na Demandru
              </Title>
              <Title h4>
                Prezentujte svoji firmu pomocí rozšířeného profilu firmy
              </Title>
              <Paragraph>
                Čím více dokážete vaší společnost přiblížit ostatním uživatelům poptávkového systému Demander, tím relevantnější nabídky obdržíte. Budujte svoji vizitku na trhu a
                {'\u00a0'}
                dejte si záležet na prezentaci vaší firmy díky rozšířenému firemnímu profilu. Stačí vyplnit položky logo, slogan, přehled služeb a produktů, doplnit digitální vizitku, další poptávky a
                {'\u00a0'}
                ihned se vaše společnost stane čitelnější. I detail dělá dojem.
              </Paragraph>
            </div>
            <div className={style.image}>
              <img src={require('assets/img/presentation-a.jpg')} alt="" />
            </div>
          </div>
        </Section> */}

        {/* <Section className={style.sectionBeta}>
          <div className={style.sectionContent}>
            {/* <div className={style.image}>
              <img src={require('assets/img/presentation-b.png')} alt="" />
            </div> */}
        {/* <div className={style.text}>
              <Title h2 white className="base-margin--half">
                Správa poptávek
              </Title>
              <Title white h4>
                Efektivní správa poptávek na jednom místě
              </Title>
              <Paragraph white>
                Poptávkový systém Demander vám nabízí přehlednou správu nabídek přímo ve vašem firemním profilu. Nabídky od dodavatelů jsou strukturované a poskytují jednoznačný rozcestník, ve kterém se snadno zorientujete. Obchodujete a komunikujete systematicky a s klidnou tváří.
              </Paragraph>
            </div>
          </div>
        </Section> */}

        {/* react tabs START */}
        {/* // <Section>
          // <Tabs>
            //
            // <TabList>
              // <Tab>FAQ</Tab>
              // <Tab>Proces</Tab>
              // <Tab>Reference XXX</Tab>
              //{' '}
            </TabList>
            //
            // <TabPanel>
              // <h2>FAQ</h2>
              // <p>
                //         Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.
                //{' '}
              </p>
              //
              //{' '}
            </TabPanel>
            // <TabPanel>
              // <h2>Proces</h2>
              // <p>
                //         Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.
                //{' '}
              </p>
              //
              //{' '}
            </TabPanel>
            // <TabPanel>
              // <h2>Reference</h2>
              // <p>
                //         Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.
                //{' '}
              </p>
              //
              //{' '}
            </TabPanel>
            //
            //{' '}
          </Tabs>
          //
          //{' '}
        </Section> */}
        {/* react tabs END */}

      </div>
    )
  }
}
