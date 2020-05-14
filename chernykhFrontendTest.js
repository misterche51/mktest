// Write string preparation function, which fill template in with data from
// specified object

// 18-52

// Mock object
const test =  {
  id: 20,
  type_id: 'test',
}
// Template: /api/items/%id%/%type_id%
// Expected result: /api/items/20/test
// Это было первое решение, оторванное о дальнейшего контекста;
// const preparationFunc = (dataObj) => `/api/items/${dataObj.id}/${dataObj.type_id}`;


// В данной реализации код, который до этого лежал в теле функции getApiPath;
// не уверен, что использование этой функции внутри getApiPath делает код читабельнее

const preparationFunc = (obj, template) => {
  // определяем ключи объекта, по которым будем искать значение в объекте
  const fields = template.match(/(?<=\%)\w+(?=\%)/gi);
  // 53 и 54 строку можно объеденить, сразу присвоив в result стартовое значение
  // вообще можно было захардкодить startPoint как /api/items/ , но так выглядит более гибко
  const startPoint = template.split('/%')[0];
  let result = startPoint;
  for (let item of fields) {
    let value = obj[item];
    if (typeof value === 'string') {
      result += `/${value.replace(/\s/g, '%20')}`;
    } else {
      result += `/${value}`;
    }
  }
  return result;

}
console.log(
  'preparation function output ', preparationFunc(test, '/api/items/%id%/%type_id%'),
  '\nexpected "/api/items/20/test"'
);

const user = {
  id: 20,
  name: "John Dow",
  role: "QA",
  salary: 100,
};

const user2 = {
  id: 21,
  name: "Alexander Chernykh",
  role: "Frontend Dev",
  salary: 100,
};

const user3 = {
  id: 22,
  name: "Massimo Osti",
  role: "Frontend Tech Lead",
  salary: 10000,
};

const apiTemplatesSet1 = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%"
];

const apiPathes = (user) =>
  apiTemplatesSet1.map(apiPathTemplate => {
    return getApiPath(user, apiPathTemplate);
});


const getApiPath = (obj, template) => preparationFunc(obj, template);


console.log(JSON.stringify(apiPathes(user)));
console.log(JSON.stringify(apiPathes(user2)));
console.log(JSON.stringify(apiPathes(user3)));


// ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"]

//первое верное решение в 19-30;
//протестировал с различными входными данными в 19-37;
//из возможных улучшений для этого решения мне видится какое-то дефолтное значение, если данного ключа нет в объекте;
//в 20-00 подготовил сопроводительное письмо и переписал код функций getApiPath и preparationFunc
