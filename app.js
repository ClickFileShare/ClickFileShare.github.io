const API = "https://upload-api.takkunmcjp.workers.dev";

document.getElementById("send").onclick = async () => {
  const f = document.getElementById("file").files[0];
  if (!f) return alert("選択してください");

  const fd = new FormData();
  fd.append("file", f);

  const res = await fetch(API, { method:"POST", body:fd });
  const data = await res.json();

  document.getElementById("link").innerHTML =
    `<a href="${data.url}" target="_blank">${data.url}</a>`;
};
