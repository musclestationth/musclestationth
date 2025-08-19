// -------------------------
// โหลดตะกร้าจาก localStorage
// -------------------------
let storedCart = JSON.parse(localStorage.getItem("cart"));
let cart = Array.isArray(storedCart) ? storedCart : [];
console.log("cart =", cart);

// -------------------------
// บันทึกตะกร้า
// -------------------------
function saveCart() {
  console.log("Saving cart:", cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

  // สินค้าเข้าใหม่ (กำหนดเอง)
  const newProducts = [
    { name: "Retatrutide BPMedical 10mg", price: 4500, image: "images/" },
    { name: "Retatrutide Wellness 10mg", price: 3500, image: "images/" },
    { name: "Levitra SAAnabolic 30mg60t", price: 1440, image: "images/" },
    { name: "Retatrutide SAAnabolic 10mg", price: 4500, image: "images/" },
    { name: "3xRetatrutide SAAnabolic 10mg", price: 12000, image: "images/" },
    { name: "AC-262 SAAnabolic 10mg60t", price: 2430, image: "images/" },
    { name: "S-23 SAAnabolic 10mg100t", price: 1900, image: "images/" },
    { name: "YK-11 SAAnabolic 5mg60t", price: 2200, image: "images/" },
    { name: "T3 SAAnabolic 25mcg200t", price: 1100, image: "images/t3-sa.png" },
    { name: "Telomed SAAnabolic 40mg50t", price: 890, image: "images/telomed-sa.png" },
    { name: "L-Carnitine Beligas 30ml", price: 2200, image: "images/" },
    { name: "L-Carnitine+CLA Beligas 30ml", price: 2400, image: "images/" }
    
  ];

  let currentSlide = 0;
  const itemsPerPage = 3;

  function renderNewProductsSlider() {
    const container = document.getElementById("newProductsSlider");
    container.innerHTML = "";

    const start = currentSlide * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = newProducts.slice(start, end);

    pageItems.forEach(prod => {
      const div = document.createElement("div");
      div.className = "product-item";
      div.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <div class="info">
          <p>${prod.name}</p>
          <p>${prod.price}฿</p>
          <button class="add-btn" onclick='addToCart("${prod.name}", ${prod.price})'>
            Add to Cart
          </button>
        </div>
      `;
      container.appendChild(div);
    });

    renderDots();
  }

  function renderDots() {
    const dotsContainer = document.getElementById("sliderDots");
    dotsContainer.innerHTML = "";
    const totalPages = Math.ceil(newProducts.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.className = i === currentSlide ? "active" : "";
      dot.addEventListener("click", () => {
        currentSlide = i;
        renderNewProductsSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }




// ข้อมูลสินค้า + รูป
const products = {
  "Oral AAS": {
    "Anadrol": [
      { name: "Anadrol Gainzlab 50mg100t", price: 1000, image: "images/anadrol-gainz.png" },
      { name: "Anadrol Bodytech 50mg100t", price: 1200, image: "images/anadrol-body.png" },
      { name: "Anadrol Meditech 50mg100t", price: 1200, image: "images/anadrol-medi.png" },
      { name: "Anadrol Platinum 50mg100t", price: 1700, image: "images/anadrol-plat.png" },
      { name: "Anadrol BPMedical 50mg100t", price: 1760, image: "images/anadrol-bp.png" },
      { name: "Anadrol Beligas 50mg100t", price: 0, image: "images/anadrol-beligas.png" },
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
      { name: "Clen AlphaPharma 40mcg50t\n&nbsp;\n&nbsp;", price: 600, image: "images/clen-alpha.png" },
      //{ name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen-gainz.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen-sync.png" },
      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t\n&nbsp;", price: 1690, image: "images/clen100-beligas.png" }
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
      { name: "Dbol Beligas 10mg100t", price: 0, image: "" },
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
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gainz.png" },
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
      { name: "DHB1 TestC Beligas 100mg", price: 1450, image: "images/" },
      { name: "TestC Beligas 200mg", price: 1100, image: "images/" },
      { name: "TestC Platinum 200mg", price: 1200, image: "images/" },
      { name: "TestC Meditech 250mg", price: 1040, image: "images/" },
      { name: "TestC Bodytech 250mg", price: 1040, image: "images/" },
      { name: "TestC SAAnabolic 250mg", price: 1100, image: "images/" },
      { name: "TestC EuroMed 250mg", price: 1120, image: "images/" },
      { name: "TestC Beligas 250mg", price: 1290, image: "images/" },
      { name: "TestC AlphaPharma 250mg", price: 1300, image: "images/" },
      { name: "TestC BPMedical 250mg", price: 1430, image: "images/" },
      { name: "TestC Synctech 300mg", price: 1100, image: "images/" },
      { name: "TestC Gainzlab 300mg", price: 840, image: "images/" }
    ],
    "TestE": [
      { name: "TestE AlphaPharma 250mg", price: 1300, image: "images/" },
      { name: "TestE BPMedical 250mg", price: 1430, image: "images/" },
      { name: "TestE Synctech 300mg", price: 1100, image: "images/" },
      { name: "TestE SAAnabolic 300mg", price: 1100, image: "images/" },
      { name: "TestE EuroMed 300mg", price: 1100, image: "images/" },
      { name: "TestE Platinum 300mg", price: 1200, image: "images/" },
      { name: "TestE Beligas 300mg", price: 1290, image: "images/" },
      { name: "TestE Beligas 450mg", price: 1490, image: "images/" }
    ],
    "TestProp": [
      { name: "TestProp Gainzlab 100mg", price: 630, image: "images/" },
      { name: "TestProp SAAnabolic 100mg", price: 700, image: "images/" },
      { name: "TestProp Synctech 100mg", price: 700, image: "images/" },
      { name: "TestProp Bodytech 100mg", price: 830, image: "images/" },
      { name: "TestProp Meditech 100mg", price: 830, image: "images/" },
      { name: "TestProp EuroMed 100mg", price: 850, image: "images/" },
      { name: "TestProp Beligas 100mg", price: 890, image: "images/" },
      { name: "TestProp Platinum 100mg", price: 1000, image: "images/" },
      { name: "TestProp AlphaPharma 100mg", price: 1000, image: "images/" },
      { name: "TestProp BPMedical 100mg", price: 1045, image: "images/" }
    ],
    "Sustanon": [
      { name: "Sustanon EuroMed 250mg(3Amp)", price: 730, image: "images/" },
      { name: "Sustanon Gainzlab 300mg", price: 790, image: "images/" },
      { name: "Sustanon Meditech 250mg", price: 880, image: "images/" },
      { name: "Sustanon Bodytech 250mg", price: 900, image: "images/" },
      { name: "Sustanon Beligas 250mg", price: 1190, image: "images/" },
      { name: "Sustanon BPMedical 250mg", price: 1375, image: "images/" },
      { name: "Sustanon Platinum 250mg", price: 1400, image: "images/" },
      { name: "Sustanon Beligas 500mg", price: 2250, image: "images/" }
    ],
    "TrenA": [
      { name: "TrenA Beligas 100mg", price: 1300, image: "images/" },
      { name: "TrenA Synctech 100mg", price: 1400, image: "images/" },
      { name: "TrenA Gainzlab 100mg", price: 1400, image: "images/" },
      { name: "TrenA SAAnabolic 100mg", price: 1500, image: "images/" },
      { name: "TrenA AlphaPharma 100mg", price: 1600, image: "images/" },
      { name: "TrenA EuroMed 100mg", price: 1600, image: "images/" },
      { name: "TrenA Platinum 100mg", price: 1600, image: "images/" },
      { name: "TrenA Meditech 100mg", price: 1600, image: "images/" },
      { name: "TrenA Bodytech 100mg", price: 1600, image: "images/" },
      { name: "TrenA BPMedical 100mg", price: 2200, image: "images/" }
    ],
    "TrenE": [
      { name: "TrenE Platinum 150mg", price: 1900, image: "images/" },
      { name: "TrenE Meditech 200mg", price: 1600, image: "images/" },
      { name: "TrenE Bodytech 200mg", price: 1600, image: "images/" },
      { name: "TrenE Synctech 200mg", price: 1650, image: "images/" },
      { name: "TrenE Beligas 200mg", price: 1690, image: "images/" },
      { name: "TrenE SAAnabolic 200mg", price: 1800, image: "images/" },
      { name: "TrenE BPMedical 200mg", price: 2530, image: "images/" },
      { name: "TrenE AlphaPharma 250mg", price: 2500, image: "images/" },
      { name: "TrenE Gainzlab 200mg", price: 1600, image: "images/" }
    ],
    "TrenHex": [
      { name: "TrenHex AlphaPharma 76.5mg", price: 2300, image: "images/" },
      { name: "TrenHex Beligas 100mg", price: 1850, image: "images/" },
      { name: "TrenHex Platinum 100mg", price: 2100, image: "images/" },
      { name: "TrenHex Meditech 150mg", price: 1800, image: "images/" },
      { name: "TrenHex Bodytech 150mg", price: 2000, image: "images/" },
      { name: "TrenHex EuroMed 150mg", price: 2530, image: "images/" },
      { name: "TrenHex BPMedical 200mg", price: 2970, image: "images/" }
    ],
    "Stano": [
      { name: "Stano Platinum 50mg", price: 1400, image: "images/" },
      { name: "Stano AlphaPharma 50mg", price: 1500, image: "images/" },
      { name: "Stano Gainzlab 100mg", price: 870, image: "images/" },
      { name: "Stano Meditech 100mg", price: 1070, image: "images/" },
      { name: "Stano Bodytech 100mg", price: 1070, image: "images/" },
      { name: "Stano EuroMed 100mg", price: 1160, image: "images/" },
      { name: "Stano BPMedical 100mg", price: 1375, image: "images/" }
    ],
    "MastE": [
      { name: "MastE Meditech 200mg", price: 1500, image: "images/" },
      { name: "MastE Beligas 200mg", price: 1590, image: "images/" },
      { name: "MastE Synctech 200mg", price: 1600, image: "images/" },
      { name: "MastE SAAnabolic 200mg", price: 1700, image: "images/" },
      { name: "MastE Platinum 200mg", price: 1900, image: "images/" },
      { name: "MastE BPMedical 200mg", price: 0, image: "images/" },
      { name: "MastE AlphaPharma 200mg", price: 0, image: "images/" }
    ],
    "MastP": [
      { name: "MastP Gainzlab 100mg", price: 1000, image: "images/" },
      { name: "MastP Synctech 100mg", price: 1300, image: "images/" },
      { name: "MastP SAAnabolic 100mg", price: 1300, image: "images/" },
      { name: "MastP BPMedical 100mg", price: 1400, image: "images/" },
      { name: "MastP Bodytech 100mg", price: 1400, image: "images/" },
      { name: "MastP Meditech 100mg", price: 1400, image: "images/" },
      { name: "MastP EuroMed 100mg", price: 1500, image: "images/" },
      { name: "MastP Platinum 100mg", price: 1600, image: "images/" },
      { name: "MastP AlphaPharma 100mg", price: 1700, image: "images/" },
      { name: "MastP BPMedical 100mg", price: 2200, image: "images/" }
    ],
    "Primo": [
      { name: "Primo Meditech 100mg", price: 1440, image: "images/" },
      { name: "Primo Gainzlab 100mg", price: 1500, image: "images/" },
      { name: "Primo SAAnabolic 100mg", price: 1600, image: "images/" },
      { name: "Primo Bodytech 100mg", price: 1700, image: "images/" },
      { name: "Primo Platinum 100mg", price: 2000, image: "images/" },
      { name: "Primo BPMedical 100mg", price: 2300, image: "images/" },
      { name: "Primo AlphaPharma 100mg", price: 2500, image: "images/" },
      { name: "Primo Synctech 150mg", price: 1850, image: "images/" }
    ],
    "NPP": [
      { name: "NPP Bodytech 100mg", price: 1200, image: "images/" },
      { name: "NPP Beligas 100mg", price: 1290, image: "images/" },
      { name: "NPP Platinum 100mg", price: 1800, image: "images/" },
      { name: "NPP BPMedical 100mg", price: 0, image: "images/" },
      { name: "NPP AlphaPharma 100mg", price: 0, image: "images/" }
    ],
    "EQ": [
      { name: "EQ Meditech 250mg", price: 1200, image: "images/" },
      { name: "EQ Bodytech 250mg", price: 1200, image: "images/" },
      { name: "EQ BPMedical 250mg", price: 1925, image: "images/" },
      { name: "EQ AlphaPharma 250mg", price: 2000, image: "images/" },
      { name: "EQ Gainzlab 300mg", price: 1000, image: "images/" },
      { name: "EQ SAAnabolic 300mg", price: 1400, image: "images/" },
      { name: "EQ Beligas 300mg", price: 1590, image: "images/" },
      { name: "EQ Synctech 400mg", price: 1400, image: "images/" },
      { name: "EQ Bodytech 400mg", price: 1500, image: "images/" },
      { name: "EQ Platinum 400mg", price: 1900, image: "images/" },
      { name: "EQ Beligas 500mg", price: 0, image: "images/" }
    ],
    "Deca": [
      { name: "Deca EuroMed 100mg(3Amp)", price: 650, image: "images/" },
      { name: "Deca AlphaPharma 200mg", price: 1700, image: "images/" },
      { name: "Deca Meditech 250mg", price: 1200, image: "images/" },
      { name: "Deca Bodytech 250mg", price: 1200, image: "images/" },
      { name: "Deca BPMedical 250mg", price: 1705, image: "images/" },
      { name: "Deca Gainzlab 300mg", price: 1000, image: "images/" },
      { name: "Deca SAAnabolic 300mg", price: 1350, image: "images/" },
      { name: "Deca Synctech 300mg", price: 1350, image: "images/" },
      { name: "Deca EuroMed MIX 300mg", price: 1500, image: "images/" },
      { name: "Deca Beligas 300mg", price: 1590, image: "images/" },
      { name: "Deca Platinum 300mg", price: 1800, image: "images/" },
      { name: "Deca Bodytech 400mg", price: 1600, image: "images/" },
      { name: "Deca Beligas 500mg", price: 2150, image: "images/" }
    ],
    "Injection etc.": [
      { name: "TDT RAPID Platinum 300mg", price: 2600, image: "images/" },
      { name: "Test Suspension Meditech 100mg", price: 900, image: "images/" },
      { name: "Test Suspension Beligas 100mg", price: 1290, image: "images/" },
      { name: "Kisseptin-10 SAAnabolic 5mg", price: 1850, image: "images/" },
      { name: "Bac Water SAAnabolic 10ml", price: 500, image: "images/" },
      { name: "Bac Water BPMedical 10ml", price: 450, image: "images/" },
      { name: "Bac Water Synctech 12ml", price: 200, image: "images/" },
      
      { name: "Tren-Test-Mast Long Beligas 300mg", price: 2450, image: "images/" },
    //  { name: "Test-Tren Short Beligas 150mg", price: 1700, image: "images/" },
      { name: "MENT Beligas 50mg", price: 1990, image: "images/" },
      { name: "MTR Beligas 5mg", price: 1290, image: "images/" }
    ]
  },
  "SARMs": {
    "MK677": [
      { name: "MK-677 SAAnabolic 10mg60t", price: 1450, image: "images/" },
      { name: "MK-677 Meditech 25mg50t", price: 1500, image: "images/" },
      { name: "MK-677 BPMedical 10mg90t", price: 2750, image: "images/" }
    ],
    "RAD140": [
      { name: "Rad-140 Meditech 10mg50t", price: 1200, image: "images/" },
      { name: "Rad-140 SAAnabolic 10mg60t", price: 1650, image: "images/" },
      { name: "Rad-140 BPMedical 10mg60t", price: 2420, image: "images/" }
    ],
    "GW501516": [
      { name: "GW-501516 Meditech 20mg50t", price: 1200, image: "images/" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2420, image: "images/" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/" }
    ],
    "MK2866": [
      { name: "MK-2866 Meditech 20mg50t", price: 1200, image: "images/" },
      { name: "MK-2866 BPMedical 10mg90t", price: 2090, image: "images/" },
      { name: "MK-2866 SAAnabolic 10mg100t", price: 1200, image: "images/" },
      { name: "MK-2866 BPMedical 15mg50t", price: 0, image: "images/" },
      { name: "MK-2866+ SAAnabolic 10mg60t", price: 1250, image: "images/" }
      
    ],
    "YK11": [
      { name: "YK-11 BPMedical 10mg30t", price: 1815, image: "images/" },
      { name: "YK-11 SAAnabolic 5mg60t", price: 2200, image: "images/" },
    ],
    "LGD4033": [
      { name: "LGD-4033 BPMedical 5mg60t", price: 1815, image: "images/" },
      { name: "LGD-4033 SAAnabolic 10mg60t", price: 1350, image: "images/" },
      { name: "LGD-4033 Beligas 10mg50t", price: 0, image: "images/" },
      { name: "LGD-4033 Beligas 10mg90t", price: 2190, image: "images/" }
    ],
    "S4": [
      { name: "S-4 Meditech 20mg50t", price: 1200, image: "images/" },
      { name: "S-4 BPMedical 25mg60t", price: 2090, image: "images/" }
    ],
    "AC262": [
      { name: "AC-262 SAAnabolic 10mg60t", price: 2430, image: "images/" }
    ],
    "S23": [
      { name: "S-23 SAAnabolic 10mg100t", price: 1900, image: "images/" }
    ]

  },
  "HGH & Peptide": {
    "HGH": [
      { name: "HGH Meditech 100iu", price: 3900, image: "images/" },
      { name: "HGH Platinum 100iu", price: 5200, image: "images/" },
      { name: "HGH Beligas 100iu", price: 5500, image: "images/" },
      { name: "HGH Synctech 120iu", price: 5000, image: "images/" },
      { name: "HGH SAAnabolic 120iu", price: 5500, image: "images/" },
      { name: "HGH BPMedical(SD) 100iu", price: 6930, image: "images/" },
      { name: "HGH BPMedical(Pharma) 100iu", price: 10010, image: "images/" },

      { name: "HGHPen Pfizer 12mg36iu(เฉพาะไส้)", price: 6820, image: "images/" },
      { name: "HGHPen Pfizer 12mg36iu(ไส้+ปากกา)", price: 8470, image: "images/" },
      { name: "HGHPen Beligas 36iu", price: 5000, image: "images/" },
      { name: "HGHPen Jolie 50iu", price: 5000, image: "images/" },
      { name: "HGHPen SAAnabolic(Pharma) 30iu", price: 2900, image: "images/" },
      { name: "3xHGHPen SAAnabolic(Pharma) 30iu", price: 7900, image: "images/" }
    ],
    "IGF1": [
      { name: "IGF-1 LR3 Bodytech 1000mcg", price: 2600, image: "images/" },
      { name: "IGF-1 LR3 SAAnabolic 1000mcg", price: 2600, image: "images/" },
      { name: "IGF-1 LR3 BPMedical 1000mcg", price: 6930, image: "images/" },
      { name: "IGF-1 DES Beligas 1mg", price: 2890, image: "images/" },
      { name: "IGF-1 LR3 Synctech 2000mcg", price: 4500, image: "images/" },
      { name: "IGF-1 INCRELEX 400mg", price: 8900, image: "images/" }
    ],
    "HCG": [
      { name: "HCG Beligas 5000iu", price: 1100, image: "images/" },
      { name: "HCG BPMedical 5000iu", price: 1265, image: "images/" },
      { name: "HCG AlphaPharma 5000iu", price: 2100, image: "images/" },
      { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/" }
    ],
    "TB500/BPC157": [
      { name: "TB-500 Meditech 10mgx3", price: 2200, image: "images/" },
      { name: "TB-500 Beligas 5mg", price: 1790, image: "images/" },
      { name: "BPC-157 Meditech 5mgx3", price: 2200, image: "images/" },
      { name: "BPC-157 Beligas 5mg", price: 1100, image: "images/" },
      { name: "BPC-157 BPMedical", price: 0, image: "images/" },
      { name: "TB500+BPC157 SAAnabolic 5+5mg", price: 1550, image: "images/" }
      
    ],
    "Peptide etc.": [
      { name: "PT-141 Beligas 10mg", price: 1490, image: "images/" },
      { name: "PT-141 BPMedical 10mg", price: 0, image: "images/" },
      { name: "GHRP-6 BPMedical 5mg", price: 0, image: "images/" },
      { name: "PEG-MGF Beligas 1mg", price: 1350, image: "images/" },
      { name: "DSIP Beligas 2mg", price: 890, image: "images/" }
    ]
  },
  "PCT": {
    "Arimidex": [
      { name: "Arimidex EuroMed 1mg30t", price: 1050, image: "images/" },
      { name: "Arimidex BPMedical 1mg30t", price: 1870, image: "images/" },
      { name: "Arimidex Meditech 1mg50t", price: 1200, image: "images/" },
      { name: "Arimidex Beligas 1mg50t", price: 1290, image: "images/" }
    ],
    "Aromasin": [
      { name: "Aromasin Meditech 25mg30t", price: 1200, image: "images/" },
      { name: "Aromasin Bodytech 25mg30t", price: 1200, image: "images/" },
      { name: "Aromasin Beligas 25mg50t", price: 1600, image: "images/" }
    ],
    "Caber": [
      { name: "Caber Beligas 0.5mg10t", price: 2090, image: "images/" },
      { name: "Caber Beligas 1mg10t", price: 2790, image: "images/" },
      { name: "Caber BPMedical 0.5mg8t", price: 1760, image: "images/" },
      { name: "Caber Kabazer 1mg20t", price: 2000, image: "images/" }
    ],
    "Nolvadex": [
      { name: "Nolvadex EuroMed 20mg30t", price: 1020, image: "images/" },
      { name: "Nolvadex BPMedical 20mg30t", price: 1045, image: "images/" },
      { name: "Nolvadex Meditech 20mg50t", price: 1200, image: "images/" },
      { name: "Nolvadex Beligas 20mg50t", price: 1190, image: "images/" },
      { name: "Nolvadex AlphaPharma 20mg30t", price: 1100, image: "images/" },
      { name: "Nolvadex SAAnabolic 20mg60t", price: 0, image: "images/" },
      { name: "Levitra SAAnabolic 30mg60t", price: 1440, image: "images/" }
    ],
    "Femara": [
      { name: "Femara Meditech 2.5mg", price: 1500, image: "images/" }
    ],
    "Clomid": [
      { name: "Clomid Meditech 50mg50t", price: 1250, image: "images/" },
      { name: "Clomid BPMedical 50mg30t", price: 1210, image: "images/" },
      { name: "Clomid Beligas 50mg50t", price: 1490, image: "images/" }
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
      { name: "HCG Beligas 5000iu", price: 1100, image: "images/" },
      { name: "HCG BPMedical 5000iu", price: 1265, image: "images/" },
      { name: "HCG AlphaPharma 5000iu", price: 2100, image: "images/" },
      { name: "HCG SAAnabolic 15000iu", price: 1800, image: "images/" }
    ]
  },
  "Fat Burn & Weight-loss": {
    "Clen": [
      { name: "Clen AlphaPharma 40mcg50t\n&nbsp;\n&nbsp;", price: 600, image: "images/clen-alpha.png" },
      //{ name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen-gainz.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen-sync.png" },
      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t\n&nbsp;", price: 1690, image: "images/clen100-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3-gainz.png" },
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
      { name: "GW-501516 Meditech 20mg50t", price: 1200, image: "images/" },
      { name: "GW-501516 SAAnabolic 10mg60t", price: 1050, image: "images/" },
      { name: "GW-501516 BPMedical 10mg90t", price: 2420, image: "images/" },
      { name: "GW-501516 Beligas 10mg50t", price: 1290, image: "images/" }
    ],
    "Oral Weight-loss etc": [
      { name: "Orlistat 120mg14t", price: 840, image: "images/" }
    ],
    "Insulin": [
      { name: "Insulin 10ml1vial", price: 500, image: "images/" },
      { name: "InsulinPen Humalog Kwik", price: 1600, image: "images/" }
    ],
    "Semaglutide": [
      { name: "SemaglutidePen SAAnabolic 4mg", price: 4300, image: "images/" },
      { name: "2xSemaglutidePen SAAnabolic 4mg", price: 7900, image: "images/" },
      { name: "SemaglutidePen Jolie 5mg", price: 4500, image: "images/" },
      { name: "SemaglutidePen Beligas 5mg", price: 5900, image: "images/" },
      { name: "Semaglutide BPMedical 5mg", price: 2400, image: "images/" },
      { name: "SemaglutidePen Wegovy 1mg(มีอย.)", price: 10900, image: "images/" }
    ],
    "Tirzepatide": [
      { name: "Tirzep APLab 10mg", price: 3500, image: "images/" },
      { name: "Tirzep SAAnabolic 10mg", price: 3500, image: "images/" },
      { name: "TirzepPen Jolie 10mg", price: 5500, image: "images/" },
      { name: "TirzepPen Beligas 10mg", price: 4500, image: "images/" },
      { name: "Tirzep Platinum 10mg", price: 3500, image: "images/" },
      { name: "Tirzep Mounjaro Kwikpen 5mg/0.6ml(มีอย.)", price: 14900, image: "images/" },
      { name: "Tirzep Wellness 10mg", price: 0, image: "images/" },
    ],
    "Retatrutide": [
     // { name: "Retatrutide APLab 5mg", price: 1800, image: "images/" },
      { name: "Retatrutide Wellness 10mg", price: 3500, image: "images/" },
      { name: "RetatrutidePen APLab 10mg", price: 6900, image: "images/" },
      { name: "RetatrutidePen SAAnabolic 10mg", price: 5500, image: "images/" },
      { name: "Retatrutide SAAnabolic 10mg", price: 4500, image: "images/" },
      { name: "3xRetatrutide SAAnabolic 10mg", price: 12000, image: "images/" },
      { name: "Retatrutide BPMedical 10mg", price: 4500, image: "images/" }
    ],
    "Injection Weight-loss etc": [
      { name: "Helio Clen Yohimbine Beligas 40mcg&5.5mg", price: 1450, image: "images/" },
      { name: "Saxenda Liraglutide 3.0mg", price: 3900, image: "images/" },
      { name: "Cut Fast SAAnabolic 155mg", price: 1750, image: "images/" }
    ]
  },
  "Supplements": {
    "Tudca": [
      { name: "Tudca Beligas 500mg90t", price: 1590, image: "images/" },
      { name: "Tudca BPMedical 500mg60t", price: 1870, image: "images/" }
    ],
    "Acne/Skin Support": [
      { name: "Iso Accutane Beligas 20mg50t", price: 1000, image: "images/" }
    ],
    "Blood Sugar & Fat Metabolism": [
      { name: "Carb up 2210 SAAnabolic 60t", price: 950, image: "images/" },
      //{ name: "5-Amino-1mq SAAnabolic 60t", price: 950, image: "images/" },
      { name: "SLP-PP-332 60t SAAnabolic 60t", price: 1750, image: "images/" },
      { name: "L-Carnitine Beligas 30ml", price: 2200, image: "images/" },
      { name: "L-Carnitine+CLA Beligas 30ml", price: 2400, image: "images/" }
    ],
    "Anti-aging & NAD+ Boosters": [
      { name: "Enhanced NMN350 SAAnabolic 60t", price: 1250, image: "images/" },
      { name: "NMN+TMG SAAnabolic 430mg60t", price: 1250, image: "images/" }
    ],
    "Thyroid/Mineral Support": [
      { name: "Kelp Iodine SAAnabolic 225mcg90t", price: 350, image: "images/" }
    ]
  },
  "Sexual Performance": {
    "Cialis": [
      { name: "Cialis Beligas 25mg100t", price: 2490, image: "images/" },
      { name: "Tadalafil BPMedical 20mg10t", price: 1200, image: "images/" },
      { name: "Tadalafil SAAnabolic 5mg100t", price: 1130, image: "images/" }
    ],
    "Viagra": [
      { name: "Viagra Beligas 50mg50t", price: 1500, image: "images/" }
    ],
    "Kamagra Oral Jelly": [
      { name: "Kamagra Oral Jelly 100mg7ซอง", price: 385, image: "images/" }
    ]
  }
};

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(`tab${tab}`).style.display = 'block';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-btn')[tab - 1].classList.add('active');
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

// กดแล้วเปลี่ยนสีปุ่มนี้
div.addEventListener('click', () => {
  // ลบ active จากปุ่มอื่น
  document.querySelectorAll(".category-item").forEach(btn => btn.classList.remove("active"));
  // ใส่ active ให้ปุ่มนี้
  div.classList.add("active");
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

        // กดแล้วเปลี่ยนสีปุ่มนี้
        div.addEventListener('click', () => {
          // ลบ active จากปุ่มอื่น
          document.querySelectorAll(".subcategory-item").forEach(btn => btn.classList.remove("active"));
          // ใส่ active ให้ปุ่มนี้
          div.classList.add("active");
          renderProducts(category, sub);
        });

        subList.appendChild(div);
      });
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
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="info">
        <p>${prod.name}</p>
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

  // อัปเดตรวมจำนวนและราคาที่ส่วนแสดงผลในตะกร้า
  const totalItemsEl = document.getElementById("totalItems2");
  const totalPriceEl = document.getElementById("totalPrice2");
  if (totalItemsEl) totalItemsEl.textContent = `รวม ${totalQty} ชิ้น`;
  if (totalPriceEl) totalPriceEl.textContent = `${totalPrice} บาท`;

  // อัปเดตแถบตะกร้าด้านล่าง
  const cartItemsCountEl = document.getElementById('totalItems1');
  const cartTotalPriceEl = document.getElementById('totalPrice1');
  if (cartItemsCountEl) cartItemsCountEl.textContent = 'รวม ' + totalQty + ' ชิ้น';
  if (cartTotalPriceEl) cartTotalPriceEl.textContent = totalPrice.toLocaleString() + ' บาท';
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
    renderNewProductsSlider();
    renderCategories();
    loadCart();   // โหลดข้อมูลเก่าจาก localStorage
    renderCart(); // อัพเดทแสดงผลตะกร้า

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
  if (!cart.length) return alert("ตะกร้าว่าง");

  const itemContents = cart.map(item => ({
    type: "box",
    layout: "horizontal",
    contents: [
      { type: "text", text: `${item.name} x${item.qty}`, size: "sm", color: "#000000", flex: 0 },
      { type: "text", text: `${item.price * item.qty}฿`, size: "sm", color: "#000000", align: "end" }
    ]
  }));

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const flexMsg = {
    type: "flex",
    altText: "รายละเอียดคำสั่งซื้อ",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            url: "https://lh3.googleusercontent.com/d/1thkyE_A9Jd8LGii5Z9rIGtcn75Tv39q7", // ใส่ URL รูปโลโก้จริงของคุณ
            size: "sm",           // ขนาดเล็ก (xs, sm, md, lg, xl, full)
            align: "center",
            margin: "none"
          },


          { type: "text", text: "MuscleStationTH", weight: "bold", size: "xl", align: "center", color: "#0000FF"},
          { type: "text", text: "สรุปคำสั่งซื้อ", weight: "bold", size: "lg" },
          { type: "box", layout: "vertical", margin: "lg", spacing: "sm", contents: itemContents },
          {
            type: "box",
            layout: "horizontal",
            margin: "lg",
            contents: [
              { type: "text", text: "รวมทั้งหมด", size: "lg",weight: "bold", color: "#000000" },
              { type: "text", text: `${totalPrice}฿`, size: "lg", color: "#000000", align: "end", weight: "bold" }
            ]
          }
        ]

      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#1DB446",  // สีเขียว typical payment color
            action: {
              type: "uri",
              label: "ชำระเงิน",
              uri: "https://liff.line.me/2007887429-Arr5x53g" // ใส่ URL หน้า QR Code จริงของคุณ
            }
          },
          {
            type: "text",
            text: "**กรุณารอแอดมินเช็คสต็อกสินค้าและconfirm ก่อนกดชำระเงินนะคะ\n**Please wait for checking stocks and confirm this order before payment.",
            size: "md",
            color: "#FF0000",
            wrap: true,
            margin: "sm"
          }
        ]
      }
    }
  };

  // --- สร้างข้อความรายละเอียดคำสั่งซื้อ ---
  let orderText = "📦 รายละเอียดคำสั่งซื้อ\n";
  cart.forEach(item => {
    orderText += `${item.name} x${item.qty} = ${item.price * item.qty}฿\n`;
  });
  orderText += `\n**รวมทั้งหมด = ${totalPrice}฿`;

  // --- สร้างข้อความข้อมูลลูกค้า ---
  let customerText = "⚠️ ยังไม่ได้กรอกข้อมูลลูกค้า";
  const saved = localStorage.getItem("customerInfo");
  if (saved) {
    const info = JSON.parse(saved);
    customerText = `👤 ชื่อ-ที่อยู่จัดส่ง:\n${info.address || "-"}`;
  }

  try {

    // --- ยิงข้อมูลไป Google Apps Script ---
fetch("https://script.google.com/macros/s/AKfycbxqnzojoqKN_GC_XqdhCTIb2YP8OswdUNBP69P-zf55u-gybpeouyTvcqchndRMG9cb0A/exec", {
      method: "POST",
      body: JSON.stringify({ action: "checkout",
                            orderText: orderText,
                            customerText: customerText                           })
    })
    .then(res => res.json())
    .then(data => console.log(data));





    // ส่ง Flex + Text ให้ลูกค้า
  /*  await liff.sendMessages([
      { type: "text", text: orderText },
      { type: "text", text: customerText }
    ]);*/
    await liff.sendMessages([flexMsg]);

    alert("ส่งคำสั่งซื้อแล้ว!");   

    cart.length = 0;
    saveCart();
    renderCart();
    showTab(2);
    liff.closeWindow();

  } catch (err) {
    //console.error(err);
    console.error('sendMessages error:', err);
    alert("ส่งข้อความไม่สำเร็จ");
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
