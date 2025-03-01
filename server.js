const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const realProducts = [
    "iPhone 15", "Samsung Galaxy S23", "MacBook Pro", "Dell XPS 13",
    "Sony WH-1000XM5 Headphones", "Nike Air Max", "Apple Watch Series 9",
    "PlayStation 5", "Xbox Series X", "GoPro Hero 12",
    "Tesla Model 3 Battery", "HP Spectre x360", "Bose SoundLink Speaker",
    "Samsung 4K TV", "Google Pixel 8", "Canon EOS R5 Camera",
    "Lenovo ThinkPad X1", "Dyson Air Purifier", "JBL Flip 6 Speaker"
];

function getRandomProducts() {
    const statuses = ["Pass", "Warning", "Fail"];
    let usedIds = new Set();
    let usedNames = new Set();

    return Array.from({ length: 4 }, () => {
        let randomId, randomName;
        
        do {
            randomId = Math.floor(Math.random() * 9000) + 1000; // 4-digit ID
        } while (usedIds.has(randomId));
        usedIds.add(randomId);

        do {
            randomName = realProducts[Math.floor(Math.random() * realProducts.length)];
        } while (usedNames.has(randomName));
        usedNames.add(randomName);

        return {
            id: randomId,
            name: randomName,
            defects: Math.floor(Math.random() * 10),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        };
    });
}

app.get("/api/product-validation", (req, res) => {
    res.json({
        validationScore: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleTimeString(),
        products: getRandomProducts()
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
