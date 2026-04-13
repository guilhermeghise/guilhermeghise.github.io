import logoFoodSwap from './assets/food-swap-logo.png';
import logoCoffeeOverflow from './assets/coffee-overflow-logo.jpeg';
import logoZoomies from './assets/zoomies-logo.png';
import logoGlyptis from './assets/glyptis-logo.png';

// Import das imagens principais (que aparecem no iPhone da Home)
import coffeeCover from './assets/coffee-cover.svg';
import coffeePreview1 from './assets/coffee-preview1.svg';
import coffeePreview2 from './assets/coffee-preview2.svg';
import coffeePreview3 from './assets/coffee-preview3.svg';
import foodSwapMock from './assets/foodswap1.svg';
import zoomiesMock from './assets/zoomies1.svg';
import glyptisMock from './assets/glyptis1.svg';

// Assets internos do Food Swap
import foodswapimage2 from './assets/foodswap2.svg';
import foodswapimage3 from './assets/foodswap3.svg';


export const projects = [
  { 
    id: 1, 
    slug: "coffee-overflow",
    title: "Coffee Overflow", 
    mockImage: coffeeCover, 
    logo: logoCoffeeOverflow, 
    appStoreUrl: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
    desc: "One barista. One tray. Zero tolerance for spills.",
    accent: '#0A6ABB', 
    fullDesc: "One barista. One tray. Zero tolerance for spills. Coffee Overflow is an arcade game...",
    media: [
      { type: "image", src: coffeePreview1 }, 
      { type: "image", src: coffeePreview2 },
      { type: "image", src: coffeePreview3 },
    ],
    technologies: ["Swift", "SwiftUI", "SpriteKit"],
    team: [
      { name: "Eduardo Ferrari",  role: "Developer", linkedin: "https://www.linkedin.com/in/edurferrari/"           },
      { name: "Guilherme Ghise",  role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise"         },
      { name: "Jean Pierre",      role: "Developer", linkedin: "https://www.linkedin.com/in/jeanpierrerodrigues/"   },
      { name: "Leonardo Simon",   role: "Designer",  linkedin: "https://www.linkedin.com/in/leonardosimon/"         },
      { name: "Pablo Garcia",     role: "Developer", linkedin: "https://www.linkedin.com/in/pablogarciadev/"        },
    ]
  },
  { 
    id: 2, 
    slug: "food-swap",
    title: "Food Swap", 
    mockImage: foodSwapMock, 
    logo: logoFoodSwap, 
    appStoreUrl: "https://apps.apple.com/br/app/food-swap/id6747597054",
    desc: "Swipe, choose, eat!",
    accent: '#FCDDA7',
    fullDesc: "Food Swap turns mealtime indecision into a fun game...",
    stats: [
      { value: '4.7 ★', label: 'App Store' },
      { value: '5k+',   label: 'Downloads' },
      { value: 'Food & Drink', label: 'Category' },
    ],
    media: [
      { type: "image", src: foodSwapMock },
      { type: "image", src: foodswapimage2 },
      { type: "image", src: foodswapimage3 }
    ],
    technologies: ["Swift", "SwiftUI", "Combine"],
    team: [
      { name: "Bruna Marschner",  role: "Developer", linkedin: "https://www.linkedin.com/in/brunamarschner/"        },
      { name: "Guilherme Ghise",  role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise"         },
      { name: "Luísa Cecília",    role: "Designer",  linkedin: "https://www.linkedin.com/in/lucecyl/"               },
      { name: "Richard Rodrigues",role: "Developer", linkedin: "https://www.linkedin.com/in/richardsros/"           },
      { name: "Vitor Bruno",      role: "Developer", linkedin: "https://www.linkedin.com/in/vitor-bruno-243975258/" },
    ]
  },
  { 
    id: 3, 
    slug: "zoomies",
    title: "Zoomies", 
    mockImage: zoomiesMock,
    logo: logoZoomies, 
    appStoreUrl: "https://apps.apple.com/br/app/zoomies/id6753123082",
    desc: "Gamification of your journey",
    accent: '#99ED00',
    fullDesc: "In Zoomies, every step counts! Walking or running has never been this fun.",
    stats: [
      { value: '4.9 ★', label: 'App Store' },
      { value: '8k+',   label: 'Downloads' },
      { value: 'Health & Fitness', label: 'Category' },
    ],
    media: [
      { type: "image", src: zoomiesMock },
      { type: "image", src: foodswapimage2 }
    ],
    technologies: ["Swift", "SwiftUI", "CoreData"],
    team: [
      { name: "Eduardo Ferrari",  role: "Developer", linkedin: "https://www.linkedin.com/in/edurferrari/"                        },
      { name: "Gabriel Barbosa",  role: "Developer", linkedin: "https://www.linkedin.com/in/gabriel-cabreira-barbosa-972ba8247/"  },
      { name: "Giovana Hossein",  role: "Designer",  linkedin: "https://www.linkedin.com/in/giovanahrebello/"                    },
      { name: "Guilherme Ghise",  role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise"                      },
      { name: "Leonel Hernandez", role: "Developer", linkedin: "https://www.linkedin.com/in/leonelhernandezs/"                   },
    ]
  },
  { 
    id: 4, 
    slug: "glyptis",
    title: "Glyptis", 
    mockImage: glyptisMock,
    logo: logoGlyptis, 
    appStoreUrl: "https://apps.apple.com/br/app/glyptis-realidade-esculpida/id6755839447",
    desc: "Sculpted Reality",
    accent: '#173448',
    fullDesc: "Sculpt, paint, and see your creations in Augmented Reality.",
    stats: [
      { value: '4.8 ★', label: 'App Store'  },
      { value: '3k+',   label: 'Downloads'  },
      { value: 'AR',    label: 'Category'   },
    ],
    media: [
      { type: "image", src: glyptisMock },
      { type: "image", src: "https://via.placeholder.com/250x540" }
    ],
    technologies: ["Swift", "SwiftUI", "ARKit"],
    team: [
      { name: "Eduardo Camana",  role: "Developer", linkedin: "https://www.linkedin.com/in/eduardocamana/"    },
      { name: "Giovana Diesel",  role: "Designer",  linkedin: "https://www.linkedin.com/in/giovana-diesel/"  },
      { name: "Guilherme Ghise", role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise"   },
      { name: "Pablo Garcia",    role: "Developer", linkedin: "https://www.linkedin.com/in/pablogarciadev/"  },
      { name: "Vicenzo Mázera",  role: "Developer", linkedin: "https://www.linkedin.com/in/vicenzomasera/"  },
    ]
  }
];