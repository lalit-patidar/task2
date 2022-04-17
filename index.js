const fs = require("fs");

(async function showListsId(fileName) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            return `something went wrong ${err}`
        }
        getAllListsId(data)
    });
})("data.json");

function getAllListsId(data) {
    const { domains } = JSON.parse(data)
    const listAllIds = [];
    for (let domain of domains) {
        const [type, domainName] = Object.keys(domain);
        for (let domainContent of domain[domainName]) {
            if (domainContent.listId) {
                console.log(domainContent.listId);
                listAllIds.push(domainContent.listId);
            }
            if (domainContent.type && !domainContent.listId) {
                const [type, subDomainName] = Object.keys(domainContent);
                domainContent[domainName].forEach(domainData => {
                    const [type, subdomainContentKey] = Object.keys(domainData);
                    domainData[subdomainContentKey].forEach(list => {
                        listAllIds.push(list.listId);
                    })
                })

            }
        }

    }

    console.log(listAllIds) // this is all list of ids.......

    return listAllIds;
}

