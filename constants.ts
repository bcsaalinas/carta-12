import { MonthlyConcept, CourseType } from "./types";

export const CURRENT_CONCEPT: MonthlyConcept = {
  id: "vol-12-2025",
  month: "OCTUBRE 2025",
  year: 2025,
  title: "Distrito: Capital & Ceniza",
  themeColor: "#ff4d00",
  description:
    "Una intervención sobre el valor del tiempo. Gastronomía bursátil en tiempo real.",
  story: `En un mundo obsesionado con la permanencia, elegimos la destrucción.
  
  La mayoría de los restaurantes venden consistencia. Nosotros vendemos entropía. Carta 12 es un error en la matriz de la Colonia Americana. Una bodega abandonada que cada 30 días se resetea, se quema y renace con una nueva identidad.

  El volumen 12, "Distrito", explora la intersección entre la codicia corporativa y la cocina primitiva. Fuego abierto sobre mesas de cristal templado. Chefs vestidos de brokers. El menú no es comida, es una cartera de inversión de alto riesgo.`,
  chef: {
    name: "Protocolo 12",
    origin: "SIN ORIGEN",
    bio: "Operamos como una célula dormida. Sin nombres. Sin egos. Solo ejecución técnica impecable.",
    image:
      "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2000&auto=format&fit=crop",
  },
  menu: [
    {
      id: "s1",
      name: "Wagyu & Oro",
      description:
        "Tártara cortada a cuchillo, yema curada en soja, láminas de oro 24k. El sabor de la inflación.",
      price: 450,
      type: CourseType.STARTER,
      pairing: "Sake Junmai",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "s2",
      name: "Ostiones Carbonizados",
      description:
        "Traídos de Ensenada hoy. Mantequilla de tuétano, ceniza de habanero. Mar y fuego.",
      price: 390,
      type: CourseType.STARTER,
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m1",
      name: "Pato 21 Días",
      description:
        "Añejado en cámara seca. Piel crujiente, reducción de frutos rojos y sangre.",
      price: 680,
      type: CourseType.MAIN,
      pairing: "Nebbiolo MX",
      image:
        "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "m2",
      name: "Pesca del Día (Robalo)",
      description:
        "Cocción unilateral. Puré de coliflor quemada, aceite de trufa. Minimalismo brutal.",
      price: 520,
      type: CourseType.MAIN,
      image:
        "https://images.unsplash.com/photo-1534939561126-855f86e5a8d9?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "d1",
      name: "Caída del Mercado",
      description:
        "Ganache de chocolate 70%, tierra de cacao, helado de sésamo negro. Oscuro y dulce.",
      price: 250,
      type: CourseType.DESSERT,
      image:
        "https://images.unsplash.com/photo-1551024601-564d6d674f27?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "c1",
      name: "Insider Trading",
      description:
        "Mezcal silvestre, jarabe de pino, humo de romero. Ilegalmente bueno.",
      price: 300,
      type: CourseType.COCKTAIL,
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

export const PAST_EDITIONS = [
  { id: "prev-1", title: "Vol. 11: Tokyo Glitch", month: "SOLD OUT" },
  { id: "prev-2", title: "Vol. 10: Selva Negra", month: "SOLD OUT" },
  { id: "prev-3", title: "Vol. 09: Desierto Sonoro", month: "SOLD OUT" },
];
