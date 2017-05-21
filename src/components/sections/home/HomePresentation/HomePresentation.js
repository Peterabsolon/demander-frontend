import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title, Button, Paragraph } from 'components/misc'
import { FeatureItem } from './__elements__'

import style from './home-presentation.styl'

export default class HomePresentation extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div>
        <div className={style.description}>
          <Paragraph primary center>
            Demander.cz představuje moderní platformu zaměřenou na získávání nových zakázek, nabídku vlastních služeb a prezentaci firmy. Jedná se o B2B poptávkový systém, kde se setkávají zájmy a potřeby předních společností napříč všemi segmenty trhu.
          </Paragraph>
        </div>

        <div className={style.features}>
          <FeatureItem
            icon="ico--business"
            title="Zaregistrujte profil firmy"
            content="Vstoupit na trh Demander můžete díky založení profilu vaší společnosti. Vyplňte základní identifikační údaje a můžete začít."
            button={<Button label="Registrovat" />}
          />
          <FeatureItem
            icon="ico--description"
            title="Vložte popávku"
            content="Dalším krokem je vložení poptávky, kde definujete předmět Vaši poptávky. Přiblížit detaily můžete vložením technické dokumentace. Demander je i totiž systémem pro náročné."
            button={<Button label="Vložit poptávku" />}
          />
          <FeatureItem
            primary
            icon="ico--touch-app"
            title="Vyberte dodavatele"
            content="V katalogu firem získáte přehled o dodavatelích, jejich zaměření, předmětu činnosti, poskytovaných službách, lokalitě a další pro vás užitečné informace."
            button={<Button label="Seznam společností" />}
          />
        </div>

        <div className={style.sectionAlpha}>
          <div className={style.sectionContent}>
            <div className={style.text}>
              <Title h2 className="base-margin--half">
                Firemní stránka na Demandru
              </Title>
              <Title h4>
                Prezentujte svoji firmu pomocí rozšířeného profilu firmy
              </Title>
              <Paragraph>
                Čím více dokážete vaší společnost přiblížit ostatním uživatelům poptávkového systému Demander, tím relevantnější nabídky obdržíte. Budujte svoji vizitku na trhu a&nbps;dejte si záležet na prezentaci vaší firmy díky rozšířenému firemnímu profilu. Stačí vyplnit položky logo, slogan, přehled služeb a produktů, doplnit digitální vizitku, další poptávky a&nbps;ihned se vaše společnost stane čitelnější. I detail dělá dojem.
              </Paragraph>
            </div>
            <div className={style.image}>
              <img src={require('assets/img/presentation-a.jpg')} alt="" />
            </div>
          </div>
        </div>

        <div className={style.sectionBeta}>
          <div className={style.sectionContent}>
            <div className={style.image}>
              <img src={require('assets/img/presentation-b.png')} alt="" />
            </div>
            <div className={style.text}>
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
        </div>
      </div>
    )
  }
}
