// Coffee Overflow
import logoCoffeeOverflow from './assets/coffee-overflow/coffee-overflow-logo.jpeg';
// import coffeeCover from './assets/coffee-overflow/coffee-cover.svg';
// import coffeeVideo from './assets/coffee-overflow/coffee-video.mp4';
import coffeePreview1 from './assets/coffee-overflow/coffee-preview1.svg';
import coffeePreview2 from './assets/coffee-overflow/coffee-preview2.svg'
import coffeePreview3 from './assets/coffee-overflow/coffee-preview3.svg';
import coffeePreview4 from './assets/coffee-overflow/coffee-preview4.svg';

// Food Swap
import logoFoodSwap from './assets/food-swap/food-swap-logo.png'
import foodSwapPreview1 from './assets/food-swap/foodswap1.svg';
import foodSwapPreview2 from './assets/food-swap/foodswap2.svg';
import foodSwapPreview3 from './assets/food-swap/foodswap3.svg';
import foodSwapPreview4 from './assets/food-swap/foodswap4.svg';

// Zoomies
import logoZoomies from './assets/zoomies/zoomies-logo.png'
import ZoomiesPreview1 from './assets/zoomies/zoomies-preview1.svg';
import ZoomiesPreview2 from './assets/zoomies/zoomies-preview2.svg';
import ZoomiesPreview3 from './assets/zoomies/zoomies-preview3.svg';
import ZoomiesPreview4 from './assets/zoomies/zoomies-preview4.svg';

// Glyptis
import logoGlyptis from './assets/glyptis/glyptis-logo.png'
import glyptisCover from './assets/glyptis/glyptis-cover.svg'
import GlyptisPreview1 from './assets/glyptis/glyptis-preview1.svg';
import GlyptisPreview2 from './assets/glyptis/glyptis-preview2.svg';
import GlyptisPreview3 from './assets/glyptis/glyptis-preview3.svg';
import GlyptisPreview4 from './assets/glyptis/glyptis-preview4.svg';



export const projects = [
  { 
    id: 1, 
    slug: "coffee-overflow",
    title: "Coffee Overflow", 
    mockImage: coffeePreview1, 
    logo: logoCoffeeOverflow, 
    appStoreUrl: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
    desc: "One barista. One tray. Zero tolerance for spills.",
    accent: '#0A6ABB', 
    fullDesc: "Coffee Overflow is an arcade game where you play as a barista sliding across the screen to catch coffee cups launched from a machine. You must balance your tray to avoid spills, collect the right cups, and complete cycles by drawing latte art. As the game progresses, the pace and chaos increase, making precision and timing essential to survive.",
    media: [
      { type: "video", src: "https://www.pexels.com/download/video/15439756/"  },
      { type: "image", src: coffeePreview1 }, 
      { type: "image", src: coffeePreview2 },
      { type: "image", src: coffeePreview3 },
      { type: "image", src: coffeePreview4 },
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
    mockImage: foodSwapPreview2, 
    logo: logoFoodSwap, 
    appStoreUrl: "https://apps.apple.com/br/app/food-swap/id6747597054",
    desc: "Swipe, choose, eat!",
    accent: '#FCDDA7',
    fullDesc: "Food Swap turns mealtime indecision into a fun game...",
    media: [
      { type: "video", src: "https://www.pexels.com/download/video/15439756/"  },
      { type: "image", src: foodSwapPreview1 }, 
      { type: "image", src: foodSwapPreview2 },
      { type: "image", src: foodSwapPreview3 },
       { type: "image", src: foodSwapPreview4 },
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
    mockImage: ZoomiesPreview1,
    logo: logoZoomies, 
    appStoreUrl: "https://apps.apple.com/br/app/zoomies/id6753123082",
    desc: "Gamification of your journey",
    accent: '#99ED00',
    fullDesc: "In Zoomies, every step counts! Walking or running has never been this fun.",
  media: [
      { type: "video", src: "https://www.pexels.com/download/video/15439756/"  },
      { type: "image", src: ZoomiesPreview1 }, 
      { type: "image", src: ZoomiesPreview2 },
      { type: "image", src: ZoomiesPreview3 },
       { type: "image", src: ZoomiesPreview4 }
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
    mockImage: glyptisCover,
    logo: logoGlyptis, 
    appStoreUrl: "https://apps.apple.com/br/app/glyptis-realidade-esculpida/id6755839447",
    desc: "Sculpted Reality",
    accent: '#173448',
    fullDesc: "Sculpt, paint, and see your creations in Augmented Reality.",
   media: [
      { type: "video", src: "https://www.pexels.com/download/video/15439756/"  },
      { type: "image", src: GlyptisPreview1 }, 
      { type: "image", src: GlyptisPreview2 },
      { type: "image", src: GlyptisPreview3 },
      { type: "image", src: GlyptisPreview4 },
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