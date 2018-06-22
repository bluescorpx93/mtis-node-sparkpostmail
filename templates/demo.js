exports.demoHTMLTemplate = (emailBody) => {
  var htmlContent = `
  <html>
    <body>
      <p> Hi There, </p>
      <p style='margin-top:20px; margin-bottom:20px;'> ${emailBody} </p>
      <p> DemoMailTesting Node App </p>
    </body>
  </html>`;
  return htmlContent;
}
