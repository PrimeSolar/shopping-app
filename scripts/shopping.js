const db = new Dexie("ShoppingApp");
db.version(1).stores({
  items: "++id, description, price, quantity, purchased",
});

const itemForm = document.getElementById("itemForm");
const itemsDiv = document.getElementById("itemsDiv");
const totalPriceDiv = document.getElementById("totalPriceDiv");
const clearButton = document.getElementById("clearButton");
const submitButton = document.getElementById("submitButton");

let editingItemId = null;

document.addEventListener("DOMContentLoaded", displayItems);

itemForm.onsubmit = async (event) => {
  event.preventDefault();

  const description = document.getElementById("nameInput").value;
  const quantity = parseInt(document.getElementById("quantityInput").value, 10);
  const price = parseFloat(document.getElementById("priceInput").value);

  if (editingItemId) {
    await db.items.update(editingItemId, { description, quantity, price });
    editingItemId = null; // Reset editing identifier
    alert("Item updated successfully.");
  } else {
    await db.items.add({ description, quantity, price, purchased: false });
    alert("Item added successfully.");
  }

  // Reset the form
  itemForm.reset();

  // Update the displayed items
  displayItems();
};

async function displayItems() {
  itemsDiv.innerHTML = ""; // Clear existing items
  const items = await db.items.toArray();
  let totalPrice = 0;

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = `item ${item.purchased ? "purchased" : ""}`;

    itemDiv.innerHTML = `
          <label>
              <input type="checkbox" class="checkbox" ${
                item.purchased ? "checked" : ""
              } onchange="togglePurchased(${item.id}, this.checked)" />
          </label>
          <div class="itemInfo">
              <p>${item.description}</p>
              <p>${item.quantity} x ${item.price.toFixed(2)}$</p>
          </div>
          <div class="button-container">
              <button type="button" class="editButton" id="editButton${
                item.id
              }" onclick="editItem(${item.id}, this)">Edit</button>
              <button type="button" class="deleteButton" onclick="deleteItem(${
                item.id
              })">x</button>
          </div>
      `;

    itemsDiv.appendChild(itemDiv);
    totalPrice += item.quantity * item.price; // Calculate total price
  });

  totalPriceDiv.innerText = `Total Price: ${totalPrice.toFixed(2)}$`;
}

const togglePurchased = async (id, purchased) => {
  await db.items.update(id, { purchased });
  displayItems();
};

const deleteItem = async (id) => {
  if (confirm("Are you sure you want to delete this item?")) {
    await db.items.delete(id);
    displayItems();
    alert("Item deleted successfully.");
  }
};

const editItem = async (id, button) => {
  const item = await db.items.get(id);
  document.getElementById("nameInput").value = item.description;
  document.getElementById("quantityInput").value = item.quantity;
  document.getElementById("priceInput").value = item.price;

  editingItemId = id;

  // Change the button text to "Cancel"
  button.innerText = "Cancel";
  button.setAttribute("onclick", `cancelEdit(${id}, this)`);
};

const cancelEdit = (id, button) => {
  // Reset the editing item identifier
  editingItemId = null;

  // Reset the form
  itemForm.reset();

  button.innerText = "Edit";
  button.setAttribute("onclick", `editItem(${id}, this)`);
};

clearButton.onclick = async () => {
  if (confirm("Are you sure you want to clear all items?")) {
    await db.items.clear();
    displayItems();
    alert("All items cleared successfully."); // Alert message after clearing
  }
};
