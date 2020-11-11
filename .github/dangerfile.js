import { message, warn, markdown, danger } from 'danger'
var parser = require('fast-xml-parser');
const fs = require('fs');


var x = fs.readFileSync('.github/artifacts/result.xml');
var parsedXML = parser.parse(x.toString());
console.log(parsedXML);
/*var results = parsedXML.find(elem => elem.tagName == "results")
console.log(results);
results.childNodes.forEach(result => {
    console.log("result", result);
    let problem = result.childNodes.find(x => x.tagName == "problem").innerXML;
    let solution = result.childNodes.find(x => x.tagName == "solution").innerXML;
    let target = result.childNodes.find(x => x.tagName == "target").childNodes.filter(x => x.type == "element");
    let targetText = target.map(x => x.attributes.Location + ": " + x.innerXML ).join("\n");
    let name = result.attributes.Name;

    console.log(problem, solution, targetText, name);

    let type = message;
    target.forEach(problem => {
        if(problem.attributes.Severity == "High")
            type = warn;
    });

    type(problem + solution + "\n" + targetText);
})*/


var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR');
  markdown('> Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.');
}
