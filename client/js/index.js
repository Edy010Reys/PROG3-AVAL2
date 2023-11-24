function showOptions() {
    var options = document.querySelector('#cellRight select');

    if (options.style.display === 'none') {
        options.style.display = 'block';
    } else {
        options.style.display = 'none';
    }
}

function redirectPage() {
    var selectElement = document.getElementById('optionSelect');
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;

    if (selectedOption) {
      window.location.href = selectedOption;
    }
  }
