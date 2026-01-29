document.addEventListener('DOMContentLoaded', function() {
    const templateContainer = document.querySelector('.templatecontainer');
    const templateTab = document.querySelector('.templatetab');
    const templateButton = document.getElementById('templates');
    const closeButton = document.getElementById('closeTemplates');

    const noCallPar = document.getElementById('noCall');
    const noCallButton = document.getElementById('noCall2');

    const afterCallPar = document.getElementById('afterCall');
    const afterCallButton = document.getElementById('afterCall2');

    const exampleRequestPar = document.getElementById('exampleRequest');
    const exampleRequestButton = document.getElementById('exampleRequest2');

    const timelineButtons = document.querySelectorAll('.timeline button');

    function adjustContainerRightPosition() {
        templateContainer.style.right = '0';
        const hiddenButton = document.getElementById('closeTemplates');
        hiddenButton.style.display = 'block';
    }

    function resetContainerRightPosition() {
        templateContainer.style.right = '';
        const hiddenButton = document.getElementById('closeTemplates');
        hiddenButton.style.display = 'none';
        templateTab.style.display = 'none'; // Hide the templatetab
    }

    function showTemplateTab() {
        templateTab.style.display = 'block';
    }

    // template select buttons
    function showNoCall() {
        noCallPar.style.display = 'block';
        afterCallPar.style.display = 'none';
        exampleRequestPar.style.display = 'none';
    }

    function showAfterCallPar() {
        afterCallPar.style.display = 'block';
        noCallPar.style.display = 'none';
        exampleRequestPar.style.display = 'none';
    }

    function showExampleRequest() {
        exampleRequestPar.style.display = 'block';
        noCallPar.style.display = 'none';
        afterCallPar.style.display = 'none';
    }

    // timeline highlight function
    function highlightMonth() {
        let currentMonth = new Date().getMonth();
        let monthButtons = document.querySelectorAll('.timeline button');

        // remove any previous highlight
        monthButtons.forEach(button => {
            button.classList.remove('highlighted');
        });

        // add highlight to current month
        monthButtons[currentMonth].classList.add('highlighted');
    }

    function goalMonth() {
        if (this.classList.contains('goalmonth')) {
            this.classList.remove('goalmonth');
        } else {
            this.classList.add('goalmonth');
        }
    }

    // form submission to dashboard
    function displaySubmittedValue(value) {
        var dashboard = document.getElementById('dashboard');
        var itemDiv = document.createElement('div');
        itemDiv.textContent = '' + value;
        dashboard.appendChild(itemDiv);
    }

    document.getElementById('buildingfeatures').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent submission
        var formData = new FormData(this);
        var feature = formData.get('feature');
        displaySubmittedValue(feature);
        this.reset(); // Reset form
    });

    // clear dashboard
    function clearDashboard() {
         var dashboard = document.getElementById('dashboard');
    var childNodes = dashboard.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
        if (childNodes[i].nodeName !== 'H3') {
            dashboard.removeChild(childNodes[i]);
		}
	}	
	var contactInfoForm = document.getElementById('contactInfo');
	contactInfoForm.reset();
	
  }
  
  //copy template buttons
  const copyButton1 = document.getElementById('copyButton1');
  const copyButton2 = document.getElementById('copyButton2');
  const copyButton3 = document.getElementById('copyButton3');
 
 function showCopyButton1 () {
	 copyButton1.style.display = 'block';
        copyButton2.style.display = 'none';
		copyButton3.style.display = 'none';
	 
 }
 
 function showCopyButton2 () {
	 copyButton2.style.display = 'block';
        copyButton1.style.display = 'none';
		copyButton3.style.display = 'none';
	 
 }
 
 function showCopyButton3 () {
	 copyButton3.style.display = 'block';
        copyButton2.style.display = 'none';
		copyButton1.style.display = 'none';
	 
 }
 
 function copySpan(copyText) {
    var range = document.createRange();
    range.selectNode(document.getElementById(copyText));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function showFileInput () {
	const fileInput = document.getElementById('fileInput');
	fileInput.style.display = 'block';
}

function hideFileInput () {
	const fileInput = document.getElementById('fileInput');
	fileInput.style.display = 'none';
}

    // Event listener for the clear button
    document.getElementById('clearButton').addEventListener('click', function() {
        clearDashboard();
   });
   
   //event listeners for copy buttons
   copyButton1.addEventListener('click', function() {
    copySpan('copyText1');
});

copyButton2.addEventListener('click', function() {
    copySpan('copyText2');
});

copyButton3.addEventListener('click', function() {
    copySpan('copyText3');
});

    // Initially hide the template tab
    templateTab.style.display = 'none';

templateButton.addEventListener('click', function() {
	adjustContainerRightPosition();
	showTemplateTab();
	showFileInput();
});
    
	
    
     closeButton.addEventListener('click', function() {
		 resetContainerRightPosition();
		 hideFileInput();
		 
	 });

   
	noCallButton.addEventListener('click', function() {
    showNoCall();
    showCopyButton1();
	});

	afterCallButton.addEventListener('click', function() {
    showAfterCallPar();
    showCopyButton2();
});

	exampleRequestButton.addEventListener('click', function() {
    showExampleRequest();
    showCopyButton3();
});

    highlightMonth();

    timelineButtons.forEach(button => {
        button.addEventListener('click', goalMonth);
    });
	
	


});