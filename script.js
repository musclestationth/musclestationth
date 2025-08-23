// -------------------------
// โหลดตะกร้าจาก localStorage
// -------------------------
let storedCart = JSON.parse(localStorage.getItem("cart"));
let cart = Array.isArray(storedCart) ? storedCart : [];
console.log("cart =", cart);
let activeCategory = null;    // เก็บหมวดหลักที่เลือก
let activeSubCategory = null; // เก็บหมวดย่อยที่เลือก
// -------------------------
// บันทึกตะกร้า
// -------------------------
function saveCart() {
  console.log("Saving cart:", cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
let currentSlide = 0;
let currentNewSlide = 0;
let currentPromoSlide = 0;
const itemsPerPage = 3; // ✅ ให้โชว์ 3 สินค้าต่อหน้า

// สินค้าเข้าใหม่ (กำหนดเอง)
const newProducts = [
  { name: "Retatrutide BPMedical 10mg", price: 4500, image: "images/reta-bp.png" },
  { name: "Retatrutide Wellness 10mg", price: 3500, image: "images/reta-wellness.png" },
  { name: "Levitra SAAnabolic 30mg60t", price: 1440, image: "images/levitra-sa.png" },
  { name: "Retatrutide SAAnabolic 10mg", price: 4500, image: "images/reta-sa.png" },
  { name: "3xRetatrutide SAAnabolic 10mg", price: 12000, image: "images/reta-sa.png" },
  { name: "AC-262 SAAnabolic 10mg60t", price: 2430, image: "images/ac262-sa.png" },
  { name: "AC-262 BPMedical", price: 0, image: "images/ac262-bp.png" },
  { name: "S-23 SAAnabolic 10mg100t", price: 1900, image: "images/s23-sa.png" },
  { name: "YK-11 SAAnabolic 5mg60t", price: 2200, image: "images/yk11-sa.png" },
  { name: "T3 SAAnabolic 25mcg200t", price: 1100, image: "images/t3-sa.png" },
  { name: "Telomed SAAnabolic 40mg50t", price: 890, image: "images/telomed-sa.png" },
  { name: "L-Carnitine Beligas 30ml", price: 2200, image: "images/l-car-beligas.png" },
  { name: "L-Carnitine+CLA Beligas 30ml", price: 2400, image: "images/l-car+cla-beligas.png" }

];

// --- ข้อมูลสินค้าโปรโมชั่น ---
const promoProducts = [
  { name: "(3pc) SARMs Promotion", price: 2400, image: "images/sarmpro.png" },
  { name: "(3pc) MK677 Promotion", price: 3000, image: "images/677pro.png" }
];
// ฟังก์ชัน render slider แบบแยก container
function renderProductsSlider(productsArray, containerId, dotsId, currentSlide) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const start = currentSlide * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = productsArray.slice(start, end);

  pageItems.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="info">
        <h3>${prod.name}</h3>
        <p>${prod.price}฿</p>
        <button class="add-btn" onclick='addToCart("${prod.name}", ${prod.price})'>
          Add to Cart
        </button>
      </div>
    `;
    container.appendChild(div);
  });

  // render dots
  const dotsContainer = document.getElementById(dotsId);
  dotsContainer.innerHTML = "";
  const totalPages = Math.ceil(productsArray.length / itemsPerPage);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.className = i === currentSlide ? "active" : "";
    dot.addEventListener("click", () => {
      if (containerId === "newProductsSlider") {
        currentNewSlide = i;
        renderProductsSlider(newProducts, "newProductsSlider", "newSliderDots", currentNewSlide);
      } else if (containerId === "promoProductsSlider") {
        currentPromoSlide = i;
        renderProductsSlider(promoProducts, "promoProductsSlider", "promoSliderDots", currentPromoSlide);
      }
    });
    dotsContainer.appendChild(dot);
  }
}

let allProducts = [];


// ข้อมูลสินค้า + รูป
const products = {
  "Oral AAS": {
    "Anadrol": [
      { name: "Anadrol Gainzlab 50mg100t", price: 1000, image: "images/anadrol-gainz.png" },
      { name: "Anadrol Bodytech 50mg100t", price: 1200, image: "images/anadrol-body.png" },
      { name: "Anadrol Meditech 50mg100t", price: 1200, image: "images/anadrol-medi.png" },
      { name: "Anadrol Platinum 50mg100t", price: 1700, image: "images/anadrol-plat.png" },
      { name: "Anadrol BPMedical 50mg100t", price: 1760, image: "images/anadrol-bp.png" },
      { name: "Anadrol Beligas 50mg100t", price: 0, image: "images/anadrol50100-beligas.png" },
      { name: "Anadrol SA 25mg100t", price: 950, image: "images/anadrol-sa.png" },
      { name: "Anadrol AlphaPharma 50mg50t", price: 1600, image: "images/anadrol-alpha.png" }
    ],
    "Anavar": [
      { name: "Anavar Gainzlab 10mg50t", price: 860, image: "images/anavar-gainz.png" },
      { name: "Anavar EuroMed 10mg50t", price: 950, image: "images/anavar-euro.png" },
      // { name: "Anavar Beligas 10mg50t", price: 1090, image: "images/anavar1050-beligas.png" },
      { name: "Anavar AlphaPharma 10mg50t", price: 1600, image: "images/anavar-alpha.png" },
      { name: "Anavar Bodytech 10mg100t", price: 1350, image: "images/anavar-body.png" },
      { name: "Anavar Meditech 10mg100t", price: 1350, image: "images/anavar10-medi.png" },
      { name: "Anavar SAAnabolic 10mg100t", price: 1600, image: "images/anavar-sa.png" },
      { name: "Anavar Platinum 10mg100t", price: 1800, image: "images/anavar-plat.png" },
      { name: "Anavar Beligas 10mg100t", price: 1890, image: "images/anavar10100-beligas.png" },
      { name: "Anavar BPMedical 15mg50t", price: 1540, image: "images/anavar-bp.png" },
      { name: "Anavar Synctech 15mg50t", price: 1900, image: "images/anavar-sync.png" },
      { name: "Anavar Meditech 50mg50t", price: 3000, image: "images/anavar50-medi.png" },
      // { name: "Anavar Beligas 50mg50t", price: 3000, image: "images/anavar5050-beligas.png" },
      { name: "Anavar Beligas 50mg100t", price: 3790, image: "images/anavar50100-beligas.png" }
    ],
    "Clen": [
      { name: "Clen AlphaPharma 40mcg50t", price: 600, image: "images/clen-alpha.png" },
      //{ name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen-gain.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen-sync.png" },
      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t", price: 1690, image: "images/clen100-beligas.png" }
    ],
    "Primo": [
      { name: "Primotab Meditech 25mg50t", price: 1350, image: "images/primotab-medi.png" },
      { name: "Primotab Bodytech 25mg50t", price: 1350, image: "images/primotab-body.png" },
      { name: "Primotab BPMedical 25mg50t", price: 2200, image: "images/primotab-bp.png" },
      { name: "Primotab Beligas 25mg50t", price: 2890, image: "images/primotab-beligas.png" }
    ],
    "Dbol": [
      { name: "Dbol Gainzlab 10mg100t", price: 540, image: "images/dbol-gainz.png" },
      { name: "Dbol Bodytech 10mg100t", price: 740, image: "images/dbol-body.png" },
      { name: "Dbol BPMedical 10mg100t", price: 870, image: "images/dbol-bp.png" },
      { name: "Dbol Platinum 10mg100t", price: 1000, image: "images/dbol-plat.png" },
      { name: "Dbol Beligas 10mg100t", price: 0, image: "images/dbol10100-beligas.png" },
      //   { name: "Dbol Beligas 20mg50t", price: 1190, image: "images/dbol20-beligas.png" },
      { name: "Dbol Beligas 50mg50t", price: 2200, image: "images/dbol50-beligas.png" }
    ],
    "Tbol": [
      { name: "Tbol Bodytech 10mg50t", price: 1000, image: "images/tbol-body.png" },
      { name: "Tbol Meditech 10mg50t", price: 1000, image: "images/tbol-medi.png" },
      { name: "Tbol Platinum 10mg100t", price: 1400, image: "images/tbol-plat.png" },
      { name: "Tbol BPMedical 20mg100t", price: 1870, image: "images/tbol-bp.png" },
      //  { name: "Tbol Beligas 10mg100t", price: 0, image: "images/tbol-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gain.png" },
      { name: "T3 Bodytech 25mcg100t", price: 780, image: "images/t3-body.png" },
      { name: "T3 Meditech 25mcg100t", price: 780, image: "images/t3-medi.png" },
      { name: "T3 Synctech 25mcg100t", price: 800, image: "images/t3-sync.png" },
      { name: "T3 BPMedical 25mcg100t", price: 1100, image: "images/t3-bp.png" },
      { name: "T3 Beligas 50mcg50t", price: 1090, image: "images/t350-beligas.png" },
      { name: "T3 Platinum 50mcg100t", price: 1200, image: "images/t3-plat.png" },
      { name: "T3 SAAnabolic 25mcg200t", price: 1100, image: "images/t3-sa.png" },
      { name: "T3 Beligas 50mcg100t", price: 1290, image: "images/t3100-beligas.png" }
    ],
    "Test เม็ด": [
      { name: "Test เม็ด Beligas 40mg50t", price: 3090, image: "images/testเม็ด-beligas.png" }
    ],
    "Stano": [
      { name: "Stanotab Gainzlab 10mg100t", price: 700, image: "images/stanotab-gainz.png" },
      { name: "Stanotab AlphaPharma 10mg50t", price: 1000, image: "images/stanotab-alpha.png" },
      { name: "Stanotab EuroMed 10mg100t", price: 850, image: "images/stanotab-euro.png" },
      { name: "Stanotab Synctech 10mg100t", price: 850, image: "images/stanotab-sync.png" },
      { name: "Stanotab Meditech 10mg100t", price: 900, image: "images/stanotab-medi.png" },
      { name: "Stanotab Bodytech 10mg100t", price: 900, image: "images/stanotab-body.png" },

      { name: "Stanotab SAAnabolic 10mg100t", price: 1000, image: "images/stanotab-sa.png" },
      { name: "Stanotab Platinum 10mg100t", price: 1200, image: "images/stanotab-plat.png" },
      { name: "Stanotab BPMedical 10mg100t", price: 1210, image: "images/stanotab-bp.png" },
      { name: "Stanotab Beligas 10mg100t", price: 1290, image: "images/stanotab10100-beligas.png" },
      { name: "Stanotab Beligas 50mg50t", price: 2090, image: "images/stanotab5050-beligas.png" }
    ],
    "Proviron": [
      // { name: "Proviron Beligas 20mg50t", price: 1490, image: "images/prov50-beligas.png" },
      { name: "Proviron Beligas 20mg100t", price: 1890, image: "images/prov100-beligas.png" },
      { name: "Proviron Meditech 25mg50t", price: 1150, image: "images/prov-medi.png" },
      { name: "Proviron BPMedical 25mg50t", price: 1320, image: "images/prov-bp.png" },
      { name: "Proviron SAAnabolic 25mg100t", price: 1800, image: "images/prov-sa.png" },
      { name: "Proviron Platinum 25mg100t", price: 1950, image: "images/prov-plat.png" },
      { name: "Proviron AlphaPharma 25mg100t", price: 2200, image: "images/prov-alpha.png" }
    ],
    "Halotestin": [
      // { name: "Halotestin Beligas 10mg50t", price: 2300, image: "images/halo50-beligas.png" },
      { name: "Halotestin Beligas 10mg100t", price: 3500, image: "images/halo100-beligas.png" },
      { name: "Halotestin BPMedical 10mg", price: 0, image: "images/halo-bp.png" }
    ],
    "Superdrol": [
      { name: "Superdrol Beligas 10mg50t", price: 1190, image: "images/super-beligas.png" },
      { name: "Superdrol Bodytech 10mg50t", price: 1190, image: "images/super-body.png" },
      { name: "Superdrol Meditech 10mg50t", price: 1200, image: "images/super-medi.png" },
      { name: "Superdrol BPMedical 10mg50t", price: 1760, image: "images/super-bp.png" }
    ],
    "Oral etc.": [
      { name: "Mix1 Synctech 15+10mg50t", price: 1550, image: "images/mix1-sync.png" },
      { name: "Mix2 Synctech 20+10mg50t", price: 1700, image: "images/mix2-sync.png" },
      { name: "Telomed SAAnabolic 40mg50t", price: 890, image: "images/telomed-sa.png" }
    ]
  },
  "Injection AAS": {
    "TestC": [
      { name: "DHB1 TestC Beligas 100mg", price: 1450, image: "images/testc100-beligas.png" },
      { name: "TestC Beligas 200mg", price: 1100, image: "images/testc200-beligas.png" },
      { name: "TestC Platinum 200mg", price: 1200, image: "images/testc-plat.png" },
      { name: "TestC Meditech 250mg", price: 1040, image: "images/testc-medi.png" },
      { name: "TestC Bodytech 250mg", price: 1040, image: "images/testc-body.png" },
      { name: "TestC SAAnabolic 250mg", price: 1100, image: "images/testc-sa.png" },
      { name: "TestC EuroMed 250mg", price: 1120, image: "images/testc-euro.png" },
      { name: "TestC Beligas 250mg", price: 1290, image: "images/testc250-beligas.png" },
      { name: "TestC AlphaPharma 250mg", price: 1300, image: "images/testc-alpha.png" },
      { name: "TestC BPMedical 250mg", price: 1430, image: "images/testc-bp.png" },
      { name: "TestC Synctech 300mg", price: 1100, image: "images/testc-sync.png" },
      { name: "TestC Gainzlab 300mg", price: 840, image: "images/testc-gainz.png" }
    ],
    "TestE": [
      { name: "TestE AlphaPharma 250mg", price: 1300, image: "images/teste-alpha.png" },
      { name: "TestE BPMedical 250mg", price: 1430, image: "images/teste-bp.png" },
      { name: "TestE Synctech 300mg", price: 1100, image: "images/teste-sync.png" },
      { name: "TestE SAAnabolic 300mg", price: 1100, image: "images/teste-sa.png" },
      { name: "TestE EuroMed 300mg", price: 1100, image: "images/teste-euro.png" },
      { name: "TestE Platinum 300mg", price: 1200, image: "images/teste-plat.png" },
      { name: "TestE Beligas 300mg", price: 1290, image: "images/teste300-beligas.png" },
      { name: "TestE Beligas 450mg", price: 1490, image: "images/teste450-beligas.png" }
    ],
    "TestProp": [
      { name: "TestProp Gainzlab 100mg", price: 630, image: "images/testprop-gainz.png" },
      { name: "TestProp SAAnabolic 100mg", price: 700, image: "images/testprop-sa.png" },
      { name: "TestProp Synctech 100mg", price: 700, image: "images/testprop-sync.png" },
      { name: "TestProp Bodytech 100mg", price: 830, image: "images/testprop-body.png" },
      { name: "TestProp Meditech 100mg", price: 830, image: "images/testprop-medi.png" },
      { name: "TestProp EuroMed 100mg", price: 850, image: "images/testprop-euro.png" },
      { name: "TestProp Beligas 100mg", price: 890, image: "images/testprop-beligas.png" },
      { name: "TestProp Platinum 100mg", price: 1000, image: "images/testprop-plat.png" },
      { name: "TestProp AlphaPharma 100mg", price: 1000, image: "images/testprop-alpha.png" },
      { name: "TestProp BPMedical 100mg", price: 1045, image: "images/testprop-bp.png" }
    ],
    "Sustanon": [
      { name: "Sustanon EuroMed 250mg(3Amp)", price: 730, image: "images/sus-euro.png" },
      { name: "Sustanon Gainzlab 300mg", price: 790, image: "images/sus-gainz.png" },
      { name: "Sustanon Meditech 250mg", price: 880, image: "images/sus-medi.png" },
      { name: "Sustanon Bodytech 250mg", price: 900, image: "images/sus-body.png" },
      { name: "Sustanon Beligas 250mg", price: 1190, image: "images/sus250-beligas.png" },
      { name: "Sustanon BPMedical 250mg", price: 1375, image: "images/sus-bp.png" },
      { name: "Sustanon Platinum 250mg", price: 1400, image: "images/sus-plat.png" },
      { name: "Sustanon Beligas 500mg", price: 2250, image: "images/sus500-beligas.png" }
    ],
    "Test Suspension": [
      { name: "Test Suspension Meditech 100mg", price: 900, image: "images/testsus-medi.png" },
      { name: "Test Suspension Beligas 100mg", price: 1290, image: "images/testsus-beligas.png" }
    ],
    "TrenA": [
      { name: "TrenA Beligas 100mg", price: 1300, image: "images/trena-beligas.png" },
      { name: "TrenA Synctech 100mg", price: 1400, image: "images/trena-sync.png" },
      { name: "TrenA Gainzlab 100mg", price: 1400, image: "images/trena-gainz.png" },
      { name: "TrenA SAAnabolic 100mg", price: 1500, image: "images/trena-sa.png" },
      { name: "TrenA AlphaPharma 100mg", price: 1600, image: "images/trena-alpha.png" },
      { name: "TrenA EuroMed 100mg", price: 1600, image: "images/trena-euro.png" },
      { name: "TrenA Platinum 100mg", price: 1600, image: "images/trena-plat.png" },
      { name: "TrenA Meditech 100mg", price: 1600, image: "images/trena-medi.png" },
      { name: "TrenA Bodytech 100mg", price: 1600, image: "images/trena-body.png" },
      { name: "TrenA BPMedical 100mg", price: 2200, image: "images/trena-bp.png" }
    ],
    "TrenE": [
      { name: "TrenE Platinum 150mg", price: 1900, image: "images/trene-plat.png" },
      { name: "TrenE Meditech 200mg", price: 1600, image: "images/trene-medi.png" },
      { name: "TrenE Bodytech 200mg", price: 1600, image: "images/trene-body.png" },
      { name: "TrenE Synctech 200mg", price: 1650, image: "images/trene-sync.png" },
      { name: "TrenE Beligas 200mg", price: 1690, image: "images/trene-beligas.png" },
      { name: "TrenE SAAnabolic 200mg", price: 1800, image: "images/trene-sa.png" },
      { name: "TrenE BPMedical 200mg", price: 2530, image: "images/trene-bp.png" },
      { name: "TrenE AlphaPharma 250mg", price: 2500, image: "images/trene-alpha.png" },
      { name: "TrenE Gainzlab 200mg", price: 1600, image: "images/trene-gainz.png" }
    ],
    "TrenHex": [
      { name: "TrenHex AlphaPharma 76.5mg", price: 2300, image: "images/trenhex-alpha.png" },
      { name: "TrenHex Beligas 100mg", price: 1850, image: "images/trenhex-beligas.png" },
      { name: "TrenHex Platinum 100mg", price: 2100, image: "images/trenhex-plat.png" },
      { name: "TrenHex Meditech 150mg", price: 1800, image: "images/trenhex-medi.png" },
      { name: "TrenHex Bodytech 150mg", price: 2000, image: "images/trenhex-body.png" },
      { name: "TrenHex EuroMed 150mg", price: 2530, image: "images/trenhex-euro.png" },
      { name: "TrenHex BPMedical 200mg", price: 2970, image: "images/trenhex-bp.png" }
    ],
    "Stano": [
      { name: "Stano Platinum 50mg", price: 1400, image: "images/stano-plat.png" },
      { name: "Stano AlphaPharma 50mg", price: 1500, image: "images/stano-alpha.png" },
      { name: "Stano Gainzlab 100mg", price: 870, image: "images/stano-gainz.png" },
      { name: "Stano Meditech 100mg", price: 1070, image: "images/stano-medi.png" },
      { name: "Stano Bodytech 100mg", price: 1070, image: "images/stano-body.png" },
      { name: "Stano EuroMed 100mg", price: 1160, image: "images/stano-euro.png" },
      { name: "Stano BPMedical 100mg", price: 1375, image: "images/stano-bp.png" }
    ],
    "MastE": [
      { name: "MastE Meditech 200mg", price: 1500, image: "images/maste-medi.png" },
      { name: "MastE Beligas 200mg", price: 1590, image: "images/maste-beligas.png" },
      { name: "MastE Synctech 200mg", price: 1600, image: "images/maste-sync.png" },
      { name: "MastE SAAnabolic 200mg", price: 1700, image: "images/maste-sa.png" },
      { name: "MastE Platinum 200mg", price: 1900, image: "images/maste-plat.png" },
      { name: "MastE BPMedical 200mg", price: 0, image: "images/maste-bp.png" },
      { name: "MastE AlphaPharma 200mg", price: 0, image: "images/maste-alpha.png" }
    ],
    "MastP": [
      { name: "MastP Gainzlab 100mg", price: 1000, image: "images/mastp-gainz.png" },
      { name: "MastP Synctech 100mg", price: 1300, image: "images/mastp-sync.png" },
      { name: "MastP SAAnabolic 100mg", price: 1300, image: "images/mastp-sa.png" },
      { name: "MastP Beligas 100mg", price: 1400, image: "images/mastp-beligas.png" },
      { name: "MastP Bodytech 100mg", price: 1400, image: "images/mastp-body.png" },
      { name: "MastP Meditech 100mg", price: 1400, image: "images/mastp-medi.png" },
      { name: "MastP EuroMed 100mg", price: 1500, image: "images/mastp-euro.png" },
      { name: "MastP Platinum 100mg", price: 1600, image: "images/mastp-plat.png" },
      { name: "MastP AlphaPharma 100mg", price: 1700, image: "images/mastp-alpha.png" },
      { name: "MastP BPMedical 100mg", price: 2200, image: "images/mastp-bp.png" }
    ],
    "Primo": [
      { name: "Primo Meditech 100mg", price: 1440, image: "images/primo-medi.png" },
      { name: "Primo Gainzlab 100mg", price: 1500, image: "images/primo-gainz.png" },
      { name: "Primo SAAnabolic 100mg", price: 1600, image: "images/primo-sa.png" },
      { name: "Primo Bodytech 100mg", price: 1700, image: "images/primo-body.png" },
      { name: "Primo Platinum 100mg", price: 2000, image: "images/primo-plat.png" },
      { name: "Primo BPMedical 100mg", price: 2300, image: "images/primo-bp.png" },
      { name: "Primo AlphaPharma 100mg", price: 2500, image: "images/primo-alpha.png" },
      { name: "Primo Synctech 150mg", price: 1850, image: "images/primo-sync.png" }
    ],
    "NPP": [
      { name: "NPP Bodytech 100mg", price: 1200, image: "images/npp-body.png" },
      { name: "NPP Beligas 100mg", price: 1290, image: "images/npp-beligas.png" },
      { name: "NPP Platinum 100mg", price: 1800, image: "images/npp-plat.png" },
      { name: "NPP BPMedical 100mg", price: 0, image: "images/npp-bp.png" },
      { name: "NPP AlphaPharma 100mg", price: 0, image: "images/npp-alpha.png" }
    ],
    "EQ": [
      { name: "EQ Meditech 250mg", price: 1200, image: "images/eq-medi.png" },
      { name: "EQ Bodytech 250mg", price: 1200, image: "images/eq-body.png" },
      { name: "EQ BPMedical 250mg", price: 1925, image: "images/eq-bp.png" },
      { name: "EQ AlphaPharma 250mg", price: 2000, image: "images/eq-alpha.png" },
      { name: "EQ Gainzlab 300mg", price: 1000, image: "images/eq-gainz.png" },
      { name: "EQ SAAnabolic 300mg", price: 1400, image: "images/eq-sa.png" },
      { name: "EQ Beligas 300mg", price: 1590, image: "images/eq-beligas.png" },
      { name: "EQ Synctech 400mg", price: 1400, image: "images/eq-sync.png" },
      { name: "EQ Bodytech 400mg", price: 1500, image: "images/eq2-body.png" },
      { name: "EQ Platinum 400mg", price: 1900, image: "images/eq-plat.png" },
      { name: "EQ Beligas 500mg", price: 0, image: "images/eq2-beligas.png" }
    ],
    "Deca": [
      { name: "Deca EuroMed 100mg(3Amp)", price: 650, image: "images/decaamp-euro.png" },
      { name: "Deca AlphaPharma 200mg", price: 1700, image: "images/deca-alpha.png" },
      { name: "Deca Meditech 250mg", price: 1200, image: "images/deca-medi.png" },
      { name: "Deca Bodytech 250mg", price: 1200, image: "images/deca-body.png" },
      { name: "Deca BPMedical 250mg", price: 1705, image: "images/deca-bp.png" },
      { name: "Deca Gainzlab 300mg", price: 1000, image: "images/deca-gainz.png" },
      { name: "Deca SAAnabolic 300mg", price: 1350, image: "images/deca-sa.png" },
      { name: "Deca Synctech 300mg", price: 1350, image: "images/deca-sync.png" },
      { name: "Deca EuroMed MIX 300mg", price: 1500, image: "images/deca-euro.png" },
      { name: "Deca Beligas 300mg", price: 1590, image: "images/deca300-beligas.png" },
      { name: "Deca Platinum 300mg", price: 1800, image: "images/deca-plat.png" },
      { name: "Deca Bodytech 400mg", price: 1600, image: "images/deca2-body.png" },
      { name: "Deca Beligas 500mg", price: 2150, image: "images/deca500-beligas.png" }
    ],
    "Injection etc.": [
      { name: "TDT RAPID Platinum 300mg", price: 2600, image: "images/tdt-plat.png" },
      { name: "Kisseptin-10 SAAnabolic 5mg", price: 1850, image: "images/kiss-sa.png" },
      { name: "Tren-Test-Mast Long Beligas 300mg", price: 2450, image: "images/tren-test-mast-beligas.png" },
      //  { name: "Test-Tren Short Beligas 150mg", price: 1700, image: "images/" },
      { name: "MENT Beligas 50mg", price: 1990, image: "images/ment-beligas.png" },
      { name: "MTR Beligas 5mg", price: 1290, image: "images/mtr-beligas.png" }
    ],
    "Bacteriostatic water": [
      { name: "Bac Water SAAnabolic 10ml", price: 500, image: "images/bac-sa.png" },
      { name: "Bac Water BPMedical 10ml", price: 450, image: "images/bac-bp.png" },
      { name: "Bac Water Synctech 12ml", price: 200, image: "images/bac-sync.png" }
    ]
  },
  "SARMs": {
    "MK677": [
      { name: "MK-677 SAAnabolic 10mg60t", price: 1450, image: "images/677-sa.png" },
      { name: "MK-677 Meditech/Bodytech 25mg50t", price: 1500, image: "images/677-medi.png" },
      { name: "MK-677 BPMedical 10mg90t", price: 2750, image: "images/677-bp.png" }
    ],
    "RAD140": [
      { name: "Rad-140 Meditech/Bodytech 10mg50t", price: 1200, image: "images/rad-medi.png" },
      { name: "Rad-140 SAAnabolic 10mg60t", price: 1650, image: "images/rad-sa.png" },
      { name: "Rad-140 BPMedical 10mg60t", price: 2420, image: "images/rad-bp.png" }
    ],
    "GW501516": [
      { name: "GW-501516 Meditech/Bodytech 20mg50t", price: 1200, image: "images/gw-medi.png" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/gw-sa.png" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2420, image: "images/gw-bp.png" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/gw50-beligas.png" }
    ],
    "MK2866": [
      { name: "MK-2866 Meditech/Bodytech 20mg50t", price: 1200, image: "images/2866-medi.png" },
      { name: "MK-2866 BPMedical 10mg90t", price: 2090, image: "images/2866-bp.png" },
      { name: "MK-2866 SAAnabolic 10mg100t", price: 1200, image: "images/2866-sa.png" },
      { name: "MK-2866 Beligas 15mg50t", price: 0, image: "images/2866-beligas.png" },
      { name: "MK-2866+ SAAnabolic 10mg60t", price: 1250, image: "images/2866+-sa.png" }

    ],
    "YK11": [
      { name: "YK-11 BPMedical 10mg30t", price: 1815, image: "images/yk11-bp.png" },
      { name: "YK-11 SAAnabolic 5mg60t", price: 2200, image: "images/yk11-sa.png" },
    ],
    "LGD4033": [
      { name: "LGD-4033 BPMedical 5mg60t", price: 1815, image: "images/lgd-bp.png" },
      { name: "LGD-4033 SAAnabolic 10mg60t", price: 1350, image: "images/lgd-sa.png" },
      { name: "LGD-4033 Beligas 10mg50t", price: 0, image: "images/lgd-beligas.png" },
      { name: "LGD-4033 Beligas 10mg90t", price: 2190, image: "images/lgd-beligas.png" }
    ],
    "S4": [
      { name: "S-4 Meditech/Bodytech 20mg50t", price: 1200, image: "images/s4-medi.png" },
      { name: "S-4 BPMedical 25mg60t", price: 2090, image: "images/s4-bp.png" }
    ],
    "AC262": [
      { name: "AC-262 SAAnabolic 10mg60t", price: 2430, image: "images/ac262-sa.png" },
      { name: "AC-262 BPMedical", price: 0, image: "images/ac262-bp.png" }
    ],
    "S23": [
      { name: "S-23 SAAnabolic 10mg100t", price: 1900, image: "images/s23-sa.png" }
    ]

  },
  "HGH & Peptide": {
    "HGH": [
      { name: "HGH Meditech 100iu", price: 3900, image: "images/hgh-medi.png" },
      { name: "HGH Platinum 100iu", price: 5200, image: "images/hgh-plat.png" },
      { name: "HGH Beligas 100iu", price: 5500, image: "images/hgh-beligas.png" },
      { name: "HGH Synctech 120iu", price: 5000, image: "images/hgh-sync.png" },
      { name: "HGH SAAnabolic 120iu", price: 5500, image: "images/hgh-sa.png" },
      { name: "HGH BPMedical(SD) 100iu", price: 6930, image: "images/hgh1-bp.png" },
      { name: "HGH BPMedical(Pharma) 100iu", price: 10010, image: "images/hgh2-bp.png" },

      { name: "HGHPen Pfizer 12mg36iu(เฉพาะไส้)", price: 6820, image: "images/hghpen1-pfizer.png" },
      { name: "HGHPen Pfizer 12mg36iu(ไส้+ปากกา)", price: 8470, image: "images/hghpen2-pfizer.png" },
      { name: "HGHPen Beligas 36iu", price: 5000, image: "images/hghpen-beligas.png" },
      { name: "HGHPen Jolie 50iu", price: 5000, image: "images/hghpen-jolie.png" },
      { name: "HGHPen SAAnabolic(Pharma) 30iu", price: 2900, image: "images/hghpen-sa.png" },
      { name: "3xHGHPen SAAnabolic(Pharma) 30iu", price: 7900, image: "images/hghpen-sa.png" }
    ],
    "IGF1": [
      { name: "IGF-1 LR3 Bodytech 1000mcg", price: 2600, image: "images/igf1-body.png" },
      { name: "IGF-1 LR3 SAAnabolic 1000mcg", price: 2600, image: "images/igf1-sa.png" },
      { name: "IGF-1 LR3 BPMedical 1000mcg", price: 6930, image: "images/igf1-bp.png" },
      { name: "IGF-1 DES Beligas 1mg", price: 2890, image: "images/des-beligas.png" },
      { name: "IGF-1 LR3 Synctech 2000mcg", price: 4500, image: "images/igf1-sync.png" },
      { name: "IGF-1 INCRELEX 400mg", price: 8900, image: "images/igf1-increlex.png" }
    ],
    "HCG": [
      //  { name: "HCG Beligas 5000iu", price: 1100, image: "images/hcg-beligas.png" },
      // { name: "HCG BPMedical 5000iu", price: 1265, image: "images/hcg-bp.png" },
      { name: "HCG AlphaPharma 5000iu", price: 2100, image: "images/hcg-alpha.png" },
      // { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/hcg-sa.png" }
    ],
    "TB500/BPC157": [
      { name: "TB-500 Meditech 10mgx3", price: 2200, image: "images/tb500-medi.png" },
      { name: "TB-500 Beligas 5mg", price: 1790, image: "images/tb500-beligas.png" },
      { name: "BPC-157 Meditech 5mgx3", price: 2200, image: "images/bpc157-medi.png" },
      { name: "BPC-157 Beligas 5mg", price: 1100, image: "images/BPC157-beligas.png" },
      { name: "BPC-157 BPMedical", price: 0, image: "images/bpc157-bp.png" },
      { name: "TB500+BPC157 SAAnabolic 5+5mg", price: 1550, image: "images/tb500-sa.png" }

    ],
    "Peptide etc.": [
      { name: "PT-141 Beligas 10mg", price: 1490, image: "images/pt141-beligas.png" },
      { name: "PT-141 BPMedical 10mg", price: 0, image: "images/pt141-bp.png" },
      { name: "GHRP-6 BPMedical 5mg", price: 0, image: "images/ghrp6-bp.png" },
      { name: "PEG-MGF Beligas 1mg", price: 1350, image: "images/peg-beligas.png" },
      { name: "DSIP Beligas 2mg", price: 890, image: "images/dsip-beligas.png" }
    ]
  },
  "PCT": {
    "Arimidex": [
      { name: "Arimidex EuroMed 1mg30t", price: 1050, image: "images/ari-euro.png" },
      { name: "Arimidex BPMedical 1mg30t", price: 1870, image: "images/ari-bp.png" },
      { name: "Arimidex Meditech 1mg50t", price: 1200, image: "images/ari-medi.png" },
      { name: "Arimidex Beligas 1mg50t", price: 1290, image: "images/ari-beligas.png" }
    ],
    "Aromasin": [
      { name: "Aromasin Meditech 25mg30t", price: 1200, image: "images/aro-medi.png" },
      { name: "Aromasin Bodytech 25mg30t", price: 1200, image: "images/aro-body.png" },
      { name: "Aromasin Beligas 25mg50t", price: 1600, image: "images/aro-beligas.png" }
    ],
    "Caber": [
      { name: "Caber Beligas 0.5mg10t", price: 2090, image: "images/caber0.5-beligas.png" },
      { name: "Caber Beligas 1mg10t", price: 2790, image: "images/caber1-beligas.png" },
      { name: "Caber BPMedical 0.5mg8t", price: 1760, image: "images/caber-bp.png" },
      { name: "Caber Cabazer 1mg20t", price: 2000, image: "images/caber-pfizer.png" }
    ],
    "Nolvadex": [
      { name: "Nolvadex EuroMed 20mg30t", price: 1020, image: "images/nolv-euro.png" },
      { name: "Nolvadex BPMedical 20mg30t", price: 1045, image: "images/nolv-bp.png" },
      { name: "Nolvadex Meditech 20mg50t", price: 1200, image: "images/nolv-medi.png" },
      { name: "Nolvadex Beligas 20mg50t", price: 1190, image: "images/nolv-beligas.png" },
      { name: "Nolvadex AlphaPharma 20mg30t", price: 1100, image: "images/nol-alpha.png" },
      { name: "Nolvadex SAAnabolic 20mg60t", price: 0, image: "images/nolv-sa.png" },
      { name: "Levitra SAAnabolic 30mg60t", price: 1440, image: "images/levitra-sa.png" }
    ],
    "Femara": [
      { name: "Femara Meditech 2.5mg", price: 1500, image: "images/femara-medi.png" }
    ],
    "Clomid": [
      { name: "Clomid Meditech 50mg50t", price: 1250, image: "images/clomid-medi.png" },
      { name: "Clomid BPMedical 50mg30t", price: 1210, image: "images/clomid-bp.png" },
      { name: "Clomid Beligas 50mg50t", price: 1490, image: "images/clomid-beligas.png" }
    ],
    "Proviron": [
      // { name: "Proviron Beligas 20mg50t", price: 1490, image: "images/prov50-beligas.png" },
      { name: "Proviron Beligas 20mg100t", price: 1890, image: "images/prov100-beligas.png" },
      { name: "Proviron Meditech 25mg50t", price: 1150, image: "images/prov-medi.png" },
      { name: "Proviron BPMedical 25mg50t", price: 1320, image: "images/prov-bp.png" },
      { name: "Proviron SAAnabolic 25mg100t", price: 1800, image: "images/prov-sa.png" },
      { name: "Proviron Platinum 25mg100t", price: 1950, image: "images/prov-plat.png" },
      { name: "Proviron AlphaPharma 25mg100t", price: 2200, image: "images/prov-alpha.png" }
    ],
    "HCG": [
      //{ name: "HCG Beligas 5000iu", price: 1100, image: "images/hcg-beligas.png" },
      // { name: "HCG BPMedical 5000iu", price: 1265, image: "images/hcg-bp.png" },
      { name: "HCG AlphaPharma 5000iu", price: 2100, image: "images/hcg-alpha.png" },
      //   { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/hcg-sa.png" }
    ]
  },
  "Fat Burn & Weight-loss": {
    "Clen": [
      { name: "Clen AlphaPharma 40mcg50t\n&nbsp;\n&nbsp;", price: 600, image: "images/clen-alpha.png" },
      //{ name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen-gain.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen-sync.png" },
      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t\n&nbsp;", price: 1690, image: "images/clen100-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gain.png" },
      { name: "T3 Bodytech 25mcg100t", price: 780, image: "images/t3-body.png" },
      { name: "T3 Meditech 25mcg100t", price: 780, image: "images/t3-medi.png" },
      { name: "T3 Synctech 25mcg100t", price: 800, image: "images/t3-sync.png" },
      { name: "T3 BPMedical 25mcg100t", price: 1100, image: "images/t3-bp.png" },
      { name: "T3 Beligas 50mcg50t", price: 1090, image: "images/t350-beligas.png" },
      { name: "T3 Platinum 50mcg100t", price: 1200, image: "images/t3-plat.png" },
      { name: "T3 SAAnabolic 25mcg200t", price: 1100, image: "images/t3-sa.png" },
      { name: "T3 Beligas 50mcg100t", price: 1290, image: "images/t3100-beligas.png" }
    ],
    "GW501516": [
      { name: "GW-501516 Meditech/Bodytech 20mg50t", price: 1200, image: "images/gw-medi.png" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/gw-sa.png" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2420, image: "images/gw-bp.png" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/gw50-beligas.png" }
    ],
    "Oral Weight-loss etc": [
      { name: "Orlistat 120mg14t", price: 840, image: "images/orlistat.png" }
    ],
    "Insulin": [
      { name: "Insulin 10ml1vial", price: 500, image: "images/insulin.png" },
      { name: "InsulinPen Humalog Kwik", price: 1600, image: "images/insulinpen.png" }
    ],
    "Semaglutide": [
      { name: "SemaglutidePen SAAnabolic 4mg", price: 4300, image: "images/sema-sa.png" },
      { name: "2xSemaglutidePen SAAnabolic 4mg", price: 7900, image: "images/sema-sa.png" },
      { name: "SemaglutidePen Jolie 5mg", price: 4500, image: "images/sema-jolie.png" },
      { name: "SemaglutidePen Beligas 5mg", price: 5900, image: "images/sema-beligas.png" },
      { name: "Semaglutide BPMedical 5mg", price: 2400, image: "images/sema-bp.png" },
      { name: "SemaglutidePen Wegovy 1mg(มีอย.)", price: 10900, image: "images/sema-wegovy.png" }
    ],
    "Tirzepatide": [
      { name: "Tirzep APLab 10mg", price: 3500, image: "images/tirzep-ap.png" },
      { name: "Tirzep SAAnabolic 10mg", price: 3500, image: "images/tirzep-sa.png" },
      { name: "TirzepPen Jolie 10mg", price: 5500, image: "images/tirzep-jolie.png" },
      { name: "TirzepPen Beligas 10mg", price: 4500, image: "images/tirzep-beligass.png" },
      { name: "Tirzep Platinum 10mg", price: 3500, image: "images/tirzep-plat.png" },
      { name: "Tirzep Mounjaro Kwikpen 5mg/0.6ml(มีอย.)", price: 14900, image: "images/tirzep-kwikk.png" },
      { name: "Tirzep Wellness 10mg", price: 0, image: "images/tirzep-wellness.png" },
    ],
    "Retatrutide": [
      // { name: "Retatrutide APLab 5mg", price: 1800, image: "images/" },
      { name: "Retatrutide Wellness 10mg", price: 3500, image: "images/reta-wellness.png" },
      { name: "RetatrutidePen APLab 10mg", price: 6900, image: "images/reta-ap.png" },
      { name: "RetatrutidePen SAAnabolic 10mg", price: 5500, image: "images/retapen-sa.png" },
      { name: "Retatrutide SAAnabolic 10mg", price: 4500, image: "images/reta-sa.png" },
      { name: "3xRetatrutide SAAnabolic 10mg", price: 12000, image: "images/reta-sa.png" },
      { name: "Retatrutide BPMedical 10mg", price: 4500, image: "images/reta-bp.png" }
    ],
    "Injection Weight-loss etc": [
      { name: "Helio Clen Yohimbine Beligas 40mcg&5.5mg", price: 1450, image: "images/helio-beligas.png" },
      { name: "Saxenda Liraglutide 3.0mg", price: 3900, image: "images/saxenda.png" },
      { name: "Cut Fast SAAnabolic 155mg", price: 1750, image: "images/cut-sa.png" }
    ]
  },
  "Supplements": {
    "Tudca": [
      { name: "Tudca Beligas 500mg90t", price: 1590, image: "images/tudca-beligas.png" },
      { name: "Tudca BPMedical 500mg60t", price: 1870, image: "images/tudca-bp.png" }
    ],
    "Acne/Skin Support": [
      { name: "Iso Accutane Beligas 20mg50t", price: 1000, image: "images/iso-beligas.png" }
    ],
    "Blood Sugar & Fat Metabolism": [
      { name: "Carb up 2210 SAAnabolic 60t", price: 950, image: "images/carb-sa.png" },
      //{ name: "5-Amino-1mq SAAnabolic 60t", price: 950, image: "images/" },
      { name: "SLP-PP-332 60t SAAnabolic 60t", price: 1750, image: "images/slp-sa.png" },
      { name: "L-Carnitine Beligas 30ml", price: 2200, image: "images/l-car-beligas.png" },
      { name: "L-Carnitine+CLA Beligas 30ml", price: 2400, image: "images/l-car+cla-beligas.png" }
    ],
    "Anti-aging & NAD+ Boosters": [
      { name: "Enhanced NMN350 SAAnabolic 60t", price: 1250, image: "images/nmn350-sa.png" },
      { name: "NMN+TMG SAAnabolic 430mg60t", price: 1250, image: "images/nmn-sa.png" }
    ],
    "Thyroid/Mineral Support": [
      { name: "Kelp Iodine SAAnabolic 225mcg90t", price: 350, image: "images/kelp-sa.png" }
    ]
  },
  "Sexual Performance": {
    "Cialis": [
      { name: "Cialis Beligas 25mg100t", price: 2490, image: "images/cialis100-beligas.png" },
      { name: "Tadalafil BPMedical 20mg10t", price: 1200, image: "images/cialis-bp.png" },
      { name: "Tadalafil SAAnabolic 5mg100t", price: 1130, image: "images/cialis-sa.png" }
    ],
    "Viagra": [
      { name: "Viagra Beligas 50mg50t", price: 1500, image: "images/viagra-beligas.png" }
    ],
    "Kamagra Oral Jelly": [
      { name: "Kamagra Oral Jelly 100mg7ซอง", price: 385, image: "images/kama.png" }
    ]
  }
};

function showTab(tab) {
  // ซ่อนทุก tab-content
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(`tab${tab}`).style.display = 'block';

  // ลบ active ทุกปุ่ม
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  // ใส่ active ให้ปุ่มที่ตรงกับ data-tab
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Render เฉพาะ tab
  if (tab === 1) renderCategories();
  if (tab === 3){
    renderNewProducts();
    renderPromoProducts();
  }
}
// เรียกแยกกัน
function renderNewProducts() {
  renderProductsSlider(newProducts, "newProductsSlider", "newSliderDots", currentNewSlide);
}

function renderPromoProducts() {
  renderProductsSlider(promoProducts, "promoProductsSlider", "promoSliderDots", currentPromoSlide);
}



// -------------------------
// แสดงหมวดหมู่
// -------------------------
function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";
  Object.keys(products).forEach(cat => {
    const div = document.createElement("div");
    div.className = "category-item";
    div.textContent = cat;

    // ถ้าเป็น active category ให้ใส่ class
    if (cat === activeCategory) div.classList.add("active");


    // กดแล้วเปลี่ยนสีปุ่มนี้
    div.addEventListener('click', () => {
      // ลบ active จากปุ่มอื่น
      document.querySelectorAll(".category-item").forEach(btn => btn.classList.remove("active"));
      // ใส่ active ให้ปุ่มนี้
      div.classList.add("active");
      activeCategory = cat;    // จำค่าไว้
      activeSubCategory = null; // reset subcategory เวลาเปลี่ยน main category
      renderSubCategories(cat);
    });

    categoryList.appendChild(div);
  });
}


function renderSubCategories(category) {
  const subList = document.getElementById("subCategoryList");
  const productList = document.getElementById("productList");

  subList.innerHTML = "";
  productList.innerHTML = "";

  Object.keys(products[category]).forEach(sub => {
    const div = document.createElement("div");
    div.className = "subcategory-item";
    div.textContent = sub;

    // ถ้าเป็น active subcategory ให้ใส่ class
    if (sub === activeSubCategory) div.classList.add("active");

    // กดแล้วเปลี่ยนสีปุ่มนี้
    div.addEventListener('click', () => {
      // ลบ active จากปุ่มอื่น
      document.querySelectorAll(".subcategory-item").forEach(btn => btn.classList.remove("active"));
      // ใส่ active ให้ปุ่มนี้
      div.classList.add("active");
      activeSubCategory = sub; // จำค่าไว้
      renderProducts(category, sub);
    });

    subList.appendChild(div);
  });
  // ถ้ามี active subcategory เดิม ให้ render products
  if (activeSubCategory) {
    renderProducts(category, activeSubCategory);
  }
}
// -------------------------
// แสดงสินค้า
// -------------------------
function renderProducts(category, sub) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products[category][sub].forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-item";
    // 👇 เพิ่ม attribute สำหรับหมวดหลักและหมวดย่อย
    div.setAttribute("data-category", category);
    div.setAttribute("data-subcategory", sub);

    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="info">
        <h3>${prod.name}</h3>
        <p>${prod.price}฿</p>
        <button class="add-btn" onclick='addToCart("${prod.name}", ${prod.price})'>
          Add to Cart
        </button>
      </div>
    `;
    productList.appendChild(div);
  });
}


// -------------------------
// เพิ่มสินค้า
// -------------------------
function addToCart(name, price) {
  console.log("addToCart called. cart before:", cart);
  if (!Array.isArray(cart)) {
    console.error("cart is not an array!", cart);
    cart = [];
  }
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderCart();
}

// -------------------------
// แสดงตะกร้า
// -------------------------
function renderCart() {
  const cartList = document.getElementById("cartList");
  if (cartList) cartList.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;

    if (cartList) {
      const div = document.createElement("div");
      div.className = "cart-item"; // เพิ่ม class สำหรับจัด layout
      div.innerHTML = `
        <div class="item-info">
          <p>${item.name}</p>
          <p>${item.price}฿</p>
        </div>
        <div class="quantity-control">
          <button onclick='changeQty("${item.name}", -1)'>-</button>
          <span class="quantity-number">${item.qty}</span>
          <button onclick='changeQty("${item.name}", 1)'>+</button>
        </div>
      `;
      cartList.appendChild(div);
    }
  });

  // อัปเดตรวมจำนวนและราคาที่ส่วนแสดงผลในตะกร้า tab2
  const totalItemsEl = document.getElementById("totalItems2");
  const totalPriceEl = document.getElementById("totalPrice2");
  if (totalItemsEl) totalItemsEl.textContent = `รวม ${totalQty} ชิ้น`;
  if (totalPriceEl) totalPriceEl.textContent = `${totalPrice} บาท`;

   // Cart Bar Tab 1
  const cartItemsCountEl = document.getElementById('totalItems1');
  const cartTotalPriceEl = document.getElementById('totalPrice1');
  if (cartItemsCountEl) cartItemsCountEl.textContent = 'รวม ' + totalQty + ' ชิ้น';
  if (cartTotalPriceEl) cartTotalPriceEl.textContent = totalPrice.toLocaleString() + ' บาท';

  // Cart Bar Tab 3
    const cartItemsCount3El = document.getElementById('totalItems3');
    const cartTotalPrice3El = document.getElementById('totalPrice3');
    if (cartItemsCount3El) cartItemsCount3El.textContent = `รวม ${totalQty} ชิ้น`;
    if (cartTotalPrice3El) cartTotalPrice3El.textContent = totalPrice.toLocaleString() + ' บาท';
  }



// -------------------------
// เปลี่ยนจำนวน
// -------------------------
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
    saveCart();
    renderCart();
  }
}

function loadCart() {
  const savedCart = localStorage.getItem("cart"); // อ่านข้อมูลจาก localStorage
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);  // แปลง JSON string เป็น Array object
    } catch (e) {
      console.error("โหลดตะกร้าไม่สำเร็จ:", e);
      cart = [];  // กรณีแปลงไม่สำเร็จ ตั้งเป็น array ว่าง
    }
  } else {
    cart = [];  // กรณีไม่มีข้อมูลใน localStorage ตั้งเป็น array ว่าง
  }
}

// ใส่ LIFF ID ของคุณ
window.onload = function() {
  liff.init({ liffId: "2007887429-7ERpgpYL" }).then(() => {

    generateAllProducts(); // ✅ สร้าง flat list สำหรับ search
    renderCategories(); // สำหรับ Tab 1
    loadCart();    // สำหรับ Tab 2
    renderCart(); // อัพเดทแสดงผลตะกร้า
    showTab(1);               // เริ่มเปิด Tab 1


    const saved = localStorage.getItem("customerInfo");
    if (saved) {
      const customer = JSON.parse(saved);
      document.getElementById("custAddress").value = customer.address || "";

      if (customer.address) {
        // ถ้ามีข้อมูลแล้ว → lock field และโชว์ปุ่มแก้ไข
        document.getElementById("custAddress").disabled = true;
        document.getElementById("saveBtn").style.display = "none";
        document.getElementById("editBtn").style.display = "inline-block";
      }
    }



  });
};

// -------------------------
// ปุ่มสั่งซื้อ
// -------------------------
async function checkout() {
  if (!cart.length) { console.warn("Checkout aborted: empty cart"); return; }

  // === CONFIG ===
  const GAS_STORE_URL  = "https://script.google.com/macros/s/AKfycbyayDr5PzcycTz08NQ0tEivQyKK57kQ7qQxL9ZDrAtcz3JkjNbLEBPkAOcUErtA6DOewg/exec"; // ใหม่: เก็บออเดอร์ + คืน orderId
  const GAS_NOTIFY_URL = "https://script.google.com/macros/s/AKfycbxqnzojoqKN_GC_XqdhCTIb2YP8OswdUNBP69P-zf55u-gybpeouyTvcqchndRMG9cb0A/exec"; // เดิม: แจ้ง LINE
  const LIFF_SUMMARY_ID = "2007887429-p3nd4dvE";
  const LIFF_PAYMENT_URL = "https://liff.line.me/2007887429-Arr5x53g";
  const dbg = (...a) => console.log("[checkout]", ...a);

  // --- รวมยอด / ข้อความ ---
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let orderText = "📦 รายละเอียดคำสั่งซื้อ\n";
  cart.forEach(i => {
    orderText += `${i.name} x${i.qty} = ${(i.price * i.qty).toLocaleString('th-TH')}฿\n`;
  });
  orderText += `\nรวมทั้งหมด = ${totalPrice.toLocaleString('th-TH')}฿`;

  let customerText = "⚠️ ยังไม่ได้กรอกข้อมูลลูกค้า";
  const saved = localStorage.getItem("customerInfo");
  if (saved) {
    const info = JSON.parse(saved);
    customerText = `👤 ชื่อ-ที่อยู่จัดส่ง:\n${info.address || "-"}`;
  }

  // --- เตรียมรายการแบบสั้นสำหรับ Flex ---
  const MAX_FLEX_LINES = 10;
  const shown = cart.slice(0, MAX_FLEX_LINES);
  const hiddenCount = cart.length - shown.length;

  const itemContents = shown.map(i => ({
    type: "box",
    layout: "horizontal",
    contents: [
      { type: "text", text: `${i.name} x${i.qty}`, size: "sm", wrap: true, flex: 5, maxLines: 6 },
      { type: "text", text: `${(i.price * i.qty).toLocaleString('th-TH')}฿`, size: "sm", align: "end", flex: 0 }
    ]
  }));
  if (hiddenCount > 0) {
    itemContents.push({ type: "text", text: `...และอีก ${hiddenCount} รายการ`, size: "sm", wrap: true });
  }

  const altText = `สรุปคำสั่งซื้อ ${cart.length} รายการ = ${totalPrice.toLocaleString('th-TH')}฿`;
  const itemsForServer = cart.map(i => ({ name: i.name, price: i.price, qty: i.qty }));

  // ===== ยิงขนาน: เก็บออเดอร์ + แจ้งเตือน =====
  const payloadStore  = JSON.stringify({ action:"checkout", orderText, customerText, totalPrice, items: itemsForServer });
  const payloadNotify = JSON.stringify({ action:"checkout", orderText, customerText });

  // หลีกเลี่ยง preflight: ไม่ใส่ Content-Type
  const storePromise  = fetch(GAS_STORE_URL,  { method: "POST", body: payloadStore  });
  // แจ้งเตือนไม่จำเป็นต้องรอให้เสร็จ จึงไม่ await ก่อนส่ง Flex
  const notifyPromise = fetch(GAS_NOTIFY_URL, { method: "POST", body: payloadNotify }).catch(e => console.warn("notify failed", e));

  // ต้องรอเฉพาะ store เพื่อต้องใช้ orderId
  let orderId = null;
  try {
    const resp = await storePromise;
    let data = null;
    try { data = await resp.json(); }
    catch {
      const t = await resp.text();
      try { data = JSON.parse(t); } catch {}
    }
    if (!data || !data.orderId) {
      console.error("Store GAS returned no orderId:", data);
      return;
    }
    orderId = data.orderId;
  } catch (e) {
    console.error("Store GAS load failed:", e);
    return;
  }

  // เตรียมลิงก์สำหรับแอดมิน
  const adminUrl = `https://liff.line.me/${LIFF_SUMMARY_ID}?id=${encodeURIComponent(orderId)}`;

  // ===== ส่งข้อความ (หลังได้ orderId แล้ว) =====
  const flexMsg = {
    type: "flex",
    altText,
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          { type: "image", url: "https://lh3.googleusercontent.com/d/1thkyE_A9Jd8LGii5Z9rIGtcn75Tv39q7", size: "sm", align: "center", margin: "none" },
          { type: "text", text: "MuscleStationTH", weight: "bold", size: "xl", align: "center", color: "#0000FF" },
          { type: "text", text: "สรุปคำสั่งซื้อ", weight: "bold", size: "lg" },
          { type: "box", layout: "vertical", margin: "lg", spacing: "sm", contents: itemContents },
          {
            type: "box",
            layout: "horizontal",
            margin: "lg",
            contents: [
              { type: "text", text: "รวมทั้งหมด", size: "lg", weight: "bold", color: "#000000" },
              { type: "text", text: `${totalPrice.toLocaleString('th-TH')}฿`, size: "lg", color: "#000000", align: "end", weight: "bold" }
            ]
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          { type: "button", style: "primary", color: "#1DB446", action: { type: "uri", label: "ชำระเงิน", uri: LIFF_PAYMENT_URL } },
          {
            type: "text",
            text: "สำหรับแอดมิน",
            size: "sm",
            color: "#1E88E5",
            decoration: "underline",
            align: "end",
            action: { type: "uri", uri: adminUrl },
            wrap: false
          },
          {
            type: "text",
            text: "**กรุณารอแอดมินเช็คสต็อกสินค้าและ confirm ก่อนกดชำระเงินนะคะ\n**Please wait for checking stocks and confirm this order before payment.",
            size: "md",
            weight: "bold",
            color: "#FF0000",
            wrap: true,
            margin: "sm"
          }
        ]
      }
    }
  };

  const textMsg = {
    type: "text",
    text:
      `MuscleStationTH\n` +
      `สรุปคำสั่งซื้อ (${cart.length} รายการ)\n` +
      shown.map(i => `• ${i.name} x${i.qty} = ${(i.price*i.qty).toLocaleString('th-TH')}฿`).join("\n") +
      (hiddenCount > 0 ? `\n...และอีก ${hiddenCount} รายการ` : "") +
      `\nรวมทั้งหมด: ${totalPrice.toLocaleString('th-TH')}฿` +
      `\n\nสำหรับแอดมิน: ${adminUrl}` +
      `\nชำระเงิน: ${LIFF_PAYMENT_URL}`
  };

  try {
    // (ไม่ต้องรอ notifyPromise ที่ยิงไปแล้ว)
    if (liff.isInClient && liff.isInClient()) {
      try {
        await liff.sendMessages([flexMsg]);
      } catch (e1) {
        console.warn("send Flex failed, fallback to text:", e1?.message || e1);
        await liff.sendMessages([textMsg]);
      }
    } else if (liff.isApiAvailable && liff.isApiAvailable('shareTargetPicker')) {
      try {
        await liff.shareTargetPicker([flexMsg]);
      } catch {
        await liff.shareTargetPicker([textMsg]);
      }
    } else {
      console.warn("Not in LINE client; redirect to adminUrl for continuity");
      location.href = adminUrl;
      return;
    }

    // สำเร็จ: เคลียร์ตะกร้า + ปิด/กลับ
    cart.length = 0;
    saveCart();
    renderCart();
    showTab(2);
    if (liff.isInClient && liff.isInClient()) liff.closeWindow();

  } catch (err) {
    console.error("ส่งข้อความไม่สำเร็จ:", err?.message || err);
    // เปิด summary ต่อให้ทำงานต่อได้
    location.href = adminUrl;
  }
}


function saveCustomerInfo() {
  const address = document.getElementById("custAddress").value.trim();

  /* if (!address) {
     alert("กรุณากรอกข้อมูล ชื่อ-ที่อยู่-เบอร์โทร ก่อนบันทึก ❗");
     return;
   }*/

  const customer = { address };
  localStorage.setItem("customerInfo", JSON.stringify(customer));

  // ทำให้ field ใช้ไม่ได้ (disable)
  document.getElementById("custAddress").disabled = true;

  // ซ่อนปุ่มบันทึก แสดงปุ่มแก้ไข
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("editBtn").style.display = "inline-block";

  // alert("บันทึกข้อมูลเรียบร้อยแล้ว ✅");
}

function editCustomerInfo() {
  // เปิดให้แก้ไขได้
  document.getElementById("custAddress").disabled = false;

  // ซ่อนปุ่มแก้ไข แสดงปุ่มบันทึก
  document.getElementById("editBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "inline-block";
}


// -------------------------
// สร้าง allProducts (flat list) จาก object products
// -------------------------
function generateAllProducts() {
  allProducts = [];
  Object.keys(products).forEach(cat => {
    Object.keys(products[cat]).forEach(sub => {
      products[cat][sub].forEach(p => {
        allProducts.push({
          name: p.name,
          price: p.price,
          img: p.image,
          category: cat,
          subCategory: sub
        });
      });
    });
  });
}

// --- ฟังก์ชันค้นหา ---
function filterProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let searchResults = document.getElementById("searchResults");
  let categoryList = document.getElementById("categoryList");
  let subCategoryList = document.getElementById("subCategoryList");
  let productList = document.getElementById("productList");
  let newProductsSection = document.getElementById("newProductsSection");

  searchResults.innerHTML = "";

  if (input === "") {
    searchResults.style.display = "none";
  //  newProductsSection.style.display = "block"; // แสดงสินค้าเข้าใหม่
    categoryList.style.display = "grid";
    subCategoryList.style.display = "grid";
    productList.style.display = "grid";

    // --- เพิ่มตรงนี้ ---
    const activeCategory = document.querySelector(".category-item.active");
    if (activeCategory) {
      renderSubCategories(activeCategory.textContent);
    } else {
      subCategoryList.innerHTML = ""; // ถ้าไม่มี active ให้ว่าง
      productList.innerHTML = "";
    }

    return;
  }
  // ถ้า input มีค่า → ซ่อน section สินค้าเข้าใหม่
//  newProductsSection.style.display = "none";

  // ค้นหาใน allProducts
  const found = allProducts.filter(p => p.name.toLowerCase().includes(input));

  if (found.length > 0) {
    found.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-item";  // ใช้ style ปกติ
      div.setAttribute("data-category", p.category);
      div.setAttribute("data-subcategory", p.subCategory);

      // innerHTML เหมือน renderProducts()
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.price}฿</p>
          <button class="add-btn" onclick='addToCart("${p.name}", ${p.price})'>
            Add to Cart
          </button>
        </div>
      `;

      searchResults.appendChild(div);
    });

    // แสดงผล search และซ่อนหมวด/สินค้าปกติ
    searchResults.style.display = "grid";
    searchResults.style.gridTemplateColumns = "repeat(3, 1fr)";
    searchResults.style.gap = "5px";

    categoryList.style.display = "none";
    subCategoryList.style.display = "none";
    productList.style.display = "none";
  } else {
    searchResults.innerHTML = "<p>❌ ไม่พบสินค้า</p>";
    searchResults.style.display = "block";
    categoryList.style.display = "none";
    subCategoryList.style.display = "none";
    productList.style.display = "none";
  }
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  input.value = "";        // ล้างข้อความ
  filterProducts();        // เรียกฟังก์ชัน filterProducts() เพื่อกลับไปแสดงสินค้าปกติ
}
