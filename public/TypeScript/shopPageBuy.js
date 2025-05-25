document.querySelectorAll('.buyBtn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const itemDiv = e.target.closest('.item');
    const name = itemDiv.dataset.name;
    const price = Number(itemDiv.dataset.price);

    try {
      const res = await fetch('/buyItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        document.getElementById('vbucksCounter').textContent = data.newVbucks;
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Er is iets fout gegaan bij de aankoop.");
      console.error(err);
    }
  });
});