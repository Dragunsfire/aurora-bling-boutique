
// Define product category type
export type ProductCategory = 
  | 'necklaces'
  | 'bracelets'
  | 'earrings'
  | 'rings'
  | 'hairAccessories'
  | 'watches';

// Define product type
export interface Product {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  priceUSD: number;
  images: string[];
  category: ProductCategory;
  stock: number;
  createdAt: Date;
  featured: boolean;
  colors?: string[];
  sizes?: string[];
}

// Mock products data
export const products: Product[] = [
  {
    id: "product-1",
    nameEn: "Rose Gold Pendant Necklace",
    nameEs: "Collar Colgante de Oro Rosa",
    descriptionEn: "Elegant rose gold pendant necklace with a delicate chain. The pendant features a small diamond in the center.",
    descriptionEs: "Elegante collar colgante de oro rosa con una cadena delicada. El colgante tiene un pequeño diamante en el centro.",
    priceUSD: 129.99,
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "necklaces",
    stock: 15,
    createdAt: new Date("2025-03-01"),
    featured: true
  },
  {
    id: "product-2",
    nameEn: "Silver Chain Bracelet",
    nameEs: "Pulsera de Cadena de Plata",
    descriptionEn: "A timeless silver chain bracelet that adds elegance to any outfit. Made of sterling silver.",
    descriptionEs: "Una pulsera de cadena de plata atemporal que añade elegancia a cualquier atuendo. Hecha de plata esterlina.",
    priceUSD: 89.99,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "bracelets",
    stock: 20,
    createdAt: new Date("2025-02-15"),
    featured: true
  },
  {
    id: "product-3",
    nameEn: "Pearl Drop Earrings",
    nameEs: "Pendientes de Perla",
    descriptionEn: "Classic pearl drop earrings with silver settings. Perfect for both casual and formal occasions.",
    descriptionEs: "Pendientes clásicos de perla con montura de plata. Perfectos tanto para ocasiones casuales como formales.",
    priceUSD: 75.99,
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "earrings",
    stock: 25,
    createdAt: new Date("2025-01-20"),
    featured: false
  },
  {
    id: "product-4",
    nameEn: "Diamond Engagement Ring",
    nameEs: "Anillo de Compromiso con Diamante",
    descriptionEn: "Stunning diamond engagement ring with a 1 carat center stone in a white gold setting.",
    descriptionEs: "Impresionante anillo de compromiso con diamante con una piedra central de 1 quilate en un engaste de oro blanco.",
    priceUSD: 2499.99,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "rings",
    stock: 5,
    createdAt: new Date("2025-03-10"),
    featured: true
  },
  {
    id: "product-5",
    nameEn: "Crystal Hair Clip",
    nameEs: "Horquilla de Cristal",
    descriptionEn: "Beautiful crystal hair clip with a floral design. Adds a touch of elegance to any hairstyle.",
    descriptionEs: "Hermosa horquilla de cristal con un diseño floral. Añade un toque de elegancia a cualquier peinado.",
    priceUSD: 45.99,
    images: [
      "https://images.unsplash.com/photo-1625094003068-8c443df01b93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1617763123160-4b16c4b8396c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "hairAccessories",
    stock: 30,
    createdAt: new Date("2025-02-28"),
    featured: false
  },
  {
    id: "product-6",
    nameEn: "Rose Gold Watch",
    nameEs: "Reloj de Oro Rosa",
    descriptionEn: "Elegant rose gold watch with a mother of pearl dial. Water resistant up to 30 meters.",
    descriptionEs: "Elegante reloj de oro rosa con esfera de nácar. Resistente al agua hasta 30 metros.",
    priceUSD: 199.99,
    images: [
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "watches",
    stock: 10,
    createdAt: new Date("2025-03-05"),
    featured: true
  },
  {
    id: "product-7",
    nameEn: "Gold Stud Earrings",
    nameEs: "Pendientes de Oro",
    descriptionEn: "Simple yet elegant gold stud earrings. Perfect for everyday wear.",
    descriptionEs: "Pendientes de oro simples pero elegantes. Perfectos para uso diario.",
    priceUSD: 59.99,
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1614699233386-b19910883366?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "earrings",
    stock: 35,
    createdAt: new Date("2025-01-15"),
    featured: false
  },
  {
    id: "product-8",
    nameEn: "Silver Statement Necklace",
    nameEs: "Collar de Plata Llamativo",
    descriptionEn: "Bold silver statement necklace with geometric design. Makes a stunning addition to any outfit.",
    descriptionEs: "Collar llamativo de plata con diseño geométrico. Una adición impresionante a cualquier atuendo.",
    priceUSD: 149.99,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1636138788367-3799bfb11132?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "necklaces",
    stock: 8,
    createdAt: new Date("2025-02-20"),
    featured: true
  },
  {
    id: "product-9",
    nameEn: "Crystal Tennis Bracelet",
    nameEs: "Pulsera Tenis de Cristal",
    descriptionEn: "Sparkling crystal tennis bracelet that catches the light beautifully. A timeless piece for any collection.",
    descriptionEs: "Brillante pulsera tenis de cristal que capta la luz de manera hermosa. Una pieza atemporal para cualquier colección.",
    priceUSD: 99.99,
    images: [
      "https://images.unsplash.com/photo-1573408301219-a6530ecdf2ff?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1586104237516-5b7075e00d67?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "bracelets",
    stock: 12,
    createdAt: new Date("2025-03-12"),
    featured: false
  },
  {
    id: "product-10",
    nameEn: "Infinity Ring",
    nameEs: "Anillo Infinito",
    descriptionEn: "Delicate infinity ring in sterling silver. A beautiful symbol of endless love and friendship.",
    descriptionEs: "Delicado anillo de infinito en plata esterlina. Un hermoso símbolo de amor y amistad infinitos.",
    priceUSD: 69.99,
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1561828990-5f071f839602?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "rings",
    stock: 20,
    createdAt: new Date("2025-01-05"),
    featured: false
  },
  {
    id: "product-11",
    nameEn: "Vintage Brooch Watch",
    nameEs: "Reloj Broche Vintage",
    descriptionEn: "Unique vintage-inspired brooch watch that can be worn as both a brooch and a pendant. Features intricate filigree work.",
    descriptionEs: "Reloj broche de inspiración vintage único que se puede usar como broche y como colgante. Presenta un intrincado trabajo de filigrana.",
    priceUSD: 159.99,
    images: [
      "https://images.unsplash.com/photo-1619946125183-bc1eb33b9465?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "watches",
    stock: 5,
    createdAt: new Date("2025-02-10"),
    featured: false
  },
  {
    id: "product-12",
    nameEn: "Pearl Hair Pins Set",
    nameEs: "Conjunto de Horquillas de Perlas",
    descriptionEn: "Set of 6 pearl hair pins perfect for special occasions. Adds a touch of elegance to updos and braids.",
    descriptionEs: "Conjunto de 6 horquillas de perlas perfectas para ocasiones especiales. Añade un toque de elegancia a peinados recogidos y trenzas.",
    priceUSD: 49.99,
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1611756468043-4cef2cb4ad63?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    ],
    category: "hairAccessories",
    stock: 25,
    createdAt: new Date("2025-03-15"),
    featured: true
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products
    .filter(p => p.featured)
    .slice(0, limit);
};

export const getNewArrivals = (limit: number = 4): Product[] => {
  return [...products]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};

export const getAllCategories = (): { id: ProductCategory; imageUrl: string }[] => {
  return [
    { id: 'necklaces', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
    { id: 'bracelets', imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
    { id: 'earrings', imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
    { id: 'rings', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
    { id: 'hairAccessories', imageUrl: 'https://images.unsplash.com/photo-1625094003068-8c443df01b93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
    { id: 'watches', imageUrl: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800' },
  ];
};
