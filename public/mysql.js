const mysql = require("mysql");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

const port = 2002;
app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);

const mysqlConnection = mysql.createConnection({
  user: "myDBuser",
  password: "54321#",
  host: "localhost",
  database: "mydb",
});
mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});
app.get("/install", (req, res) => {
  let iphoneproduct = `CREATE TABLE if not exists products(product_id int auto_increment,
    product_url VARCHAR(255) not null,
     product_name VARCHAR(255) not null,
     PRIMARY KEY(product_id))`;
  mysqlConnection.query(iphoneproduct, (err) => {
    if (err) console.log(err);
  });

  let createDescription = `CREATE TABLE if not exists productDescription(
      description_id int auto_increment,
      product_id int(11) not null,
      product_brief_description TEXT not null,
      product_description TEXT not null,
       product_img VARCHAR(255) not null,
       product_link VARCHAR(255) not null,
       PRIMARY KEY(description_id),
       FOREIGN KEY(product_id) REFERENCES products(product_id)
  )`;
  mysqlConnection.query(createDescription, (err) => {
    if (err) console.log(err);
  });

  let iphonePrice = `CREATE TABLE if not exists productprice(
      price_id int auto_increment,
      product_id int(11) not null,
      starting_price VARCHAR(255) not null,
       price_range VARCHAR(255) not null,
       PRIMARY KEY(price_id),
       FOREIGN KEY(product_id) REFERENCES products(product_id)
       )`;
  mysqlConnection.query(iphonePrice, (err) => {
    if (err) console.log(err);
  });

  let userdata = `CREATE TABLE if not exists User(
  user_id int auto_increment,
    User_name VARCHAR(255) not null,
     User_password VARCHAR(255) not null,
     PRIMARY KEY(user_id))`;

  mysqlConnection.query(userdata, (err) => {
    if (err) console.log(err);
  });

  let orderdata = `CREATE TABLE if not exists Orders(
  order_id int auto_increment,
    product_id int not null,
     user_id int,
     PRIMARY KEY(order_id),
     FOREIGN KEY(product_id) REFERENCES products(product_id),
     FOREIGN KEY(user_id) REFERENCES User(user_id)
     )`;

  mysqlConnection.query(orderdata, (err, result) => {
    if (err) console.log(err);
  });

  res.end("table created");
});

/////////isert table daynamic page

app.post("/addiphone", (req, res) => {
  // console.log(req.body);
  // let product = req.body.productUrl;
  // let name = req.body.productName;
  //object destructed//
  const {
    productUrl,
    productName,
    userName,
    userPassword,
    briefDescription,
    description,
    productImg,
    productLink,
    startingPrice,
    priceRange,
  } = req.body;
  let getone = `INSERT INTO products(product_url,product_name) VALUES( "${productUrl}", "${productName}" )`;

  mysqlConnection.query(getone, (err, result) => {
    // if (err) {
    //   console.log(err);
    // }
    if (err) throw err;
    console.log("1 record inserted");
  });
  let get2 = `INSERT INTO user(User_name,User_password) VALUES("${userName}", "${userPassword}")`;
  mysqlConnection.query(get2, (err) => {
    if (err) {
      console.log(err);
    }
  });
  let selection = `SELECT product_id,user_id FROM products JOIN user WHERE product_url="${productUrl}" AND User_name="${userName}"`;

  mysqlConnection.query(selection, (err, row) => {
    if (err) console.log(err);
    else console.log(row);
    let get3 = `INSERT INTO productDescription(product_id,product_brief_description,product_description,product_img,product_link) VALUES("${row[0].product_id}","${briefDescription}","${description}","${productImg}","${productLink}")`;
    mysqlConnection.query(get3, (err) => {
      if (err) console.log(err);
    });

    let get4 = `INSERT INTO productprice(product_id,starting_price,price_range) VALUES ("${row[0].product_id}","${startingPrice}","${priceRange}")`;
    mysqlConnection.query(get4, (err) => {
      if (err) console.log(err);
    });
    let get5 = `INSERT INTO Orders(product_id,user_id) VALUES("${row[0].product_id}","${row[0].user_id}")`;
    mysqlConnection.query(get5, (err) => {
      if (err) console.log(err);
    });
  });

  res.end("value inserted");
});

app.get("/iphones", (req, res) => {
  mysqlConnection.query(
    //     `SELECT products.product_id AS 'product ID', products. product_name,product_url,
    //  productprice.starting_price,price_range,
    // productDescription.product_brief_description,product_description,product_img,product_link FROM products JOIN productprice JOIN productDescription ON
    //     products.product_id = productprice.product_id AND products.product_id =productDescription.product_id`,

    `SELECT * FROM products JOIN productDescription JOIN productprice ON products.product_id = productDescription.product_id AND products.product_id = productprice.product_id`,

    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      var stringIphones = JSON.stringify(iphones);
      if (!err) res.end(stringIphones);
      else console.log(err);
    }
  );
});
