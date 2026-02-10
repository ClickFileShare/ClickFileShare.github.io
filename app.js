const SUPABASE_URL = "https://yubfmximcxsptveonsub.supabase.co";
const SUPABASE_KEY = "sb_publishable_dl_xDx-4wu9iFzR6ir1zvg_MxuYFd7r";
const BUCKET = "files";

const fileInput = document.getElementById("file");
const uploadBtn = document.getElementById("upload");
const status = document.getElementById("status");
const result = document.getElementById("result");
const bar = document.getElementById("bar");
const pct = document.getElementById("pct");
const drop = document.getElementById("drop");

["dragenter","dragover"].forEach(e=>drop.addEventListener(e,ev=>{
  ev.preventDefault(); drop.classList.add("drag");
}));
["dragleave","drop"].forEach(e=>drop.addEventListener(e,ev=>{
  ev.preventDefault(); drop.classList.remove("drag");
}));
drop.addEventListener("drop", ev=>{
  fileInput.files = ev.dataTransfer.files;
});

uploadBtn.onclick = () => {
  const file = fileInput.files[0];
  if (!file) return alert("ファイルを選択してください");

  const ext = file.name.split('.').pop();
  const filePath = crypto.randomUUID() + "." + ext;

  bar.style.width = "0%"; pct.textContent = "0%";
  status.textContent = "アップロード中…";
  result.textContent = "";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filePath}`);
  xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_KEY}`);
  xhr.setRequestHeader("apikey", SUPABASE_KEY);
  xhr.setRequestHeader("Content-Type", file.type);

  xhr.upload.onprogress = (e)=>{
    if (e.lengthComputable) {
      const p = Math.round((e.loaded / e.total) * 100);
      bar.style.width = p + "%";
      pct.textContent = p + "%";
    }
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
      status.textContent = "完了";
      result.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
    } else {
      status.textContent = "失敗 (" + xhr.status + ")";
    }
  };

  xhr.onerror = () => status.textContent = "通信エラー";
  xhr.send(file);
};
