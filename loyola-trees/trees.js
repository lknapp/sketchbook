var trees;

trees = Papa.parse(fileInput.files[0], {
  complete: function(results) {
    console.functionlog(results);
  }
}
