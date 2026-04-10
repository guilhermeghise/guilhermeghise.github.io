import logoFoodSwap from './assets/food-swap-logo.png';
import logoCoffeeOverflow from './assets/coffee-overflow-logo.jpeg';
import logoZoomies from './assets/zoomies-logo.png';
import logoGlyptis from './assets/glyptis-logo.png';

// Assets do Food Swap
// import foodswapvideo from './assets/foodswap-preview.mp4';
import foodswapimage2 from './assets/foodswap2.svg';
import foodswapimage3 from './assets/foodswap3.svg';
import foodswapimage4 from './assets/foodswap4.svg';

export const projects = [
  { 
    id: 1, 
    slug: "coffee-overflow",
    title: "Coffee Overflow", 
    appStoreUrl: "https://apps.apple.com/br/app/coffee-overflow-neon-rhythm/id6760731874",
    desc: "Tap Beat Challenge Game",
    logo: logoCoffeeOverflow, 
    accent: '#0A6ABB', 
    shortDesc: "One barista. One tray. Zero tolerance for spills.",
    fullDesc: "“One barista. One tray. Zero tolerance for spills. Coffee Overflow is an arcade game where you control a barista sliding across the floor while a coffee machine fires cups your way. Catch them on your tray—but watch the balance.”",
    media: [
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }, 
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+1" },
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+2" },
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+3" }
    ],
    technologies: ["Swift", "SwiftUI", "SpriteKit", "GameplayKit", "StoreKit", "Haptics", "Gamecenter"],
    team: [
      { name: "Eduardo Ferrari", role: "Developer", linkedin: "https://www.linkedin.com/in/edurferrari/" },
      { name: "Guilherme Ghise", role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise/" },
      { name: "Jean Pierre", role: "Developer", linkedin: "https://www.linkedin.com/in/jeanpierrerodrigues/" },
      { name: "Leonardo Simon", role: "Designer", linkedin: "https://www.linkedin.com/in/leonardosimon/" },
      { name: "Pablo Garcia", role: "Developer", linkedin: "https://www.linkedin.com/in/pablogarciadev/" }
    ]
  },
  { 
    id: 2, 
    slug: "food-swap",
    title: "Food Swap", 
    appStoreUrl: "https://apps.apple.com/br/app/food-swap/id6747597054",
    desc: "Swipe, choose, eat!",
    logo: logoFoodSwap, 
    accent: '#FCDDA7',
    shortDesc: "Swipe, choose, eat!",
   fullDesc: "Food Swap turns mealtime indecision into a fun game. Through a gesture-based interface, you filter your preferences and eliminate options with a simple swipe, refining your choices until you find the ideal dish for your moment.\n\nSay goodbye to endless scrolling in delivery apps and decide your next meal without stress. With a focus on speed and user experience, the app ensures you choose what to eat in a light and effortless way, making the decision as enjoyable as the food itself.",
   media: [
    //   { type: "video", src: foodswapvideo }, // Agora usa a variável do import
      { type: "image", src: foodswapimage2 },
      { type: "image", src: foodswapimage3 },
      { type: "image", src: foodswapimage4 }
    ],
    technologies: ["Swift", "SwiftUI", "Haptics", "Combine"],
     team: [
      { name: "Bruna Marschner", role: "Developer", linkedin: "https://www.linkedin.com/in/brunamarschner/" },
      { name: "Guilherme Ghise", role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise/" },
      { name: "Luísa Cecília", role: "Designer", linkedin: "https://www.linkedin.com/in/lucecyl/" },
      { name: "Richard Rodrigues", role: "Developer", linkedin: "https://www.linkedin.com/in/richardsros/" },
      { name: "Vitor Bruno", role: "Developer", linkedin: "https://www.linkedin.com/in/vitor-bruno-243975258/" },
    ]
  },
  { 
    id: 3, 
    slug: "zoomies",
    title: "Zoomies", 
     appStoreUrl: "https://apps.apple.com/br/app/zoomies/id6753123082",
    desc: "Gamification of your journey",
    logo: logoZoomies, 
    accent: '#99ED00',
    shortDesc: "Gamification of your journey",
    fullDesc: "In Zoomies, every step counts! Walking or running has never been this fun. Unlock maps, checkpoints, and chests full of rewards while your companion follows along.\n\nMain features:\n\n• Surprise chests: coins, gems, and rare items every day.\n• Gamified progress: every step moves you along your map and unlocks achievements.\n• Interactive map: track your progress in real time.\n• Daily motivation: turn physical activity into fun and challenges.\n\nWhether you’re exploring the city or running in the park, Zoomies makes your routine more active and enjoyable. Download now and start your journey with your furry friend!",
    media: [
    //   { type: "video", src: foodswapvideo }, // Agora usa a variável do import
      { type: "image", src: foodswapimage2 },
      { type: "image", src: foodswapimage3 },
      { type: "image", src: foodswapimage4 }
    ],
    technologies: ["Swift", "SwiftUI", "CoreData", "CloudKit"],
    team: [
      { name: "Eduardo Ferrari", role: "Developer", linkedin: "https://www.linkedin.com/in/edurferrari/" },
      { name: "Gabriel Barbosa", role: "Developer", linkedin: "https://www.linkedin.com/in/gabriel-cabreira-barbosa-972ba8247/" },
      { name: "Giovana Diesel", role: "Designer", linkedin: "https://www.linkedin.com/in/giovana-diesel/" },
      { name: "Guilherme Ghise", role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise/" },
      { name: "Leonel Ferraz", role: "Developer", linkedin: "https://www.linkedin.com/in/leonelhernandezs/" }
    ]
  },
   { 
    id: 4, 
    slug: "glyptis",
    title: "Glyptis", 
     appStoreUrl: "https://apps.apple.com/br/app/glyptis-realidade-esculpida/id6755839447",
    desc: "Sculpted Reality",
    logo: logoGlyptis, 
    accent: '#173448',
    shortDesc: "Sculpted Reality",
    fullDesc: "Sculpt, paint, and see your creations in Augmented Reality.\n\nInspired by the timeless beauty of Greek aesthetics, Glyptis elegantly caters to both experienced artists and those who are just beginning to discover the joy of creating something to call their own.\n\nThrough our voxel editing technology and augmented reality visualization, you can sculpt your works block by block, store them in your private museum, and view them in your favorite environments.",
    media: [
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }, 
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+1" },
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+2" },
      { type: "image", src: "https://via.placeholder.com/250x540/1c1c1e/ffffff?text=Mock+3" }
    ],
    technologies: ["Swift", "SwiftUI", "CoreData", "CloudKit"],
     team: [
  { name: "Eduardo Camana", role: "Developer", linkedin: "https://www.linkedin.com/in/eduardocamana/" },
  { name: "Giovana Diesel", role: "Designer", linkedin: "https://www.linkedin.com/in/giovana-diesel/" },
  { name: "Guilherme Ghise", role: "Developer", linkedin: "https://www.linkedin.com/in/guilhermeghise/" },
  { name: "Pablo Garcia", role: "Developer", linkedin: "https://www.linkedin.com/in/pablogarciadev/" },
  { name: "Vicenzo Másera", role: "Developer", linkedin: "https://www.linkedin.com/in/vicenzomasera/" }
    ]
  },
];