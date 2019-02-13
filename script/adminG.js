window.fs = new LightningFS("fs", {
    wipe: true
});
git.plugins.set("fs", window.fs);
window.pfs = pify(window.fs);

window.dir = "/tutorial";
console.log(dir);

async function init() {
    await pfs.mkdir(dir);
    // Behold - it is empty!
    await pfs.readdir(dir);

    await git.clone({
        dir,
        corsProxy: "https://cors.isomorphic-git.org",
        url: "https://github.com/arrebcer1/IIY.git",
        ref: "master",
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
        });
}

function removeCollege(college) {
    xdata.pop(college);
}

async function addCollege() {
    let btn = document.getElementById('addClg');
    btn.disabled = true;

    let name = document.getElementsByName('name')[0].value
    let about = document.getElementsByName('about')[0].value
    let price = document.getElementsByName('price')[0].value
    let country = document.getElementsByName('country')[0].value

    let college = {
        college: name,
        about,
        price,
        country
    }
    console.log(college);

    _addCollege(college)
    await commit();

    btn.disabled = false;

    alert("Added college")
}

function _addCollege(college) {
    xdata.push(college);
}

async function commit() {
    await pfs.writeFile(
        `${dir}/Data/colleges.json`,
        JSON.stringify(xdata),
        "utf8"
    );
    await git.add({
        dir,
        filepath: "Data/colleges.json"
    });
    await git.status({
        dir,
        filepath: "Data/college.json"
    });

    let sha = await git.commit({
        dir,
        message: `Update data - ${new Date().toString()}`,
        author: {
            name: "gitu",
            email: "Gitu1107@gmail.com"
        }
    });

    sha;

    await push();
}

async function push() {
    await git.push({
        dir: dir,
        username: "Gituzz",
        password: "123456789gitu@"
    });
}


getContactsData();

function displayCollege() {
    new Vue({
        el: '#collegeList',
        data: {
            colleges: xdata
        }
    });
}
setTimeout(async () => {
    displayCollege()
    await init();
}, 2000);