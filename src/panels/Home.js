import React from 'react';
import {Panel, ListItem, Button, Group, Div, Avatar, PanelHeader} from '@vkontakte/vkui';
import Modal from "../components/Modal";

const Home = ({id, go, fetchedUser, activeModal, onCloseModal, onJoinToGroup}) => (
    <Panel id={id}>
        <PanelHeader>Example</PanelHeader>
        {fetchedUser &&
        <Group title="User Data Fetched with VK Connect">
            <ListItem
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
            >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </ListItem>
        </Group>}

        <Group title="Navigation Example">
            <Div>
                <Button size="xl" level="2" onClick={go} data-to="persik">
                    Show me the Persik, please
                </Button>
            </Div>
        </Group>

    </Panel>
);

export default Home;
