//import { message, warn, markdown, danger } from 'danger'
const fs = require('fs');
var parseString = require('xml2js').parseString;

var xml = fs.readFileSync('.github/artifacts/result.xml');
parseString(xml, function (err, result) {
    result["gendarme-output"].results[0].rule.forEach(rule => {
        let problem = rule.problem.join("\n");
        let solution = rule.solution.join("\n");
        let target = rule.target;
        let name = rule["$"].Name;
        let targetText = rule.target.map(t => t.defect[0]["$"].Location + (t.defect[0]["_"] ? (": " + t.defect[0]["_"]) : "")).join("\n");

        let type = message;
        target.forEach(problem => {
            if(problem.defect[0]["$"].Severity == "High") {
                type = warn;
            }
        });

        type(problem + solution + "\n" + targetText);
    });
});

/*parsedXML["gendarme-output"].results.forEach(result => {
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
})


var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR');
  markdown('> Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.');
}*/
