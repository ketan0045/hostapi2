const Product = require("../models/product")
const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    let apiData = Product.find(queryObject);

    if (sort) {
        // let sortFix = sort.replace(",", " ");
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix)
    }

    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip1 = (page - 1) * limit;

    apiData = apiData.skip(skip1).limit(limit)

    console.log(queryObject, "queryObject seen in controller product.js file");

    const PProducts = await apiData;
    res.status(200).json({ PProducts, nbHits: PProducts.length  });
}

const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find(req.query)
    res.status(200).json({ myData, nbHits: myData.length });
}

module.exports = { getAllProducts, getAllProductsTesting }


// https://api.pujakaitem.com/api/products comin s,h am (3),marre (1.5),conform 100%


// const Product = require("../models/product")
// const getAllProducts = async (req, res) => {
//     const myData = await Product.find(req.query)
//     console.log(myData,"productdb to set data in database and then face in using find method")
//     res.status(200).json({ myData });
// }

// const getAllProductsTesting = async (req, res) => {
//     const myData = await Product.find(req.query)
//     res.status(200).json({ myData });
// }

// module.exports = { getAllProducts, getAllProductsTesting }

















