import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Button, Avatar, Group, ListItem, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios'

import Modal from "./components/Modal";

const GROUP_ID = { group_id: 71638966}
const COMMUNITY_ACCESS_TOKEN = { access_token: '34815d25f1f4e6454b4aaf064994f3afc5a2e6159f019dbd3000d7b590889b7e8abc057e772843630a997'}
const APP_ACCESS_TOKEN = { access_token: '9d0508949d0508949d050894679d680f4099d059d050894c08dd272bb177ca900380deb'}
const VERSION = {"v": "5.101"}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            isMember: false,
            isMessagesAllowed: false,
            fetchedUser: null,
            activeModal: null,
            QRResult: null,
            currentTitle: '',
            currentCaption: '',
            actionFlag: '',
            areaVal: '',

        };
    }

    startScanFlow = () => {
        this.openQRScanner()
    }

    handleQRResult = (QRResult = '1111111') => {
        this.setState({QRResult})

        if (this.state.isMember) {
            this.sendQRResult(this.state.QRResult)
        } else {
            connect.send('VKWebAppCallAPIMethod', {
                method: "groups.isMember",
                request_id: "groups.isMember",
                params: {
                    'user_id': this.state.fetchedUser.id,
                    ...GROUP_ID,
                    ...APP_ACCESS_TOKEN,
                    ...VERSION
                }
            });
        }
    }

    sendQRResult = async () => {
        try {
            await axios.get('https://reqres.in/api/users', {
                qr: this.state.QRResult,
                user: this.state.fetchedUser
            })
            if(this.state.isMessagesAllowed){
                this.QRSuccessModal()
            }else{
                connect.send('VKWebAppCallAPIMethod', {
                    method: "messages.isMessagesFromGroupAllowed",
                    request_id: "messages.isMessagesFromGroupAllowed",
                    params: {
                        request_id: "messages.isMessagesFromGroupAllowed",
                        user_id: this.state.fetchedUser.id,
                        ...COMMUNITY_ACCESS_TOKEN,
                        ...VERSION,
                        ...GROUP_ID
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

    }

    activateModal = () => {
        this.setState({activeModal: 'MY_MODAL'});
    };

    closeModal = () => {
        this.setState({activeModal: null});
    };

    joinToGroup = () => {
        connect.send("VKWebAppJoinGroup", GROUP_ID);
    };

    openQRScanner = () => {
        setTimeout(function () {
            connect.send("VKWebAppOpenQR");
        }, 300)

    }

    handleModalAction = (flag) => {
        this.closeModal()
        const flagMap = {
            joinGroup: () => this.joinToGroup(),
            qrSuccess: () => this.openQRScanner()
        }
        flagMap[flag]()
    }

    activateJoinGroupModal = () => {
        this.setState({
            currentTitle: 'Вступление в группу',
            currentCaption: 'Для начисления балов подпишитесь на группу и рассылку',
            currentButtonText: 'Вступить',
            actionFlag: 'joinGroup'
        })
        this.activateModal()
    }

    QRSuccessModal = () => {
        this.setState({
            currentTitle: 'Чек успешно отправлен',
            currentCaption: 'В ближайшее время мы выполним проверку и начислим балы',
            currentButtonText: 'Сканировать еще',
            actionFlag: 'qrSuccess'
        })
        this.activateModal()
    }

    componentDidMount() {
        connect.subscribe(({detail}) => {
            switch (detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: detail.data});
                    break;
                case 'VKWebAppAllowMessagesFromGroupResult':
                    if (detail.data.request_id === 'messages.isMessagesFromGroupAllowed' && detail.data.result) {
                        this.setState({isMessagesAllowed: true})
                        this.QRSuccessModal()
                    }
                    break;
                case 'VKWebAppJoinGroupResult':
                    if (detail.data.result) {
                        this.sendQRResult()
                    }
                    break;
                case 'VKWebAppOpenQRResult':
                    this.handleQRResult(detail.data.qr_reult)
                    break;

                // METHODS
                case 'VKWebAppCallAPIMethodResult':
                    if (detail.data.request_id === 'groups.isMember' && detail.data.response === 0) {
                        this.activateJoinGroupModal()
                    }
                    if (detail.data.request_id === 'groups.isMember' && detail.data.response === 1) {
                        this.setState({isMember: true})
                        this.sendQRResult()
                    }

                    if (detail.data.request_id === 'messages.isMessagesFromGroupAllowed' && detail.data.response.is_allowed === 1) {
                        this.setState({isMessagesAllowed: true})
                        this.QRSuccessModal()
                    }
                    if (detail.data.request_id === 'messages.isMessagesFromGroupAllowed' && detail.data.response.is_allowed === 0) {
                        connect.send("VKWebAppAllowMessagesFromGroup", {
                            request_id: "messages.isMessagesFromGroupAllowed", ...GROUP_ID
                        });
                    }
                    break;
                default:
                    console.log('default');
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Panel id={'home'}>
                    <PanelHeader>Scanner</PanelHeader>

                    {this.state.fetchedUser &&
                    <Group title="Выполняй задания и участвуй в розыгрышах">
                        <ListItem
                            before={
                                this.state.fetchedUser.photo_200
                                    ? <Avatar src={this.state.fetchedUser.photo_200}/>
                                    : null}
                            description={
                                this.state.fetchedUser.city && this.state.fetchedUser.city.title
                                    ? this.state.fetchedUser.city.title
                                    : ''
                            }
                        >
                            {`${this.state.fetchedUser.first_name} ${this.state.fetchedUser.last_name}`}
                        </ListItem>
                    </Group>}

                    <Button
                        onClick={this.startScanFlow}
                        size="xl"
                        level="primary"
                    >
                        Зарегистрировать чек
                    </Button>

                    <Modal
                        activeModal={this.state.activeModal}
                        currentTitle={this.state.currentTitle}
                        currentCaption={this.state.currentCaption}
                        actionFlag={this.state.actionFlag}
                        currentButtonText={this.state.currentButtonText}
                        onCloseModal={this.closeModal}
                        onAction={this.handleModalAction}
                    />
                </Panel>
            </View>
        );
    }
}

export default App;
