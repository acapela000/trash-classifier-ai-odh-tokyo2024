import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "key": "value"
        }
      },
      de: {
        translation: {
          "key": "Wert"
        }
      },
        fr: {
            translation: {
            "key": "valeur"
            }
        },
        it: {
            translation: {
            "key": "valore"
            }
        },
        pt: {
            translation: {
            "key": "valor"
            }
        },
        ru: {
            translation: {
            "key": "значение"
            }
        },  
        es: {
            translation: {
            "key": "valor"
            }
        },
        hi: {
            translation: {
            "key": "मूल्य"
            }
        },
        tl: {
            translation: {
            "key": "halaga"
            }
        },
        ne: {
            translation: {
            "key": "मूल्य"
            }
        },
        id: {
            translation: {
            "key": "nilai"
            }
        },
        vi: {
            translation: {
            "key": "giá trị"
            }
        },
        zh: {
            translation: {
            "key": "值"
            }
        },
        ko: {
            translation: {
            "key": "값"
            }
        },
        ja: {
            translation: {
            "key": "値"
            }
        }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;