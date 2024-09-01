import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { ColorType } from '../Libs/LightweightChart/types';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let price = 61000

  global.lang = {ff:"vr" , ffb:"vb"}

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", backgroundColor: "cadetblue" }}>
      <Window title="Tether's price" style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)", backgroundColor: "darkcyan", fontSize: 16 }}>
        <div style={{ width: "100%", height: 100, backgroundColor: "lightseagreen", borderRadius: 10, textAlign: "center" }}>
          <br />
          <br />
          Current price : {price.toLocaleString("en-uk")}
        </div>
        <div style={{ width: "100%", height: 100, backgroundColor: "teal", borderRadius: 10, textAlign: "center" }}>
          <br />
          <br />
          24h changes : % {((props.p.diff24d) as number).toLocaleString("en-uk")}
        </div>
        <div style={{ width: "100%", height: 100, backgroundColor: "lightseagreen", borderRadius: 10, textAlign: "center" }}>
          <br />
          <br />
          Weekly changes : % {((props.p.diff7d) as number).toLocaleString("en-uk")}
        </div>
        <div style={{ width: "100%", height: 100, backgroundColor: "teal", borderRadius: 10, textAlign: "center" }}>
          <br />
          <br />
          Monthly changes : % {((props.p.diff30d) as number).toLocaleString("en-uk")}
        </div>
        <center style={{ fontSize: 18, backgroundColor: "cadetblue" }}>
          Spider
        </center>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("https://api.tetherland.com/currencies/")
    let data = await res.json()
    let p = data.data.currencies.USDT

    console.log("priceeeeeeeeeeeeeeee:", p)

  return {
    props: {
      data: global.QSON.stringify({
        p,
        session: session,
        // nlangs,
      })
    },
  }
}