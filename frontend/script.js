const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileElem');
const uploadBtn = document.getElementById('uploadBtn');
const promptEl = document.getElementById('prompt');
const infoEl = document.getElementById('file-info');
const nameEl = document.getElementById('file-name');
let selectedFile = null;

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('hover'), false);
});
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('hover'), false);
});

dropArea.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', () => handleFiles(fileInput.files), false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  handleFiles(dt.files);
}

function handleFiles(files) {
  if (!files.length) return;
  const file = files[0];
  if (file.name.endsWith('.docx')) {
    const shortName = file.name.length > 17 
      ? file.name.slice(0, 17) + '...'
      : file.name;
    nameEl.textContent = shortName;
    selectedFile = file;
    uploadBtn.disabled = false;
    promptEl.classList.add('hidden');
    infoEl.querySelector('.file-icon').classList.remove('hidden');
    infoEl.querySelector('#file-name').textContent = shortName;

  } else {
    alert('Пожалуйста, выберите файл формата .docx');
  }
}

uploadBtn.addEventListener('click', () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append('document', selectedFile);
  
    fetch('http://localhost:3000/file-checker/convert', {
      method: 'POST',
      body: formData,
      mode: 'cors'        
    })
      .then(response => {
        console.log('Status:', response.status, response.statusText);
        if (!response.ok) {
          return response.text()
            .then(text => { throw new Error(`Server error ${response.status}: ${text}`); });
        }
        return response.blob();
      })
      .then(blob => {
        console.log('Blob size:', blob.size);
        if (blob.size === 0) {
          throw new Error('Получен пустой файл (size 0)');
        }
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'new_file.docx'; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('❌ Ошибка при скачивании файла:', err);
        alert(`Не удалось скачать файл:\n${err.message}`);
      });
  });
  