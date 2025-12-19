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
{ name: "Tudca+NAC SAAnabolic", price: 1400, image: "" },
  { name: "Hairtech Pro Spray SAAnabolic", price: 1600, image: "" },
  { name: "Dutal SAAnabolic", price: 1350, image: "" },
  { name: "Multivitamin+CoQ10 SAAnabolic", price: 950, image: "" },
  { name: "TestU NEBIDO 1000mg/4ml", price: 8500, image: "images/testu-nebido.png" },
  { name: "TestU SAAnabolic 250mg", price: 1650, image: "images/testu-sa.png" },
  { name: "Tirzep SAAnabolic 20mg ", price: 4900, image: "images/tirzep20-sa.png" },
  { name: "HGHPen SAAnabolic(Pharma) 30iu", price: 2900, image: "images/hghpen-sa.png" },
  { name: "HGH Wellness 100iu", price: 3500, image: "" },
  { name: "2xHGH Wellness 100iu", price: 6000, image: "" }

];

// --- ข้อมูลสินค้าโปรโมชั่น ---
const promoProducts = [
  { name: "(3pc) GW501516 Promotion", price: 2900, image: "images/sarmpro.png" },
  { name: "(3pc) RAD140 Promotion", price: 2400, image: "images/sarmpro.png" },
  { name: "(3pc) MK2866 Promotion", price: 2700, image: "images/sarmpro.png" },
  { name: "(3pc) MK677 Promotion", price: 3300, image: "images/677pro.png" },
  { name: "2xHGH Wellness 100iu", price: 6000, image: "" },
  { name: "3xHGHPen SAAnabolic(Pharma) 30iu", price: 7900, image: "images/hghpen-sa.png" }
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
    //  { name: "Anadrol Bodytech 50mg100t", price: 1200, image: "images/anadrol-body.png" },
      { name: "Anadrol Meditech 50mg100t", price: 1200, image: "images/anadrol-medi.png" },
      { name: "Anadrol Platinum 50mg100t", price: 1700, image: "images/anadrol-plat.png" },
      { name: "Anadrol BPMedical 50mg100t", price: 1600, image: "images/anadrol-bp.png" },
      { name: "Anadrol Beligas 50mg100t", price: 1390, image: "images/anadrol50100-beligas.png" },
      { name: "Anadrol SA 25mg100t", price: 950, image: "images/anadrol-sa.png" },
      { name: "Anadrol AlphaPharma 50mg50t", price: 1600, image: "images/anadrol-alpha.png" }
    ],
    "Anavar": [
      { name: "Anavar Gainzlab 10mg50t", price: 860, image: "images/anavar-gainz.png" },
   //   { name: "Anavar EuroMed 10mg50t", price: 950, image: "images/anavar-euro.png" },
      // { name: "Anavar Beligas 10mg50t", price: 1090, image: "images/anavar1050-beligas.png" },
      { name: "Anavar AlphaPharma 10mg50t", price: 1600, image: "images/anavar-alpha.png" },
   //   { name: "Anavar Bodytech 10mg100t", price: 1350, image: "images/anavar-body.png" },
      { name: "Anavar Meditech 10mg100t", price: 1350, image: "images/anavar10-medi.png" },
      { name: "Anavar SAAnabolic 10mg100t", price: 1600, image: "images/anavar-sa.png" },
      { name: "Anavar Platinum 10mg100t", price: 1800, image: "images/anavar-plat.png" },
      { name: "Anavar Beligas 10mg100t", price: 1890, image: "images/anavar10100-beligas.png" },
      { name: "Anavar BPMedical 15mg50t", price: 1400, image: "images/anavar-bp.png" },
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
//      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t", price: 1690, image: "images/clen100-beligas.png" }
    ],
    "Primo": [
      { name: "Primotab Meditech 25mg50t", price: 1350, image: "images/primotab-medi.png" },
    //  { name: "Primotab Bodytech 25mg50t", price: 1350, image: "images/primotab-body.png" },
      { name: "Primotab BPMedical 25mg50t", price: 2000, image: "images/primotab-bp.png" },
      { name: "Primotab Beligas 25mg50t", price: 2890, image: "images/primotab-beligas.png" }
    ],
    "Dbol": [
      { name: "Dbol Gainzlab 10mg100t", price: 540, image: "images/dbol-gainz.png" },
    //  { name: "Dbol Bodytech 10mg100t", price: 740, image: "images/dbol-body.png" },
      { name: "Dbol BPMedical 10mg100t", price: 790, image: "images/dbol-bp.png" },
      { name: "Dbol Platinum 10mg100t", price: 1000, image: "images/dbol-plat.png" },
    //  { name: "Dbol Beligas 10mg100t", price: 0, image: "images/dbol10100-beligas.png" },
      //   { name: "Dbol Beligas 20mg50t", price: 1190, image: "images/dbol20-beligas.png" },
      { name: "Dbol Beligas 50mg50t", price: 2200, image: "images/dbol50-beligas.png" }
    ],
    "Tbol": [
    //  { name: "Tbol Bodytech 10mg50t", price: 1000, image: "images/tbol-body.png" },
      { name: "Tbol Meditech 10mg50t", price: 1000, image: "images/tbol-medi.png" },
      { name: "Tbol Platinum 10mg100t", price: 1400, image: "images/tbol-plat.png" },
      { name: "Tbol BPMedical 20mg100t", price: 1700, image: "images/tbol-bp.png" }
      //  { name: "Tbol Beligas 10mg100t", price: 0, image: "images/tbol-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gain.png" },
     // { name: "T3 Bodytech 25mcg100t", price: 780, image: "images/t3-body.png" },
      { name: "T3 Meditech 25mcg100t", price: 780, image: "images/t3-medi.png" },
      { name: "T3 Synctech 25mcg100t", price: 800, image: "images/t3-sync.png" },
      { name: "T3 BPMedical 25mcg100t", price: 1000, image: "images/t3-bp.png" },
      { name: "T3 Beligas 50mcg50t", price: 1090, image: "images/t350-beligas.png" },
      { name: "T3 Platinum 50mcg100t", price: 1200, image: "images/t3-plat.png" },
      { name: "T3 SAAnabolic 25mcg200t", price: 1200, image: "images/t3-sa.png" },
      { name: "T3 Beligas 50mcg100t", price: 1290, image: "images/t3100-beligas.png" }
    ],
    "Stano": [
      { name: "Stanotab Gainzlab 10mg100t", price: 700, image: "images/stanotab-gainz.png" },
      { name: "Stanotab AlphaPharma 10mg50t", price: 1000, image: "images/stanotab-alpha.png" },
      { name: "Stanotab EuroMed 10mg100t", price: 850, image: "images/stanotab-euro.png" },
      { name: "Stanotab Synctech 10mg100t", price: 850, image: "images/stanotab-sync.png" },
      { name: "Stanotab Meditech 10mg100t", price: 900, image: "images/stanotab-medi.png" },
   //   { name: "Stanotab Bodytech 10mg100t", price: 900, image: "images/stanotab-body.png" },

      { name: "Stanotab SAAnabolic 10mg100t", price: 1000, image: "images/stanotab-sa.png" },
      { name: "Stanotab Platinum 10mg100t", price: 1200, image: "images/stanotab-plat.png" },
      { name: "Stanotab BPMedical 10mg100t", price: 1100, image: "images/stanotab-bp.png" },
      { name: "Stanotab Beligas 10mg100t", price: 1290, image: "images/stanotab10100-beligas.png" },
      { name: "Stanotab Beligas 50mg50t", price: 2090, image: "images/stanotab5050-beligas.png" }
    ],
    "Proviron": [
      // { name: "Proviron Beligas 20mg50t", price: 1490, image: "images/prov50-beligas.png" },
      { name: "Proviron Beligas 20mg100t", price: 1890, image: "images/prov100-beligas.png" },
      { name: "Proviron Meditech 25mg50t", price: 1150, image: "images/prov-medi.png" },
      { name: "Proviron BPMedical 25mg50t", price: 1200, image: "images/prov-bp.png" },
      { name: "Proviron SAAnabolic 25mg100t", price: 1800, image: "images/prov-sa.png" },
      { name: "Proviron Platinum 25mg100t", price: 1950, image: "images/prov-plat.png" },
      { name: "Proviron AlphaPharma 25mg100t", price: 2200, image: "images/prov-alpha.png" }
    ],
    "Halotestin": [
      // { name: "Halotestin Beligas 10mg50t", price: 2300, image: "images/halo50-beligas.png" },
      { name: "Halotestin Beligas 10mg100t", price: 3500, image: "images/halo100-beligas.png" },
      { name: "Halotestin BPMedical 10mg30t", price: 1700, image: "images/halo-bp.png" }
    ],
    "Superdrol": [
      { name: "Superdrol Beligas 10mg50t", price: 1190, image: "images/super-beligas.png" },
   //   { name: "Superdrol Bodytech 10mg50t", price: 1190, image: "images/super-body.png" },
      { name: "Superdrol Meditech 10mg50t", price: 1200, image: "images/super-medi.png" },
      { name: "Superdrol BPMedical 10mg50t", price: 1600, image: "images/super-bp.png" }
    ],
    "Oral etc": [
      { name: "Test เม็ด Beligas 40mg50t", price: 3090, image: "images/testเม็ด-beligas.png" },
      { name: "Mix1 Synctech 15+10mg50t", price: 1550, image: "images/mix1-sync.png" },
      { name: "Mix2 Synctech 20+10mg50t", price: 1700, image: "images/mix2-sync.png" },
      { name: "DNP BPMedical 50mg50t ", price: 1350, image: "" },
      { name: "Telomed SAAnabolic 40mg50t", price: 880, image: "images/telomed-sa.png" }
    ]
  },
  "Injection AAS": {
    "TestC": [
      { name: "DHB1 TestC Beligas 100mg", price: 1450, image: "images/testc100-beligas.png" },
      { name: "TestC Beligas 200mg", price: 1100, image: "images/testc200-beligas.png" },
      { name: "TestC Platinum 200mg", price: 1200, image: "images/testc-plat.png" },
      { name: "TestC Meditech 250mg", price: 1100, image: "images/testc-medi.png" },
   //   { name: "TestC Bodytech 250mg", price: 1100, image: "images/testc-body.png" },
      { name: "TestC SAAnabolic 250mg", price: 1100, image: "images/testc-sa.png" },
      { name: "TestC EuroMed 250mg", price: 1120, image: "images/testc-euro.png" },
      { name: "TestC Beligas 250mg", price: 1290, image: "images/testc250-beligas.png" },
      { name: "TestC AlphaPharma 250mg", price: 1300, image: "images/testc-alpha.png" },
      { name: "TestC BPMedical 250mg", price: 1300, image: "images/testc-bp.png" },
      { name: "TestC Synctech 300mg", price: 1100, image: "images/testc-sync.png" }
    //  { name: "TestC Gainzlab 300mg", price: 840, image: "images/testc-gainz.png" }
    ],
    "TestE": [
      { name: "TestE AlphaPharma 250mg", price: 1300, image: "images/teste-alpha.png" },
      { name: "TestE Meditech 250mg", price: 1050, image: "images/teste-medi.png" },
      { name: "TestE BPMedical 250mg", price: 1300, image: "images/teste-bp.png" },
    //  { name: "TestE Bodytech 300mg", price: 1100, image: "images/teste-body.png" },
      { name: "TestE Synctech 300mg", price: 1100, image: "images/teste-sync.png" },
      { name: "TestE SAAnabolic 200mg", price: 1100, image: "images/teste-sa.png" },
  //    { name: "TestE EuroMed 300mg", price: 1100, image: "images/teste-euro.png" },
      { name: "TestE Platinum 300mg", price: 1200, image: "images/teste-plat.png" },
      { name: "TestE Beligas 300mg", price: 1290, image: "images/teste300-beligas.png" },
      { name: "TestE Beligas 450mg", price: 1490, image: "images/teste450-beligas.png" }
    ],
    "TestProp": [
      { name: "TestProp Gainzlab 100mg", price: 630, image: "images/testprop-gainz.png" },
      { name: "TestProp SAAnabolic 100mg", price: 700, image: "images/testprop-sa.png" },
      { name: "TestProp Synctech 100mg", price: 700, image: "images/testprop-sync.png" },
   //   { name: "TestProp Bodytech 100mg", price: 830, image: "images/testprop-body.png" },
      { name: "TestProp Meditech 100mg", price: 830, image: "images/testprop-medi.png" },
      { name: "TestProp EuroMed 100mg", price: 850, image: "images/testprop-euro.png" },
      { name: "TestProp Beligas 100mg", price: 890, image: "images/testprop-beligas.png" },
      { name: "TestProp Platinum 100mg", price: 1000, image: "images/testprop-plat.png" },
      { name: "TestProp AlphaPharma 100mg", price: 1000, image: "images/testprop-alpha.png" },
      { name: "TestProp BPMedical 100mg", price: 950, image: "images/testprop-bp.png" }
    ],
    "Sustanon": [
      { name: "Sustanon EuroMed 250mg(3Amp)", price: 730, image: "images/sus-euro.png" },
      { name: "Sustanon Gainzlab 300mg", price: 790, image: "images/sus-gainz.png" },
      { name: "Sustanon Meditech 250mg", price: 880, image: "images/sus-medi.png" },
//      { name: "Sustanon Bodytech 250mg", price: 900, image: "images/sus-body.png" },
      { name: "Sustanon Beligas 250mg", price: 1190, image: "images/sus250-beligas.png" },
      { name: "Sustanon BPMedical 250mg", price: 1250, image: "images/sus-bp.png" },
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
    //  { name: "TrenA Bodytech 100mg", price: 1600, image: "images/trena-body.png" },
      { name: "TrenA BPMedical 100mg", price: 2000, image: "images/trena-bp.png" }
    ],
    "TrenE": [
      { name: "TrenE Platinum 150mg", price: 1900, image: "images/trene-plat.png" },
      { name: "TrenE Meditech 200mg", price: 1600, image: "images/trene-medi.png" },
   //   { name: "TrenE Bodytech 200mg", price: 1600, image: "images/trene-body.png" },
      { name: "TrenE Synctech 200mg", price: 1650, image: "images/trene-sync.png" },
      { name: "TrenE Beligas 200mg", price: 1690, image: "images/trene-beligas.png" },
      { name: "TrenE SAAnabolic 200mg", price: 1800, image: "images/trene-sa.png" },
      { name: "TrenE BPMedical 200mg", price: 2300, image: "images/trene-bp.png" },
      { name: "TrenE AlphaPharma 250mg", price: 2500, image: "images/trene-alpha.png" },
      { name: "TrenE Gainzlab 200mg", price: 1600, image: "images/trene-gainz.png" }
    ],
    "TrenHex": [
      { name: "TrenHex AlphaPharma 76.5mg", price: 2300, image: "images/trenhex-alpha.png" },
      { name: "TrenHex Beligas 100mg", price: 1850, image: "images/trenhex-beligas.png" },
      { name: "TrenHex Platinum 100mg", price: 2100, image: "images/trenhex-plat.png" },
      { name: "TrenHex Meditech 150mg", price: 1800, image: "images/trenhex-medi.png" },
     // { name: "TrenHex Bodytech 150mg", price: 2000, image: "images/trenhex-body.png" },
      { name: "TrenHex EuroMed 150mg", price: 2530, image: "images/trenhex-euro.png" },
      { name: "TrenHex BPMedical 200mg", price: 2700, image: "images/trenhex-bp.png" }
    ],
    "Stano": [
      { name: "Stano Platinum 50mg", price: 1400, image: "images/stano-plat.png" },
      { name: "Stano AlphaPharma 50mg", price: 1500, image: "images/stano-alpha.png" },
      { name: "Stano Gainzlab 100mg", price: 870, image: "images/stano-gainz.png" },
      { name: "Stano Meditech 100mg", price: 1070, image: "images/stano-medi.png" },
   //   { name: "Stano Bodytech 100mg", price: 1070, image: "images/stano-body.png" },
      { name: "Stano EuroMed 100mg", price: 1160, image: "images/stano-euro.png" },
      { name: "Stano BPMedical 100mg", price: 1250, image: "images/stano-bp.png" }
    ],
    "MastE": [
      { name: "MastE Meditech 200mg", price: 1500, image: "images/maste-medi.png" },
      { name: "MastE Beligas 200mg", price: 1590, image: "images/maste-beligas.png" },
      { name: "MastE Synctech 200mg", price: 1600, image: "images/maste-sync.png" },
      { name: "MastE SAAnabolic 200mg", price: 1700, image: "images/maste-sa.png" },
      { name: "MastE Platinum 200mg", price: 1900, image: "images/maste-plat.png" },
      { name: "MastE BPMedical 200mg", price: 2300, image: "images/maste-bp.png" }
     // { name: "MastE AlphaPharma 200mg", price: 0, image: "images/maste-alpha.png" }
    ],
    "MastP": [
      { name: "MastP Gainzlab 100mg", price: 1200, image: "images/mastp-gainz.png" },
      { name: "MastP Synctech 100mg", price: 1300, image: "images/mastp-sync.png" },
      { name: "MastP SAAnabolic 100mg", price: 1300, image: "images/mastp-sa.png" },
      { name: "MastP Beligas 100mg", price: 1400, image: "images/mastp-beligas.png" },
   //   { name: "MastP Bodytech 100mg", price: 1400, image: "images/mastp-body.png" },
      { name: "MastP Meditech 100mg", price: 1400, image: "images/mastp-medi.png" },
      { name: "MastP EuroMed 100mg", price: 1500, image: "images/mastp-euro.png" },
      { name: "MastP Platinum 100mg", price: 1600, image: "images/mastp-plat.png" },
      { name: "MastP AlphaPharma 100mg", price: 1700, image: "images/mastp-alpha.png" },
      { name: "MastP BPMedical 100mg", price: 2000, image: "images/mastp-bp.png" }
    ],
    "Primo": [
      { name: "Primo Meditech 100mg", price: 1700, image: "images/primo-medi.png" },
      //{ name: "Primo Gainzlab 100mg", price: 1500, image: "images/primo-gainz.png" },
    //  { name: "Primo SAAnabolic 100mg", price: 1600, image: "images/primo-sa.png" },
     // { name: "Primo Bodytech 100mg", price: 1700, image: "images/primo-body.png" },
      { name: "Primo Platinum 100mg", price: 2000, image: "images/primo-plat.png" },
      { name: "Primo BPMedical 100mg", price: 2100, image: "images/primo-bp.png" },
      { name: "Primo AlphaPharma 100mg", price: 2500, image: "images/primo-alpha.png" },
      { name: "Primo Synctech 150mg", price: 1850, image: "images/primo-sync.png" }
    ],
    "NPP": [
    //  { name: "NPP Bodytech 100mg", price: 1200, image: "images/npp-body.png" },
      { name: "NPP Beligas 100mg", price: 1290, image: "images/npp-beligas.png" },
      { name: "NPP Platinum 100mg", price: 1800, image: "images/npp-plat.png" },
      { name: "NPP BPMedical 100mg", price: 1250, image: "images/npp-bp.png" }
    //  { name: "NPP AlphaPharma 100mg", price: 0, image: "images/npp-alpha.png" }
    ],
    "EQ": [
      { name: "EQ Meditech 250mg", price: 1200, image: "images/eq-medi.png" },
//      { name: "EQ Bodytech 250mg", price: 1200, image: "images/eq-body.png" },
      { name: "EQ BPMedical 250mg", price: 1750, image: "images/eq-bp.png" },
      { name: "EQ AlphaPharma 250mg", price: 2000, image: "images/eq-alpha.png" },
      { name: "EQ Gainzlab 300mg", price: 1000, image: "images/eq-gainz.png" },
      { name: "EQ SAAnabolic 300mg", price: 1400, image: "images/eq-sa.png" },
      { name: "EQ Beligas 300mg", price: 1590, image: "images/eq-beligas.png" },
      { name: "EQ Synctech 400mg", price: 1400, image: "images/eq-sync.png" },
   //   { name: "EQ Bodytech 400mg", price: 1500, image: "images/eq2-body.png" },
      { name: "EQ Platinum 400mg", price: 1900, image: "images/eq-plat.png" },
      { name: "EQ Beligas 500mg", price: 2150, image: "images/eq2-beligas.png" }
    ],
    "Deca": [
      { name: "Deca EuroMed 100mg(3Amp)", price: 650, image: "images/decaamp-euro.png" },
      { name: "Deca AlphaPharma 200mg", price: 1700, image: "images/deca-alpha.png" },
      { name: "Deca Meditech 250mg", price: 1200, image: "images/deca-medi.png" },
   //   { name: "Deca Bodytech 250mg", price: 1200, image: "images/deca-body.png" },
      { name: "Deca BPMedical 250mg", price: 1550, image: "images/deca-bp.png" },
      { name: "Deca Gainzlab 300mg", price: 1000, image: "images/deca-gainz.png" },
      { name: "Deca SAAnabolic 300mg", price: 1350, image: "images/deca-sa.png" },
      { name: "Deca Synctech 300mg", price: 1350, image: "images/deca-sync.png" },
      { name: "Deca EuroMed MIX 300mg", price: 1500, image: "images/deca-euro.png" },
      { name: "Deca Beligas 300mg", price: 1590, image: "images/deca300-beligas.png" },
      { name: "Deca Platinum 300mg", price: 1800, image: "images/deca-plat.png" },
   //   { name: "Deca Bodytech 400mg", price: 1600, image: "images/deca2-body.png" },
      { name: "Deca Beligas 500mg", price: 2150, image: "images/deca500-beligas.png" }
    ],
    "Injection etc": [
      { name: "TestU Bayer NEBIDO 1000mg/4ml", price: 8500, image: "images/testu-nebido.png" },
      { name: "TestU SAAnabolic 250mg", price: 1650, image: "images/testu-sa.png" },
      { name: "TestU BPMedical 250mg", price: 1600, image: "" },
      { name: "TDT RAPID Platinum 300mg", price: 2600, image: "images/tdt-plat.png" },
      { name: "Kisseptin-10 SAAnabolic 5mg", price: 1850, image: "images/kiss-sa.png" },
      { name: "Kisseptin Wellness", price: 1200, image: "" },
      { name: "Oxytocin Wellness", price: 1250, image: "" },
      { name: "Tren-Test-Mast Long Beligas 300mg", price: 2450, image: "images/tren-test-mast-beligas.png" },
      //  { name: "Test-Tren Short Beligas 150mg", price: 1700, image: "images/" }, 
      { name: "MENT Beligas 50mg", price: 1990, image: "images/ment-beligas.png" },
      { name: "MTR Beligas 5mg", price: 1290, image: "images/mtr-beligas.png" },
      { name: "L-Carnitine Beligas 30ml", price: 2200, image: "images/l-car-beligas.png" },
      { name: "L-Carnitine+CLA Beligas 30ml", price: 2400, image: "images/l-car+cla-beligas.png" }
    ],
    "Bacteriostatic water": [
      { name: "Bac Water SAAnabolic 10ml", price: 500, image: "images/bac-sa.png" },
      { name: "Bac Water BPMedical 10ml", price: 450, image: "images/bac-bp.png" },
      { name: "Bac Water Beligas 30ml", price: 650, image: "" },
      { name: "Bac Water Synctech 12ml", price: 250, image: "images/bac-sync.png" }
    ]
  },
  "SARMs": {
    "MK677": [
      { name: "MK-677 SAAnabolic 10mg60t", price: 1450, image: "images/677-sa.png" },
      { name: "MK-677 Meditech/Bodytech 25mg50t", price: 1650, image: "images/677-medi.png" },
      { name: "MK-677 BPMedical 10mg90t", price: 2500, image: "images/677-bp.png" },
      { name: "MK-677 Wellness 10mg60t", price: 1700, image: "" }
    ],
    "RAD140": [
      { name: "Rad-140 Meditech/Bodytech 10mg50t", price: 1200, image: "images/rad-medi.png" },
      { name: "Rad-140 SAAnabolic 10mg60t", price: 1650, image: "images/rad-sa.png" },
      { name: "Rad-140 BPMedical 10mg60t", price: 2200, image: "images/rad-bp.png" }
    ],
    "GW501516": [
      { name: "GW-501516 Meditech/Bodytech 20mg50t", price: 1450, image: "images/gw-medi.png" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/gw-sa.png" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2200, image: "images/gw-bp.png" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/gw50-beligas.png" }
    ],
    "MK2866": [
      { name: "MK-2866 Meditech/Bodytech 20mg50t", price: 1350, image: "images/2866-medi.png" },
      { name: "MK-2866 BPMedical 10mg90t", price: 1900, image: "images/2866-bp.png" },
      { name: "MK-2866 SAAnabolic 10mg100t", price: 1200, image: "images/2866-sa.png" },
  //    { name: "MK-2866 Beligas 15mg50t", price: 0, image: "images/2866-beligas.png" },
      { name: "MK-2866+ SAAnabolic 10mg60t", price: 1250, image: "images/2866+-sa.png" }

    ],
    "YK11": [
      { name: "YK-11 BPMedical 10mg30t", price: 1750, image: "images/yk11-bp.png" },
      { name: "YK-11 SAAnabolic 5mg60t", price: 2200, image: "images/yk11-sa.png" },
    ],
    "LGD4033": [
      { name: "LGD-4033 BPMedical 5mg60t", price: 1650, image: "images/lgd-bp.png" },
      { name: "LGD-4033 SAAnabolic 10mg60t", price: 1350, image: "images/lgd-sa.png" },
    //  { name: "LGD-4033 Beligas 10mg50t", price: 0, image: "images/lgd-beligas.png" },
      { name: "LGD-4033 Beligas 10mg90t", price: 2190, image: "images/lgd-beligas.png" }
    ],
    "S4": [
      { name: "S-4 Meditech/Bodytech 20mg50t", price: 1200, image: "images/s4-medi.png" },
      { name: "S-4 BPMedical 25mg60t", price: 1900, image: "images/s4-bp.png" }
    ],
    "AC262": [
      { name: "AC-262 SAAnabolic 10mg60t", price: 2430, image: "images/ac262-sa.png" },
      { name: "AC-262 BPMedical 10mg30t", price: 1700, image: "images/ac262-bp.png" }
    ],
    "SARMs etc": [
      { name: "S-23 SAAnabolic 10mg100t", price: 1900, image: "images/s23-sa.png" },
      { name: "SR-9009 BPMedical 10mg60t", price: 2300, image: "" }
    ]

  },
  "HGHPeptide": {
    "HGH": [
      { name: "HGH Meditech 100iu", price: 3900, image: "images/hgh-medi.png" },
      { name: "HGH Platinum 100iu", price: 5200, image: "images/hgh-plat.png" },
      { name: "HGH Beligas 100iu", price: 5500, image: "images/hgh-beligas.png" },
      { name: "HGH Synctech 120iu", price: 5000, image: "images/hgh-sync.png" },
      { name: "HGH SAAnabolic 120iu", price: 5500, image: "images/hgh-sa.png" },
      { name: "HGH BPMedical(SD) 100iu", price: 6300, image: "images/hgh1-bp.png" },
      { name: "HGH BPMedical(Pharma) 100iu", price: 9100, image: "images/hgh2-bp.png" },
      { name: "HGH BPMedical(Pharma) 160iu", price: 13800, image: "" },
      { name: "HGH Wellness 100iu", price: 3500, image: "" },
      { name: "2xHGH Wellness 100iu", price: 6000, image: "" },

      { name: "HGHPen Pfizer 12mg36iu(เฉพาะไส้)", price: 6820, image: "images/hghpen1-pfizer.png" },
      { name: "HGHPen Pfizer 12mg36iu(ไส้+ปากกา)", price: 8470, image: "images/hghpen2-pfizer.png" },
      { name: "HGHPen Beligas 36iu", price: 5000, image: "images/hghpen-beligas.png" },
      { name: "HGHPen Jolie 50iu", price: 5000, image: "images/hghpen-jolie.png" },
      { name: "HGHPen SAAnabolic(Pharma) 30iu", price: 2900, image: "images/hghpen-sa.png" },
      { name: "3xHGHPen SAAnabolic(Pharma) 30iu", price: 7900, image: "images/hghpen-sa.png" }
    ],
    "IGF1": [
//      { name: "IGF-1 LR3 Bodytech 1000mcg", price: 2600, image: "images/igf1-body.png" },
      { name: "IGF-1 LR3 SAAnabolic 1000mcg", price: 2600, image: "images/igf1-sa.png" },
      { name: "IGF-1 LR3 BPMedical 1000mcg", price: 6300, image: "images/igf1-bp.png" },
      { name: "IGF-1 DES Beligas 1mg", price: 2890, image: "images/des-beligas.png" },
      { name: "IGF-1 LR3 Synctech 2000mcg", price: 4500, image: "images/igf1-sync.png" },
      { name: "IGF-1 INCRELEX 400mg", price: 8900, image: "images/igf1-increlex.png" }
    ],
    "HCG": [
      { name: "HCG Beligas 5000iu", price: 1100, image: "images/hcg-beligas.png" },
      { name: "HCG Global 5000iu", price: 1100, image: "" },
      { name: "HCG BPMedical 5000iu", price: 1150, image: "images/hcg-bp.png" },
      { name: "HCG AlphaPharma 15000iu", price: 2100, image: "images/hcg-alpha.png" }
      // { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/hcg-sa.png" }
    ],
    "TB500/BPC157": [
      { name: "TB-500 Meditech 10mgx3", price: 2200, image: "images/tb500-medi.png" },
      { name: "TB-500 Beligas 5mg", price: 1790, image: "images/tb500-beligas.png" },
      { name: "TB-500 BPMedical 5mg", price: 2000, image: "" },
      { name: "BPC-157 Meditech 5mgx3", price: 2200, image: "images/bpc157-medi.png" },
      { name: "BPC-157 Beligas 5mg", price: 1100, image: "images/BPC157-beligas.png" },
      { name: "BPC-157 BPMedical", price: 1600, image: "images/bpc157-bp.png" },
      { name: "TB500+BPC157 Wellness 5+5mg", price: 1450, image: "" },
      { name: "TB500+BPC157 SAAnabolic 5+5mg", price: 1550, image: "images/tb500-sa.png" }

    ],
    "Peptide etc": [
      { name: "PT-141 Beligas 10mg", price: 1490, image: "images/pt141-beligas.png" },
      { name: "PT-141 BPMedical 10mg", price: 1500, image: "images/pt141-bp.png" },
      { name: "PT-141 Wellness 10mg", price: 1200, image: "" },
      { name: "GHRP-6 BPMedical 5mg", price: 5800, image: "images/ghrp6-bp.png" },
      { name: "PEG-MGF Beligas 1mg", price: 1350, image: "images/peg-beligas.png" },
      { name: "GHK-CU bpmedical 50mg", price: 1800, image: "" },
      { name: "DSIP Beligas 2mg", price: 890, image: "images/dsip-beligas.png" },
      { name: "DSIP Wellness 10mg", price: 1200, image: "" },
      { name: "Salank Wellness 10mg", price: 1550, image: "" },
      { name: "Semax Wellness 10mg", price: 1550, image: "" },
      { name: "PE-22-28 Wellness 10mg", price: 1450, image: "" },
      { name: "Tesamorelin Wellness 10mg", price: 1750, image: "" },
      { name: "6x Tesamorelin Wellness 10mg", price: 7800, image: "" },
      { name: "CJC-1295(without DAC)5mg + Ipamorelin5mg Wellness", price: 2250, image: "" },
      { name: "CJC-1295(with DAC) 5mg Wellness", price: 2350, image: "" },
      { name: "CJC-1295(no DAC)2mg BPMedical", price: 6300, image: "" },
      { name: "Peptide PEN Reuseable BPMedical", price: 3800, image: "" },
      { name: "Peptide PEN Disposable BPMedical", price: 690, image: "" },
      { name: "MOST-C 10mg Wellness", price: 1950, image: "" },
      { name: "SS-31 10mg Wellness", price: 1350, image: "" },
      { name: "5x SS-31 10mg Wellness", price: 5000, image: "" },
      { name: "8–10 Wellness", price: 1850, image: "" },
      { name: "Humanin 10mg Wellness", price: 1750, image: "" },
      { name: "KPV 10mg Wellness", price: 1400, image: "" },
      { name: "KLOW Wellness", price: 3350, image: "" }
    ]
  },
  "PCT": {
    "Arimidex": [
      { name: "Arimidex EuroMed 1mg30t", price: 1050, image: "images/ari-euro.png" },
      { name: "Arimidex BPMedical 1mg30t", price: 1700, image: "images/ari-bp.png" },
      { name: "Arimidex Meditech 1mg50t", price: 1200, image: "images/ari-medi.png" },
      { name: "Arimidex SAAnabolic 1mg50t", price: 1200, image: "" },
      { name: "Arimidex Beligas 1mg50t", price: 1290, image: "images/ari-beligas.png" }
    ],
    "Aromasin": [
      { name: "Aromasin Meditech 25mg30t", price: 1200, image: "images/aro-medi.png" },
    //  { name: "Aromasin Bodytech 25mg30t", price: 1200, image: "images/aro-body.png" },
      { name: "Aromasin Beligas 25mg50t", price: 1600, image: "images/aro-beligas.png" }
    ],
    "Caber": [
      { name: "Caber Beligas 0.5mg10t", price: 2090, image: "images/caber0.5-beligas.png" },
      { name: "Caber Beligas 1mg10t", price: 2790, image: "images/caber1-beligas.png" },
      { name: "Caber BPMedical 0.5mg8t", price: 1600, image: "images/caber-bp.png" },
   //   { name: "Caber Cabazer 1mg20t", price: 2000, image: "images/caber-pfizer.png" }
      { name: "Caber Global 1mg20t", price: 2700, image: "" }
    ],
    "Nolvadex": [
      { name: "Nolvadex EuroMed 20mg30t", price: 1020, image: "images/nolv-euro.png" },
      { name: "Nolvadex BPMedical 20mg30t", price: 950, image: "images/nolv-bp.png" },
      { name: "Nolvadex Meditech 20mg50t", price: 1200, image: "images/nolv-medi.png" },
      { name: "Nolvadex Beligas 20mg50t", price: 1190, image: "images/nolv-beligas.png" },
      { name: "Nolvadex AlphaPharma 20mg30t", price: 1100, image: "images/nol-alpha.png" },
      { name: "Nolvadex SAAnabolic 20mg50t", price: 850, image: "images/nolv-sa.png" },
      { name: "Levitra SAAnabolic 30mg60t", price: 1440, image: "images/levitra-sa.png" }
    ],
    "Femara": [
      { name: "Femara Meditech 2.5mg", price: 1500, image: "images/femara-medi.png" }
    ],
    "Clomid": [
      { name: "Clomid Meditech 50mg50t", price: 1250, image: "images/clomid-medi.png" },
      { name: "Clomid BPMedical 50mg30t", price: 1100, image: "images/clomid-bp.png" },
      { name: "Clomid Beligas 50mg50t", price: 1490, image: "images/clomid-beligas.png" }
    ],
    "Proviron": [
      // { name: "Proviron Beligas 20mg50t", price: 1490, image: "images/prov50-beligas.png" },
      { name: "Proviron Beligas 20mg100t", price: 1890, image: "images/prov100-beligas.png" },
      { name: "Proviron Meditech 25mg50t", price: 1150, image: "images/prov-medi.png" },
      { name: "Proviron BPMedical 25mg50t", price: 1200, image: "images/prov-bp.png" },
      { name: "Proviron SAAnabolic 25mg100t", price: 1800, image: "images/prov-sa.png" },
      { name: "Proviron Platinum 25mg100t", price: 1950, image: "images/prov-plat.png" },
      { name: "Proviron AlphaPharma 25mg100t", price: 2200, image: "images/prov-alpha.png" }
    ],
    "HCG": [
      { name: "HCG Beligas 5000iu", price: 1100, image: "images/hcg-beligas.png" },
      { name: "HCG Global 5000iu", price: 1100, image: "" },
      { name: "HCG BPMedical 5000iu", price: 1150, image: "images/hcg-bp.png" },
      { name: "HCG AlphaPharma 15000iu", price: 2100, image: "images/hcg-alpha.png" }
      //   { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/hcg-sa.png" }
    ],
    "PCT etc": [
      { name: "Enclomiphene Citrate BPMedical 25mg30t (SERMs)", price: 1900, image: "images/clomid-medi.png" },
      { name: "Toremifene Citrate SAAnabolic 30mg60t", price: 2250, image: "" },
      { name: "Raloxifene SAAnabolic 30mg60t", price: 1440, image: "" }
    ]
  },
  "FatBurnWeight-loss": {
    "Clen": [
      { name: "Clen AlphaPharma 40mcg50t\n&nbsp;\n&nbsp;", price: 600, image: "images/clen-alpha.png" },
      //{ name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen-gain.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen-sync.png" },
//      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t\n&nbsp;", price: 1690, image: "images/clen100-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gain.png" },
 //     { name: "T3 Bodytech 25mcg100t", price: 780, image: "images/t3-body.png" },
      { name: "T3 Meditech 25mcg100t", price: 780, image: "images/t3-medi.png" },
      { name: "T3 Synctech 25mcg100t", price: 800, image: "images/t3-sync.png" },
      { name: "T3 BPMedical 25mcg100t", price: 1000, image: "images/t3-bp.png" },
      { name: "T3 Beligas 50mcg50t", price: 1090, image: "images/t350-beligas.png" },
      { name: "T3 Platinum 50mcg100t", price: 1200, image: "images/t3-plat.png" },
      { name: "T3 SAAnabolic 25mcg200t", price: 1200, image: "images/t3-sa.png" },
      { name: "T3 Beligas 50mcg100t", price: 1290, image: "images/t3100-beligas.png" }
    ],
    "GW501516": [
      { name: "GW-501516 Meditech/Bodytech 20mg50t", price: 1450, image: "images/gw-medi.png" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/gw-sa.png" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2420, image: "images/gw-bp.png" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/gw50-beligas.png" }
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
      { name: "SemaglutidePen Wegovy 1mg(มีอย.)", price: 11900, image: "images/sema-wegovy.png" }
    ],
    "Tirzepatide": [
      { name: "Tirzep Wellness 5mg", price: 1850, image: "" },
      { name: "Tirzep Mounjaro Kwikpen 5mg/0.6ml(มีอย.)", price: 17500, image: "images/tirzep-kwikk.png" },
      { name: "Tirzep APLab 10mg", price: 3500, image: "images/tirzep-ap.png" },
      { name: "Tirzep SAAnabolic 10mg", price: 3500, image: "images/tirzep-sa.png" },
      { name: "Tirzep Wellness 10mg", price: 3200, image: "images/tirzep-wellness.png" },
      { name: "Tirzep BPMedical 10mg", price: 3700, image: "images/tirzep-bp.png" },
      { name: "TirzepPen Jolie 10mg", price: 5500, image: "images/tirzep-jolie.png" },
      { name: "TirzepPen Beligas 10mg", price: 4500, image: "images/tirzep-beligass.png" },
      { name: "Tirzep Platinum 10mg", price: 3500, image: "images/tirzep-plat.png" },
      { name: "Tirzep SAAnabolic 20mg ", price: 4900, image: "images/tirzep20-sa.png" },
      { name: "Tirzep Wellness 20mg ", price: 3650, image: "" }      
    ],
    "Retatrutide": [
      // { name: "Retatrutide APLab 5mg", price: 1800, image: "images/" },
      { name: "Retatrutide Wellness 5mg", price: 2500, image: "" },
      { name: "Retatrutide Wellness 10mg", price: 4000, image: "images/reta-wellness.png" },
      { name: "RetatrutidePen APLab 10mg", price: 6900, image: "images/reta-ap.png" },
      { name: "RetatrutidePen SAAnabolic 10mg", price: 5500, image: "images/retapen-sa.png" },
      { name: "Retatrutide SAAnabolic 10mg", price: 4500, image: "images/reta-sa.png" },
      { name: "3xRetatrutide SAAnabolic 10mg", price: 12000, image: "images/reta-sa.png" },
      { name: "Retatrutide BPMedical 10mg", price: 4800, image: "images/reta-bp.png" }
    ],
    "Oral Weight-loss etc": [
      { name: "Orlistat 120mg14t", price: 840, image: "images/orlistat.png" }
    ],
    "Injection Weight-loss etc": [
      { name: "Helio Clen Yohimbine Beligas 40mcg&5.5mg", price: 1450, image: "images/helio-beligas.png" },
      { name: "Saxenda Liraglutide 3.0mg", price: 3900, image: "images/saxenda.png" },
      { name: "Cut Fast SAAnabolic 155mg", price: 1750, image: "images/cut-sa.png" },
      { name: "Cagrilintide Wellness 5mg", price: 1950, image: "" },
      { name: "AOD Wellness 5mg", price: 1450, image: "" },
      { name: "Fragment Wellness 5mg", price: 1450, image: "" }
    ]
  },
  "Supplements": {
    "Tudca": [
    //  { name: "Tudca Beligas 500mg90t", price: 1590, image: "images/tudca-beligas.png" },
      { name: "Tudca BPMedical 500mg60t", price: 1870, image: "images/tudca-bp.png" },
      { name: "Tudca+NAC SAAnabolic", price: 1400, image: "" },
      { name: "SAMARIN-140 100t", price: 1000, image: "" }
      
    ],
    "Supplements": [
      { name: "Iso Accutane Beligas 20mg50t", price: 1000, image: "images/iso-beligas.png" },
      { name: "Kelp Iodine SAAnabolic 225mcg90t", price: 350, image: "images/kelp-sa.png" },
      { name: "Enhanced NMN350 SAAnabolic 60t", price: 1250, image: "images/nmn350-sa.png" },
      { name: "NMN+TMG SAAnabolic 430mg60t", price: 1250, image: "images/nmn-sa.png" },
      { name: "GHK-CU 50mg Wellness", price: 1000, image: "" },
      { name: "Epitalon 10mg Wellness", price: 1000, image: "" },
      { name: "Pinealon 10mg Wellness", price: 1450, image: "" },
      { name: "Carb up 2210 SAAnabolic 60t", price: 950, image: "images/carb-sa.png" },
      { name: "5-Amino-1mq SAAnabolic 60t", price: 950, image: "images/" },
      { name: "SLU-PP-332 SAAnabolic 60t", price: 1750, image: "images/slp-sa.png" },
      { name: "SLU-PP-332 Wellness 250mcg100t", price: 2000, image: "" },
      { name: "SLU-PP-332 BPmedical 400mcg60t", price: 1700, image: "" }  
    ]
  },
  "Sexual Health": {
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
    ],
    "Sexual Health etc": [
      
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

  // ---------- คำอธิบายแต่ละหมวด (TH / EN) ----------
  let descTh = "";
  let descEn = "";

  // ✅ Oral AAS → Anavar
  if (category === "Oral AAS" && sub === "Anavar") {
    descTh = `
      <p>
         <b>Anavar (Oxandrolone)</b> สเตียรอยด์สาย cutting/recomp ช่วยเพิ่ม strength กล้ามแน่น ชัด แห้ง ไม่กักน้ำ เหมาะลดไขมันโดยไม่เสียกล้าม นิยมใช้ทั้งชายและหญิง
        <br>• ครึ่งชีวิต ~9 ชม. ควรแบ่งกิน 2 ครั้ง/วัน
        <br>• โดส: ชาย 30–50 mg/วัน, หญิง 5–15 mg/วัน
        <br>• ผลข้างเคียง: กด HPTA (ควรใช้ร่วมกับ Test), กระทบตับ (เป็น C17-aa), HDL ลด LDL เพิ่ม, อาจผมร่วงในคนที่ไวต่อ DHT
        <br>• นิยมใช้ 6–8 สัปดาห์ พร้อม liver support (TUDCA/NAC)
        <br>• PCT: Clomid หรือ Nolva 4 สัปดาห์ หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Anavar (Oxandrolone)</b> A cutting/recomp steroid that helps increase strength, create dense, defined, and dry muscles, without water retention. Suitable for fat loss without losing muscle. Popular among both men and women.
        <br>• Half-life: ~9 hours, should be split into 2 doses per day.
        <br>• Dosage: Men 30–50 mg/day, Women 5–15 mg/day.
        <br>• Side effects: Suppresses HPTA (should be used with Test), affects the liver (C17-aa), decreases HDL and increases LDL, may cause hair loss in those sensitive to DHT.
        <br>• Commonly used for 6–8 weeks with liver support (TUDCA/NAC).
        <br>• PCT: Clomid or Nolva for 4 weeks after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → Anadrol
  else if (category === "Oral AAS" && sub === "Anadrol") {
    descTh = `
      <p>
         <b>Anadrol (Oxymetholone)</b> สเตียรอยด์สาย bulking แรงมาก เพิ่มขนาดกล้ามและแรงแบบรวดเร็ว เหมาะใช้ช่วง mass หรือ kickstart cycle
        <br>• ครึ่งชีวิต ~8–9 ชม. กินวันละ 1–2 ครั้ง
        <br>• โดส: 25–100 mg/วัน (นิยมเริ่มที่ 50 mg)
        <br>• ผลลัพธ์: กล้ามใหญ่เร็ว แรงขึ้นชัด น้ำหนักพุ่งเร็ว
        <br>• ผลข้างเคียง: บวมเพราะกักน้ำ, ปวดหัว, ความดันสูง, ตับเครียดมาก (เป็น C17-aa), กด HPTA รุนแรง
        <br>• แนะนำใช้ 4–6 สัปดาห์ พร้อม liver support (TUDCA/NAC)
        <br>• PCT: Clomid/Nolva หลังจบ cycle หรือหลังหยุด Anadrol ใน stack
      </p>
    `;
    descEn = `
      <p>
         <b>Anadrol (Oxymetholone)</b> A very strong bulking steroid that rapidly increases muscle size and strength. Suitable for mass phase or as a kickstart in a cycle.
        <br>• Half-life: ~8–9 hours, taken 1–2 times per day.
        <br>• Dosage: 25–100 mg/day (commonly starts at 50 mg).
        <br>• Results: Rapid muscle size increase, noticeable strength boost, quick weight gain.
        <br>• Side effects: Water retention and bloating, headache, high blood pressure, heavy liver stress (C17-aa), strong HPTA suppression.
        <br>• Recommended use: 4–6 weeks with liver support (TUDCA/NAC).
        <br>• PCT: Clomid/Nolva after finishing the cycle or after stopping Anadrol in a stack.
      </p>
    `;
  }
  // ✅ Oral AAS → Clen
  else if (category === "Oral AAS" && sub === "Clen") {
    descTh = `
      <p>
         <b>Clenbuterol</b> ไม่ใช่สเตียรอยด์ แต่เป็น Beta-2 agonist ใช้เร่งการเผาผลาญ ลดไขมัน รักษามวลกล้าม เหมาะกับช่วง cutting
        <br>• ครึ่งชีวิต ~36 ชม. วันละ 1 ครั้งตอนเช้า
        <br>• โดส: เริ่มที่ 20 mcg/วัน เพิ่มทีละ 20 mcg ทุก 2–3 วัน (สูงสุด ~120–140 mcg/วัน)
        <br>• ผลลัพธ์: เผาผลาญเพิ่ม ความร้อนในร่างกายสูงขึ้น กล้ามชัดขึ้น
        <br>• ผลข้างเคียง: ใจสั่น มือสั่น นอนไม่หลับ ปวดหัว ความดันสูง ตับเต้นแรง อาจดื้อยาเร็ว
        <br>• นิยมใช้แบบ 2 สัปดาห์ on / 2 สัปดาห์ off หรือเพิ่มโดสแบบ step-up 4–6 สัปดาห์
        <br>• แนะนำใช้ร่วมกับ taurine + potassium ป้องกันตะคริว
      </p>
    `;
    descEn = `
      <p>
         <b>Clenbuterol</b> Not a steroid, but a Beta-2 agonist used to boost metabolism, burn fat, and preserve muscle mass. Ideal for cutting phases.
        <br>• Half-life: ~36 hours, taken once daily in the morning.
        <br>• Dosage: Start at 20 mcg/day, increase by 20 mcg every 2–3 days (maximum ~120–140 mcg/day).
        <br>• Results: Increased metabolism, elevated body temperature, improved muscle definition.
        <br>• Side effects: Rapid heartbeat, trembling hands, insomnia, headache, high blood pressure, heart palpitations, may develop tolerance quickly.
        <br>• Common usage: 2 weeks on / 2 weeks off, or step-up dosing for 4–6 weeks.
        <br>• Recommended to use alongside taurine and potassium to prevent cramps.
      </p>
    `;
  }
  // ✅ Oral AAS → Primo tab
  else if (category === "Oral AAS" && sub === "Primo") {
    descTh = `
      <p>
         <b>Primo (Methenolone Enanthate)</b> คือสเตียรอยด์ที่มีฤทธิ์อ่อน มีความปลอดภัยสูง รักษามวลกล้ามเนื้อในช่วงลดไขมันเหมาะกับทั้งผู้ชายและผู้หญิง
        <br>• ครึ่งชีวิต: แบบฉีดสัปดาห์ละ 1–2 ครั้ง/แบบกิน ต้องกินทุกวัน
        <br>• โดสเริ่มต้น: แบบฉีด: 400–600 mg/สัปดาห์/แบบกิน: 50–100 mg/วัน (ไม่ค่อยนิยม เพราะผลเบาและราคาแพง)
        <br>• ผลลัพธ์: รักษากล้ามเนื้อไม่บวมน้ำ ไม่เปลี่ยนเป็นเอสโตรเจน เสี่ยงผลข้างเคียงต่ำ กล้ามดูแบบธรรมชาติ
        <br>• ผลข้างเคียง: มีผลกดฮอร์โมนเล็กน้อย
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Primo (Methenolone Enanthate)</b> Primo is a mild steroid with high safety, known for preserving muscle mass during fat loss. Suitable for both men and women.
        <br>• Half-life: Injectable: 1–2 times per week/ Oral: must be taken daily
        <br>• Starting dosage: Injectable: 400–600 mg/week/ Oral: 50–100 mg/day (less popular due to mild effects and high cost)
        <br>• Benefits / Results: Preserves muscle without water retention/Does not convert to estrogen/Very low risk of side effects
        <br>• Produces a natural-looking physique
        <br>• Side effects: Slight hormone suppression
        <br>• PCT: Use Clomid or Nolvadex after finishing the cycle.
      </p>
    `;
  }

  // ✅ Oral AAS → Dbol
  else if (category === "Oral AAS" && sub === "Dbol") {
    descTh = `
      <p>
         <b>Dianabol (Methandienone)</b> สเตียรอยด์สาย bulking ยอดนิยม เพิ่มขนาดกล้ามและแรงอย่างรวดเร็ว เห็นผลในไม่กี่วัน เหมาะ kickstart cycle
        <br>• ครึ่งชีวิต ~4–6 ชม. ควรแบ่งกินวันละ 2–3 ครั้ง
        <br>• โดส: 20–40 mg/วัน (เริ่มที่ 20–30 mg สำหรับมือใหม่)
        <br>• ผลลัพธ์: กล้ามโตเร็ว น้ำหนักพุ่ง แรงขึ้นไว บวมเต็ม
        <br>• ผลข้างเคียง: กักน้ำเยอะ ความดันสูง สิว ผมร่วง ตับเครียด (C17-aa), กด HPTA
        <br>• นิยมใช้ 4–6 สัปดาห์ พร้อม liver support (TUDCA/NAC)
        <br>• ควรใช้ควบกับ Test เพื่อป้องกัน suppression
        <br>• PCT: Clomid/Nolva หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Dianabol (Methandienone)</b> A popular bulking steroid that rapidly increases muscle size and strength, with visible results in just a few days. Suitable as a kickstart for a cycle.
        <br>• Half-life: ~4–6 hours, should be split into 2–3 doses per day.
        <br>• Dosage: 20–40 mg/day (beginners usually start at 20–30 mg).
        <br>• Results: Rapid muscle growth, fast weight gain, noticeable strength increase, and full muscle appearance.
        <br>• Side effects: Heavy water retention, high blood pressure, acne, hair loss, liver stress (C17-aa), HPTA suppression.
        <br>• Commonly used for 4–6 weeks with liver support (TUDCA/NAC).
        <br>• Should be used together with Test to prevent suppression.
        <br>• PCT: Clomid/Nolva after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → Tbol
  else if (category === "Oral AAS" && sub === "Tbol") {
    descTh = `
      <p>
         <b>T-Bol (Turinabol)</b> สเตียรอยด์ oral สาย bulking แบบ mild ที่พัฒนาจาก Dianabol ลดผลข้างเคียงกักน้ำ เหมาะสำหรับเพิ่มกล้ามลีน เพิ่ม strength แบบค่อยเป็นค่อยไป
        <br>• ครึ่งชีวิต ~16 ชั่วโมง กินวันละครั้งหรือแบ่ง 2 ครั้ง
        <br>• โดส: 40–60 mg/วัน (เริ่ม 20–40 mg สำหรับมือใหม่)
        <br>• ผลลัพธ์: กล้ามเพิ่มแบบแห้ง ไม่บวมน้ำ แรงขึ้นชัด กล้ามชัดเจน
        <br>• ผลข้างเคียง: กด HPTA เล็กน้อย ตับเครียด (C17-aa) ความดันอาจเพิ่มบ้าง แต่ต่ำกว่า Dianabol
        <br>• ใช้ได้ 6–8 สัปดาห์ พร้อม liver support
        <br>• PCT: Clomid/Nolva หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>T-Bol (Turinabol)</b> A mild oral bulking steroid developed from Dianabol, designed to reduce side effects such as water retention. Suitable for lean muscle gain and gradual strength enhancement.
        <br>• Half-life: ~16 hours, taken once daily or split into 2 doses.
        <br>• Dosage: 40–60 mg/day (beginners usually start at 20–40 mg).
        <br>• Results: Dry muscle gains, no water retention, noticeable strength increase, clear muscle definition.
        <br>• Side effects: Mild HPTA suppression, liver stress (C17-aa), possible slight increase in blood pressure but lower than Dianabol.
        <br>• Commonly used for 6–8 weeks with liver support.
        <br>• PCT: Clomid/Nolva after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → T3
  else if (category === "Oral AAS" && sub === "T3") {
    descTh = `
      <p>
         <b>T3 (Liothyronine Sodium)</b> ฮอร์โมนไทรอยด์สังเคราะห์ ช่วยเร่งการเผาผลาญ ใช้ลดไขมันอย่างแรง เหมาะช่วง cutting
        <br>• ครึ่งชีวิต ~1 วัน กินวันละครั้งตอนเช้า
        <br>• โดส: เริ่มที่ 25 mcg/วัน เพิ่มทีละ 12.5–25 mcg ทุก 3–5 วัน (สูงสุด ~75–100 mcg/วัน)
        <br>• ผลลัพธ์: เผาผลาญพุ่ง น้ำหนักลงไว กล้ามชัด
        <br>• ผลข้างเคียง: กล้ามอาจสลายถ้าใช้โดสสูงเกินหรือไม่มีกลุ่ม anabolic พ่วง ใจสั่น เหงื่อออก หงุดหงิด มือสั่น นอนไม่หลับ
        <br>• นิยมใช้แบบ taper up & taper down เพื่อป้องกัน thyroid shutdown
        <br>• ไม่แนะนำใช้เกิน 6–8 สัปดาห์ต่อเนื่อง
      </p>
    `;
    descEn = `
      <p>
         <b>T3 (Liothyronine Sodium)</b> A synthetic thyroid hormone that boosts metabolism, used for aggressive fat loss. Suitable for cutting phases.
        <br>• Half-life: ~1 day, taken once daily in the morning.
        <br>• Dosage: Start at 25 mcg/day, increase by 12.5–25 mcg every 3–5 days (maximum ~75–100 mcg/day).
        <br>• Results: Rapid metabolism increase, fast weight loss, improved muscle definition.
        <br>• Side effects: Muscle loss may occur if used at high doses or without anabolic support, heart palpitations, sweating, irritability, hand tremors, insomnia.
        <br>• Commonly used with taper up & taper down method to prevent thyroid shutdown.
        <br>• Not recommended for continuous use beyond 6–8 weeks.
      </p>
    `;
  }
  // ✅ Oral AAS → Stano
  else if (category === "Oral AAS" && sub === "Stano") {
    descTh = `
      <p>
         <b>Winstrol (Stanozolol)</b> สเตียรอยด์อนุพันธ์ DHT นิยมใช้ช่วง cutting เพื่อลดไขมัน คงกล้าม และเพิ่มความคมชัดของกล้ามเนื้อ เหมาะสำหรับผู้ที่ต้องการรูปร่างแห้งแบบกระชับ
        <br>• ครึ่งชีวิต:แบบฉีด ~24 ชั่วโมง (ควรฉีดทุกวัน หรือวันเว้นวัน)
        <br>• โดสเริ่มต้น: แบบกิน: 30–50 mg/วัน / แบบฉีด: 50 mg วันเว้นวัน หรือ 100 mg 3 ครั้ง/สัปดาห์
        <br>• ผลลัพธ์: แห้ง คม ไม่บวมน้ำ เพิ่มเส้นเลือด เพิ่มแรง ในช่วงลดไขมัน
        <br>• ผลข้างเคียง: ปวดข้อ ไขมันในเลือดแย่ลง ตับทำงานหนัก
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Winstrol (Stanozolol)</b> is a DHT-derived steroid commonly used during cutting phases to reduce body fat, preserve muscle, and enhance muscle definition. Ideal for those seeking a dry, tight, and lean physique.
        <br>• Half-life: Injectable: ~24 hours (should be injected daily or every other day)
        <br>• Starting dosage: Oral: 30–50 mg/day / Injectable: 50 mg every other day, or 100 mg 3 times per week
        <br>• Results: Dry and sharp muscle appearance, no water retention, increased vascularity, enhanced strength during fat loss.
        <br>• Side effects: Joint pain, worsened blood lipid profile, liver stress.
        <br>• PCT: Use Clomid / Nolvadex after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → Prov
  else if (category === "Oral AAS" && sub === "Proviron") {
    descTh = `
      <p>
         <b>Proviron (Mesterolone)</b> DHT ที่ไม่สามารถแปลงเป็น estrogen ใช้เพิ่มความแข็งแรงของกล้ามเนื้อ ลดการกักน้ำ และช่วยเพิ่มความใคร่ เหมาะใช้ช่วง cutting หรือ PCT
        <br>• ครึ่งชีวิต ~12 ชั่วโมง กินวันละ 2 ครั้ง
        <br>• โดส: 25–75 mg/วัน
        <br>• ผลลัพธ์: เพิ่มความแข็งแรง กล้ามเนื้อแน่นขึ้น เส้นเลือดชัด ลดอาการบวมน้ำ ช่วยรักษาระดับเทสโทสเตอโรนขณะใช้สเตียรอยด์อื่น
        <br>• ผลข้างเคียง: อาจมีผลต่อตับเล็กน้อย กด HPTA เล็กน้อย แต่ไม่แรงเหมือนสเตียรอยด์อื่น
        <br>• มักใช้ร่วมกับ Test หรือใน PCT เพื่อช่วยฟื้นฟูระบบฮอร์โมน
        <br>• ไม่แนะนำใช้เดี่ยวเป็นระยะยาว
      </p>
    `;
    descEn = `
      <p>
         <b>Proviron (Mesterolone)</b> is a DHT-based compound that cannot convert to estrogen. It is used to increase muscle hardness, reduce water retention, and enhance libido. Suitable for cutting phases or during PCT.
        <br>• Half-life: ~12 hours, taken twice daily.
        <br>• Dosage: 25–75 mg/day.
        <br>• Results: Increases strength/ Enhances muscle density and vascularity/ Reduces water retention/ Helps maintain testosterone levels while using other steroids
        <br>• Side effects: Mild impact on the liver/ Slight HPTA suppression, but weaker compared to most other steroids
        <br>• Usage notes: Commonly used with Test or during PCT to support hormone recovery.
        <br>• Not recommended as a long-term standalone use.
      </p>
    `;
  }
  // ✅ Oral AAS → Halo
  else if (category === "Oral AAS" && sub === "Halotestin") {
    descTh = `
      <p>
         <b>Halotestin (Fluoxymesterone)</b> สเตียรอยด์อนุพันธ์ DHT สายแรง เน้นเพิ่มความแข็งแรงและความดุดัน เหมาะกับนักกีฬาแข่งแรง หรือใช้ช่วง peak strength
        <br>• ครึ่งชีวิต ~9 ชั่วโมง กินวันละ 1–2 ครั้ง
        <br>• โดส: 10–30 mg/วัน
        <br>• ผลลัพธ์: เพิ่ม strength อย่างรวดเร็ว เพิ่ม aggression สูง กล้ามเนื้อแน่นแข็ง เส้นเลือดชัด
        <br>• ผลข้างเคียง: ตับเครียดมาก (C17-aa), ความดันสูง, กด HPTA รุนแรง, อาจทำให้ปวดหัว นอนไม่หลับ และสิวรุนแรง
        <br>• ใช้ได้ 4–6 สัปดาห์เท่านั้น พร้อม liver support
        <br>• PCT: จำเป็นมาก ใช้ Clomid/Nolva หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Halotestin (Fluoxymesterone)</b> A potent DHT-derived steroid that focuses on increasing strength and aggression. Suitable for strength athletes or during peak strength phases.
        <br>• Half-life: ~9 hours, taken 1–2 times per day.
        <br>• Dosage: 10–30 mg/day.
        <br>• Results: Rapid strength increase, high aggression, hard and dense muscle appearance, enhanced vascularity.
        <br>• Side effects: Severe liver stress (C17-aa), high blood pressure, strong HPTA suppression, may cause headaches, insomnia, and severe acne.
        <br>• Recommended for only 4–6 weeks of use, with liver support.
        <br>• PCT: Highly necessary — use Clomid/Nolva after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → Superdrol
  else if (category === "Oral AAS" && sub === "Superdrol") {
    descTh = `
      <p>
         <b>Superdrol (Methasterone)</b> สเตียรอยด์แบบ oral สายแรงมาก เพิ่มทั้งขนาดและความแข็งแรงอย่างรวดเร็ว กล้ามเนื้อพองแน่นแบบแห้ง ไม่กักน้ำ ใช้ช่วง bulk สั้นๆหรือก่อนแข่ง
        <br>• ครึ่งชีวิต ~6–8 ชม. แบ่งกินวันละ 2 ครั้ง
        <br>• โดส: 10–30 mg/วัน (เริ่มที่ 10–20 mgสำหรับมือใหม่)
        <br>• ผลลัพธ์: กล้ามแน่น ใหญ่เร็ว น้ำไม่มาก เส้นเลือดชัด
        <br>• ผลข้างเคียง: ตับเครียดมาก (C17-aa), ความดันสูง, ปวดหัว เบื่ออาหาร กด HPTA รุนแรง คอเลสเตอรอลแย่
        <br>• ไม่ควรใช้เกิน 3–4 สัปดาห์ พร้อม liver support (TUDCA/NAC)
        <br>• PCT: Clomid/Nolva หลังจบ cycle จำเป็น 100%
      </p>
    `;
    descEn = `
      <p>
         <b>Superdrol (Methasterone)</b> A very potent oral steroid that rapidly increases both muscle size and strength. Produces dry, dense, and full-looking muscles without water retention. Used for short bulking phases or pre-contest.
        <br>• Half-life: ~6–8 hours, taken twice daily.
        <br>• Dosage: 10–30 mg/day (beginners usually start at 10–20 mg).
        <br>• Results: Dense and fast muscle growth, minimal water retention, enhanced vascularity.
        <br>• Side effects: Severe liver stress (C17-aa), high blood pressure, headaches, loss of appetite, strong HPTA suppression, poor cholesterol levels.
        <br>• Should not be used for longer than 3–4 weeks, with liver support (TUDCA/NAC).
        <br>• PCT: Clomid/Nolva is absolutely required after finishing the cycle.
      </p>
    `;
  }
  // ✅ Oral AAS → etc
  else if (category === "Oral AAS" && sub === "Oral etc") {
    descTh = `
      <p>
        <b>• Mix 1 Cardarine & Yohimbine</b> เพิ่มความทนต่อการออกกำลังกายและระบบการใช้ไขมันเป็นพลังงาน เพิ่มการไหลเวียนเลือด
        <br> <b>• Mix 2 Ostarine & Ibutamolen</b> รักษามวลกล้ามเนื้อ ตอนลดไขมัน การซ่อมแซมร่างกายและการฟื้นตัว
        <br> <b>• DNP</b> เป็นสารที่เกี่ยวข้องกับกระบวนการผลิตพลังงานในไมโตคอนเดรียของเซลล์ เกี่ยวกับ metabolic rate การปลดปล่อยพลังงานความร้อนแทนการเก็บเป็นไขมัน
        <br> <b>• Telmisartan</b> ใช้ลดความดัน ในกลุ่มคนใช้ฮอร์โมนแล้วมีปัญหาความดันสูง
      </p>
    `;
    descEn = `
      <p>
         <b>• Mix 1 Cardarine & Yohimbine</b> Enhances exercise endurance, promotes fat utilization for energy, and improves blood circulation  
         <br> <b>• Mix 2 Ostarine & Ibutamoren</b> Preserves muscle mass during fat loss, supports body repair and recovery  
         <br> <b>• DNP</b> A compound involved in mitochondrial energy production, increases metabolic rate by releasing heat instead of storing energy as fat  
         <br> <b>• Telmisartan</b> Used to reduce high blood pressure, especially in individuals using hormones who experience elevated blood pressure  
      </p>
    `;
  }


  // Injection
  else if (category === "Injection AAS" && sub === "TestC") {
    descTh = `
      <p>
         <b>TestC (Testosterone Cypionate)</b> คือฮอร์โมนเพศชายสังเคราะห์ในรูปแบบฉีด ออกฤทธิ์ช้า นิยมใช้ในวงการฟิตเนส เพื่อเพิ่มกล้ามเนื้อ ความแข็งแรง และสมรรถภาพทางกาย
        <br>• ครึ่งชีวิต: ~8 วัน (ฉีดสัปดาห์ละ 1–2 ครั้ง)
        <br>• โดสเริ่มต้น: 250–500 mg/สัปดาห์ (สำหรับมือใหม่)
        <br>• ผลลัพธ์: เพิ่มมวลกล้าม ฟื้นตัวเร็ว แรงดีขึ้น
        <br>• ผลข้างเคียง: สิว ผมร่วง บวมน้ำ ความดันสูง Estrogen เพิ่ม (ควรมี AI เช่น Arimidex)
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle เพื่อกระตุ้นการผลิตฮอร์โมนธรรมชาติ
      </p>
    `;
    descEn = `
      <p>
         <b>TestC (Testosterone Cypionate)</b> is an injectable synthetic male hormone with a slow-release effect. It is popular in the fitness industry for increasing muscle mass, strength, and physical performance.
        <br>• Half-life: ~8 days (injected 1–2 times per week)
        <br>• Starting dosage: 250–500 mg/week (for beginners)
        <br>• Results: Increased muscle mass, faster recovery, improved strength
        <br>• Side effects: Acne, hair loss, water retention, high blood pressure, increased estrogen (AI such as Arimidex is recommended)
        <br>• PCT: Clomid / Nolvadex after the cycle to stimulate natural hormone production
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "TestE") {
    descTh = `
      <p>
         <b>TestE (Testosterone Enanthate)</b> คือฮอร์โมนเพศชายสังเคราะห์ในรูปแบบฉีด ออกฤทธิ์ช้า นิยมใช้ในวงการฟิตเนส เพื่อเพิ่มมวลกล้ามเนื้อและแรง
        <br>• ครึ่งชีวิต: ~4.5–5 วัน (ฉีดสัปดาห์ละ 1–2 ครั้ง)
        <br>• โดสเริ่มต้น: 250–500 mg/สัปดาห์ (สำหรับมือใหม่)
        <br>• ผลลัพธ์: เพิ่มกล้ามเนื้อ แรง ฟื้นตัวไว
        <br>• ผลข้างเคียง: สิว ผมร่วง บวมน้ำ Estrogen สูง (ต้องมี AI เช่น Arimidex)
        <br>• หากต้องการข้อมูลเฉพาะทางมากขึ้น เช่น stack หรือการควบคุมผลข้างเคียง บอกเพิ่มเติมได้เลยครับ
      </p>
    `;
    descEn = `
      <p>
         <b>TestE (Testosterone Enanthate)</b> is a synthetic male hormone in injectable form with a slow-release effect. It is commonly used in the fitness field to increase muscle mass and strength.
        <br>• Half-life: ~4.5–5 days (injected 1–2 times per week)
        <br>• Starting dosage: 250–500 mg/week (for beginners)
        <br>• Results: Increases muscle mass, strength, and speeds up recovery
        <br>• Side effects: Acne, hair loss, water retention, high estrogen (AI such as Arimidex is required)
        <br>• If you need more specialized information, such as stack options or side effect management, feel free to ask.
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "TestProp") {
    descTh = `
      <p>
         <b>TestP (Testosterone Propionate)</b> คือฮอร์โมนเพศชายสังเคราะห์ออกฤทธิ์เร็ว นิยมใช้ในวงการฟิตเนสโดยเฉพาะช่วง cutting หรือเตรียมแข่ง เพราะช่วยเพิ่มกล้ามเนื้อแบบไม่กักน้ำ
        <br>• ฉีดวันเว้นวัน
        <br>• โดสเริ่มต้น: 300–500 mg/สัปดาห์
        <br>• ผลลัพธ์: เพิ่มกล้ามเนื้อแบบ lean, ลดการบวมน้ำ, ฟื้นตัวไว
        <br>• ผลข้างเคียง: ปวดจุดฉีด สิว ผมร่วง (ควรมี AI เช่น Arimidex)
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>TestP (Testosterone Propionate)</b> is a fast-acting synthetic male hormone, commonly used in the fitness field, especially during cutting phases or competition prep, as it helps increase lean muscle without water retention.
        <br>• Injection frequency: Every other day
        <br>• Starting dosage: 300–500 mg/week
        <br>• Results: Lean muscle gain, reduced water retention, fast recovery
        <br>• Side effects: Injection site pain, acne, hair loss (AI such as Arimidex is recommended)
        <br>• PCT: Clomid / Nolvadex after finishing the cycle
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "Sustanon") {
    descTh = `
      <p>
         <b>Sustanon 250</b> คือฮอร์โมนเพศชายสังเคราะห์ ประกอบด้วยการผสมของเทสโทสเทอโรน 4 ชนิด (เอสเทอร์ต่างกัน) ทำให้มีทั้งฤทธิ์ออกฤทธิ์เร็วและยาวในเข็มเดียว
        <br>• ครึ่งชีวิต: ประมาณ 15–18 วัน (ฉีดทุก 1–3 สัปดาห์)
        <br>• โดสเริ่มต้น: 250–500 mg/สัปดาห์ (สำหรับมือใหม่)
        <br>• ผลลัพธ์: เพิ่มกล้ามเนื้อ แรง ฟื้นตัวไว รวมทั้งมีฤทธิ์ทั้งเร็วและยาว
        <br>• ผลข้างเคียง: บวมน้ำ สิว ผมร่วง Estrogen สูง (ควรมี AI เช่น Arimidex)
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle เพื่อกระตุ้นการผลิตฮอร์โมนธรรมชาติ
      </p>
    `;
    descEn = `
      <p>
         <b>Sustanon 250</b> is a synthetic male hormone composed of a blend of four different types of testosterone esters, providing both fast-acting and long-lasting effects in a single injection.
        <br>• Half-life: Approximately 15–18 days (injected every 1–3 weeks)
        <br>• Starting dosage: 250–500 mg/week (for beginners)
        <br>• Results: Increases muscle mass, strength, and speeds up recovery, offering both quick and sustained effects
        <br>• Side effects: Water retention, acne, hair loss, high estrogen (AI such as Arimidex is recommended)
        <br>• PCT: Clomid / Nolvadex after finishing the cycle to stimulate natural hormone production
      </p>
    `;
  }
  
  else if (category === "Injection AAS" && sub === "TrenA") {
    descTh = `
      <p>
         <b>Tren A (Trenbolone Acetate)</b> คืออนุพันธ์ของ Nandrolone ที่ออกฤทธิ์เร็วมากและทรงพลังสูงสุดตัวหนึ่งในวงการฟิตเนสนิยมใช้ในช่วง cutting หรือ pre-contest เพราะให้กล้ามเนื้อคม ชัดโดยไม่กักน้ำ
        <br>• ฉีดวันเว้นวัน โดสเริ่มต้น200–300 mg/สัปดาห์ (ควรใช้ร่วมกับ Test)
        <br>• ผลลัพธ์: กล้ามแน่น คม แข็งแรง เพิ่ม strength ชัดเจน เผาผลาญไขมันดีมาก
        <br>• ผลข้างเคียง หงุดหงิดง่าย ไร้สมรรถภาพทางเพศหากไม่มี Test นอนไม่หลับ ความดันสูง
        <br>• PCT: Clomid / Nolvadex หลังจบ cycle
        <br>• Tren A ไม่เหมาะกับมือใหม่หรือผู้ที่ไม่เคยใช้สารมาก่อน
      </p>
    `;
    descEn = `
      <p>
         <b>Tren A (Trenbolone Acetate)</b> is a fast-acting and highly potent derivative of Nandrolone. It is one of the most powerful compounds in the fitness world, commonly used during cutting or pre-contest phases for sharp, dry, and well-defined muscle appearance without water retention.
        <br>• Injected every other day
        <br>• Starting dosage: 200–300 mg/week (should be used together with Test)
        <br>• Results: Dense, sharp, and strong muscles/ Noticeable strength increase/ Excellent fat-burning capability
        <br>• Side effects: Irritability, loss of libido if not paired with Test, insomnia, and high blood pressure
        <br>• PCT: Clomid / Nolvadex after finishing the cycle
        <br>• Tren A is not suitable for beginners or individuals with no prior experience using such substances.
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "TrenE") {
    descTh = `
      <p>
         <b>Tren E (Trenbolone Enanthate)</b> คือสเตียรอยด์ชนิดฉีดที่ออกฤทธิ์ช้า ทรงพลังมาก ใช้เพิ่มกล้ามเนื้อแบบแห้ง แข็ง และช่วยลดไขมัน เหมาะสำหรับผู้มีประสบการณ์ในการใช้สาร
        <br>• ครึ่งชีวิต: ~7–10 วัน (ฉีดสัปดาห์ละ 2 ครั้ง เช่น จันทร์-พฤหัส)
        <br>• โดสเริ่มต้น: 200–400 mg/สัปดาห์ (ไม่แนะนำสำหรับมือใหม่)
        <br>• ผลลัพธ์: กล้ามเนื้อแน่น คม แข็งแรง เผาผลาญไขมันดีมาก เพิ่ม strength อย่างชัดเจน
        <br>• ผลข้างเคียง: เหงื่อออกตอนกลางคืน นอนไม่หลับ ความดันสูง หงุดหงิดง่าย ควรใช้คู่กับ Test
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Tren E (Trenbolone Enanthate)</b> is a slow-acting injectable steroid that is highly potent, used for achieving dry, hard muscle gains and fat reduction. Suitable for experienced users.
        <br>• Half-life: ~7–10 days (injected twice per week, e.g., Monday–Thursday)
        <br>• Starting dosage: 200–400 mg/week (not recommended for beginners)
        <br>• Results: Dense, sharp, and strong muscle appearance/ Excellent fat-burning capability/ Significant increase in strength
        <br>• Side effects: Night sweats, insomnia, high blood pressure, irritability; should be used together with Test
        <br>• PCT: Clomid / Nolvadex after finishing the cycle
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "TrenHex") {
    descTh = `
      <p>
         <b>TrenHex (Trenbolone Hexahydrobenzylcarbonate (Parabolan))</b> คือสเตียรอยด์ชนิดฉีดที่ออกฤทธิ์ยาวนานที่สุดในตระกูล Trenbolone มีความแรงสูง ช่วยเพิ่มกล้ามเนื้อแบบแห้ง แข็ง เผาผลาญไขมันดี เหมาะกับผู้มีประสบการณ์สูง
        <br>• ครึ่งชีวิต: ~10–12 วัน (ฉีดสัปดาห์ละ 1–2 ครั้ง)
        <br>• โดสเริ่มต้น: 200–400 mg/สัปดาห์ (ไม่แนะนำสำหรับมือใหม่)
        <br>• ผลลัพธ์: เพิ่มกล้ามเนื้อแบบ lean, คมชัด, แข็งแรงมาก, เผาผลาญไขมันดีเยี่ยม, Strength เพิ่ม
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle เพื่อกระตุ้นการผลิตฮอร์โมนธรรมชาติ
      </p>
    `;
    descEn = `
      <p>
         <b>TrenHex (Trenbolone Hexahydrobenzylcarbonate (Parabolan))</b> is the longest-acting injectable steroid in the Trenbolone family. It is highly potent, helps build dry and hard muscle, and supports excellent fat-burning. Suitable for highly experienced users.
        <br>• Half-life: ~10–12 days (injected 1–2 times per week)
        <br>• Starting dosage: 200–400 mg/week (not recommended for beginners)
        <br>• Results: Lean muscle gain, sharp and hard muscle appearance, very high strength, excellent fat-burning capability
        <br>• PCT: Clomid / Nolvadex after finishing the cycle to stimulate natural hormone production
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "Stano") {
    descTh = `
      <p>
         <b>Winstrol (Stanozolol)</b> สเตียรอยด์อนุพันธ์ DHT นิยมใช้ช่วง cutting เพื่อลดไขมัน คงกล้าม และเพิ่มความคมชัดของกล้ามเนื้อ เหมาะสำหรับผู้ที่ต้องการรูปร่างแห้งแบบกระชับ
        <br>• ครึ่งชีวิต:แบบฉีด ~24 ชั่วโมง (ควรฉีดทุกวัน หรือวันเว้นวัน)
        <br>• โดสเริ่มต้น: แบบกิน: 30–50 mg/วัน / แบบฉีด: 50 mg วันเว้นวัน หรือ 100 mg 3 ครั้ง/สัปดาห์
        <br>• ผลลัพธ์: แห้ง คม ไม่บวมน้ำ เพิ่มเส้นเลือด เพิ่มแรง ในช่วงลดไขมัน
        <br>• ผลข้างเคียง: ปวดข้อ ไขมันในเลือดแย่ลง ตับทำงานหนัก
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Winstrol (Stanozolol)</b> is a DHT-derived steroid commonly used during cutting phases to reduce body fat, preserve muscle, and enhance muscle definition. Ideal for those seeking a dry, tight, and lean physique.
        <br>• Half-life: Injectable: ~24 hours (should be injected daily or every other day)
        <br>• Starting dosage: Oral: 30–50 mg/day / Injectable: 50 mg every other day, or 100 mg 3 times per week
        <br>• Results: Dry and sharp muscle appearance, no water retention, increased vascularity, enhanced strength during fat loss.
        <br>• Side effects: Joint pain, worsened blood lipid profile, liver stress.
        <br>• PCT: Use Clomid / Nolvadex after finishing the cycle.
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "MastE") {
    descTh = `
      <p>
         <b>MastE (Drostanolone Enanthate)</b> คือสเตียรอยด์อนุพันธ์ DHT ที่นิยมใช้ในช่วง cutting เพื่อเพิ่มความแห้ง ความคม และลดไขมันเหมาะสำหรับผู้ที่มีเปอร์เซ็นต์ไขมันต่ำอยู่แล้ว
        <br>• ครึ่งชีวิต: ~5–7 วัน (ฉีดสัปดาห์ละ 2 ครั้ง)
        <br>• โดสเริ่มต้น: 200–400 mg/สัปดาห์ แบ่งฉีด 2 ครั้ง (เช่น จันทร์-พฤหัส)
        <br>• ผลลัพธ์: กล้ามคม แห้ง ไม่บวมน้ำ ลดเอสโตรเจน (anti-estrogenic effect อ่อนๆ)
        <br>• ผลข้างเคียง: ระดับ DHT สูง → ผมร่วง สิว ความมันผิว ลด HDL เพิ่ม LDL
        <br>• PCT:ใช้ Clomid / Nolvadex หลังจบ cycle เช่นเดียวกับสเตียรอยด์อื่น
      </p>
    `;
    descEn = `
      <p>
         <b>MastE (Drostanolone Enanthate)</b> is a DHT-derived steroid commonly used during cutting phases to increase dryness, definition, and fat reduction. Suitable for individuals who already have a low body fat percentage.
        <br>• Half-life: ~5–7 days (injected twice per week)
        <br>• Starting dosage: 200–400 mg/week, split into 2 injections (e.g., Monday–Thursday)
        <br>• Results: Sharp, dry muscle appearance, no water retention, slight anti-estrogenic effect
        <br>• Side effects: High DHT levels → hair loss, acne, oily skin / Decreases HDL and increases LDL
        <br>• PCT: Use Clomid / Nolvadex after finishing the cycle, same as other steroids
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "MastP") {
    descTh = `
      <p>
         <b>MastP (Drostanolone Propionate)</b> คือสเตียรอยด์อนุพันธ์ DHT ที่ออกฤทธิ์สั้น นิยมใช้ในช่วง cutting โดยเฉพาะในช่วงก่อนแข่งขัน เพื่อช่วยให้รูปร่างแห้ง คม และแข็งชัด เหมาะสำหรับผู้ที่มีไขมันต่ำ
        <br>• ครึ่งชีวิต: 2–3 วัน ควรฉีดวันเว้นวัน
        <br>• โดสเริ่มต้น: 300–500 mg/สัปดาห์ แบ่งฉีดวันเว้นวัน (เช่น 100 mg EOD)
        <br>• ผลลัพธ์: กล้ามเนื้อแห้ง คมชัด ไม่บวมน้ำ/ ลดเอสโตรเจนเล็กน้อย/ ช่วยเพิ่มเส้นเลือดเด่น
        <br>• ผลข้างเคียง: สิว ผมร่วง (DHT สูง)/ ไขมันในเลือดแย่ลง (ลด HDL เพิ่ม LDL)
        <br>• PCT:ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>MastP (Drostanolone Propionate)</b> is a short-acting DHT-derived steroid commonly used during cutting phases, especially pre-contest, to enhance a dry, sharp, and hard physique. Suitable for individuals with already low body fat.
        <br>• Half-life: 2–3 days, should be injected every other day
        <br>• Starting dosage: 300–500 mg/week, split into every other day injections (e.g., 100 mg EOD)
        <br>• Results: Dry and sharp muscle appearance, no water retention/ Slight estrogen reduction/ Enhances vascularity
        <br>• Side effects: Acne, hair loss (high DHT)/ Poor cholesterol profile (decreased HDL, increased LDL)
        <br>• PCT: Use Clomid / Nolvadex after finishing the cycle
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "Primo") {
    descTh = `
      <p>
         <b>Primo (Methenolone Enanthate)</b> คือสเตียรอยด์ที่มีฤทธิ์อ่อน มีความปลอดภัยสูง รักษามวลกล้ามเนื้อในช่วงลดไขมันเหมาะกับทั้งผู้ชายและผู้หญิง
        <br>• ครึ่งชีวิต: แบบฉีดสัปดาห์ละ 1–2 ครั้ง/แบบกิน ต้องกินทุกวัน
        <br>• โดสเริ่มต้น: แบบฉีด: 400–600 mg/สัปดาห์/แบบกิน: 50–100 mg/วัน (ไม่ค่อยนิยม เพราะผลเบาและราคาแพง)
        <br>• ผลลัพธ์: รักษากล้ามเนื้อไม่บวมน้ำ ไม่เปลี่ยนเป็นเอสโตรเจน เสี่ยงผลข้างเคียงต่ำ กล้ามดูแบบธรรมชาติ
        <br>• ผลข้างเคียง: มีผลกดฮอร์โมนเล็กน้อย
        <br>• PCT: ใช้ Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>Primo (Methenolone Enanthate)</b> Primo is a mild steroid with high safety, known for preserving muscle mass during fat loss. Suitable for both men and women.
        <br>• Half-life: Injectable: 1–2 times per week/ Oral: must be taken daily
        <br>• Starting dosage: Injectable: 400–600 mg/week/ Oral: 50–100 mg/day (less popular due to mild effects and high cost)
        <br>• Benefits / Results: Preserves muscle without water retention/Does not convert to estrogen/Very low risk of side effects
        <br>• Produces a natural-looking physique
        <br>• Side effects: Slight hormone suppression
        <br>• PCT: Use Clomid or Nolvadex after finishing the cycle.
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "NPP") {
    descTh = `
      <p>
         <b> NPP (Nandrolone Phenylpropionate)</b> คือสเตียรอยด์สาย bulking ออกฤทธิ์เร็วกว่ารูปแบบ Deca ช่วยเพิ่มกล้ามเนื้อแน่น ลดปวดข้อ และไม่บวมน้ำมาก
        <br>• ครึ่งชีวิต: (ฉีดวันเว้นวัน)
        <br>• โดสเริ่มต้น: 200–400 mg/สัปดาห์
        <br>• ผลลัพธ์: กล้ามเนื้อแน่น เนียน/ ลดปวดข้อ ข้อลื่น/ บวมน้ำน้อยกว่า Deca/ เพิ่มแรงดี เหมาะช่วง bulk หรือ recomp
        <br>• ผลข้างเคียง: กดฮอร์โมนเพศ (ต้องใช้ควบกับ Test)/ เสี่ยง Gyno จาก prolactin/ อาจต้องใช้ Cabergoline ควบคุม prolactin/ บางคนอาจบวมน้ำหรือความดันสูง
        <br>• PCT: Clomid หรือ Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>NPP (Nandrolone Phenylpropionate)</b> is a bulking steroid with faster action compared to Deca. It helps increase dense muscle mass, reduces joint pain, and causes less water retention.
        <br>• Half-life: (injected every other day)
        <br>• Starting dosage: 200–400 mg/week
        <br>• Results:Dense and smooth muscle appearance/ Reduces joint pain, improves joint lubrication/ Less water retention compared to Deca/ Good strength increase, suitable for bulk or recomp phases
        <br>• Side effects: Suppresses natural hormone production (must be used with Test)/ Risk of gyno due to prolactin
/ Cabergoline may be needed to control prolactin/ Some may experience water retention or high blood pressure
        <br>• PCT: Clomid or Nolvadex after finishing the cycle
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "EQ") {
    descTh = `
      <p>
         <b>EQ (Equipoise, Boldenone Undecylenate)</b> เป็นสเตียรอยด์สาย bulking ที่ออกฤทธิ์ช้า ช่วยเพิ่มกล้ามเนื้อ เพิ่มความอยากอาหาร เส้นเลือดเด่น กล้ามแน่น เหมาะทั้งใช้ช่วง bulk และ recomp
        <br>• ครึ่งชีวิต: ~14 วัน สัปดาห์ละ 1–2 ครั้ง
        <br>• โดสเริ่มต้น: 400–600 mg/สัปดาห์
        <br>• ผลลัพธ์: เพิ่มเส้นเลือดชัด/ อยากอาหารมากขึ้น
        <br>• ผลข้างเคียง: กดฮอร์โมนธรรมชาติ (ต้องใช้ควบกับ Test)/ เสี่ยงความดันสูง อาจมีสิว ผมร่วงเล็กน้อย
        <br>• ระยะออกฤทธิ์ยาว → ใช้เวลานานในการออกฤทธิ์และเคลียร์ออกจากร่างกาย
        <br>• PCT: Clomid / Nolvadex หลังจบ cycle
      </p>
    `;
    descEn = `
      <p>
         <b>EQ (Equipoise, Boldenone Undecylenate)</b> is a slow-acting bulking steroid that helps increase muscle mass, boost appetite, enhance vascularity, and improve muscle density. Suitable for both bulking and recomp phases.
        <br>• Half-life: ~14 days, injected 1–2 times per week
        <br>• Starting dosage: 400–600 mg/week
        <br>• Results: Enhanced vascularity/ Increased appetite
        <br>• Side effects: Suppresses natural hormones (must be used together with Test)/ Risk of high blood pressure, possible acne, and slight hair loss
        <br>• Long-acting → takes time to take effect and to clear from the body
        <br>• PCT: Clomid / Nolvadex after finishing the cycle
      </p>
    `;
  }
  else if (category === "Injection AAS" && sub === "Deca") {
    descTh = `
      <p>
         <b>Deca (Nandrolone Decanoate)</b> สาย bulking ลดอาการปวดข้อ เหมาะสำหรับช่วงเพิ่มน้ำหนักและกล้ามเนื้อระยะยาว
        <br>• ครึ่งชีวิต: ~7–10 วัน (ฉีดสัปดาห์ละ 1 ครั้ง)
        <br>• โดสเริ่มต้น: 200–400 mg/สัปดาห์
        <br>• ผลลัพธ์: เพิ่มมวลกล้ามเนื้ออย่างต่อเนื่อง/ ข้อลื่น ลดปวดข้อ บวมน้ำปานกลาง
        <br>• ผลข้างเคียง: กดการสร้างฮอร์โมนเพศชาย (ต้องใช้ Test ควบคู่)/ เสี่ยง prolactin สูง → Gyno / นกเขาไม่ขัน/ อาจบวมน้ำ ความดันสูง
        <br>• PCT: Clomid / Nolvadex หลังจบ cycle
        <br>• (ในบางรายอาจต้องใช้ Cabergoline ควบคุม prolactin)
      </p>
    `;
    descEn = `
      <p>
         <b>Deca (Nandrolone Decanoate)</b> is a bulking compound that helps reduce joint pain, suitable for long-term weight and muscle gain phases.
        <br>• Half-life: ~7–10 days (injected once per week)
        <br>• Starting dosage: 200–400 mg/week
        <br>• Results: Continuous increase in muscle mass/ Improved joint lubrication, reduced joint pain/ Moderate water retention
        <br>• Side effects: Suppresses natural testosterone production (must be used together with Test)/ Risk of high prolactin → gyno / erectile dysfunction/ Possible water retention and high blood pressure
        <br>• PCT: Clomid / Nolvadex after finishing the cycle
        <br>• (In some cases, Cabergoline may be needed to control prolactin)
      </p>
    `;
  }

  else if (category === "Injection AAS" && sub === "Injection etc") {
    descTh = `
      <p>
        <b>• Test U (Testosterone Undecanoate)</b> ออกฤทธิ์ยาวในร่างกาย
        <br><b>• TDT Rapid (Blend of Testosterone, Drostanolone, Trenbolone – short ester)</b> กล้ามเนื้อแข็ง ความหนาแน่น และลีนฟิสิกส์ในช่วง short ester (ออกฤทธิ์เร็ว)
        <br><b>• Kisseptin (Kisspeptin-10)</b> กระตุ้นระบบสืบพันธุ์ (HPTA axis) และการหลั่งฮอร์โมน LH/FSH ในบางงานวิจัย
        <br><b>• Oxytocin</b> เกี่ยวข้องกับอารมณ์เชิงผูกพัน การผ่อนคลาย และการควบคุมระบบประสาทอัตโนมัติ
        <br><b>• Tren-Test-Mast Long (Trenbolone / Testosterone / Drostanolone – long ester)</b> lean mass, density และ fullness
        <br><b>• Acro Trestolone (MENT)</b> สารสังเคราะห์ที่อยู่ในการศึกษาระบบฮอร์โมน Hypothalamic-Pituitary-Gonadal axis มีคุณสมบัติด้านฮอร์โมนเฉพาะทาง
        <br><b>• Pro Metribolone (MTR)</b> อนุพันธ์ของสารอนาโบลิกที่มีความแรงสูง ใช้ในการศึกษาเชิงชีวเคมีเกี่ยวกับ receptor binding ไม่ใช่ผลิตภัณฑ์สำหรับใช้ทั่วไป
        <br><b>• L-Carnitine</b> สารที่ร่างกายสร้างได้ตามธรรมชาติ เกี่ยวข้องกับกระบวนการขนส่งกรดไขมันเข้าไมโตคอนเดรีย เพื่อใช้เป็นพลังงาน
        <br><b>• L-Carnitine + CLA</b> ถูกพูดถึงในด้านการเผาผลาญไขมัน และองค์ประกอบร่างกาย (body composition)
      </p>
    `;
    descEn = `
      <p>
        <b>• Test U (Testosterone Undecanoate)</b> Long-acting testosterone ester in the body  
        <br><b>• TDT Rapid (Blend of Testosterone, Drostanolone, Trenbolone – short ester)</b> Provides hard, dense, and lean muscle in a fast-acting short ester format  
        <br><b>• Kisseptin (Kisspeptin-10)</b> Supports reproductive system (HPTA axis) and stimulates LH/FSH release in some studies  
        <br><b>• Oxytocin</b> Associated with bonding, relaxation, and autonomic nervous system regulation  
        <br><b>• Tren-Test-Mast Long (Trenbolone / Testosterone / Drostanolone – long ester)</b> Supports lean mass, density, and fullness  
        <br><b>• Acro Trestolone (MENT)</b> A synthetic compound studied for its effects on the Hypothalamic-Pituitary-Gonadal (HPG) axis, with specialized hormonal properties  
        <br><b>• Pro Metribolone (MTR)</b> A highly potent anabolic derivative used in biochemical research on receptor binding — not intended for general use  
        <br><b>• L-Carnitine</b> A naturally occurring substance involved in transporting fatty acids into mitochondria for energy use  
        <br><b>• L-Carnitine + CLA</b> Often discussed for its role in fat metabolism and body composition  
      </p>
    `;
  }


    
  else if (category === "SARMs" && sub === "MK677") {
    descTh = `
      <p>
         <b>MK-677 (Ibutamoren)</b> ไม่ใช่ SARM แต่เป็น Growth Hormone Secretagogue กระตุ้น GH และ IGF-1 เพิ่มมวลกล้าม ลดไขมัน หลับลึก ฟื้นตัวดี
        <br>• ครึ่งชีวิต ~24 ชม. กินวันละครั้ง
        <br>• โดส: 10–25 mg/วัน
        <br>• ผลลัพธ์: กล้ามเนื้อเต็มขึ้น ฟื้นตัวไว อยากอาหารหลุดโลก หลับลึก
        <br>• ผลข้างเคียง: บวมน้ำ มือชา น้ำตาลสูง ใช้ร่วมกับ HGH เสริมผลกันได้ดี
      </p>
    `;
    descEn = `
      <p>
         <b>MK-677 (Ibutamoren)</b> Not a SARM, but a Growth Hormone Secretagogue that stimulates GH and IGF-1, helping increase muscle mass, reduce body fat, improve deep sleep, and enhance recovery.
        <br>• Half-life: ~24 hours, taken once daily
        <br>• Dosage: 10–25 mg/day
        <br>• Results: Fuller muscles, faster recovery, extreme increase in appetite, deep sleep
        <br>• Side effects: Water retention, hand numbness, elevated blood sugar; can be used together with HGH for enhanced effect
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "RAD140") {
    descTh = `
      <p>
         <b>RAD-140 (Testolone)</b> SARM สายแรง เน้นเพิ่มกล้าม เพิ่มแรง เหมาะช่วง bulk หรือ recomp
        <br>• ครึ่งชีวิต ~16–20 ชม. กินวันละครั้ง
        <br>• โดส: 10–20 mg/วัน
        <br>• ผลลัพธ์: กล้ามหนา แรงพุ่ง กล้ามแน่นแบบไม่บวม
        <br>• ผลข้างเคียง: กด HPTA บ้าง, บางรายมีปวดหัวหรืออารมณ์แกว่ง
      </p>
    `;
    descEn = `
      <p>
         <b>RAD-140 (Testolone)</b> A powerful SARM focused on muscle gain and strength increase, suitable for bulking or recomp phases.
        <br>• Half-life: ~16–20 hours, taken once daily
        <br>• Dosage: 10–20 mg/day
        <br>• Results: Thick, dense muscle gains, noticeable strength boost, lean muscle without bloating
        <br>• Side effects: Mild HPTA suppression; some users may experience headaches or mood swings
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "GW501516") {
    descTh = `
      <p>
         <b>GW-501516 (Cardarine)</b> ไม่ใช่ SARM แต่เป็น PPARδ agonist เพิ่มความอึด เผาผลาญไขมัน ลดระดับไขมันในเลือด
        <br>• ครึ่งชีวิต ~16–24 ชม.
        <br>• โดส: 10–20 mg/วัน
        <br>• ผลลัพธ์: อึดขึ้น คาร์ดิโอได้นาน เผาผลาญดีเยี่ยม
        <br>• ผลข้างเคียง: ยังถกเถียงเรื่องความเสี่ยงระยะยาว (ในหนู), ไม่กด HPTA
      </p>
    `;
    descEn = `
      <p>
         <b>GW-501516 (Cardarine)</b> Not a SARM, but a PPARδ agonist that enhances endurance, increases fat metabolism, and helps reduce blood lipid levels.
        <br>• Half-life: ~16–24 hours
        <br>• Dosage: 10–20 mg/day
        <br>• Results: Improved endurance, longer cardio performance, excellent fat burning
        <br>• Side effects: Long-term risk is still debated (based on animal studies); does not suppress HPTA
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "MK2866") {
    descTh = `
      <p>
         <b>MK-2866 (Ostarine)</b> SARM สำหรับผู้เริ่มต้น เพิ่มกล้ามแบบลีน รักษากล้ามช่วงลดน้ำหนัก
        <br>• ครึ่งชีวิต ~24 ชม.
        <br>• โดส: 10–20 mg/วัน
        <br>• ผลลัพธ์: กล้ามเพิ่มเล็กน้อย กล้ามเนื้อแน่นขึ้น รักษามวลช่วง cutting
        <br>• ผลข้างเคียง: กด HPTA บ้างในโดสสูง, ผลข้างเคียงต่ำที่สุดในกลุ่ม
      </p>
    `;
    descEn = `
      <p>
         <b>MK-2866 (Ostarine)</b> A beginner-friendly SARM that promotes lean muscle gain and helps preserve muscle during weight loss.
        <br>• Half-life: ~24 hours
        <br>• Dosage: 10–20 mg/day
        <br>• Results: Slight muscle gain, increased muscle density, preserves muscle during cutting
        <br>• Side effects: Mild HPTA suppression at higher doses, lowest side effects among SARMs
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "YK11") {
    descTh = `
      <p>
         <b>YK-11</b> SARM กึ่งสารต้าน Myostatin ช่วยเพิ่มกล้ามแบบสุดโต เพิ่มความแข็งแรงสูง
        <br>• ครึ่งชีวิต ~6–10 ชม. (ควรแบ่งกิน 2 ครั้ง/วัน)
        <br>• โดส: 5–10 mg/วัน
        <br>• ผลลัพธ์: กล้ามแข็ง ใหญ่ แรงจัด เสริมผล anabolic อย่างแรง
        <br>• ผลข้างเคียง: กด HPTA, อาจมีผลต่อตับในบางราย (ใช้ liver support)
      </p>
    `;
    descEn = `
      <p>
         <b>YK-11</b> A SARM and partial myostatin inhibitor that promotes extreme muscle growth and significantly increases strength.
        <br>• Half-life: ~6–10 hours (should be split into 2 doses per day)
        <br>• Dosage: 5–10 mg/day
        <br>• Results: Hard, large, and very strong muscles; highly enhances anabolic effects
        <br>• Side effects: HPTA suppression; may affect the liver in some users (liver support recommended)
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "LGD4033") {
    descTh = `
      <p>
         <b>LGD-4033 (Ligandrol)</b> SARM สาย bulk กล้ามมาเร็ว มวลแน่น ใช้แทน Test ได้ในบาง stack
        <br>• ครึ่งชีวิต ~24–36 ชม.
        <br>• โดส: 5–10 mg/วัน
        <br>• ผลลัพธ์: กล้ามใหญ่เร็ว น้ำหนักขึ้นแน่น
        <br>• ผลข้างเคียง: กด HPTA ชัดเจนในโดสสูง อาจบวมน้ำเล็กน้อย
      </p>
    `;
    descEn = `
      <p>
         <b>LGD-4033 (Ligandrol)</b> A bulking-oriented SARM that delivers fast muscle gain and dense mass, and can be used as a substitute for Test in certain stacks.
        <br>• Half-life: ~24–36 hours
        <br>• Dosage: 5–10 mg/day
        <br>• Results: Rapid muscle growth, noticeable weight gain with solid mass
        <br>• Side effects: Significant HPTA suppression at higher doses, possible slight water retention
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "S4") {
    descTh = `
      <p>
         <b>S4 (Andarine)</b> SARM สายรีคอมป์/คัท ช่วยให้กล้ามคม แน่น ลดไขมัน เส้นเลือดชัด
        <br>• ครึ่งชีวิต ~4–6 ชม. (ควรแบ่งกิน 2 ครั้ง/วัน)
        <br>• โดส: 25–50 mg/วัน
        <br>• ผลลัพธ์: กล้ามเนื้อแน่น คม ชัด
        <br>• ผลข้างเคียง: “Night vision tint” มองเห็นเหลืองหรือแสงพร่าตอนกลางคืนในบางคน
      </p>
    `;
    descEn = `
      <p>
         <b>S4 (Andarine)</b> A recomp/cutting SARM that helps enhance muscle definition, hardness, fat loss, and vascularity.
        <br>• Half-life: ~4–6 hours (should be split into 2 doses per day)
        <br>• Dosage: 25–50 mg/day
        <br>• Results: Hard, sharp, and defined muscle appearance
        <br>• Side effect: “Night vision tint” — some users may experience yellow vision or blurred night vision
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "AC262") {
    descTh = `
      <p>
         <b>AC262</b> Partial AR agonist (~40% ของเทส) ออกฤทธิ์บางส่วน เพิ่ม Lean mass ปานกลาง กด HPTA น้อย ไม่ต้อง PCT
      </p>
    `;
    descEn = `
      <p>
         <b>AC262</b> Partial AR agonist (~40% of testosterone) with partial activity. Provides moderate lean mass gains, causes minimal HPTA suppression, and typically does not require PCT.
      </p>
    `;
  }
  else if (category === "SARMs" && sub === "SARMs etc") {
    descTh = `
      <p>
         <b>• S23</b> Full AR agonist จับแน่น ฟูเร็ว แน่นเร็ว กัก glycogen สูง ดันแรงขับทางเพศแรง
         <br><b>• SR-9009</b> การเผาผลาญพลังงานระดับเซลล์ เพิ่มความทนทาน และการทำงานของไมโตคอนเดรีย
      </p>
    `;
    descEn = `
      <p>
         <b>• S23</b> Full AR agonist with strong binding, rapid fullness and muscle density, high glycogen retention, and strong enhancement of libido  
         <br><b>• SR-9009</b> Enhances cellular energy metabolism, increases endurance, and improves mitochondrial function  
      </p>
    `;
  }
    
  else if (category === "HGHPeptide" && sub === "HGH") {
    descTh = `
      <p>
         <b>HGH (Human Growth Hormone)</b> ฮอร์โมนเร่งการเจริญเติบโต ช่วยเพิ่มมวลกล้าม ลดไขมัน ฟื้นฟูร่างกาย ซ่อมแซมข้อ เอ็น กระดูก นิยมใช้ทั้งในช่วง cutting และ recomp
        <br>• ครึ่งชีวิตสั้น (~15–30 นาที)
        <br>• โดส: 2–4 IU/วัน (ทั่วไป), 4–6 IU/วัน (สายฟิตเนสจริงจัง), ฉีดตอนเช้าท้องว่างหรือตอนก่อนนอน
        <br>• ผลลัพธ์: ลดไขมัน เพิ่มกล้ามลีน ฟื้นตัวเร็ว ผิวดี หลับลึก
        <br>• ผลข้างเคียง: บวมน้ำ มือชา ปวดข้อ น้ำตาลในเลือดสูง เสี่ยงภาวะดื้อต่ออินซูลิน
        <br>• เริ่มเห็นผลชัดหลังใช้อย่างต่อเนื่อง 8–12 สัปดาห์ขึ้นไป
        <br>• มักใช้ร่วมกับตัวอื่นๆ เพื่อเสริมผลลัพธ์
      </p>
    `;
    descEn = `
      <p>
         <b>HGH (Human Growth Hormone)</b> A growth hormone that helps increase muscle mass, reduce body fat, support physical recovery, and repair joints, tendons, and bones. Commonly used during both cutting and recomp phases.
        <br>• Half-life: short (~15–30 minutes)
        <br>• Dosage: 2–4 IU/day (general), 4–6 IU/day (serious fitness users), injected in the morning on an empty stomach or before bed
        <br>• Results: Fat reduction, lean muscle gain, fast recovery, improved skin, deep sleep
        <br>• Side effects: Water retention, hand numbness, joint pain, high blood sugar, potential insulin resistance
        <br>• Visible results typically appear after continuous use for 8–12 weeks or longer
        <br>• Often used in combination with other compounds to enhance results
      </p>
    `;
  }
  else if (category === "HGHPeptide" && sub === "IGF1") {
    descTh = `
      <p>
         <b>IGF-1 (Insulin-like Growth Factor-1)</b> ฮอร์โมนที่เกิดจาก HGH ช่วยเพิ่มการเจริญเติบโตของกล้ามเนื้อ และฟื้นฟูเซลล์ระดับลึก ใช้ได้lean,bulk หรือ recomp
        <br>• รูปแบบที่ใช้: IGF-1 LR3 (ออกฤทธิ์ยาว), IGF-1 DES (ใช้เฉพาะจุด)
        <br>• ครึ่งชีวิต: LR3 ~20–30 ชม. / DES ~30 นาที
        <br>• โดส: 20–40 mcg/วัน ฉีดเข้าเฉพาะจุดหลังเวท
        <br>• ผลลัพธ์: เพิ่มกล้ามลีน ฟื้นฟูเร็ว เส้นเลือดชัด
        <br>• ผลข้างเคียง: น้ำตาลตก (ควรกินคาร์บหลังฉีด)มือชา
        <br>• นิยมใช้ร่วมกับ HGH, insulin, หรือเปปไทด์อื่น เพื่อเพิ่มการดูดซึมและการเติบโต
        <br>• ไม่แนะนำใช้เกิน 4–6 สัปดาห์/รอบ
      </p>
    `;
    descEn = `
      <p>
         <b>IGF-1 (Insulin-like Growth Factor-1)</b> A hormone produced from HGH that promotes muscle growth and deep cellular repair. Can be used for lean, bulk, or recomp phases.
        <br>• Forms used: IGF-1 LR3 (long-acting)/ IGF-1 DES (localized use)
        <br>• Half-life: LR3: ~20–30 hours/ DES: ~30 minutes
        <br>• Dosage: 20–40 mcg/day, injected locally after weight training
        <br>• Results: Lean muscle increase, fast recovery, enhanced vascularity
        <br>• Side effects: Low blood sugar (should consume carbs after injection), hand numbness
        <br>• Commonly used together with HGH, insulin, or other peptides to enhance absorption and growth.
        <br>• Not recommended to use for more than 4–6 weeks per cycle.
      </p>
    `;
  }
  else if (category === "HGHPeptide" && sub === "HCG") {
    descTh = `
      <p>
         <b>HCG (Human Chorionic Gonadotropin)</b> ฮอร์โมนเลียนแบบ LH กระตุ้นการผลิตเทสโทสเตอโรนจากไข่ ใช้ป้องกันการฝ่อลีบของไข่ระหว่างใช้สารกด HPTA
        <br>• ครึ่งชีวิต ~24–36 ชม.
        <br>• โดส: 250–500 IU 2–3 ครั้ง/สัปดาห์ (ระหว่าง cycle), หรือ 500–1000 IU/วัน (หลังจบ cycle ก่อนเริ่ม PCT)
        <br>• ผลลัพธ์: รักษาปริมาณน้ำไข่ ป้องกันไข่ฝ่อ ฟื้นฟูระบบสืบพันธุ์
        <br>• ผลข้างเคียง: Estrogen สูงขึ้น (อาจต้องใช้ AI), สิว, อารมณ์แปรปรวน
        <br>• ไม่ควรใช้โดสสูงเกินไปต่อเนื่อง เสี่ยง desensitization
        <br>• นิยมใช้ร่วมกับ Clomid/Nolva ในช่วง PCT
      </p>
    `;
    descEn = `
      <p>
         <b>HCG (Human Chorionic Gonadotropin)</b> A hormone that mimics LH, stimulating testosterone production from the testes. Used to prevent testicular atrophy during the use of HPTA-suppressing compounds.
        <br>• Half-life: ~24–36 hours
        <br>• Dosage: 250–500 IU, 2–3 times per week (during cycle), or 500–1000 IU/day (after cycle before starting PCT)
        <br>• Results: Maintains testicular volume, prevents testicular shrinkage, helps restore reproductive function
        <br>• Side effects: Increased estrogen (may require AI), acne, mood swings
        <br>• Should not be used at high doses continuously due to desensitization risk
        <br>• Commonly used together with Clomid/Nolva during PCT
      </p>
    `;
  }
  else if (category === "HGHPeptide" && sub === "TB500/BPC157") {
    descTh = `
      <p>
         <b>TB-500 (Thymosin Beta-4)</b> เปปไทด์ฟื้นฟูระดับลึก ช่วยซ่อมแซมกล้ามเนื้อ เอ็น และข้อต่อ เพิ่มความยืดหยุ่น ลดอักเสบ ฟื้นตัวเร็ว
        <br>• ครึ่งชีวิต ~2–3 วัน
        <br>• โดส: 2–5 mg/สัปดาห์ แบ่งฉีด 2–3 ครั้ง/สัปดาห์ (ช่วงโหลด 4–6 สัปดาห์ แล้วลดเป็นบำรุง)
        <br>• ผลลัพธ์: ลดอักเสบ ฟื้นตัวไว เหมาะใช้หลังบาดเจ็บ ฟื้นจาก overtraining
        <br>• ผลข้างเคียง: น้อยมาก อาจบวมน้ำเล็กน้อยบริเวณที่ฉีด
        <br>• นิยมใช้ร่วมกับ BPC-157 เพื่อเสริมฤทธิ์ฟื้นฟูทั่วร่าง
        <br>• ฉีดเข้าชั้นไขมันหรือเข้ากล้ามก็ได้
        <br>
         <b>BPC-157 (Body Protection Compound)</b> เปปไทด์ฟื้นฟูเนื้อเยื่อโดยเฉพาะระบบทางเดินอาหาร เอ็น ข้อต่อ กล้ามเนื้อ ใช้เฉพาะจุดได้
        <br>• ครึ่งชีวิตสั้น (~4–6 ชม.) แต่มีฤทธิ์ต่อเนื่อง
        <br>• โดส: 200–500 mcg/วัน ฉีดเฉพาะจุดทุกวัน (5–7 วัน/สัปดาห์)
        <br>• ผลลัพธ์: ซ่อมแซมแผลในกระเพาะ, เอ็น, ข้อต่อ, ลดอักเสบเฉพาะจุด
        <br>• ผลข้างเคียง: ปลอดภัยสูง ยังไม่มีผลข้างเคียงรุนแรงที่พบ
        <br>• นิยมใช้คู่กับ TB-500 สำหรับการฟื้นฟูแบบเต็มระบบ
        <br>• ฉีดเฉพาะจุด หรือฉีดใต้ผิวหนังรอบ ๆ บริเวณบาดเจ็บ
      </p>
    `;
    descEn = `
      <p>
         <b>TB-500 (Thymosin Beta-4)</b> A deep-recovery peptide that helps repair muscle, tendons, and joints, improves flexibility, reduces inflammation, and speeds up recovery.
        <br>• Half-life: ~2–3 days
        <br>• Dosage: 2–5 mg/week, split into 2–3 injections per week (loading phase 4–6 weeks, then reduced for maintenance)
        <br>• Results: Reduced inflammation, faster recovery, suitable for post-injury or recovery from overtraining
        <br>• Side effects: Very minimal, may cause slight water retention at the injection site
        <br>• Commonly used together with BPC-157 to enhance overall recovery
        <br>• Can be injected subcutaneously or intramuscularly
        <br>
         <b>BPC-157 (Body Protection Compound)</b> A peptide that promotes tissue repair, especially in the digestive system, tendons, joints, and muscles. Can be used locally.
        <br>• Half-life: short (~4–6 hours) but has lasting effects
        <br>• Dosage: 200–500 mcg/day, injected locally every day (5–7 days per week)
        <br>• Results: Repairs stomach ulcers, tendons, joints, and reduces localized inflammation
        <br>• Side effects: Very high safety profile; no severe side effects reported
        <br>• Commonly used alongside TB-500 for full-system recovery
        <br>• Can be injected locally or subcutaneously around the injured area
      </p>
    `;
  }

  else if (category === "HGHPeptide" && sub === "Peptide etc") {
    descTh = `
      <p>
        <b>• PT-141</b> สารในกลุ่มเปปไทด์ที่ถูกศึกษาเกี่ยวกับระบบประสาทและความต้องการทางเพศ (libido) โดยไม่ได้ออกฤทธิ์ผ่านระบบฮอร์โมนเทสโทสเทอโรนโดยตรง
        <br><b>• GHRP-6</b> เป็นเปปไทด์กลุ่มกระตุ้น Growth Hormone Release (GHRP) ที่ถูกศึกษาในด้านการฟื้นฟูกล้ามเนื้อ การนอนหลับ และการเจริญเติบโตของเนื้อเยื่อ
        <br><b>• PEG-MGF</b> สารในกลุ่ม MGF (Mechano Growth Factor) ที่ถูกศึกษาเกี่ยวกับการฟื้นฟูกล้ามเนื้อหลังออกแรง หรือกล้ามเนื้อที่มีภาวะบาดเจ็บ
        <br><b>• GHK-CU</b> เปปไทด์ที่จับกับทองแดง (Copper Peptide) มีข้อมูลวิจัยเกี่ยวกับ การฟื้นฟูผิว กระตุ้นคอลลาเจน ซ่อมแซมแผล และการฟื้นฟูเนื้อเยื่อ
        <br><b>• Salank / Semax / PE-22-28</b> ลดความเครียด / ปรับสมดุลสารสื่อประสาท
        <br><b>• DSIP</b> การนอนหลับ / ลดการตื่นกลางดึก
        <br><b>• Tesamorelin / CJC-1295</b> กระตุ้น GH / เพิ่มกล้ามเนื้อ
        <br><b>• MOST-C</b> ฟื้นฟูร่างกาย / ลดการอักเสบ
        <br><b>• SS-31 / 8–10 / Humanin</b> ป้องกันโดพามีนลดลง
        <br><b>• KPV</b> ลดอักเสบทั่วไป
        <br><b>• KLOW</b> ฟื้นฟูกล้ามเนื้อ / ลดการอักเสบ / กระตุ้นคอลลาเจน / ฟื้นฟูผิว
      </p>
    `;
    descEn = `
      <p>
        <b>• PT-141</b> A peptide compound studied for its effects on the nervous system and sexual desire (libido), without acting directly through the testosterone hormone pathway  
        <br><b>• GHRP-6</b> A peptide in the Growth Hormone Releasing Peptide (GHRP) group, studied for muscle recovery, sleep improvement, and tissue growth  
        <br><b>• PEG-MGF</b> A compound in the MGF (Mechano Growth Factor) group, researched for post-exercise muscle repair and recovery of injured muscle tissue  
        <br><b>• GHK-CU</b> A copper-binding peptide (Copper Peptide) studied for skin rejuvenation, collagen stimulation, wound healing, and tissue regeneration  
        <br><b>• Salank / Semax / PE-22-28</b> Studied for stress reduction and neurotransmitter balance  
        <br><b>• DSIP</b> Studied for improving sleep quality and reducing nighttime awakenings  
        <br><b>• Tesamorelin / CJC-1295</b> Studied for GH stimulation and support in muscle development  
        <br><b>• MOST-C</b> Studied for body recovery and inflammation reduction  
        <br><b>• SS-31 / 8–10 / Humanin</b> Studied for protection against dopamine depletion  
        <br><b>• KPV</b> Studied for general anti-inflammatory properties  
        <br><b>• KLOW</b> Studied for muscle recovery, anti-inflammatory support, collagen stimulation, and skin regeneration  

      </p>
    `;
  }

    


  else if (category === "PCT" && sub === "Arimidex") {
    descTh = `
      <p>
         <b>Arimidex (Anastrozole)</b> การฟื้นฟูฮอร์โมนหลังไซเคิ้ลหลังการใช้ยา (PCT) อาจเป็นประเด็นที่สำคัญที่สุดของการใช้สเตียรอยด์อนาโบลิก เนื่องด้วยมันไปกระตุ้นวงจรป้อนกลับเชิงลบในแกนไฮโปทาลามัส- ต่อมใต้สมอง-อัณฑะ (HPTA) ของร่างกาย ส่งผลให้การผลิตฮอร์โมน Test ในร่างกายถูกระงับหรือหยุดลง
        <br>
        <br>ด้วยการฟื้นฟู HPTA อย่างถูกต้องและมีประสิทธิภาพ ไม่เพียงแต่จะเลิกใช้สเตียรอยด์ในขณะที่ยังคงกล้ามเนื้อไว้ได้เกือบทั้งหมดเท่านั้น แต่ยังเพิ่มโอกาสที่จะเลิกใช้โดยมีระบบต่อมไร้ท่อที่ทำงานได้อย่างเต็มที่และ HPTA ที่มีสุขภาพดีเป็นมากกว่า 90% อีกด้วย


      </p>
    `;
    descEn = `
      <p>
         <b>Arimidex (Anastrozole)</b> Post Cycle Therapy (PCT) after using anabolic steroids may be the most important aspect of steroid usage. This is because steroids activate a negative feedback loop in the hypothalamus–pituitary–testicular axis (HPTA), which suppresses or even shuts down the body's natural testosterone production.
        <br>
        <br>With proper and effective HPTA recovery, not only can you discontinue steroid use while maintaining almost all of your muscle mass, but you also significantly increase the chances of stopping with a fully functioning endocrine system and a healthy HPTA—at more than 90% efficiency.
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Aromasin") {
    descTh = `
      <p>
         <b>Aromasin</b> การฟื้นฟูฮอร์โมนหลังไซเคิ้ลหลังการใช้ยา (PCT) อาจเป็นประเด็นที่สำคัญที่สุดของการใช้สเตียรอยด์อนาโบลิก เนื่องด้วยมันไปกระตุ้นวงจรป้อนกลับเชิงลบในแกนไฮโปทาลามัส- ต่อมใต้สมอง-อัณฑะ (HPTA) ของร่างกาย ส่งผลให้การผลิตฮอร์โมน Test ในร่างกายถูกระงับหรือหยุดลง
        <br>
        <br>ด้วยการฟื้นฟู HPTA อย่างถูกต้องและมีประสิทธิภาพ ไม่เพียงแต่จะเลิกใช้สเตียรอยด์ในขณะที่ยังคงกล้ามเนื้อไว้ได้เกือบทั้งหมดเท่านั้น แต่ยังเพิ่มโอกาสที่จะเลิกใช้โดยมีระบบต่อมไร้ท่อที่ทำงานได้อย่างเต็มที่และ HPTA ที่มีสุขภาพดีเป็นมากกว่า 90% อีกด้วย


      </p>
    `;
    descEn = `
      <p>
         <b>Aromasin</b> Post Cycle Therapy (PCT) after using anabolic steroids may be the most important aspect of steroid usage. This is because steroids activate a negative feedback loop in the hypothalamus–pituitary–testicular axis (HPTA), which suppresses or even shuts down the body's natural testosterone production.
        <br>
        <br>With proper and effective HPTA recovery, not only can you discontinue steroid use while maintaining almost all of your muscle mass, but you also significantly increase the chances of stopping with a fully functioning endocrine system and a healthy HPTA—at more than 90% efficiency.
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Caber") {
    descTh = `
      <p>
         <b>Caber</b> การฟื้นฟูฮอร์โมนหลังไซเคิ้ลหลังการใช้ยา (PCT) อาจเป็นประเด็นที่สำคัญที่สุดของการใช้สเตียรอยด์อนาโบลิก เนื่องด้วยมันไปกระตุ้นวงจรป้อนกลับเชิงลบในแกนไฮโปทาลามัส- ต่อมใต้สมอง-อัณฑะ (HPTA) ของร่างกาย ส่งผลให้การผลิตฮอร์โมน Test ในร่างกายถูกระงับหรือหยุดลง
        <br>
        <br>ด้วยการฟื้นฟู HPTA อย่างถูกต้องและมีประสิทธิภาพ ไม่เพียงแต่จะเลิกใช้สเตียรอยด์ในขณะที่ยังคงกล้ามเนื้อไว้ได้เกือบทั้งหมดเท่านั้น แต่ยังเพิ่มโอกาสที่จะเลิกใช้โดยมีระบบต่อมไร้ท่อที่ทำงานได้อย่างเต็มที่และ HPTA ที่มีสุขภาพดีเป็นมากกว่า 90% อีกด้วย


      </p>
    `;
    descEn = `
      <p>
         <b>Caber</b> Post Cycle Therapy (PCT) after using anabolic steroids may be the most important aspect of steroid usage. This is because steroids activate a negative feedback loop in the hypothalamus–pituitary–testicular axis (HPTA), which suppresses or even shuts down the body's natural testosterone production.
        <br>
        <br>With proper and effective HPTA recovery, not only can you discontinue steroid use while maintaining almost all of your muscle mass, but you also significantly increase the chances of stopping with a fully functioning endocrine system and a healthy HPTA—at more than 90% efficiency.
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Nolvadex") {
    descTh = `
      <p>
         <b>Nolvadex (Tamoxifen Citrate)</b> ประเภท: SERM
        <br>• ครึ่งชีวิต: ~5–7 วัน
        <br>• โดสเริ่มต้น: 10–20 mg/วัน
        <br>• ผลลัพธ์: ป้องกัน Gyno โดยการบล็อกตัวรับ Estrogen ที่หน้าอก/ ใช้ใน PCT เพื่อกระตุ้น HPTA ให้ฟื้นตัว/ ไม่ลดระดับ Estrogen โดยรวมในร่างกาย
        <br>• ผลข้างเคียง: ปวดหัว คลื่นไส้ อารมณ์แปรปรวน/ เสี่ยงตับหากใช้ระยะยาว
        <br>• เหมาะใช้เมื่อ: ป้องกัน Gyno หรือในช่วง PCT
      </p>
    `;
    descEn = `
      <p>
         <b>Nolvadex (Tamoxifen Citrate)</b> Type: SERM
        <br>• Half-life: ~5–7 days
        <br>• Starting dosage: 10–20 mg/day
        <br>• Benefits: Prevents gyno by blocking estrogen receptors in the chest area/ Used in PCT to stimulate HPTA recovery/ Does not reduce overall estrogen levels in the body
        <br>• Side effects: Headache, nausea, mood swings/ Liver risk if used long-term
        <br>• Suitable for use when: Preventing gyno or during PCT
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Femara") {
    descTh = `
      <p>
         <b>Femara (Letrozole)</b> ประเภท: AI (Aromatase Inhibitor)
        <br>• ครึ่งชีวิต: ~2 วัน
        <br>• โดสเริ่มต้น: 0.25–0.5 mg วันเว้นวัน (หรือ 2-3 ครั้ง/สัปดาห์)
        <br>• ผลลัพธ์: ลดระดับ Estrogen อย่างรุนแรง/ ป้องกัน Gyno (นมผู้ชาย)/ ลดการบวมน้ำจาก Estrogen/ เพิ่มความแห้งของกล้ามเนื้อ
        <br>• ผลข้างเคียง: Estrogen ต่ำเกิน → ปวดข้อ, อารมณ์แปรปรวน, ความใคร่ลด/ เสี่ยงการลด HDL (ไขมันดี)
        <br>• เหมาะใช้เมื่อ: ใช้ steroid ที่ aromatize หนัก (เช่น Dbol, Test สูง ๆ)
      </p>
    `;
    descEn = `
      <p>
         <b>Femara (Letrozole)</b> Type: AI (Aromatase Inhibitor)
        <br>• Half-life: ~2 days
        <br>• Starting dosage: 0.25–0.5 mg every other day (or 2–3 times per week)
        <br>• Benefits: Strong reduction of estrogen levels/ Prevents gyno (male breast enlargement)/ Reduces estrogen-related water retention/ Increases muscle dryness
        <br>• Side effects: Very low estrogen → joint pain, mood swings, decreased libido/ Risk of reducing HDL (good cholesterol)
        <br>• Suitable for use when: Using heavily aromatizing steroids (such as high-dose Test or Dianabol)
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Clomid") {
    descTh = `
      <p>
         <b>Clomid</b> การฟื้นฟูฮอร์โมนหลังไซเคิ้ลหลังการใช้ยา (PCT) อาจเป็นประเด็นที่สำคัญที่สุดของการใช้สเตียรอยด์อนาโบลิก เนื่องด้วยมันไปกระตุ้นวงจรป้อนกลับเชิงลบในแกนไฮโปทาลามัส- ต่อมใต้สมอง-อัณฑะ (HPTA) ของร่างกาย ส่งผลให้การผลิตฮอร์โมน Test ในร่างกายถูกระงับหรือหยุดลง
        <br>
        <br>ด้วยการฟื้นฟู HPTA อย่างถูกต้องและมีประสิทธิภาพ ไม่เพียงแต่จะเลิกใช้สเตียรอยด์ในขณะที่ยังคงกล้ามเนื้อไว้ได้เกือบทั้งหมดเท่านั้น แต่ยังเพิ่มโอกาสที่จะเลิกใช้โดยมีระบบต่อมไร้ท่อที่ทำงานได้อย่างเต็มที่และ HPTA ที่มีสุขภาพดีเป็นมากกว่า 90% อีกด้วย


      </p>
    `;
    descEn = `
      <p>
         <b>Clomid</b> Post Cycle Therapy (PCT) after using anabolic steroids may be the most important aspect of steroid usage. This is because steroids activate a negative feedback loop in the hypothalamus–pituitary–testicular axis (HPTA), which suppresses or even shuts down the body's natural testosterone production.
        <br>
        <br>With proper and effective HPTA recovery, not only can you discontinue steroid use while maintaining almost all of your muscle mass, but you also significantly increase the chances of stopping with a fully functioning endocrine system and a healthy HPTA—at more than 90% efficiency.
      </p>
    `;
  }
  else if (category === "PCT" && sub === "Proviron") {
    descTh = `
      <p>
         <b>Proviron (Mesterolone)</b> DHT ที่ไม่สามารถแปลงเป็น estrogen ใช้เพิ่มความแข็งแรงของกล้ามเนื้อ ลดการกักน้ำ และช่วยเพิ่มความใคร่ เหมาะใช้ช่วง cutting หรือ PCT
        <br>• ครึ่งชีวิต ~12 ชั่วโมง กินวันละ 2 ครั้ง
        <br>• โดส: 25–75 mg/วัน
        <br>• ผลลัพธ์: เพิ่มความแข็งแรง กล้ามเนื้อแน่นขึ้น เส้นเลือดชัด ลดอาการบวมน้ำ ช่วยรักษาระดับเทสโทสเตอโรนขณะใช้สเตียรอยด์อื่น
        <br>• ผลข้างเคียง: อาจมีผลต่อตับเล็กน้อย กด HPTA เล็กน้อย แต่ไม่แรงเหมือนสเตียรอยด์อื่น
        <br>• มักใช้ร่วมกับ Test หรือใน PCT เพื่อช่วยฟื้นฟูระบบฮอร์โมน
        <br>• ไม่แนะนำใช้เดี่ยวเป็นระยะยาว
      </p>
    `;
    descEn = `
      <p>
         <b>Proviron (Mesterolone)</b> is a DHT-based compound that cannot convert to estrogen. It is used to increase muscle hardness, reduce water retention, and enhance libido. Suitable for cutting phases or during PCT.
        <br>• Half-life: ~12 hours, taken twice daily.
        <br>• Dosage: 25–75 mg/day.
        <br>• Results: Increases strength/ Enhances muscle density and vascularity/ Reduces water retention/ Helps maintain testosterone levels while using other steroids
        <br>• Side effects: Mild impact on the liver/ Slight HPTA suppression, but weaker compared to most other steroids
        <br>• Usage notes: Commonly used with Test or during PCT to support hormone recovery.
        <br>• Not recommended as a long-term standalone use.
      </p>
    `;
  }
  else if (category === "PCT" && sub === "HCG") {
    descTh = `
      <p>
         <b>HCG (Human Chorionic Gonadotropin)</b> ฮอร์โมนเลียนแบบ LH กระตุ้นการผลิตเทสโทสเตอโรนจากไข่ ใช้ป้องกันการฝ่อลีบของไข่ระหว่างใช้สารกด HPTA
        <br>• ครึ่งชีวิต ~24–36 ชม.
        <br>• โดส: 250–500 IU 2–3 ครั้ง/สัปดาห์ (ระหว่าง cycle), หรือ 500–1000 IU/วัน (หลังจบ cycle ก่อนเริ่ม PCT)
        <br>• ผลลัพธ์: รักษาปริมาณน้ำไข่ ป้องกันไข่ฝ่อ ฟื้นฟูระบบสืบพันธุ์
        <br>• ผลข้างเคียง: Estrogen สูงขึ้น (อาจต้องใช้ AI), สิว, อารมณ์แปรปรวน
        <br>• ไม่ควรใช้โดสสูงเกินไปต่อเนื่อง เสี่ยง desensitization
        <br>• นิยมใช้ร่วมกับ Clomid/Nolva ในช่วง PCT
      </p>
    `;
    descEn = `
      <p>
         <b>HCG (Human Chorionic Gonadotropin)</b> A hormone that mimics LH, stimulating testosterone production from the testes. Used to prevent testicular atrophy during the use of HPTA-suppressing compounds.
        <br>• Half-life: ~24–36 hours
        <br>• Dosage: 250–500 IU, 2–3 times per week (during cycle), or 500–1000 IU/day (after cycle before starting PCT)
        <br>• Results: Maintains testicular volume, prevents testicular shrinkage, helps restore reproductive function
        <br>• Side effects: Increased estrogen (may require AI), acne, mood swings
        <br>• Should not be used at high doses continuously due to desensitization risk
        <br>• Commonly used together with Clomid/Nolva during PCT
      </p>
    `;
  }


  else if (category === "FatBurnWeight-loss" && sub === "Clen") {
    descTh = `
      <p>
         <b>Clenbuterol</b> ไม่ใช่สเตียรอยด์ แต่เป็น Beta-2 agonist ใช้เร่งการเผาผลาญ ลดไขมัน รักษามวลกล้าม เหมาะกับช่วง cutting
        <br>• ครึ่งชีวิต ~36 ชม. วันละ 1 ครั้งตอนเช้า
        <br>• โดส: เริ่มที่ 20 mcg/วัน เพิ่มทีละ 20 mcg ทุก 2–3 วัน (สูงสุด ~120–140 mcg/วัน)
        <br>• ผลลัพธ์: เผาผลาญเพิ่ม ความร้อนในร่างกายสูงขึ้น กล้ามชัดขึ้น
        <br>• ผลข้างเคียง: ใจสั่น มือสั่น นอนไม่หลับ ปวดหัว ความดันสูง ตับเต้นแรง อาจดื้อยาเร็ว
        <br>• นิยมใช้แบบ 2 สัปดาห์ on / 2 สัปดาห์ off หรือเพิ่มโดสแบบ step-up 4–6 สัปดาห์
        <br>• แนะนำใช้ร่วมกับ taurine + potassium ป้องกันตะคริว
      </p>
    `;
    descEn = `
      <p>
         <b>Clenbuterol</b> Not a steroid, but a Beta-2 agonist used to boost metabolism, burn fat, and preserve muscle mass. Ideal for cutting phases.
        <br>• Half-life: ~36 hours, taken once daily in the morning.
        <br>• Dosage: Start at 20 mcg/day, increase by 20 mcg every 2–3 days (maximum ~120–140 mcg/day).
        <br>• Results: Increased metabolism, elevated body temperature, improved muscle definition.
        <br>• Side effects: Rapid heartbeat, trembling hands, insomnia, headache, high blood pressure, heart palpitations, may develop tolerance quickly.
        <br>• Common usage: 2 weeks on / 2 weeks off, or step-up dosing for 4–6 weeks.
        <br>• Recommended to use alongside taurine and potassium to prevent cramps.
      </p>
    `;
  }
  else if (category === "FatBurnWeight-loss" && sub === "T3") {
    descTh = `
      <p>
         <b>T3 (Liothyronine Sodium)</b> ฮอร์โมนไทรอยด์สังเคราะห์ ช่วยเร่งการเผาผลาญ ใช้ลดไขมันอย่างแรง เหมาะช่วง cutting
        <br>• ครึ่งชีวิต ~1 วัน กินวันละครั้งตอนเช้า
        <br>• โดส: เริ่มที่ 25 mcg/วัน เพิ่มทีละ 12.5–25 mcg ทุก 3–5 วัน (สูงสุด ~75–100 mcg/วัน)
        <br>• ผลลัพธ์: เผาผลาญพุ่ง น้ำหนักลงไว กล้ามชัด
        <br>• ผลข้างเคียง: กล้ามอาจสลายถ้าใช้โดสสูงเกินหรือไม่มีกลุ่ม anabolic พ่วง ใจสั่น เหงื่อออก หงุดหงิด มือสั่น นอนไม่หลับ
        <br>• นิยมใช้แบบ taper up & taper down เพื่อป้องกัน thyroid shutdown
        <br>• ไม่แนะนำใช้เกิน 6–8 สัปดาห์ต่อเนื่อง
      </p>
    `;
    descEn = `
      <p>
         <b>T3 (Liothyronine Sodium)</b> A synthetic thyroid hormone that boosts metabolism, used for aggressive fat loss. Suitable for cutting phases.
        <br>• Half-life: ~1 day, taken once daily in the morning.
        <br>• Dosage: Start at 25 mcg/day, increase by 12.5–25 mcg every 3–5 days (maximum ~75–100 mcg/day).
        <br>• Results: Rapid metabolism increase, fast weight loss, improved muscle definition.
        <br>• Side effects: Muscle loss may occur if used at high doses or without anabolic support, heart palpitations, sweating, irritability, hand tremors, insomnia.
        <br>• Commonly used with taper up & taper down method to prevent thyroid shutdown.
        <br>• Not recommended for continuous use beyond 6–8 weeks.
      </p>
    `;
  }
  else if (category === "FatBurnWeight-loss" && sub === "GW501516") {
    descTh = `
      <p>
         <b>GW-501516 (Cardarine)</b> ไม่ใช่ SARM แต่เป็น PPARδ agonist เพิ่มความอึด เผาผลาญไขมัน ลดระดับไขมันในเลือด
        <br>• ครึ่งชีวิต ~16–24 ชม.
        <br>• โดส: 10–20 mg/วัน
        <br>• ผลลัพธ์: อึดขึ้น คาร์ดิโอได้นาน เผาผลาญดีเยี่ยม
        <br>• ผลข้างเคียง: ยังถกเถียงเรื่องความเสี่ยงระยะยาว (ในหนู), ไม่กด HPTA
      </p>
    `;
    descEn = `
      <p>
         <b>GW-501516 (Cardarine)</b> Not a SARM, but a PPARδ agonist that enhances endurance, increases fat metabolism, and helps reduce blood lipid levels.
        <br>• Half-life: ~16–24 hours
        <br>• Dosage: 10–20 mg/day
        <br>• Results: Improved endurance, longer cardio performance, excellent fat burning
        <br>• Side effects: Long-term risk is still debated (based on animal studies); does not suppress HPTA
      </p>
    `;
  }
 
  else if (category === "FatBurnWeight-loss" && sub === "Semaglutide") {
    descTh = `
      <p>
         <b>Semaglutide</b> เป็นยาที่เลียนแบบฮอร์โมน GLP-1 ซึ่งช่วยให้รู้สึกอิ่มเร็วขึ้น อิ่มนานขึ้น กินได้น้อยลง กลไกหลักคือชะลอการย่อยอาหาร และควบคุมระดับน้ำตาลในเลือด เหมาะกับคนที่ต้องการเริ่มต้นลดน้ำหนักแบบค่อยเป็นค่อยไป ได้ผลประมาณ 15% ของน้ำหนักตัวหากใช้อย่างต่อเนื่อง
      </p>
    `;
    descEn = `
      <p>
         <b>Semaglutide</b> Is a medication that mimics the GLP-1 hormone, which helps you feel full faster, stay full longer, and eat less. Its main mechanisms are slowing down digestion and regulating blood sugar levels. Suitable for individuals who want to begin a gradual weight loss journey, with potential results of around 15% of body weight when used consistently.
      </p>
    `;
  }
  else if (category === "FatBurnWeight-loss" && sub === "Tirzepatide") {
    descTh = `
      <p>
         <b>Tirzepatide</b> ยารุ่นใหม่ที่เลียนแบบทั้ง GIP และ GLP-1 พร้อมกัน จึงทำงานได้ดีกว่าในเรื่องลดความหิว ควบคุมอินซูลิน และเพิ่มการเผาผลาญพลังงาน เห็นผลการลดน้ำหนักชัดเจนกว่า Semaglutide (ลดได้มากถึง 20–22%) และเป็นที่นิยมในผู้ที่มีภาวะอ้วนหรือดื้อต่ออินซูลิน
      </p>
    `;
    descEn = `
      <p>
         <b>Tirzepatide</b> A new-generation medication that mimics both GIP and GLP-1 hormones simultaneously, making it more effective in reducing hunger, controlling insulin, and increasing energy expenditure. It shows more noticeable weight loss results than Semaglutide (up to 20–22% reduction) and is popular among individuals with obesity or insulin resistance.
      </p>
    `;
  }
  else if (category === "FatBurnWeight-loss" && sub === "Retatrutide") {
    descTh = `
      <p>
         <b>Retatrutide</b> ยังอยู่ในช่วงทดลองทางคลินิก แต่ถือว่าทรงพลังที่สุด เพราะทำงานที่ 3 จุดคือ GIP, GLP-1 และ Glucagon receptor โดย Glucagon receptor ช่วยกระตุ้นการใช้พลังงานและการเผาผลาญไขมันเพิ่มเติม ผลที่ออกมาดูแล้วมีแนวโน้มลดได้ถึง 24% ของน้ำหนักตัว แต่ยังใช้ไม่ได้จริงในท้องตลาด
      </p>
    `;
    descEn = `
      <p>
         <b>Retatrutide</b> Currently still in clinical trials, but considered the most powerful because it works on three targets: GIP, GLP-1, and Glucagon receptors. The Glucagon receptor helps boost energy expenditure and enhances fat metabolism. Preliminary results show potential weight loss of up to 24% of total body weight, but it is not yet available on the market.
      </p>
    `;
  }


  else if (category === "Supplements" && sub === "Tudca") {
    descTh = `
      <p>
         <b>TUDCA (Tauroursodeoxycholic Acid)</b> เป็นกรดน้ำดีชนิดหนึ่งที่ช่วยปกป้องและฟื้นฟูการทำงานของตับ โดยเฉพาะเมื่อมีการใช้งานตับหนัก เช่น จากยา อาหารเสริมบางชนิด หรือภาวะไขมันพอกตับ
        <br>คุณสมบัติหลัก:
        <br>• ช่วยลดค่าการอักเสบของตับ (ลด AST, ALT)
        <br>• ป้องกันเซลล์ตับจากความเสียหาย และช่วยให้ตับฟื้นตัวเร็วขึ้น
        <br>• ลดภาวะไขมันสะสมในตับ (Fatty Liver)
        <br>• ช่วยเรื่องระบบย่อยอาหาร และน้ำดีไหลเวียนดีขึ้น
        <br>เหมาะสำหรับ:
        <br>• ผู้ที่ใช้สารที่กระทบตับ
        <br>• ผู้ที่มีไขมันพอกตับ หรือค่าตับสูง
        <br>• ใช้เป็น liver support ระหว่างหรือหลังการใช้สารต่าง ๆ
      </p>
    `;
    descEn = `
      <p>
         <b>TUDCA 500 (Tauroursodeoxycholic Acid)</b> A bile acid that helps protect and restore liver function, especially when the liver is under heavy stress from medications, certain supplements, or fatty liver conditions.
        <br>Key Benefits:
        <br>• Helps reduce liver inflammation markers (lowers AST, ALT)
        <br>• Protects liver cells from damage and supports faster liver recovery
        <br>• Reduces fat accumulation in the liver (Fatty Liver)
        <br>• Supports digestion and improves bile flow
        <br>Suitable for:
        <br>• Individuals using substances that affect the liver
        <br>• Those with fatty liver or elevated liver enzymes
        <br>• As liver support during or after using various compounds
      </p>
    `;
  }
  else if (category === "Supplements" && sub === "Supplements") {
    descTh = `
      <p>
       <b>Supplements</b>
        <br>• <b>Iso Accutane 20mg</b> ยาลดสิวชนิดแรง ลดการผลิตน้ำมันจากต่อมไขมัน ลดการอักเสบของสิว เหมาะกับสิวเรื้อรังหรือสิวฮอร์โมน
        <br>• <b>Kelp Iodine 225mcg</b> ไอโอดีนจากสาหร่ายทะเล ช่วยการทำงานของต่อมไทรอยด์ ควบคุมระบบเผาผลาญ พลังงาน และช่วยบำรุงเส้นผม
        <br>• <b>Enhanced NMN 350</b> สารกระตุ้น NAD+ ช่วยชะลอวัย เพิ่มพลังงานระดับเซลล์ ฟื้นฟูสมอง ผิว และระบบเผาผลาญ
        <br>• <b>NMN+TMG 430mg</b> สูตร NMN เสริมด้วย TMG เพื่อเพิ่มการดูดซึม ช่วยชะลอวัย เพิ่มเอนเนอจี้ และสนับสนุนระบบสมองและหัวใจ
        <br>• <b>GHK-CU 50mg</b> เปปไทด์ทองแดง กระตุ้นคอลลาเจน ซ่อมแซมผิว ลดริ้วรอย ฟื้นฟูแผล และเพิ่มความยืดหยุ่นผิว
        <br>• <b>Epitalon 10mg</b> เปปไทด์ช่วยยืดอายุเซลล์ ส่งเสริมการฟื้นฟูร่างกาย คุณภาพการนอน และระบบภูมิคุ้มกัน
        <br>• <b>Pinealon 10mg</b> เปปไทด์ฟื้นฟูสมองและระบบประสาท ลดความเสื่อมของเซลล์ และช่วยเสริมความจำ
        <br>• <b>Carb Up 2210</b> สูตรควบคุมน้ำตาล ลดการสะสมไขมัน ช่วยดึงสารอาหารเข้าสู่กล้ามเนื้อ เหมาะกับสายรีคอมป์หรือลีน
        <br>• <b>5-amino-1mq</b> ช่วยเพิ่มการเผาผลาญไขมันระดับเซลล์ เสริมพลังงาน และสนับสนุนการลดไขมันแบบไม่เสียกล้าม
        <br>• <b>SLU-PP-332</b> สารเสริมพลังงานระดับไมโตคอนเดรีย ช่วยกระตุ้นการผลิต ATP ลดอ่อนล้า เร่งฟื้นตัว และอาจช่วยชะลอวัย
      </p>
    `;
    descEn = `
      <p>
         <b>Supplements</b>
        <br>• <b>Iso Accutane 20mg</b> A strong acne medication that reduces oil production from sebaceous glands, decreases inflammation, suitable for chronic or hormonal acne
        <br>• <b>Kelp Iodine 225mcg</b> Iodine from sea kelp that supports thyroid function, regulates metabolism and energy, and helps nourish hair
        <br>• <b>Enhanced NMN 350</b> NAD+ booster that helps slow aging, increases cellular energy, and supports brain, skin, and metabolic health
        <br>• <b>NMN+TMG 430mg</b> NMN formula enhanced with TMG for better absorption, supports anti-aging, increases energy, and promotes heart and brain health
        <br>• <b>GHK-CU 50mg</b> Copper peptide that stimulates collagen, repairs skin, reduces wrinkles, improves wound healing, and enhances skin elasticity
        <br>• <b>Epitalon 10mg</b> Peptide that supports cellular longevity, improves recovery, enhances sleep quality, and boosts immune function
        <br>• <b>Pinealon 10mg</b> Peptide that supports brain and nervous system repair, reduces cellular degeneration, and helps improve memory
        <br>• <b>Carb Up 2210</b> Formula for blood sugar control, reduces fat storage, helps drive nutrients into muscles, suitable for recomp or lean phases
        <br>• <b>5-amino-1mq</b> Helps increase fat metabolism at the cellular level, boosts energy, and supports fat loss without muscle loss
        <br>• <b>SLU-PP-332</b> Mitochondrial energy enhancer that stimulates ATP production, reduces fatigue, speeds up recovery, and may support longevity
      </p>
    `;
  }

  else if (category === "Sexual Health" && sub === "Cialis") {
    descTh = `
      <p>
         <b>Cialis และ Viagra</b> คือยารักษาอาการหย่อนสมรรถภาพทางเพศในผู้ชาย (ED):
        <br>• Viagra (ไวอากร้า) มีตัวยา Sildenafil ออกฤทธิ์เร็ว อยู่ได้นานประมาณ 4 ชั่วโมง
        <br>• Cialis (เซียลิส) มีตัวยา Tadalafil ออกฤทธิ์ช้ากว่า แต่อยู่นานถึง 36 ชั่วโมง
        <br>ทั้งสองยาทำงานโดยช่วยให้เลือดไหลเวียนไปยังอวัยวะเพศได้ดีขึ้นเมื่อมีสิ่งกระตุ้นทางเพศ
      </p>
    `;
    descEn = `
      <p>
         <b>Cialis และ Viagra</b> are medications used to treat erectile dysfunction (ED) in men:
        <br>• Viagra contains Sildenafil, which works quickly and lasts for about 4 hours.
        <br>• Cialis contains Tadalafil, which takes effect more slowly but lasts up to 36 hours.
        <br>Both medications work by improving blood flow to the penis when there is sexual stimulation.
      </p>
    `;
  }
  else if (category === "Sexual Health" && sub === "Viagra") {
    descTh = `
      <p>
         <b>Cialis และ Viagra</b> คือยารักษาอาการหย่อนสมรรถภาพทางเพศในผู้ชาย (ED):
        <br>• Viagra (ไวอากร้า) มีตัวยา Sildenafil ออกฤทธิ์เร็ว อยู่ได้นานประมาณ 4 ชั่วโมง
        <br>• Cialis (เซียลิส) มีตัวยา Tadalafil ออกฤทธิ์ช้ากว่า แต่อยู่นานถึง 36 ชั่วโมง
        <br>ทั้งสองยาทำงานโดยช่วยให้เลือดไหลเวียนไปยังอวัยวะเพศได้ดีขึ้นเมื่อมีสิ่งกระตุ้นทางเพศ
      </p>
    `;
    descEn = `
      <p>
         <b>Cialis และ Viagra</b> are medications used to treat erectile dysfunction (ED) in men:
        <br>• Viagra contains Sildenafil, which works quickly and lasts for about 4 hours.
        <br>• Cialis contains Tadalafil, which takes effect more slowly but lasts up to 36 hours.
        <br>Both medications work by improving blood flow to the penis when there is sexual stimulation.
      </p>
    `;
  }
  else if (category === "Sexual Health" && sub === "Kamagra Oral Jelly") {
    descTh = `
      <p>
         <b>Kamagra Oral Jelly</b> เป็นผลิตภัณฑ์รูปแบบเจล สำหรับรับประทาน ที่ใช้ตัวยา Sildenafil เช่นเดียวกับ Viagra ออกแบบมาให้ดูดซึมเร็วกว่าแบบเม็ด เหมาะกับคนที่กลืนเม็ดยาก มีหลายรส เช่น มิ้นต์ ส้ม สตรอว์เบอร์รี
        <br>จุดเด่น:
        <br>• รูปแบบเจล ดูดซึมเร็ว
        <br>• มีรสชาติ เลือกทานง่าย
        <br>• ใช้เพื่อช่วยให้เลือดไหลเวียนไปยังอวัยวะเพศได้ดีขึ้น เมื่อมีสิ่งกระตุ้นทางเพศ
      </p>
    `;
    descEn = `
      <p>
         <b>Kamagra Oral Jelly</b> is an oral jelly product that contains Sildenafil, the same active ingredient as Viagra. It is designed for faster absorption compared to tablets and is suitable for those who have difficulty swallowing pills. Available in various flavors such as mint, orange, and strawberry.  
        <br>Highlights:
        <br>• Jelly form with fast absorption  
        <br>• Flavored and easy to take  
        <br>• Helps improve blood flow to the genital area when sexual stimulation is present  
      </p>
    `;
  }


  
  // ---------- ถ้ามีคำอธิบาย ให้สร้างกล่อง + ปุ่มเปลี่ยนภาษา ----------
  if (descTh) {
    const desc = document.createElement("div");
    desc.className = "product-desc";

    // โครงสร้าง: header (ปุ่ม) + body (ข้อความ)
    desc.innerHTML = `
      <div class="desc-header">
        <span class="desc-title">${category} › ${sub}</span>
        <button type="button" class="lang-toggle" data-lang="th">ENG Info</button>
      </div>
      <div class="desc-body">
        ${descTh}
      </div>
    `;

    productList.appendChild(desc);

    // ผูก event ปุ่มสลับภาษา
    const btn = desc.querySelector(".lang-toggle");
    const body = desc.querySelector(".desc-body");

    btn.addEventListener("click", () => {
      const current = btn.getAttribute("data-lang");
      if (current === "th") {
        body.innerHTML = descEn || descTh;   // ถ้าไม่มี EN ก็ใช้ TH เหมือนเดิม
        btn.textContent = "TH Info";
        btn.setAttribute("data-lang", "en");
      } else {
        body.innerHTML = descTh;
        btn.textContent = "ENG Info";
        btn.setAttribute("data-lang", "th");
      }
    });
  }

  // ---------- แสดงสินค้าในหมวด / หมวดย่อย ----------
  products[category][sub].forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-item";
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
    generateAllProducts();   // ✅ สร้าง flat list สำหรับ search
    renderCategories();      // สำหรับ Tab 1
    loadCart();              // สำหรับ Tab 2
    renderCart();            // อัพเดทแสดงผลตะกร้า
    showTab(1);              // เริ่มเปิด Tab 1

    // 🔹 ดึงค่าจาก URL เพื่อเลือก Oral AAS + Anavar อัตโนมัติ ถ้ามีพารามิเตอร์มา
    selectCategoryAndSubFromUrl();

    const saved = localStorage.getItem("customerInfo");
    if (saved) {
      const customer = JSON.parse(saved);
      document.getElementById("custAddress").value = customer.address || "";
      if (customer.address) {
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
  const GAS_STORE_URL   = "https://script.google.com/macros/s/AKfycbyayDr5PzcycTz08NQ0tEivQyKK57kQ7qQxL9ZDrAtcz3JkjNbLEBPkAOcUErtA6DOewg/exec"; // เก็บออเดอร์ + push target
  const GAS_NOTIFY_URL  = "https://script.google.com/macros/s/AKfycbxqnzojoqKN_GC_XqdhCTIb2YP8OswdUNBP69P-zf55u-gybpeouyTvcqchndRMG9cb0A/exec"; // แจ้งเตือนไลน์ (ของเดิม)
  const LIFF_SUMMARY_ID = "2007887429-p3nd4dvE";
  const LIFF_PAYMENT_URL= "https://liff.line.me/2007887429-Arr5x53g";

  const log = (...a)=>console.log("[checkout]",...a);

  // === สร้าง orderId ฝั่ง client ทันที (เพื่อไม่ต้องรอ GAS) ===
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  // --- รวมยอด / ข้อความ ---
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let orderText = "📦 รายละเอียดคำสั่งซื้อ\n";
  cart.forEach(i => {
    orderText += `${i.name} x${i.qty} = ${(i.price * i.qty).toLocaleString('th-TH')}฿\n`;
  });
  orderText += `\nรวมทั้งหมด = ${totalPrice.toLocaleString('th-TH')}฿`;

  // ข้อมูลลูกค้า
  let customerText = "⚠️ ยังไม่ได้กรอกข้อมูลลูกค้า";
  const saved = localStorage.getItem("customerInfo");
  if (saved) {
    const info = JSON.parse(saved);
    customerText = `👤 ชื่อ-ที่อยู่จัดส่ง:\n${info.address || "-"}`;
  }

  // เตรียมรายการสำหรับ Flex (ชื่อสินค้าตัดบรรทัดได้)
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

  // === targetType/targetId (ใช้สำหรับ GAS push ย้อนห้องเดิม) ===
  let targetType = "none";
  let targetId = "";
  try {
    const ctx = liff.getContext ? liff.getContext() : null;
    if (ctx?.type === "group")      { targetType = "group"; targetId = ctx.groupId || ""; }
    else if (ctx?.type === "room")  { targetType = "room";  targetId = ctx.roomId  || ""; }
    else if (ctx?.type === "utou")  {
      // ต้องอ่าน userId เพิ่ม
      try {
        const prof = await liff.getProfile();
        targetType = "user"; targetId = prof?.userId || "";
      } catch (e) {
        console.warn("getProfile failed:", e);
      }
    }
  } catch (e) {
    console.warn("liff.getContext failed:", e);
  }

  // === Base64 fallback สำหรับ summary (เผื่อ GAS ยังเขียนไม่เสร็จ) ===
  const itemsForServer = cart.map(i => ({ name: i.name, price: i.price, qty: i.qty }));
  const fallback = {
    customerText,
    items: itemsForServer
  };
  const fallbackB64 = btoa(unescape(encodeURIComponent(JSON.stringify(fallback))));
  const adminUrl = `https://liff.line.me/${LIFF_SUMMARY_ID}?id=${encodeURIComponent(orderId)}&d=${encodeURIComponent(fallbackB64)}`;

  // === ส่ง Flex "ทันที" (ไม่รอ GAS) ===
  const flexMsg = {
    type: "flex",
    altText,
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
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
          }
        ]
      }
    }
  };

  // Fallback ข้อความล้วน (กรณี Flex fail)
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

  // ===== ยิงไป GAS “แบบไม่รอ” (หลังส่งข้อความ) =====
  const payloadStore = JSON.stringify({
    action: "checkout",
    orderId,        // << ให้ GAS ใช้ id นี้ (ต้องแก้ GAS รองรับ)
    orderText,
    customerText,
    totalPrice,
    items: itemsForServer,
    targetType,
    targetId
  });
  const payloadNotify = JSON.stringify({ action: "checkout", orderText, customerText });

  // ฟังก์ชันยิงแบบไม่บล็อก (พยายามใช้ sendBeacon ถ้าได้)
  const fireAndForget = (url, body) => {
    try {
      if (navigator.sendBeacon) {
        const ok = navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=utf-8" }));
        if (ok) return Promise.resolve(true);
      }
    } catch (e) { /* ignore */ }
    // fallback fetch non-blocking
    return fetch(url, { method: "POST", body, keepalive: true }).catch(err => console.warn("ff fail", url, err));
  };

  // === ส่งข้อความก่อน ===
  try {
    if (liff.isInClient && liff.isInClient()) {
      try {
        await liff.sendMessages([
                                   {type: "text",text: orderText},{type: "text",text: customerText},flexMsg
                                ]);
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
      // เปิดนอก LINE → เด้งไป summary เพื่อทำงานต่อ
      location.href = adminUrl;
      return;
    }
  } catch (err) {
    console.error("ส่งข้อความไม่สำเร็จ:", err?.message || err);
    // เปิด summary ต่อให้ทำงานต่อได้
    location.href = adminUrl;
    return;
  }

  // === แล้วค่อยยิงไป GAS แบบไม่รอให้เสร็จ ===
  fireAndForget(GAS_STORE_URL,  payloadStore);
  fireAndForget(GAS_NOTIFY_URL, payloadNotify);

  // === เคลียร์ตะกร้า + ปิด ===
  cart.length = 0;
  saveCart();
  renderCart();
  showTab(2);
  if (liff.isInClient && liff.isInClient()) {
    // หน่วงนิดเดียวให้ beacon มีเวลาออก
    setTimeout(() => liff.closeWindow(), 250);
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

function selectCategoryAndSubFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const sub = params.get("sub");

  // ถ้าไม่มี param ก็ไม่ต้องทำอะไร
  if (!cat || !sub) return;

  // เช็คว่ามี category + subcategory นี้จริงไหม
  if (!products[cat] || !products[cat][sub]) return;

  // set active ไว้
  activeCategory = cat;
  activeSubCategory = sub;

  // render ใหม่ตามค่า active
  renderCategories();        // จะทำให้ปุ่ม category ถูก active ตาม activeCategory
  renderSubCategories(cat);  // จะทำให้ subcategory ถูก active + renderProducts(cat, sub);

  // เลื่อนลงไปตรงรายการสินค้า
  setTimeout(() => {
    const productListEl = document.getElementById("productList");
    if (productListEl) {
      productListEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 200); // ดีเลย์นิดนึงให้ DOM วาดเสร็จ
}

