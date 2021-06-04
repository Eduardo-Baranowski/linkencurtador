import React, {useState, useEffect} from 'react';
import { Modal, ActivityIndicator } from "react-native";
import ListItem from '../../components/ListItem';
import { useIsFocused } from "@react-navigation/native";

import Menu from "../../components/Menu";
import StatusBarPage from '../../components/StatusBarPage';

import { Container, Title, ListLinks, ContainerEmpty, WarninText } from './styles';

import ModalLink from "../../components/ModalLink";

import { getLinksSave, deleteLink } from '../../utils/storeLinks';

export default function MyLinks() {

    const [links, setLinks] = useState([]);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState();
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function getLinks(){
            const result = await getLinksSave('sujeitolinks');
            setLinks(result);
            setLoading(false);
        }

        getLinks();
    },[isFocused])

    function handleItem(item){
        setData(item);
        setModalVisible(true);
    }

    async function handleDelete(id){
        const result = await deleteLink(links, id);
        setLinks(result);
    }

    return(
        <Container>
            <StatusBarPage
                barStyle="light-context"
                backgroundColor="#132742"
            />

            <Menu />
            <Title>Meus Links</Title>
            { loading &&(
                <ContainerEmpty>
                    <ActivityIndicator color="fff" size={25}/>
                </ContainerEmpty>                
            )

            }

            {
                !loading && links.length === 0 && (
                    <ContainerEmpty>
                        <WarninText>
                            Você ainda não possui nenhum link! :(
                        </WarninText>
                    </ContainerEmpty>
                )
            }

            <ListLinks 
                data={links}
                keyExtractor={(item) => String(item.id) }
                renderItem={ ({item}) => <ListItem data={item}  selectedItem={handleItem} deleteItem={handleDelete} /> }
                contentContainerStyle={{paddingBotton: 20}}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <ModalLink onClose={() => setModalVisible(false)} data={data}/>
            </Modal>
        </Container>
    )
}
