document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      //  event.target.parentNode.remove();

      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    //const id2 = event.target.dataset.id;
    let update = prompt("Введите новое название");
    if (update !== "") {
      editTitle(id, update).then(() => {
        event.target.closest("li").innerText = update;
      });
    }

    // if (update !== "") {
    //   edit(id, update).then(() => {
    //     event.target.closest("li").innerText = update;
    //   });
    // }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function editTitle(id, title) {
  const response = await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (response.ok) {
    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // catch (error) {
  //   if (error) {
  //     console.log(error);
  //   }
  // });

  // if (response.ok) {
  //   console.log("Note updated successfully!");
  // }
}

// async function edit( id, title ) {
//   await fetch(`/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(title),
//   });
// }
