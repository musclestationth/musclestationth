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
    { name: "T3 SA", price: 1100, image: "images/newproducts/t3-sa.png" },
    { name: "Telomed SA", price: 850, image: "images/newproducts/telomed-sa.png" },
    { name: "T3 SA", price: 1100, image: "images/newproducts/t3-sa.png" },
    { name: "Telomed SA", price: 850, image: "images/newproducts/telomed-sa.png" },
    { name: "T3 SA", price: 1100, image: "images/newproducts/t3-sa.png" },
    { name: "Telomed SA", price: 850, image: "images/newproducts/telomed-sa.png" },
    { name: "T3 SA", price: 1100, image: "images/newproducts/t3-sa.png" },
    { name: "Telomed SA", price: 850, image: "images/newproducts/telomed-sa.png" },
    { name: "Pre-Workout Extreme", price: 1200, image: "https://via.placeholder.com/200x150?text=Pre-Workout" }
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
      { name: "Anadrol Gainzlab 50mg100t", price: 1000, image: "images/anadrol/anadrol-gainz.png" },
      { name: "Anadrol Bodytech 50mg100t", price: 1200, image: "images/anadrol/anadrol-body.png" },
      { name: "Anadrol Meditech 50mg100t", price: 1200, image: "images/anadrol/anadrol-medi.png" },
      { name: "Anadrol Platinum 50mg100t", price: 1700, image: "images/anadrol/anadrol-plat.png" },
      { name: "Anadrol BPMedical 50mg100t", price: 1760, image: "images/anadrol/anadrol-bp.png" },
      { name: "Anadrol Beligas 50mg100t", price: 9999, image: "images/anadrol/anadrol-beligas.png" },
      { name: "Anadrol SA 25mg100t", price: 950, image: "images/anadrol/anadrol-sa.png" },
      { name: "Anadrol Alpha 50mg50t", price: 1600, image: "images/anadrol/anadrol-alpha.png" }
    ],
    "Anavar": [
      { name: "Anavar Gainzlab 10mg50t", price: 860, image: "images/anavar/anavar-gainz.png" },
      { name: "Anavar EuroMed 10mg50t", price: 950, image: "images/anavar/anavar-euro.png" },
      { name: "Anavar Beligas 10mg50t", price: 1090, image: "images/anavar/anavar1050-beligas.png" },
      { name: "Anavar Alpha 10mg50t", price: 1600, image: "images/anavar/anavar-alpha.png" },
      { name: "Anavar Bodytech 10mg100t", price: 1350, image: "images/anavar/anavar-body.png" },
      { name: "Anavar Meditech 10mg100t", price: 1350, image: "images/anavar/anavar10-medi.png" },
      { name: "Anavar SAAnabolic 10mg100t", price: 1600, image: "images/anavar/anavar-sa.png" },
      { name: "Anavar Platinum 10mg100t", price: 1800, image: "images/anavar/anavar-plat.png" },
      { name: "Anavar Beligas 10mg100t", price: 1890, image: "images/anavar/anavar10100-beligas.png" },
      { name: "Anavar BPMedical 15mg50t", price: 1540, image: "images/anavar/anavar-bp.png" },
      { name: "Anavar Synctech 15mg50t", price: 1900, image: "images/anavar/anavar-sync.png" },
      { name: "Anavar Meditech 50mg50t", price: 3000, image: "images/anavar/anavar50-medi.png" },
      { name: "Anavar Beligas 50mg50t", price: 3000, image: "images/anavar/anavar5050-beligas.png" },
      { name: "Anavar Beligas 50mg100t", price: 3790, image: "images/anavar/anavar50100-beligas.png" }
    ],
    "Clen": [
      { name: "Clen Alpha 40mcg50t\n&nbsp;\n&nbsp;", price: 600, image: "images/clen/clen-alpha.png" },
      { name: "Clen Beligas 40mcg50t\n&nbsp;\n&nbsp;", price: 850, image: "images/clen/clen50-beligas.png" },
      { name: "Clen Gainzlab 40mcg100t", price: 580, image: "images/clen/clen-gainz.png" },
      { name: "Clen Synctech 40mcg100t", price: 750, image: "images/clen/clen-sync.png" },
      { name: "Clen Bodytech 40mcg100t", price: 780, image: "images/clen/clen-body.png" },
      { name: "Clen Meditech 40mcg100t", price: 780, image: "images/clen/clen-medi.png" },
      { name: "Clen EuroMed 40mcg100t", price: 800, image: "images/clen/clen-euro.png" },
      { name: "Clen BPMedical 40mcg100t", price: 900, image: "images/clen/clen-bp.png" },
      { name: "Clen Platinum 40mcg100t", price: 1000, image: "images/clen/clen-plat.png" },
      { name: "Clen Beligas 40mcg100t\n&nbsp;", price: 1690, image: "images/clen/clen100-beligas.png" }
    ],
    "Primo": [
      { name: "Primotab Meditech 25mg50t", price: 1350, image: "images/primotab/primotab-medi.png" },
      { name: "Primotab Bodytech 25mg50t", price: 1350, image: "images/primotab/primotab-body.png" },
      { name: "Primotab BPMedical 25mg50t", price: 2200, image: "images/primotab/primotab-bp.png" },
      { name: "Primotab Beligas 25mg50t", price: 2890, image: "images/primotab/primotab-beligas.png" }
    ],
    "Dbol": [
      { name: "Dbol Gainzlab 10mg100t", price: 540, image: "images/dbol/dbol-gainz.png" },
      { name: "Dbol Bodytech 10mg100t", price: 740, image: "images/dbol/dbol-body.png" },
      { name: "Dbol BPMedical 10mg100t", price: 870, image: "images/dbol/dbol-bp.png" },
      { name: "Dbol Platinum 10mg100t", price: 1000, image: "images/dbol/dbol-plat.png" },
      { name: "Dbol Beligas 10mg100t", price: 9999, image: "" },
      { name: "Dbol Beligas 20mg50t", price: 1190, image: "images/dbol/dbol20-beligas.png" },
      { name: "Dbol Beligas 50mg50t", price: 2200, image: "images/dbol/dbol50-beligas.png" }
    ],
    "Tbol": [
      { name: "Tbol Bodytech 10mg50t", price: 1000, image: "images/tbol/tbol-body.png" },
      { name: "Tbol Meditech 10mg50t", price: 1000, image: "images/tbol/tbol-medi.png" },
      { name: "Tbol Platinum 10mg100t", price: 1400, image: "images/tbol/tbol-plat.png" },
      { name: "Tbol BPMedical 20mg100t", price: 1870, image: "images/tbol/tbol-bp.png" },
      { name: "Tbol Beligas 10mg100t", price: 9999, image: "images/tbol/tbol-beligas.png" }
    ],
    "T3": [
      { name: "T3 Gainzlab 25mcg100t", price: 580, image: "images/t3/t3-gainz.png" },
      { name: "T3 Bodytech 25mcg100t", price: 780, image: "images/t3/t3-body.png" },
      { name: "T3 Meditech 25mcg100t", price: 780, image: "images/t3/t3-medi.png" },
      { name: "T3 Synctech 25mcg100t", price: 800, image: "images/t3/t3-sync.png" },
      { name: "T3 BPMedical 25mcg100t", price: 1100, image: "images/t3/t3-bp.png" },
      { name: "T3 Beligas 50mcg50t", price: 1090, image: "images/t3/t350-beligas.png" },
      { name: "T3 Platinum 50mcg100t", price: 1200, image: "images/t3/t3-plat.png" },
       { name: "T3 SAAnabolic 25mcg200t", price: 1100, image: "images/t3/t3-sa.png" },
      { name: "T3 Beligas 50mcg100t", price: 1290, image: "images/t3/t3100-beligas.png" }
    ],
    "Test เม็ด": [
      { name: "Test เม็ด Beligas 40mg50t", price: 3090, image: "images/testเม็ด-beligas.png" }
    ],
    "Stano": [
      { name: "Stanotab Gainzlab 10mg100t", price: 700, image: "images/stanotab/stanotab-gainz.png" },
      { name: "Stanotab Beligas 10mg50t", price: 790, image: "images/stanotab/stanotab-beligas.png" },
      { name: "Stanotab Alpha 10mg50t", price: 1000, image: "images/stanotab/stanotab-alpha.png" },
      { name: "Stanotab EuroMed 10mg100t", price: 850, image: "images/stanotab/stanotab-euro.png" },
      { name: "Stanotab Synctech 10mg100t", price: 850, image: "images/stanotab/stanotab-sync.png" },
      { name: "Stanotab Meditech 10mg100t", price: 900, image: "images/stanotab/stanotab-medi.png" },
      { name: "Stanotab Bodytech 10mg100t", price: 900, image: "images/stanotab/stanotab-body.png" },

      { name: "Stanotab SAAnabolic 10mg100t", price: 1000, image: "images/stanotab/stanotab-sa.png" },
      { name: "Stanotab Platinum 10mg100t", price: 1200, image: "images/stanotab/stanotab-plat.png" },
      { name: "Stanotab BPMedical 10mg100t", price: 1210, image: "images/stanotab/stanotab-bp.png" },
      { name: "Stanotab Beligas 10mg100t", price: 1290, image: "images/stanotab/stanotab10100-beligas.png" },
      { name: "Stanotab Beligas 20mg50t", price: 790, image: "images/stanotab/stanotab2050-beligas.png" },
      { name: "Stanotab Beligas 50mg50t", price: 2090, image: "images/stanotab/stanotab5050-beligas.png" }
    ],
    "Proviron": [
      { name: "Proviron Beligas 20mg50t", price: 1490, image: "images/prov/prov50-beligas.png" },
      { name: "Proviron Beligas 20mg100t", price: 1890, image: "images/prov/prov100-beligas.png" },
      { name: "Proviron Meditech 25mg50t", price: 1150, image: "images/prov/prov-medi.png" },
      { name: "Proviron BPMedical 25mg50t", price: 1320, image: "images/prov/prov-bp.png" },
      { name: "Proviron SAAnabolic 25mg100t", price: 1800, image: "images/prov/prov-sa.png" },
      { name: "Proviron Platinum 25mg100t", price: 1950, image: "images/prov/prov-plat.png" },
      { name: "Proviron Alpha 25mg100t", price: 2200, image: "images/prov/prov-alpha.png" }
    ],
    "Halotestin": [
      { name: "Halotestin Beligas 10mg50t", price: 2300, image: "images/halo/halo50-beligas.png" },
      { name: "Halotestin Beligas 10mg100t", price: 3500, image: "images/halo/halo100-beligas.png" },
      { name: "Halotestin BPMedical 10mg", price: 9999, image: "images/halo/halo-bp.png" }
    ],
    "Superdrol": [
      { name: "Superdrol Beligas 10mg50t", price: 1190, image: "images/superdrol/super-beligas.png" },
      { name: "Superdrol Bodytech 10mg50t", price: 1190, image: "images/superdrol/super-body.png" },
      { name: "Superdrol Meditech 10mg50t", price: 1200, image: "images/superdrol/super-medi.png" },
      { name: "Superdrol BPMedical 10mg50t", price: 1760, image: "images/superdrol/super-bp.png" }
    ],
    "Oral etc.": [
      { name: "Synctech mix1 15+10mg50t", price: 1550, image: "images/oraletc/mix1-sync.png" },
      { name: "Synctech mix2 20+10mg50t", price: 1700, image: "images/oraletc/mix2-sync.png" },
      { name: "SA Telomed 50t", price: 890, image: "images/oraletc/telomed-sa.png" }
    ]
  },
  "Injection AAS": {
    "TestC": [
      { name: "หม้อซุป", price: 650, image: "images/pot.jpg" },
      { name: "กระทะเหล็ก", price: 450, image: "images/pan.jpg" }
    ],
    "TestE": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "TestProp": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "Sustanon": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "TrenA": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "TrenE": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "TrenHex": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "Stano": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "MastE": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "MastP": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "Primo": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "NPP": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "EQ": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "Deca": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ],
    "Injection etc.": [
      { name: "หม้อหุงข้าวไฟฟ้า", price: 890, image: "images/ricecooker.jpg" },
      { name: "เครื่องปั่น", price: 750, image: "images/blender.jpg" }
    ]
  },
  "SARMs": {
    "MK677": [
      { name: "กาแฟคั่วบด 250g", price: 150, image: "images/coffee.jpg" },
      { name: "ชาดำ 200g", price: 120, image: "images/tea.jpg" }
    ],
    "RAD140": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ],
    "GW501516": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ],
    "MK2866": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ],
    "YK11": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ],
    "LGD4033": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ],
    "S4": [
      { name: "น้ำส้ม 1L", price: 65, image: "images/orangejuice.jpg" },
      { name: "น้ำองุ่น 1L", price: 70, image: "images/grapejuice.jpg" }
    ]

  },
  "HGH & Peptide": {
    "HGH": [
      { name: "น้ำยาล้างจาน", price: 45, image: "images/dishwash.jpg" },
      { name: "ผงซักฟอก", price: 85, image: "images/detergent.jpg" }
    ],
    "IGF1": [
      { name: "เตารีดไฟฟ้า", price: 390, image: "images/iron.jpg" },
      { name: "ไม้แขวนเสื้อ", price: 20, image: "images/hanger.jpg" }
    ],
    "HCG": [
      { name: "เตารีดไฟฟ้า", price: 390, image: "images/iron.jpg" },
      { name: "ไม้แขวนเสื้อ", price: 20, image: "images/hanger.jpg" }
    ],
    "TB500/BPC157": [
      { name: "เตารีดไฟฟ้า", price: 390, image: "images/iron.jpg" },
      { name: "ไม้แขวนเสื้อ", price: 20, image: "images/hanger.jpg" }
    ],
    "Peptide etc.": [
      { name: "เตารีดไฟฟ้า", price: 390, image: "images/iron.jpg" },
      { name: "ไม้แขวนเสื้อ", price: 20, image: "images/hanger.jpg" }
    ]
  },
  "PCT": {
    "Arimidex": [
      { name: "มาม่ารสต้มยำ 5 ซอง", price: 60, image: "images/mama.jpg" },
      { name: "ไวไวรสหมูสับ 5 ซอง", price: 55, image: "images/wiwai.jpg" }
    ],
    "Aromasin": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "Caber": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "Nolvadex": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "Femara": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "Clomid": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "Proviron": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ],
    "HCG": [
      { name: "ปลากระป๋อง", price: 25, image: "images/cannedfish.jpg" },
      { name: "ถั่วแดงกระป๋อง", price: 35, image: "images/cannedbeans.jpg" }
    ]
  },
  "Fat Burn & Weight-loss": {
    "Oral": [
      { name: "มันฝรั่งทอด", price: 35, image: "images/chips.jpg" },
      { name: "ข้าวเกรียบกุ้ง", price: 30, image: "images/shrimpchips.jpg" }
    ],
    "Insulin": [
      { name: "คุกกี้เนย", price: 120, image: "images/cookies.jpg" },
      { name: "เค้กช็อกโกแลต", price: 150, image: "images/chocolatecake.jpg" }
    ],
    "Semaglutide": [
      { name: "คุกกี้เนย", price: 120, image: "images/cookies.jpg" },
      { name: "เค้กช็อกโกแลต", price: 150, image: "images/chocolatecake.jpg" }
    ],
    "Tirzepatide": [
      { name: "คุกกี้เนย", price: 120, image: "images/cookies.jpg" },
      { name: "เค้กช็อกโกแลต", price: 150, image: "images/chocolatecake.jpg" }
    ],
    "Retatrutide": [
      { name: "คุกกี้เนย", price: 120, image: "images/cookies.jpg" },
      { name: "เค้กช็อกโกแลต", price: 150, image: "images/chocolatecake.jpg" }
    ],
    "etc.": [
      { name: "คุกกี้เนย", price: 120, image: "images/cookies.jpg" },
      { name: "เค้กช็อกโกแลต", price: 150, image: "images/chocolatecake.jpg" }
    ]
  },
  "Supplements": {
    "Tudca": [
      { name: "ผักกาดขาว", price: 25, image: "images/chinesecabbage.jpg" },
      { name: "ผักบุ้ง", price: 15, image: "images/morningglory.jpg" }
    ],
    "Acne/Skin Support": [
      { name: "มะม่วง", price: 45, image: "images/mango.jpg" },
      { name: "กล้วยน้ำว้า", price: 35, image: "images/banana.jpg" }
    ],
    "Blood Sugar & Fat Metabolism": [
      { name: "มะม่วง", price: 45, image: "images/mango.jpg" },
      { name: "กล้วยน้ำว้า", price: 35, image: "images/banana.jpg" }
    ],
    "Anti-aging & NAD+ Boosters": [
      { name: "มะม่วง", price: 45, image: "images/mango.jpg" },
      { name: "กล้วยน้ำว้า", price: 35, image: "images/banana.jpg" }
    ],
    "Thyroid/Mineral Support": [
      { name: "มะม่วง", price: 45, image: "images/mango.jpg" },
      { name: "กล้วยน้ำว้า", price: 35, image: "images/banana.jpg" }
    ]
  },
  "Sexual Performance": {
    "Cialis": [
      { name: "หมูสับ 1 กก.", price: 150, image: "images/mincepork.jpg" },
      { name: "หมูสามชั้น 1 กก.", price: 180, image: "images/porkbelly.jpg" }
    ],
    "Viagra": [
      { name: "น่องไก่ 1 กก.", price: 120, image: "images/chickenleg.jpg" },
      { name: "อกไก่ 1 กก.", price: 130, image: "images/chickenbreast.jpg" }
    ],
    "Kama Jelly": [
      { name: "น่องไก่ 1 กก.", price: 120, image: "images/chickenleg.jpg" },
      { name: "อกไก่ 1 กก.", price: 130, image: "images/chickenbreast.jpg" }
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
      { type: "text", text: `${item.name} x${item.qty}`, size: "sm", color: "#555555", flex: 0 },
      { type: "text", text: `${item.price * item.qty}฿`, size: "sm", color: "#111111", align: "end" }
    ]
  }));

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const flexMsg = {
    type: "flex",
    altText: "ใบเสร็จการสั่งซื้อ",
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
              { type: "text", text: "รวมทั้งหมด", size: "sm", color: "#555555" },
              { type: "text", text: `${totalPrice}฿`, size: "sm", color: "#111111", align: "end", weight: "bold" }
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
          }
        ]
      }


    }
  };

  try {
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
