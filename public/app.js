document.addEventListener("click", (event) => {
  // const id = event.target.dataset.id;
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      //  event.target.parentNode.remove();

      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    let update = prompt("Введите новое название");

    if (update !== "") {
      edit(id, update).then(() => {
        event.target.closest("li").innerText = update;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  await fetch(`/${id}`, { method: "PUT", body: JSON.stringify(title) });
}
