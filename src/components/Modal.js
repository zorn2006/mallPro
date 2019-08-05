import React from 'react';

import {ModalRoot, ModalCard} from '@vkontakte/vkui';

const Modal = ({activeModal, onCloseModal, onJoinToGroup}) => (
    <ModalRoot activeModal={activeModal}>
        <ModalCard
            id={'USER_SUBSCRIBE_MODAL'}
            onClose={() => onCloseModal()}
            title="Вы не вступили группу"
            caption="Для использования функционала нажмите вступить."
            actions={[{
                title: 'Всутпить',
                type: 'primary',
                action: () => onJoinToGroup()
            }]}
        >
        </ModalCard>
    </ModalRoot>
);

export default Modal;
