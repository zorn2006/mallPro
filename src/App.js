import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Button, Avatar, Group, ListItem, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios'

import Modal from "./components/Modal";

const GROUP_ID = {group_id: 185199781}
const COMMUNITY_ACCESS_TOKEN = {access_token: '9b1957fb4a56d227f2d894046db9b8aa12b7dafbbf6f606c0f7af580dcc06cf12862881c158bc4cf82e09'}
const APP_ACCESS_TOKEN = {access_token: '59f1b2e059f1b2e059f1b2e0c5599da582559f159f1b2e004b9e79590e7db44bab8b30c'}
const VERSION = {"v": "5.101"}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
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
        this.setState({QRResult})
    }

    sendQRResult = async () => {
        try {
            await axios.get('https://reqres.in/api/users', {
                qr: this.state.QRResult,
                user: this.state.fetchedUser
            })
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
            this.setAreaVal('passed data posting')
        } catch (e) {
            this.setAreaVal(e)
        }

    }

    setAreaVal = (data) => {
        this.setState({areaVal: this.state.areaVal + ' ' + JSON.stringify(data)});
    };


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
            currentCaption: 'Для получения баллов и рассылки необходимо быть членом группы',
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
            this.setAreaVal(detail)
            switch (detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: detail.data});
                    break;
                case 'VKWebAppAllowMessagesFromGroupResult':
                    if (detail.data.request_id === 'messages.isMessagesFromGroupAllowed' && detail.data.result) {
                        this.QRSuccessModal()
                    }
                    break;
                case 'VKWebAppJoinGroupResult':
                    if (detail.data.result) {
                        console.log('VKWebAppJoinGroupResult')
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
                       this.sendQRResult()
                    }

                    if (detail.data.request_id === 'messages.isMessagesFromGroupAllowed' && detail.data.response.is_allowed === 1) {
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
                    <Group title="Welcome">
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
