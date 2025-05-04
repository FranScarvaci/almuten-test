import { AlmutenScraper } from "almuten-scraper";
import { ReadableStream as PolyfillReadableStream } from "web-streams-polyfill";

// Traducción de términos chinos a español
const translationMap: Record<string, string> = {
  // Planetas
  '太阳': 'Sol',
  '月亮': 'Luna',
  '水星': 'Mercurio',
  '金星': 'Venus',
  '火星': 'Marte',
  '木星': 'Júpiter',
  '土星': 'Saturno',
  '天王星': 'Urano',
  '海王星': 'Neptuno',
  '冥王星': 'Plutón',
  '北交点': 'Nodo Norte',
  '上升点': 'Ascendente',
  '中天点': 'Medio Cielo',

  // Signos
  '白羊': 'Aries',
  '金牛': 'Tauro',
  '双子': 'Géminis',
  '巨蟹': 'Cáncer',
  '狮子': 'Leo',
  '处女': 'Virgo',
  '天秤': 'Libra',
  '天蝎': 'Escorpio',
  '射手': 'Sagitario',
  '摩羯': 'Capricornio',
  '水瓶': 'Acuario',
  '双鱼': 'Piscis',

  // Otros términos astrológicos
  '宫位': 'Casa',
  '星座': 'Signo',
  '相位': 'Aspectos',
  '宫': 'Casa',
  '合相': 'Conjunción',
  '对冲': 'Oposición',
  '三分相': 'Trígono',
  '四分相': 'Cuadratura',
  '六分相': 'Sextil',
  '飞入宫位': 'Rige la casa',
  '落入行星': 'Planetas en la casa',
  '宫主星': 'Regente',
  '接纳': 'Recepción',
  '互容': 'Recepción mutua',
  '旺': 'Domicilio',
  '庙': 'Exaltación',
  '界': 'Término',
  '十度': 'Decanato',
  '大三角：无': 'Gran Trígono: Ninguno',
  '大十字：无': 'Gran Cruz: Ninguno',
  '星群格局：无': 'Configuración planetaria: Ninguna',
};

// Polyfill para ReadableStream si no existe
if (typeof ReadableStream === "undefined") {
  (globalThis as any).ReadableStream = PolyfillReadableStream;
}

// Datos de nacimiento
const birthInfo = {
  name: "ejemplo",
  year: 1994,
  month: 4,
  day: 22,
  hour: 22,
  minute: 5,
  location: "Buenos Aires, ARG",
  latitude: -34.608454660204416,
  longitude: -58.402615703510044,
};

// Función para traducir todos los strings del objeto de forma recursiva
function translateObject(obj: any): any {
  if (typeof obj === "string") {
    return translateChineseToSpanish(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(translateObject);
  } else if (typeof obj === "object" && obj !== null) {
    const translated: any = {};
    for (const key in obj) {
      translated[key] = translateObject(obj[key]);
    }
    return translated;
  }
  return obj;
}

// Función base de traducción por texto
function translateChineseToSpanish(text: string): string {
  return Object.keys(translationMap).reduce((acc, key) => {
    return acc.replace(new RegExp(key, 'g'), translationMap[key]);
  }, text);
}

// Crear instancia del scraper
const scraper = new AlmutenScraper({
  birthInfo,
  options: {
    timeout: 5000,
    traditional: false,
  },
});

// Ejecutar scraping + traducción
try {
  const horoscopeData = await scraper.getHoroscopeData();
  const translatedData = translateObject(horoscopeData);
  console.dir(translatedData, { depth: null });
} catch (err) {
  console.error("Error fetching horoscope data:", err);
} finally {
  await scraper.close();
}
