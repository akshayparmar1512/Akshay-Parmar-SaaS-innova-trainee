import { salesData } from "./dataset.js";
let totalRevenuecard = document.getElementById("totalrevenue");
let avgRevenuecard = document.getElementById("avg-revenue");
let highestproduct = document.getElementById("highestProduct")
let highestrevenue = document.getElementById("highestRevenue")
let lowestproduct = document.getElementById("lowestProduct")
let lowestrevenue = document.getElementById("lowestRevenue")
let tbody = document.getElementById("table-body")
let categorydropdown = document.getElementById("category-filter")
let monthdropdown = document.getElementById("month-filter")
let barchart = document.getElementById("bar-chart")
let linechart = document.getElementById("line-chart")

function calculateRevenue(salesData) {
  let updatedData = salesData.map((product) => {
    return {
      ...product,
      revenue: product.price * product.quantity,
    };
  });
  return updatedData;
}

let revenue = calculateRevenue(salesData);

function calculateTotalRevenue(revenue) {
  let totalRevenue = 0;
  revenue.forEach((product) => {
    return (totalRevenue += product.revenue);
  });
  console.log(totalRevenue);
  return totalRevenue;
}
let totalrevenue = calculateTotalRevenue(revenue);

totalRevenuecard.textContent = totalrevenue;

function calculateAverageRevenue(totalrevenue) {
  let avgrevenue = totalrevenue / salesData.length;
  console.log(avgrevenue);
  return avgrevenue;
}
let averageRevenue = calculateAverageRevenue(totalrevenue);
console.log(averageRevenue);

avgRevenuecard.textContent = averageRevenue;

function calculateHighestProductRevenue(revenue) {
  let highestProductRevenue = revenue[0];

  revenue.forEach((product) => {
    if (product.revenue > highestProductRevenue.revenue) {
      highestProductRevenue = product;
    }
  });

  return highestProductRevenue;
}

let highestProduct = calculateHighestProductRevenue(revenue);

console.log(highestProduct);

highestproduct.textContent = highestProduct.product
highestrevenue.textContent = highestProduct.revenue


function calculateLowestProductRevenue(revenue) {
  let lowestProductRevenue = revenue[0]

  revenue.forEach((product) => {
    if (product.revenue < lowestProductRevenue.revenue) {
      lowestProductRevenue = product
    }
  })
  return lowestProductRevenue
}

let lowestProduct = calculateLowestProductRevenue(revenue)
console.log(lowestProduct)

lowestproduct.textContent = lowestProduct.product
lowestrevenue.textContent = lowestProduct.revenue

function renderData(dataset) {
  tbody.innerHTML = ""
  dataset.forEach((data) => {
    let tr = document.createElement("tr")
    let productcell = document.createElement("td")
    let categorycell = document.createElement("td")
    let pricecell = document.createElement("td")
    let quantitycell = document.createElement("td")
    let revenuecell = document.createElement("td")
    let monthcell = document.createElement("td")

    productcell.textContent = data.product
    categorycell.textContent = data.category
    pricecell.textContent = data.price
    quantitycell.textContent = data.quantity
    revenuecell.textContent = data.revenue
    monthcell.textContent = data.month

    tr.append(productcell, categorycell, pricecell, quantitycell, revenuecell, monthcell)
    tbody.append(tr)
  })
}

renderData(revenue)

function filterUniqueCategory(dataset) {
  let uniqueCategory = []
  for (let index = 0; index < dataset.length; index++) {
    if (!(uniqueCategory.includes(dataset[index].category))) {
      uniqueCategory.push(dataset[index].category)
    }

  }
  return uniqueCategory
}

let uniquecatarr = filterUniqueCategory(salesData)

function createCategoryFilter(uniquecatarr) {

  let allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  categorydropdown.appendChild(allOption);


  uniquecatarr.forEach((category) => {
    let option = document.createElement("option")
    option.value = category
    option.textContent = category
    categorydropdown.appendChild(option)
  })
}

createCategoryFilter(uniquecatarr)

function filterUniqueMonth(dataset) {
  let uniqueMonth = []
  for (let index = 0; index < dataset.length; index++) {
    if (!(uniqueMonth.includes(dataset[index].month))) {
      uniqueMonth.push(dataset[index].month)
    }

  }
  return uniqueMonth
}

let uniquemonarr = filterUniqueMonth(salesData)


function createMonthFilter(uniquemonarr) {

  let allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  monthdropdown.appendChild(allOption);


  uniquemonarr.forEach((month) => {
    let option = document.createElement("option")
    option.value = month
    option.textContent = month
    monthdropdown.appendChild(option)
  })
}

createMonthFilter(uniquemonarr)


function applyFilter(revenue) {
  let categoryvalue = categorydropdown.value
  let monthvalue = monthdropdown.value
  console.log(categoryvalue)
  console.log(monthvalue)

  let filteredData = revenue.filter((item) => {
    let categoryMatch =
      categoryvalue === "all" || item.category === categoryvalue;

    let monthMatch =
      monthvalue === "all" || item.month === monthvalue;

    return categoryMatch && monthMatch;
  })
  console.log(filteredData)
  renderData(filteredData)

  createBarChart(filteredData)
  createLineChart(filteredData)

}


categorydropdown.addEventListener("change", (e) => {
  applyFilter(revenue)
})

monthdropdown.addEventListener("change", (e) => {
  applyFilter(revenue)
})

function getProductRevenue(revenue) {
  let barLabels = []
  let barData = []
  for (let index = 0; index < revenue.length; index++) {
    if (!barLabels.includes(revenue[index].product)) {
      barLabels.push(revenue[index].product)
    }

  }
  for (let item of barLabels) {
    let sum = 0
    for (let product of revenue) {
      if (product.product === item) {
        sum += product.revenue
      }
    }
    barData.push(sum)
    console.log(sum)
  }
  console.log(barData)
  return { barLabels, barData }
}

// getProductRevenue(revenue)

function getMonthRevenue(revenue) {
  let lineLabels = []
  let lineData = []
  for (let index = 0; index < revenue.length; index++) {
    if (!lineLabels.includes(revenue[index].month)) {
      lineLabels.push(revenue[index].month)
    }

  }
  for (let item of lineLabels) {
    let sum = 0
    for (let product of revenue) {
      if (product.month === item) {
        sum += product.revenue
      }
    }
    lineData.push(sum)
    console.log(sum)
  }
  console.log(lineData)
  console.log(lineLabels)
  return { lineLabels, lineData }
}
// getMonthRevenue(revenue)

let barChart;
let lineChart;

function createBarChart(revenue) {

  let chartData = getProductRevenue(revenue);

    if (barChart) {
        barChart.destroy();
    }

 barChart =  new Chart(barchart, {
    type: 'bar',
    data: {
      labels: chartData.barLabels,
      datasets: [{
        label: 'Revenue by Product',
        data: chartData.barData,
        backgroundColor: "#0077b6",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
createBarChart(revenue)

function createLineChart(revenue) {

  let linechartData = getMonthRevenue(revenue);

   if (lineChart) {
        lineChart.destroy();
    }

 lineChart =  new Chart(linechart, {
    type: 'line',
    data: {
      labels: linechartData.lineLabels,
      datasets: [{
        label: 'Monthly Revenue',
        data: linechartData.lineData,
        backgroundColor:"#e36414",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
createLineChart(revenue)