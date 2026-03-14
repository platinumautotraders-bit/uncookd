import type { GlobalFlavourMonth } from "@/types";

export const globalFlavours: GlobalFlavourMonth[] = [
  {
    month: 1,
    name: "Flavours of the Levant",
    region: "middle-eastern",
    description:
      "Warm shawarma spices, tender kofta in rich tomato sauces, and fragrant couscous. The bold, aromatic flavours of the Middle East brought to your kitchen with halal-certified lamb, beef, and chicken.",
    keyMeals: [
      "Shawarma Chicken Thigh with Couscous and Roasted Vegetables",
      "Beef Kofta in Tomato Sauce with White Rice",
      "Lamb Kofta with Shawarma Spice and Roasted Eggplant",
      "Shawarma Lamb Leg Steak with Brown Rice",
    ],
    primarySauces: ["shawarma", "tomato-curry", "coconut-curry", "lemon-herb", "med-herb", "simple-spo"],
  },
  {
    month: 2,
    name: "Mediterranean Sun",
    region: "mediterranean",
    description:
      "Sun-drenched herbs, bright lemon, and quality olive oil. Lamb cutlets, roasted vegetables, and couscous inspired by the coastal Mediterranean kitchen.",
    keyMeals: [
      "Greek-Style Lamb Cutlets with Lemon Herb and Baby Potatoes",
      "Mediterranean Chicken Thigh Tray Bake",
      "Beef Rump with Chimichurri, Couscous and Roasted Peppers",
      "Lamb Leg Steak with Mediterranean Herbs and Roasted Eggplant",
    ],
    primarySauces: ["med-herb", "lemon-herb", "chimichurri", "simple-spo", "tomato-curry"],
  },
  {
    month: 3,
    name: "East Meets Grill",
    region: "asian",
    description:
      "Umami-rich teriyaki glazes and Korean-inspired marinades with pear and gochugaru. Stir-fries, rice bowls, and bold Asian-inspired flavours using halal beef and chicken.",
    keyMeals: [
      "Teriyaki Chicken Thigh with Rice and Stir-Fried Broccoli",
      "Korean Beef Bulgogi Bowl with Rice and Vegetables",
      "Teriyaki Beef Strips with Rice Noodles and Green Beans",
      "Korean Chicken Stir-Fry with Broccoli and Carrots",
    ],
    primarySauces: ["teriyaki", "korean", "simple-spo"],
  },
  {
    month: 4,
    name: "Latin Fire",
    region: "latin",
    description:
      "Punchy chimichurri, smoky BBQ marinades, and fiery peri-peri. Bold, charred, and full of flavour — Latin-inspired grills and roasts with premium halal cuts.",
    keyMeals: [
      "Chimichurri Ribeye with Roasted Corn and Sweet Potato",
      "Smoky BBQ Chicken Thighs with Charred Corn and Slaw",
      "Beef Rump with Chimichurri and Brown Rice",
      "Peri-Peri Chicken Drumsticks with Sweet Potato Wedges",
    ],
    primarySauces: ["chimichurri", "smoky-bbq", "peri-peri", "simple-spo"],
  },
  {
    month: 5,
    name: "Taste of Africa",
    region: "african",
    description:
      "Peri-peri heat from the south, North African spice blends, and rich tomato-based stews. A continent of flavour with halal-certified proteins and fresh vegetables.",
    keyMeals: [
      "Peri-Peri Chicken Breast with Spiced Rice and Spinach",
      "Lamb Shoulder Slow-Cook with Tomato Curry and Couscous",
      "Beef Stew with Tomato Curry Sauce and Root Vegetables",
      "Peri-Peri Drumsticks with Sweet Potato and Corn",
    ],
    primarySauces: ["peri-peri", "tomato-curry", "shawarma", "simple-spo"],
  },
  {
    month: 6,
    name: "Island Heat",
    region: "caribbean",
    description:
      "Caribbean-inspired heat and smoke. Peri-peri chicken, smoky BBQ beef, and fresh chimichurri with tropical sides. Bold island flavours, halal certified.",
    keyMeals: [
      "Peri-Peri Chicken Thighs with Seasoned Rice and Charred Corn",
      "Smoky BBQ Beef Stew with Sweet Potato and Peppers",
      "Chicken Drumsticks with Peri-Peri and Slaw",
      "Lamb Chops with Chimichurri and Roasted Corn",
    ],
    primarySauces: ["peri-peri", "smoky-bbq", "chimichurri", "lemon-herb", "simple-spo"],
  },
];

export function getCurrentGlobalFlavour(): GlobalFlavourMonth {
  const month = new Date().getMonth();
  const index = month % globalFlavours.length;
  return globalFlavours[index];
}
