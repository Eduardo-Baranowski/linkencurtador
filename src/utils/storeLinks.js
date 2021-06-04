import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLinksSave(key){
    const myLinks = await AsyncStorage.getItem(key);

    let linkSaves = JSON.parse(myLinks) || [];

    return linkSaves;
}

export async function saveLink(key, newLink){
    let linksStored = await getLinksSave(key);

    const hasLink = linksStored.some(link => link.id === newLink.id);

    if(hasLink){
        console.log("Link já existe!")
        return;
    }

    linksStored.push(newLink);
    await AsyncStorage.setItem(key, JSON.stringify(linksStored));
    console.log('Link salvo com sucesso!')

}

export async function deleteLink(links, id){
    let myLinks = links.filter((item)=> {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('sujeitolinks', JSON.stringify(myLinks))

    console.log('link deletado');

    return myLinks;
}