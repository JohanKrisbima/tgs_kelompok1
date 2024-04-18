import Products from "../model/ProductModel.js";
import numeral from "numeral";

export const getProduct = async (req, res) => {
  try {
    const products = await Products.findAll();

    const formattedProducts = products.map((product) => ({
      ...product.dataValues,
      price: numeral(product.price).format("0,0"),
    }));

    const success = req.flash("success");
    //   res.json(products);
    res.render("product", {
      products: formattedProducts,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

export const showAdd = async (req, res) => {
  try {
    res.render("addProduct");
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name_product, category, price, quantity } = req.body;
    const newProduct = await Products.create({
      name_product,
      category,
      price,
      quantity,
    });
    // Redirect to the products page or wherever appropriate
    req.flash("success", "Product Berhasil Ditambahkan");
    res.redirect("/product");
  } catch (error) {
    console.error("Failed to add product:", error);
    res.status(500).send("Failed to create a new product.");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Products.destroy({
      where: { id: id },
    });

    req.flash("success", "Product Berhasil Dihapus");
    res.redirect("/product");
  } catch (error) {}
};

export const viewUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Products.findByPk(id);

    // res.render("updateProduct", {
    //   product: products,
    // });
    res.render("updateProduct", {
      products,
    });
  } catch (error) {
    console.error("Error viewing update page:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name_product, category, price, quantity } = req.body;

    const productToUpddate = await Products.findByPk(id);

    // update data product
    productToUpddate.name_product = name_product;
    productToUpddate.category = category;
    productToUpddate.price = price;
    productToUpddate.quantity = quantity;

    await productToUpddate.save();

    req.flash("success", "Product updated successfully");
    res.redirect("/product");
  } catch (error) {
    console.error("Error viewing update page:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
