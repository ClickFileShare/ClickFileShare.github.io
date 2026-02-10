const SUPABASE_URL = "https://yubfmximcxsptveonsub.supabase.co";
const SUPABASE_KEY = "sb_publishable_dl_xDx-4wu9iFzR6ir1zvg_MxuYFd7r";
const BUCKET = "files";

const fileInput = document.getElementById("file");
const uploadBtn = document.getElementById("upload");
const status = document.getElementById("status");
const result = document.getElementById("result");

uploadBtn.onclick = async () => {
  if (!fileInput.files[0]) return alert("ファイルを選択してください");

  const file = fileInput.files[0];
  const filePath = `${Date.now()}-${file.name}`;

  status.textContent = "アップロード中...";

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filePath}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "apikey": SUPABASE_KEY,
      "Content-Type": file.type
    },
    body: file
  });

  if (!res.ok) {
    status.textContent = "失敗";
    return;
  }

  const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;

  status.textContent = "完了";
  result.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
};
