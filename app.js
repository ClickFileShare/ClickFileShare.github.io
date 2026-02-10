const API = "https://upload-api.takkunmcjp.workers.dev";

const fileInput = document.getElementById("file");
const uploadBtn = document.getElementById("upload");
const status = document.getElementById("status");
const result = document.getElementById("result");

uploadBtn.onclick = async () => {
  if (!fileInput.files[0]) return alert("ファイルを選択してください");

  status.textContent = "アップロード中...";
  result.textContent = "";

  const fd = new FormData();
  fd.append("file", fileInput.files[0]);

  try {
    const res = await fetch(API, {
      method: "POST",
      body: fd
    });

    const data = await res.json();

    status.textContent = "完了";
    result.innerHTML = `
      <p>共有リンク:</p>
      <a href="${data.url}" target="_blank">${data.url}</a>
    `;
  } catch (e) {
    status.textContent = "失敗しました";
  }
};
