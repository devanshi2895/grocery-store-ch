import { init } from "@sitecore/engage";

let engage;

const loadEngage = async () => {
  if (typeof window !== "undefined") {
    engage = await init({
      clientKey: "sndbxus06p9cxhoqoiowkr1sbq5casz3", //1kQUasq3Xl7XKeL7Jlm9Vf7kXSMGDvWh
      targetURL: "https://api-engage-us.sitecorecloud.io",
      pointOfSale: "DK-POS",
      cookieDomain: "localhost",
      //cookieDomain: "online-grocery-store-web.vercel.app",
      cookieExpiryDays: 365,
      forceServerCookieMode: false,
      includeUTMParameters: true,
      webPersonalization: true /* boolean or object. See Settings object for all options. Default: false */,
    });
    //window.Engage.exposedFunctions = engage;
    //window.Engage = { exposedFunctions: engage };
  }
};

loadEngage();

export { engage };
