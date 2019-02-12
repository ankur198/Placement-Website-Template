window.fs = new LightningFS('fs', {
    wipe: true
})
git.plugins.set('fs', window.fs)
window.pfs = pify(window.fs)

window.dir = '/tutorial'
console.log(dir);

async function init() {
    await pfs.mkdir(dir);
    // Behold - it is empty!
    await pfs.readdir(dir);

    await git.clone({
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/arrebcer1/IIY.git',
        ref: 'master',
        singleBranch: true,
        depth: 1
    });

    // Now it should not be empty...
    await pfs.readdir(dir);
}

var xdata;

function getContactsData() {
    fetch("Data/colleges.json")
        .then(data => data.json())
        .then(data => {
            console.log(data);
            xdata = data;
            xdata.push({
                "country": "asdf",
                "college": "1234",
                "about": 12345,
                "price": 1234,
            })
        })
}

async function updateGit() {

    await pfs.writeFile(`${dir}/Data/colleges.json`, xdata, 'utf8')
    await git.status({
        dir,
        filepath: 'Data/college.json'
    })

    let sha = await git.commit({
        dir,
        message: 'Delete package.json and overwrite README.',
        author: {
            name: 'Ankur Nigam',
            email: 'ankur.nigam198@gmail.com'
        }
    })

    sha
}

async function commit() {
    await git.push({
        dir: dir,
        username: '4',
        password: '4',

    })
}