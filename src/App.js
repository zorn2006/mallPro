import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const group_id = 185199781
const requiredToCallApi = {
    "v": "5.101",
    'access_token': '59f1b2e059f1b2e059f1b2e0c5599da582559f159f1b2e004b9e79590e7db44bab8b30c'
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            activeModal: null
        };
    }

    activateModal = () => {
        this.setState({activeModal: 'USER_SUBSCRIBE_MODAL'});
    };

    closeModal = () => {
        this.setState({activeModal: null});
    };

    joinToGroup = () => {
        connect.send("VKWebAppJoinGroup", {group_id});
        this.closeModal()
    };

    componentDidMount() {
        connect.subscribe(({detail}) => {
            console.log(detail);
            switch (detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: detail.data});
                    connect.send('VKWebAppCallAPIMethod', {
                        "method": "groups.isMember",
                        "params": {
                            group_id,
                            "request_id": "groups.isMember",
                            'user_id': detail.data.id, ...requiredToCallApi
                        }
                    });
                    break;
                case 'VKWebAppCallAPIMethodResult':
                    if (detail.data.request_id === 'groups.isMember' && detail.data.response === 0) {
                        this.activateModal()
                    } else {
                        console.log('VKWebAppOpenQR')
                        connect.send("VKWebAppOpenQR");
                    }
                    break;
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Home id="home"
                      fetchedUser={this.state.fetchedUser}
                      activeModal={this.state.activeModal}
                      onCloseModal={this.closeModal}
                      onJoinToGroup={this.joinToGroup}/>
            </View>
        );
    }
}

export default App;
