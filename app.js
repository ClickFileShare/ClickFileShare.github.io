const API_KEY = "ここにあなたのAPIキー";

const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("file");
const result = document.getElementById("result");

uploadBtn.onclick = async () => {
  if (!fileInput.files[0]) return alert("ファイルを選択してください");

  const file = fileInput.files[0];
  result.innerText = "アップロード中...";

  const res = await fetch("https://api.web3.storage/upload", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    },
    body: file
  });

  const data = await res.json();
  const cid = data.cid;

  const url = `https://ipfs.io/ipfs/${cid}`;
  result.innerHTML = `
    <p>アップロード完了</p>
    <a href="${url}" target="_blank">${url}</a>
  `;
};
