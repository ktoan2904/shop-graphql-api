const products = [
  {
    id: "p1",
    name: "Basic Wide Leg Jumpsuit",
    description:
      "Floral print sleeveless wide leg jumpsuit with waist tie detail",
    categoryId: "c2",
    price: 17.9,
    rating: 2,
    sizes: ["XS", "S"],
    imageIds: ["1a", "1b", "1c"]
  },
  {
    id: "p2",
    name: "Strap Back Daisy Jumpsuit - Yellow",
    description:
      "Polyester jumpsuit with classic, regular fit, featuring an open back with strappy details",
    categoryId: "c2",
    price: 59,
    rating: 4,
    sizes: ["S", "M", "L"],
    imageIds: ["2a", "2b", "2c"]
  },
  {
    id: "p3",
    name: "Diana Dress",
    description:
      "Mesh top panel bodycon denim dress with round neckline - Slim fit",
    categoryId: "c2",
    price: 160.9,
    rating: 3.5,
    sizes: ["M", "L", "XL"],
    imageIds: ["3a", "3b", "3c"]
  },
  {
    id: "p4",
    name: "Helle BL Crew Neck Singlet Top",
    description: "Graphic sleeveless tee with round neckline - Relaxed fit",
    categoryId: "c2",
    price: 29.4,
    rating: 3.5,
    sizes: ["XS", "S", "M", "L", "XL"],
    imageIds: ["4a", "4b", "4c"]
  },
  {
    id: "p5",
    name: "Buttoned A-Line Skirt",
    description:
      "Decorative button front skirt- Mid rise, unlined, regular fit",
    categoryId: "c2",
    price: 22.9,
    rating: 5,
    sizes: ["S"],
    imageIds: ["5a", "5b", "5c"]
  },
  {
    id: "p6",
    name: "Flare Sleeves Bodysuit",
    description:
      "Solid hue crepe wrap bodysuit - V-neckline and front & hem button fastening",
    categoryId: "c2",
    price: 20.9,
    rating: 3.5,
    sizes: ["M", "L"],
    imageIds: ["6a", "6b", "6c"]
  },
  {
    id: "p7",
    name: "Openwork Long Cardigan",
    description: "Solid shade openwork longline knitted cardigan",
    categoryId: "c2",
    price: 29.9,
    rating: 4,
    sizes: ["XL"],
    imageIds: ["7a", "7b", "7c"]
  },
  {
    id: "p8",
    name: "Ruffle Sleeves Top",
    description:
      "Textured ruffle short sleeve top- Round neckline with cutout detail",
    categoryId: "c2",
    price: 25.9,
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    imageIds: ["8a", "8b", "8c"]
  },
  {
    id: "p9",
    name: "Wrap Skirt",
    description: "Solid toned wrap skirt - Unlined, mid rise, regular fit",
    categoryId: "c2",
    price: 29.9,
    rating: 2.5,
    sizes: ["XS", "S", "M"],
    imageIds: ["9a", "9b", "9c"]
  },
  {
    id: "p10",
    name: "Amaris Cropped Cape Blazer",
    description: "Cape sleeves blazer- Open front, lined, regular fit",
    categoryId: "c2",
    price: 90.9,
    rating: 4,
    sizes: ["XS", "S", "M", "L"],
    imageIds: ["10a", "10b", "10c"]
  },
  {
    id: "p11",
    name: "Bardot Midi Dress",
    description: "Textured bodycon dress - Bardot neckline with notch detail",
    categoryId: "c2",
    price: 73.9,
    rating: 5,
    sizes: ["M", "L", "XL"],
    imageIds: ["11a", "11b", "11c"]
  },
  {
    id: "p12",
    name: "Smocked Waist Chambray Skater Dress",
    description: "Solid shade smocked skater dress - Lined, scoop neckline",
    categoryId: "c2",
    price: 66.9,
    rating: 3,
    sizes: ["XS", "S"],
    imageIds: ["12a", "12b", "12c"]
  },
  {
    id: "p13",
    name: "Short Sleeve Logo Slim Tee",
    description: "Casual tee with brand logo - Round neckline, slim fit",
    categoryId: "c1",
    price: 110.9,
    rating: 3.5,
    sizes: ["S", "M", "L"],
    imageIds: ["13a", "13b", "13c"]
  },
  {
    id: "p14",
    name: "Threadborne Short Sleeve Top",
    description:
      "Training T-shirt with anti-odor technology and distraction-free comfort",
    categoryId: "c1",
    price: 15.6,
    rating: 5,
    sizes: ["XS"],
    imageIds: ["14a", "14b", "14c"]
  },
  {
    id: "p15",
    name: "Skinny-Fit Jeans With Buttons",
    description: "Faded denim jeans - Mid rise, unlined, slim fit",
    categoryId: "c1",
    price: 26.9,
    rating: 2,
    sizes: ["L", "XL"],
    imageIds: ["15a", "15b", "15c"]
  },
  {
    id: "p16",
    name: "Ua Tech Ss Tee",
    description:
      "Insanely comfortable, this t-shirt is a definite must have for training junkies out there",
    categoryId: "c1",
    price: 36.9,
    rating: 4,
    sizes: ["M", "L"],
    imageIds: ["16a", "16b", "16c"]
  },
  {
    id: "p17",
    name: "Loopback Crest Hoodie",
    description:
      "Contrast panel hoodie with brand patch detail- Hooded neckline, unlined, regular fit",
    categoryId: "c1",
    price: 107.9,
    rating: 3,
    sizes: ["XS", "S", "M", "L"],
    imageIds: ["17a", "17b", "17c"]
  },
  {
    id: "p18",
    name: "Sport Shorts",
    description:
      "Solid toned shorts with embroidered details - Mid rise, regular fit",
    categoryId: "c1",
    price: 54.0,
    rating: 3.5,
    sizes: ["S", "M"],
    imageIds: ["18a", "18b", "18c"]
  },
  {
    id: "p19",
    name: "Summer Oxford Pique Polo",
    description:
      "Melange polo shirt with tipping detail - Collared neckline, unlined, regular fit",
    categoryId: "c1",
    price: 63.9,
    rating: 4.5,
    sizes: ["L"],
    imageIds: ["19a", "19b", "19c"]
  },
  {
    id: "p20",
    name: "Preppy Shirt - Boss Casual",
    description: "Monochrome button-up shirt - Collared neckline, regular fit",
    categoryId: "c1",
    price: 142.9,
    rating: 3.5,
    sizes: ["L", "XL"],
    imageIds: ["20a", "20b", "20c"]
  },
  {
    id: "p21",
    name: "Denim Shirt With Mandarin Collar",
    description:
      "Denim solid tone long sleeves shirt - Mandarin collar neckline, slim fit",
    categoryId: "c1",
    price: 34.9,
    rating: 4,
    sizes: ["XS", "S"],
    imageIds: ["21a", "21b", "21c"]
  },
  {
    id: "p22",
    name: "Mock Fur Hoodie Jacket",
    description:
      "Solid tone quilted inner jacket with faux fur hood - Hood neckline, lined, regular fit",
    categoryId: "c1",
    price: 214.9,
    rating: 4.5,
    sizes: ["XS", "S", "M"],
    imageIds: ["22a", "22b", "22c"]
  },
  {
    id: "p23",
    name: "Burgundy Iconic Flo Fade T-Shirt",
    description:
      "Gradient floral print short sleeve T-shirt - Crew neckline, unlined, regular fit",
    categoryId: "c1",
    price: 36.9,
    rating: 2.5,
    sizes: ["S", "M", "L"],
    imageIds: ["23a", "23b", "23c"]
  },
  {
    id: "p24",
    name: "Rookie Duty Bomber Jacket",
    description:
      "Solid shade military bomber jacket - Bound neckline, lined, regular fit",
    categoryId: "c1",
    price: 245.9,
    rating: 3,
    sizes: ["XS", "S", "M", "L"],
    imageIds: ["24a", "24b", "24c"]
  },
  {
    id: "p25",
    name: "Women's Brown Satin Strap Watch",
    description:
      "Swiss Quartz 3 Hands with Date, Stainless steel case, 2 years warranty",
    categoryId: "c3",
    price: 245.0,
    rating: 3,
    sizes: ["M"],
    imageIds: ["25a", "25b", "25c"]
  },
  {
    id: "p26",
    name: "Erika RB4171 Sunglasses",
    description:
      "Featuring both classic and bright rubber fronts, metal temples and tone-on-tone temple tips",
    categoryId: "c3",
    price: 179.0,
    rating: 4,
    sizes: ["M"],
    imageIds: ["26a", "26b", "26c"]
  },
  {
    id: "p27",
    name: "Women's Black Genuine Leather Strap Watch",
    description: "Quartz 2 Hands, Stainless steel case, 2 years warranty",
    categoryId: "c3",
    price: 70.0,
    rating: 4.5,
    sizes: ["M"],
    imageIds: ["27a", "27b", "27c"]
  },
  {
    id: "p28",
    name: "Sweetheart Set With Swarovski Crystals",
    description:
      "Brass with 18K white gold plating, made with Swarovski Elements",
    categoryId: "c3",
    price: 38.95,
    rating: 5,
    sizes: ["M"],
    imageIds: ["28a", "28b", "28c"]
  },
  {
    id: "p29",
    name: "Men's Brown Genuine Leather Strap Watch",
    description: "Automatic 3 Hands 24 hours, Ionic plating - Rose gold case",
    categoryId: "c3",
    price: 155,
    rating: 2,
    sizes: ["M"],
    imageIds: ["29a", "29b", "29c"]
  },
  {
    id: "p30",
    name: "Performance Lifestyle Sunglasses",
    description: "Light tinted rectangle sunglasses with HDPolarized lenses",
    categoryId: "c3",
    price: 199,
    rating: 3.5,
    sizes: ["M"],
    imageIds: ["30a", "30b", "30c"]
  },
  {
    id: "p31",
    name: "Reef Wallet",
    description: "Reef textured leather wallet - Cowhide leather",
    categoryId: "c3",
    price: 109,
    rating: 4,
    sizes: ["M"],
    imageIds: ["31a", "31b", "31c"]
  },
  {
    id: "p32",
    name: "Thule Subterra Carry On 40L",
    description:
      "Can be carried in two different ways: as a backpack and a shoulder bag",
    categoryId: "c3",
    price: 359,
    rating: 3.5,
    sizes: ["M"],
    imageIds: ["32a", "32b", "32c"]
  }
];
exports.products = products;
