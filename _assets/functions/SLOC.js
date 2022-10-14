var fs = require('fs');
const { exec } = require('child_process');

async function getLinesOfCode(cb) {
    async function readOutput(stdout) {
        var index = stdout.search('Source');
        var lines = '';

        if (index === -1) return;

        while (isNaN(stdout[index]) || stdout[index] == ' ') {
            index++;
            if (!isNaN(stdout[index]) && stdout[index] !== ' ') {
                return readLines(index);
            }
        }

        function readLines(index) {
            while (!isNaN(stdout[index]) && stdout[index] !== ' ') {
                lines += stdout[index];
                index++;
            }
            lines = lines.replace('\n', '');

            return lines;
        }
    }

    function readCode() {
        fs.readdir('./', 'utf8', function (err, entity) {
            if (err) console.log(err);

            const folder = [
                '_bin',
                '_.github',
                'node_modules',
                'map',
                '.gitattributes',
                '.gitignore',
                'LICENSE',
                'package-lock.json',
                'package.json',
                'README.md',
                '.git',
                '.github',
                'plugins',
                'core',
                'ragemp-server',
            ];

            var codeLines = 0;

            for (let i in entity) {
                if (folder.includes(entity[i])) continue;

                exec(`sloc ./${entity[i]}`, async (err, stdout, stderr) => {
                    console.log(err);
                    var output = await readOutput(stdout);
                    if (output === undefined || output === null) return;

                    codeLines = Number(codeLines) + Number(output);
                });
            }
            setTimeout(() => {
                return cb(codeLines);
            }, 10000);
        });
    }
    readCode();
}
getLinesOfCode((cb) => {
    setTimeout(() => {
        console.log(`Lines of Code: ${cb}`);
    }, 10000);
});
module.exports = {
    getLinesOfCode,
};
