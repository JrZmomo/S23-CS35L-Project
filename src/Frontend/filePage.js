function searchFiles() {
	const file_names = [];
	const Search_filename = window.prompt("Enter the complete name of the file you want to open");
  
	fetch('http://localhost:3000/files')
	  .then(response => response.json())
	  .then(data => {
		data.forEach(file => {
		  file_names.push(file.filename);
		});
  
		if (file_names.includes(Search_filename)) {
		  window.location.href = './translate.html?fileName=' + Search_filename;
		} else {
		  while (true) {
			const input = window.prompt("File not found. Please enter a valid file name.");
			if (file_names.includes(input)) {
			  window.location.href = './translate.html?fileName=' + input;
			  break;
			} else {
			  continue;
			}
		  }
		}
	  })
	  .catch(error => console.error(error));
  }
  
  const searchBtn = document.querySelector('.info-btn.search');
  searchBtn.addEventListener('click', searchFiles);
  