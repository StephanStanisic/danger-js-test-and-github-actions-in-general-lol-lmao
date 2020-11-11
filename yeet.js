const fs = require('fs');

var x = fs.readFileSync('test.xml');
var parsedXML = (new DOMParser()).parseFromString(x, 'text/xml');
var results = parsedXML.getElementsByTagName("results")[0]
results.childNodes.forEach(result => {
    console.log(result);
    return;

    let problem = result.childNodes.find(x => x.tagName == "problem").innerXML;
    let solution = result.childNodes.find(x => x.tagName == "solution").innerXML;
    let target = result.childNodes.find(x => x.tagName == "target").childNodes.filter(x => x.type == "element");
    let targetText = target.map(x => x.attributes.Location + ": " + x.innerXML ).join("\n");
    let name = result.attributes.Name; 
    
    let type = message;
    target.forEach(problem => {
        if(problem.attributes.Severity == "High")
            type = warn;
    });

    type(problem + solution + "\n" + targetText);
})
