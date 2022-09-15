import { faker } from '@faker-js/faker';
import * as fs from 'fs';

// Set locale to use Vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        color: faker.color.human(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        categoryId: category.id,
      };
      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Po',
    },
  };
  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');
  });
})();
