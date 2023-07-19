document.querySelector('a[href="#section1"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#project').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.querySelector('a[href="#section2"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#resume').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.querySelector('a[href="#section3"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.querySelector('a[href="#section4"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#section4').scrollIntoView({ behavior: 'smooth' });
  });
  
  

  