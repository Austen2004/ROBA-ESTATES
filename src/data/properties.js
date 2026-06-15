export const properties = [
  {
    id: 1,
    title: "Sunny 2BR Apartment",
    type: "Apartment",
    purpose: "Rent",
    location: "Civil Lines, Nagpur",
    price: 25000,
    period: "/mo",
    beds: 2,
    baths: 2,
    area: 1100,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    desc: "A bright, modern 2-bedroom apartment in a quiet residential complex with covered parking, 24/7 security, and a small garden. Close to schools, hospitals, and the Civil Lines market.",
    agent: { name: "Riya Deshmukh", phone: "+91 98230 11223", email: "riya.deshmukh@example.com" }
  },
  {
    id: 2,
    title: "Spacious Family House",
    type: "House",
    purpose: "Sale",
    location: "Dharampeth, Nagpur",
    price: 9500000,
    period: "",
    beds: 4,
    baths: 3,
    area: 2400,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    desc: "A beautifully maintained 4-bedroom independent house with a private courtyard, modular kitchen, and two-car garage. Located in one of Nagpur's most sought-after residential areas.",
    agent: { name: "Anil Kulkarni", phone: "+91 98220 33445", email: "anil.kulkarni@example.com" }
  },
  {
    id: 3,
    title: "Commercial Building - Prime Road",
    type: "Building",
    purpose: "Lease",
    location: "Wardha Road, Nagpur",
    price: 180000,
    period: "/mo",
    beds: 0,
    baths: 4,
    area: 6000,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    desc: "A three-storey commercial building available on lease, ideal for offices or retail, with ample parking and high road visibility on Wardha Road.",
    agent: { name: "Sunita Patil", phone: "+91 90211 55667", email: "sunita.patil@example.com" }
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    type: "Apartment",
    purpose: "Rent",
    location: "Sadar, Nagpur",
    price: 12000,
    period: "/mo",
    beds: 1,
    baths: 1,
    area: 550,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    desc: "A compact and affordable studio apartment, perfect for students or working professionals, close to markets and public transport in Sadar.",
    agent: { name: "Riya Deshmukh", phone: "+91 98230 11223", email: "riya.deshmukh@example.com" }
  },
  {
    id: 5,
    title: "Luxury Villa with Pool",
    type: "House",
    purpose: "Sale",
    location: "Hingna Road, Nagpur",
    price: 24000000,
    period: "",
    beds: 5,
    baths: 5,
    area: 5200,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    desc: "An expansive luxury villa featuring a private swimming pool, landscaped lawns, home theatre, and staff quarters on Hingna Road.",
    agent: { name: "Anil Kulkarni", phone: "+91 98220 33445", email: "anil.kulkarni@example.com" }
  },
  {
    id: 6,
    title: "3BR Apartment Near Park",
    type: "Apartment",
    purpose: "Sale",
    location: "Pratap Nagar, Nagpur",
    price: 6800000,
    period: "",
    beds: 3,
    baths: 2,
    area: 1450,
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    desc: "A well-ventilated 3-bedroom apartment on the 5th floor with elevator access, balcony views of the park, and gym access in Pratap Nagar.",
    agent: { name: "Meera Joshi", phone: "+91 99876 22110", email: "meera.joshi@example.com" }
  },
  {
    id: 7,
    title: "Retail Shop Space",
    type: "Building",
    purpose: "Lease",
    location: "Sitabuldi, Nagpur",
    price: 65000,
    period: "/mo",
    beds: 0,
    baths: 1,
    area: 800,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    desc: "A ground-floor retail shop in the busy Sitabuldi commercial market, suitable for boutiques, showrooms, or franchise outlets.",
    agent: { name: "Sunita Patil", phone: "+91 90211 55667", email: "sunita.patil@example.com" }
  },
  {
    id: 8,
    title: "2BR House with Garden",
    type: "House",
    purpose: "Rent",
    location: "Bajaj Nagar, Nagpur",
    price: 35000,
    period: "/mo",
    beds: 2,
    baths: 2,
    area: 1300,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    desc: "A peaceful 2-bedroom house with a private garden, ideal for small families, located in the calm residential neighbourhood of Bajaj Nagar.",
    agent: { name: "Meera Joshi", phone: "+91 99876 22110", email: "meera.joshi@example.com" }
  }
];

export const formatPrice = (price, period) => {
  if (price >= 100000) {
    const lakhs = price / 100000;
    return "\u20B9" + (lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)) + "L" + period;
  }
  return "\u20B9" + price.toLocaleString("en-IN") + period;
};
