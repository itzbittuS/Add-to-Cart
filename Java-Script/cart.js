let cartData = JSON.parse(localStorage.getItem("MyCart")) || [];

let cartdetails = () => {
    let str = '';
    cartData.forEach((ele) => {
        str += `  <tr>
      <td ><img src="${ele.thumbnail}" alt="" class="w-25"></td>
      <td>${ele.Title}</td>
      <td><a onclick="return dicqty(${ele.id})"><i class="fa-solid fa-minus"></i>&nbsp&nbsp</a><span>${ele.qty}</span>&nbsp&nbsp<a onclick="return incqty(${ele.id})"><i class="fa-solid fa-plus"></i></a></td>
      <td>₹${ele.Price}</td>
     <td><button onclick="return deleteitm(${ele.id})" class="dc">Remove</button></td>
    </tr>
    `
    })

    document.querySelector('tbody').innerHTML = str;
    updateBadge();
}

let total = () => {
    let totalPrice = 0;
    cartData.forEach((ele) => {
        totalPrice += ele.Price
    })


    document.querySelector('.total').innerHTML = '<h3 class="text-dark bg-light text-end px-5">Total Price :- ' + totalPrice.toFixed(2) + ' ₹</h3>';

}

let updateBadge = () => {
    document.querySelector('.badge').innerHTML = cartData.length;
}
let incqty = (id) => {
    let cart = JSON.parse(localStorage.getItem("MyCart")) || [];
    let upDateqty = cart.find((ele) => ele.id == id);
    if (upDateqty) {
        upDateqty.qty = upDateqty.qty + 1;
        upDateqty.Price = upDateqty.unitPrice * upDateqty.qty;
    }
    localStorage.setItem("MyCart", JSON.stringify(cart));
    cartData = cart;
    total();
    cartdetails();
}

let dicqty = (id) => {
    let cart = JSON.parse(localStorage.getItem("MyCart")) || [];
    let upDateqty = cart.find((ele) => ele.id == id);
    if (upDateqty.qty > 1) {
        if (upDateqty) {
            upDateqty.qty = upDateqty.qty - 1;
            upDateqty.Price = upDateqty.unitPrice * upDateqty.qty;
        }
        localStorage.setItem("MyCart", JSON.stringify(cart));
        cartData = cart;
        total();
        cartdetails();
    }

}

let deleteitm = (id) => {
    let cart = JSON.parse(localStorage.getItem("MyCart")) || [];
    let remove = cart.filter((ele) => ele.id != id);
    localStorage.setItem("MyCart", JSON.stringify(remove));
    cartData = remove;
    updateBadge();
    total();
    cartdetails();
}

cartdetails();
updateBadge();
total();
cartdetails();

