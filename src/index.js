module.exports = ()  => `
<!DOCTYPE html>
<html>
  <head>
    <title>Mock cookie</title>
    
  </head>

  <body>
    <div id="cookie1"></div>
    <script>
      function listCookies() {
          var theCookies = document.cookie.split(';');
          console.log(document.cookie)
          var aString = '';
          for (var i = 1 ; i <= theCookies.length; i++) {
              aString += i + ' ' + theCookies[i-1] + "\\n";
          }
          return aString;
      }
      document.getElementById("cookie1").innerHTML=listCookies();
    </script>
  </body>


</html>`