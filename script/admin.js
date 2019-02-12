window.fs = new LightningFS('fs', {
    wipe: true
})
//git.plugins.set('fs', window.fs)
//window.pfs = pify(window.fs)
window.dir = 'iiyGit'

BrowserFS.configure({
    fs: "IndexedDB",
    options: {}
}, function (err) {
    if (err) return console.log(err);
    window.fs = BrowserFS.BFSRequire("fs");
    git.plugins.set('fs', window.fs);
});

console.log(dir)

async function init() {
    await fs.mkdir(dir);
    await fs.readdir(dir);

    await git.clone({
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/arrebcer1/IIY.git',
        ref: 'master',
        singleBranch: true,
        depth: 2
    });

    // Now it should not be empty...
    await fs.readdir(dir);
}

var x

function saveData(...data) {
    x = data
}
var y

async function init1() {
    await fs.readFile(`${dir}/Data/colleges.json`, 'UTF-8', saveData)
}
async function addData(){
    y = JSON.parse(x[1])
    y.push({
        "country": "asdf",
        "college": "1234",
        "about": 12345,
        "price": 1234,
    })

    console.log(x)

    x = JSON.stringify(x)

    await fs.writeFile(`${dir}/Data/college.json`, y, 'utf8')
}